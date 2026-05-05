import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { streamChatCompletion, ChatMessage } from "@/lib/ai/openrouter";
import { PRIMARY_MODEL, FALLBACK_MODEL } from "@/lib/ai/models";
import { SITE_ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { createClient } from "@/lib/supabase/server";
import { extractEmail, persistLeadCapture } from "@/lib/leads";
import { Redis } from "@upstash/redis";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;
const CHAT_SESSION_MESSAGE_LIMIT = 20;
const CHAT_DAILY_SESSION_LIMIT = 100;
const CHAT_LIMIT_TTL_SECONDS = 60 * 60 * 24;

// Input validation schema
const ChatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1).max(5000),
    })
  ),
  conversationId: z.string().uuid().nullable().optional(),
  sessionId: z.string().min(1).max(100),
});

const MAX_ASSISTANT_CHARACTERS = 520;
const MAX_ASSISTANT_SENTENCES = 2;
const HIGH_INTENT_TERMS = [
  "pricing",
  "price",
  "cost",
  "budget",
  "timeline",
  "demo",
  "audit",
  "book",
  "call",
  "integration",
  "integrate",
  "whatsapp",
  "hubspot",
  "implementation",
  "proposal",
  "quote",
  "how much",
  "free audit",
  "contact",
];

type ChatRequestMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type ChatRateLimitResult =
  | {
      ok: true;
      sessionRemaining: number | null;
      dailySessionRemaining: number | null;
    }
  | {
      ok: false;
      status: number;
      error: string;
      limit: number;
      remaining: number;
      resetAt: string;
    };

function getDailyKey(): string {
  return new Date().toISOString().slice(0, 10);
}

async function enforceChatLimits(sessionId: string): Promise<ChatRateLimitResult> {
  if (!redis) {
    return {
      ok: true,
      sessionRemaining: null,
      dailySessionRemaining: null,
    };
  }

  const dailyKey = getDailyKey();
  const sessionMessagesKey = `chat:session:${sessionId}:messages`;
  const dailySessionSeenKey = `chat:daily:${dailyKey}:session:${sessionId}`;
  const dailySessionsKey = `chat:daily:${dailyKey}:sessions`;

  const currentCount = await redis.incr(sessionMessagesKey);
  if (currentCount === 1) {
    await redis.expire(sessionMessagesKey, CHAT_LIMIT_TTL_SECONDS);
  }

  if (currentCount > CHAT_SESSION_MESSAGE_LIMIT) {
    return {
      ok: false,
      status: 429,
      error: "Chat session message limit exceeded",
      limit: CHAT_SESSION_MESSAGE_LIMIT,
      remaining: 0,
      resetAt: new Date(Date.now() + CHAT_LIMIT_TTL_SECONDS * 1000).toISOString(),
    };
  }

  const sessionSeen = await redis.set(dailySessionSeenKey, "1", {
    nx: true,
    ex: CHAT_LIMIT_TTL_SECONDS,
  });

  let dailySessionsCount: number | null = null;
  if (sessionSeen) {
    dailySessionsCount = await redis.incr(dailySessionsKey);
    if (dailySessionsCount === 1) {
      await redis.expire(dailySessionsKey, CHAT_LIMIT_TTL_SECONDS);
    }

    if (dailySessionsCount > CHAT_DAILY_SESSION_LIMIT) {
      return {
        ok: false,
        status: 429,
        error: "Daily session limit exceeded",
        limit: CHAT_DAILY_SESSION_LIMIT,
        remaining: 0,
        resetAt: new Date(Date.now() + CHAT_LIMIT_TTL_SECONDS * 1000).toISOString(),
      };
    }
  }

  return {
    ok: true,
    sessionRemaining: Math.max(CHAT_SESSION_MESSAGE_LIMIT - currentCount, 0),
    dailySessionRemaining:
      dailySessionsCount === null
        ? null
        : Math.max(CHAT_DAILY_SESSION_LIMIT - dailySessionsCount, 0),
  };
}

function countSentenceEndings(text: string): number {
  const matches = text.match(/[.!?](?:\s|$)/g);
  return matches ? matches.length : 0;
}

function shouldRequestLeadCapture(messageHistory: ChatRequestMessage[]): boolean {
  const userMessages = messageHistory.filter(
    (message: ChatRequestMessage) => message.role === "user"
  );

  if (userMessages.length < 2) {
    return false;
  }

  const recentUserMessage = userMessages[userMessages.length - 1]?.content.toLowerCase() ?? "";

  return HIGH_INTENT_TERMS.some((term) => recentUserMessage.includes(term));
}

function shouldAppendContactPrompt(answerText: string): boolean {
  const lowered = answerText.toLowerCase();
  return !(
    lowered.includes("email") ||
    lowered.includes("reach out") ||
    lowered.includes("contact")
  );
}

async function persistChatMessage(
  supabase: SupabaseClient,
  conversationId: string,
  role: "user" | "assistant",
  content: string
): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("messages").insert({
      conversation_id: conversationId,
      role,
      content,
    });
  } catch (err) {
    console.error(`Failed to save ${role} message:`, err);
  }
}

/**
 * POST /api/chat
 * Streams a chat completion response with automatic model fallback
 * Persists conversation to Supabase
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const { messages, conversationId, sessionId } = ChatRequestSchema.parse(body);

    if (messages.length === 0) {
      return NextResponse.json({ error: "Messages array cannot be empty" }, { status: 400 });
    }

    const rateLimitResult = await enforceChatLimits(sessionId);
    if (!rateLimitResult.ok) {
      return NextResponse.json(
        {
          error: rateLimitResult.error,
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          resetAt: rateLimitResult.resetAt,
        },
        {
          status: rateLimitResult.status,
          headers: {
            "X-RateLimit-Limit": String(rateLimitResult.limit),
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
            "X-RateLimit-Reset": rateLimitResult.resetAt,
          },
        }
      );
    }

    // Check for Supabase service
    let supabase: SupabaseClient | null = null;
    try {
      supabase = await createClient();
    } catch (err) {
      console.warn("Supabase client not available:", err);
    }

    // Get or create conversation
    let activeConversationId = conversationId;

    if (!activeConversationId && supabase) {
      try {
        // Create new conversation
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: newConv, error: convError } = await (supabase as any)
          .from("conversations")
          .insert({
            session_id: sessionId,
            started_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (convError) {
          console.error("Failed to create conversation:", convError);
        } else if (newConv) {
          activeConversationId = (newConv as Record<string, unknown>).id as string;
        }
      } catch (err) {
        console.error("Error creating conversation:", err);
      }
    }

    // Prepare message history for OpenRouter
    const systemPrompt: ChatMessage = {
      role: "system",
      content: SITE_ASSISTANT_SYSTEM_PROMPT,
    };

    const conversationMessages: ChatMessage[] = [
      systemPrompt,
      ...messages.map((m) => ({
        role: m.role as "system" | "user" | "assistant",
        content: m.content,
      })),
    ];

    if (shouldRequestLeadCapture(messages)) {
      conversationMessages.push({
        role: "system",
        content:
          "The visitor has shown strong buying intent. Answer the question first, then end with one concise email capture question or a 15-minute call offer. Keep it natural, specific, and under two sentences.",
      });
    }

    // Get streaming response from OpenRouter
    let streamResponse: ReadableStream<Uint8Array>;
    try {
      streamResponse = await streamChatCompletion(
        conversationMessages,
        PRIMARY_MODEL,
        FALLBACK_MODEL
      );
    } catch (error) {
      console.error("OpenRouter streaming failed:", error);
      return NextResponse.json(
        {
          error: "Failed to generate response",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    // Transform the stream to add server-sent event formatting
    let assistantCharacterCount = 0;
    let assistantText = "";
    let assistantTruncated = false;

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const jsonStr = line.replace("data: ", "");
              if (jsonStr === "[DONE]") {
                controller.enqueue(
                  new TextEncoder().encode("data: [DONE]\n\n")
                );
                continue;
              }

              const parsed = JSON.parse(jsonStr);
              const token = parsed.choices?.[0]?.delta?.content || "";

              if (token && !assistantTruncated) {
                const remainingCharacters = MAX_ASSISTANT_CHARACTERS - assistantCharacterCount;
                if (remainingCharacters <= 0) {
                  assistantTruncated = true;
                  controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
                  continue;
                }

                const cappedToken = token.slice(0, remainingCharacters);
                assistantCharacterCount += cappedToken.length;
                assistantText += cappedToken;

                controller.enqueue(
                  new TextEncoder().encode(
                    `data: ${JSON.stringify({ token: cappedToken, conversationId: activeConversationId })}\n\n`
                  )
                );

                if (
                  assistantCharacterCount >= MAX_ASSISTANT_CHARACTERS ||
                  countSentenceEndings(assistantText) >= MAX_ASSISTANT_SENTENCES
                ) {
                  assistantTruncated = true;
                  if (
                    shouldRequestLeadCapture(messages as ChatRequestMessage[]) &&
                    shouldAppendContactPrompt(assistantText)
                  ) {
                    const contactPrompt =
                      " Could you share your email? I can have the team follow up within 24 hours with a tailored plan.";
                    assistantText += contactPrompt;
                    controller.enqueue(
                      new TextEncoder().encode(
                        `data: ${JSON.stringify({ token: contactPrompt, conversationId: activeConversationId })}\n\n`
                      )
                    );
                  }

                  controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
                }
              }
            } catch {
              // Skip parse errors
            }
          }
        }
      },
      async flush() {
        if (activeConversationId && supabase && assistantText.trim()) {
          await persistChatMessage(
            supabase,
            activeConversationId,
            "assistant",
            assistantText.trim()
          );
        }
      },
    });

    const transformedStream = streamResponse.pipeThrough(transformStream);

    // Save user message to Supabase if conversation exists
    if (activeConversationId && supabase && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        await persistChatMessage(
          supabase,
          activeConversationId,
          "user",
          lastMessage.content
        );
      }
    }

    let leadCaptured = false;

    if (activeConversationId && supabase && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        const hasHighIntent = shouldRequestLeadCapture(messages as ChatRequestMessage[]);
        const email = extractEmail(lastMessage.content);

        // Capture lead on high-intent (even without email) OR when email is found
        if (hasHighIntent || email) {
          try {
            await persistLeadCapture(supabase, {
              email: email || undefined,
              source: "chat",
              sessionId,
              conversationId: activeConversationId,
              messagesSent: messages.length,
              qualificationData: {
                firstQualifiedSignal: email
                  ? "email_shared_in_chat"
                  : "high_intent_detected",
              },
            });
            leadCaptured = true;
          } catch (error) {
            console.error("Failed to persist lead capture:", error);
          }
        }
      }
    }

    return new Response(transformedStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Conversation-ID": activeConversationId || "unknown",
        "X-Lead-Captured": leadCaptured ? "true" : "false",
        ...(rateLimitResult.sessionRemaining !== null
          ? { "X-Session-RateLimit-Remaining": String(rateLimitResult.sessionRemaining) }
          : {}),
        ...(rateLimitResult.dailySessionRemaining !== null
          ? { "X-Daily-Sessions-Remaining": String(rateLimitResult.dailySessionRemaining) }
          : {}),
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request format",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}