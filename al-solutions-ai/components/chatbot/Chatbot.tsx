"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import type { ChatMessage } from "@/types/chat";
import { ChatbotTrigger } from "./ChatbotTrigger";
import { ChatPanel } from "./ChatPanel";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { QuickReplies } from "./QuickReplies";
import { TypingIndicator } from "./TypingIndicator";
import { usePostHog } from "@/hooks/usePostHog";

const QUICK_REPLIES_INITIAL = [
  "Tell me about AI chatbots",
  "How does automation work?",
  "What's your pricing?",
  "I'd like a free audit",
];

const QUICK_REPLIES_PRICING = [
  "What industries do you serve?",
  "How long does implementation take?",
  "Book a free audit",
];

const QUICK_REPLIES_GENERAL = [
  "See case studies",
  "Book free audit",
  "Speak to a human",
];

const HANDOFF_INTENT_TERMS = [
  "free audit",
  "audit",
  "book",
  "call",
  "talk to",
  "human",
  "contact",
  "demo",
  "sales",
  "speak with",
];

function isHandoffIntent(message: string): boolean {
  const lowered = message.toLowerCase();
  return HANDOFF_INTENT_TERMS.some((term) => lowered.includes(term));
}

function getContextualQuickReplies(messages: ChatMessage[]): string[] {
  if (messages.length === 0) return QUICK_REPLIES_INITIAL;
  const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content.toLowerCase() || "";
  if (lastUserMessage.includes("pricing") || lastUserMessage.includes("cost") || lastUserMessage.includes("price")) {
    return QUICK_REPLIES_PRICING;
  }
  return QUICK_REPLIES_GENERAL;
}

function trackChatbotEvent(
  posthog: ReturnType<typeof usePostHog>,
  event: string,
  payload: Record<string, unknown>
) {
  posthog?.capture(event, payload);
}

function getChatErrorType(errorMessage: string): string {
  const lowered = errorMessage.toLowerCase();

  if (lowered.includes("rate limit") || lowered.includes("limit exceeded")) {
    return "rate_limit";
  }

  if (lowered.includes("network") || lowered.includes("fetch")) {
    return "network";
  }

  if (lowered.includes("openrouter")) {
    return "model";
  }

  return "unknown";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [hasExitIntentFired, setHasExitIntentFired] = useState(false);
  const [isQuickReplyTransitioning, setIsQuickReplyTransitioning] = useState(false);
  const [isAssistantTypingVisible, setIsAssistantTypingVisible] = useState(false);
  const [showHandoffBanner, setShowHandoffBanner] = useState(false);
  const chat = useChat();
  const posthog = usePostHog();
  const hasTrackedLeadCapture = useRef(false);
  const lastTrackedChatError = useRef<string | null>(null);
  const typingStartedAtRef = useRef<number | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const QUICK_REPLY_TRANSITION_MS = 180;
  const ASSISTANT_TYPING_MIN_MS = 700;

  // Auto-open chatbot after 7 seconds on first visit
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
        posthog?.capture("chatbot_opened", {
          trigger: "auto",
          page: typeof window !== "undefined" ? window.location.pathname : "",
          time_on_page: 7,
        });
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened, posthog]);

  // Exit-intent trigger (desktop only — mouse leaving viewport toward top)
  useEffect(() => {
    if (typeof window === "undefined" || hasExitIntentFired || isOpen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasExitIntentFired && !isOpen) {
        setIsOpen(true);
        setHasAutoOpened(true);
        setHasExitIntentFired(true);
        posthog?.capture("chatbot_opened", {
          trigger: "exit_intent",
          page: window.location.pathname,
          time_on_page: Math.round((Date.now() - performance.now()) / 1000),
        });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasExitIntentFired, isOpen, posthog]);

  useEffect(() => {
    if (chat.leadCaptured && !hasTrackedLeadCapture.current) {
      trackChatbotEvent(posthog, "chatbot_lead_captured", {
        email: true,
        name: false,
        company: false,
      });
      hasTrackedLeadCapture.current = true;
    }

    if (!chat.leadCaptured) {
      hasTrackedLeadCapture.current = false;
    }
  }, [chat.leadCaptured, posthog]);

  useEffect(() => {
    if (!chat.error || chat.error === lastTrackedChatError.current) {
      return;
    }

    trackChatbotEvent(posthog, "chatbot_error_shown", {
      error_type: getChatErrorType(chat.error),
    });
    lastTrackedChatError.current = chat.error;
  }, [chat.error, posthog]);

  useEffect(() => {
    if (chat.isLoading) {
      if (!isAssistantTypingVisible) {
        typingStartedAtRef.current = Date.now();
        setIsAssistantTypingVisible(true);
      }
      return;
    }

    if (isAssistantTypingVisible) {
      const startedAt = typingStartedAtRef.current;
      const elapsed = startedAt ? Date.now() - startedAt : ASSISTANT_TYPING_MIN_MS;
      const remaining = Math.max(ASSISTANT_TYPING_MIN_MS - elapsed, 0);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      if (remaining === 0) {
        typingStartedAtRef.current = null;
        setIsAssistantTypingVisible(false);
      } else {
        typingTimeoutRef.current = setTimeout(() => {
          typingStartedAtRef.current = null;
          typingTimeoutRef.current = null;
          setIsAssistantTypingVisible(false);
        }, remaining);
      }
    }
  }, [chat.isLoading, isAssistantTypingVisible]);

  useEffect(() => {
    if (chat.leadCaptured) {
      setShowHandoffBanner(false);
    }
  }, [chat.leadCaptured]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleOpenClick = () => {
    setIsOpen(true);
    if (!hasAutoOpened) {
      setHasAutoOpened(true);
    }
    posthog?.capture("chatbot_opened", {
      trigger: "button",
      page: typeof window !== "undefined" ? window.location.pathname : "",
      time_on_page: 0,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    posthog?.capture("chatbot_closed", {
      message_count: chat.messages.length,
      lead_captured: chat.leadCaptured,
    });
  };

  const handleQuickReply = (reply: string) => {
    setIsQuickReplyTransitioning(true);
    const allReplies = [...QUICK_REPLIES_INITIAL, ...QUICK_REPLIES_PRICING, ...QUICK_REPLIES_GENERAL];
    posthog?.capture("chatbot_quick_reply_selected", {
      option: reply,
      position: allReplies.indexOf(reply),
    });

    if (isHandoffIntent(reply)) {
      setShowHandoffBanner(true);
      trackChatbotEvent(posthog, "chatbot_handoff_triggered", {
        reason: "user_request",
      });
    }

    window.setTimeout(() => {
      chat.sendMessage(reply);
      setIsQuickReplyTransitioning(false);
    }, QUICK_REPLY_TRANSITION_MS);
  };

  const handleSendMessage = (content: string) => {
    posthog?.capture("chatbot_message_sent", {
      message_index: chat.messages.length,
      is_quick_reply: false,
    });

    if (isHandoffIntent(content)) {
      setShowHandoffBanner(true);
      trackChatbotEvent(posthog, "chatbot_handoff_triggered", {
        reason: "user_request",
      });
    }

    chat.sendMessage(content);
  };

  const handleManualHandoff = () => {
    setShowHandoffBanner(true);
    trackChatbotEvent(posthog, "chatbot_handoff_triggered", {
      reason: "manual_button",
    });
  };

  const handleDownloadTranscript = () => {
    const lines = chat.messages.map((m) => {
      const role = m.role === "user" ? "You" : "AL Assistant";
      return `[${role}] ${m.content}`;
    });
    const transcript = lines.join("\n\n");
    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    posthog?.capture("chatbot_transcript_downloaded", {
      message_count: chat.messages.length,
    });
  };

  const contextualQuickReplies = getContextualQuickReplies(chat.messages);

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && <ChatbotTrigger onClick={handleOpenClick} />}

      {/* Chat Panel */}
      {isOpen && (
        <ChatPanel>
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div>
                <h3 className="text-sm font-medium text-text-primary">
                  AL Assistant
                </h3>
                <p className="flex items-center gap-1 text-xs text-text-tertiary">
                  <span className="h-2 w-2 rounded-full bg-accent-400" />
                  Online · AI-powered
                </p>
              </div>
              <div className="flex items-center gap-1">
                {chat.messages.length > 0 && (
                  <button
                    onClick={handleDownloadTranscript}
                    className="inline-flex h-8 items-center rounded-md px-2 text-xs text-text-tertiary hover:bg-bg-elevated hover:text-text-secondary"
                    aria-label="Download transcript"
                    title="Download transcript"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleManualHandoff}
                  className="inline-flex h-8 items-center rounded-md px-2 text-xs text-text-tertiary hover:bg-bg-elevated hover:text-text-secondary"
                  aria-label="Talk to a human"
                  title="Talk to a human"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1 1 0 01-1-1v-6a1 1 0 011-1h8a2 2 0 012-2zM7 8H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h1" />
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-lg text-text-secondary hover:text-text-primary"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto py-4">
              {chat.messages.length === 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="text-center text-sm text-text-secondary">
                    <p className="mb-2">Hello! 👋</p>
                    <p>I&apos;m AL Assistant. Ask me about our AI solutions.</p>
                  </div>
                  <div className={isQuickReplyTransitioning ? "pointer-events-none opacity-60 transition-all duration-200" : "transition-all duration-200"}>
                    <QuickReplies
                      options={contextualQuickReplies}
                      onSelect={handleQuickReply}
                      disabled={isQuickReplyTransitioning}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {chat.messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isStreaming={
                        isAssistantTypingVisible &&
                        message.role === "assistant" &&
                        message === chat.messages[chat.messages.length - 1]
                      }
                    />
                  ))}
                  {isAssistantTypingVisible && <TypingIndicator />}
                </div>
              )}

              {showHandoffBanner && !chat.leadCaptured ? (
                <div className="mt-4 rounded-2xl border border-accent-400/20 bg-accent-400/10 p-4 text-sm text-text-secondary" aria-live="polite">
                  <p className="font-medium text-text-primary">We&apos;re routing this to a specialist</p>
                  <p className="mt-1">Share your email when you&apos;re ready and we&apos;ll follow up within 24 hours.</p>
                  <button
                    type="button"
                    onClick={() => handleSendMessage("I'd like to speak to a human")}
                    className="mt-3 inline-flex h-9 items-center rounded-lg bg-accent-400 px-4 text-xs font-semibold text-bg-default hover:bg-accent-300"
                  >
                    Request human follow-up
                  </button>
                </div>
              ) : null}

              {/* Contextual quick replies after conversation */}
              {chat.messages.length > 0 && !chat.isLoading && !isAssistantTypingVisible && (
                <div className={isQuickReplyTransitioning ? "pointer-events-none opacity-60 transition-all duration-200" : "transition-all duration-200"}>
                  <QuickReplies
                    options={contextualQuickReplies}
                    onSelect={handleQuickReply}
                    disabled={isQuickReplyTransitioning}
                  />
                </div>
              )}
            </div>

            {/* Error Message */}
            {chat.error && (
              <div className="mb-3 rounded-lg border border-error/30 bg-error/10 p-3 text-xs text-error" role="alert">
                {chat.error}
              </div>
            )}

            {/* Input Area */}
            <ChatInput
              onSend={handleSendMessage}
              disabled={chat.isLoading || isQuickReplyTransitioning}
              placeholder="Ask about our AI services..."
            />
          </div>
        </ChatPanel>
      )}
    </>
  );
}
