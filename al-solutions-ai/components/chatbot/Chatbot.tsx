"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { ChatbotTrigger } from "./ChatbotTrigger";
import { ChatPanel } from "./ChatPanel";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { QuickReplies } from "./QuickReplies";
import { TypingIndicator } from "./TypingIndicator";
import { usePostHog } from "@/hooks/usePostHog";

const QUICK_REPLIES = [
  "Tell me about AI chatbots",
  "How does automation work?",
  "What's your pricing?",
  "I'd like a free audit",
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
    posthog?.capture("chatbot_quick_reply_selected", {
      option: reply,
      position: QUICK_REPLIES.indexOf(reply),
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
              <button
                onClick={handleClose}
                className="text-lg text-text-secondary hover:text-text-primary"
                aria-label="Close chat"
              >
                ✕
              </button>
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
                      options={QUICK_REPLIES}
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
                <div className="mt-4 rounded-2xl border border-accent-400/20 bg-accent-400/10 p-3 text-xs text-text-secondary" aria-live="polite">
                  <p className="font-medium text-text-primary">Routing this to a specialist</p>
                  <p className="mt-1">We&apos;ve got enough context to move beyond chat. Share your email when you&apos;re ready and we&apos;ll follow up with the next step.</p>
                </div>
              ) : null}
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
