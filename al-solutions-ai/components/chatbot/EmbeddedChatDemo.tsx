"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { QuickReplies } from "./QuickReplies";
import { TypingIndicator } from "./TypingIndicator";

const DEMO_STARTERS = [
  "Can this integrate with HubSpot and WhatsApp?",
  "How fast can you launch this?",
  "What does a typical audit include?",
  "I'd like a free audit",
];

const QUICK_REPLY_TRANSITION_MS = 180;
const ASSISTANT_TYPING_MIN_MS = 700;

export function EmbeddedChatDemo() {
  const chat = useChat();
  const [isQuickReplyTransitioning, setIsQuickReplyTransitioning] = useState(false);
  const [isAssistantTypingVisible, setIsAssistantTypingVisible] = useState(false);
  const [showHandoffBanner, setShowHandoffBanner] = useState(false);
  const typingStartedAtRef = useRef<number | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleQuickReply = (reply: string) => {
    setIsQuickReplyTransitioning(true);
    if (reply.toLowerCase().includes("audit") || reply.toLowerCase().includes("demo")) {
      setShowHandoffBanner(true);
    }

    window.setTimeout(() => {
      void chat.sendMessage(reply);
      setIsQuickReplyTransitioning(false);
    }, QUICK_REPLY_TRANSITION_MS);
  };

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-overlay p-4">
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Embedded demo</p>
          <h3 className="mt-1 text-lg font-medium text-text-primary">Try the live assistant below</h3>
        </div>
        <div className="rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-1 text-xs text-accent-400">
          Live streaming
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {chat.messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-default bg-bg-elevated p-4 text-sm text-text-secondary">
            Ask the assistant anything about our AI products. It will answer directly, qualify the use case, and move naturally toward a demo or audit.
          </div>
        ) : (
          <div className="flex max-h-[320px] flex-col gap-3 overflow-y-auto pr-1">
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

        {chat.messages.length === 0 && (
          <div className={isQuickReplyTransitioning ? "pointer-events-none opacity-60 transition-all duration-200" : "transition-all duration-200"}>
            <QuickReplies options={DEMO_STARTERS} onSelect={handleQuickReply} disabled={isQuickReplyTransitioning} />
          </div>
        )}

        {showHandoffBanner && !chat.leadCaptured ? (
          <div className="rounded-2xl border border-accent-400/20 bg-accent-400/10 p-3 text-xs text-text-secondary" aria-live="polite">
            <p className="font-medium text-text-primary">Routing this to a specialist</p>
            <p className="mt-1">We&apos;ve got enough context to move beyond chat. Share your email when you&apos;re ready and we&apos;ll follow up with the next step.</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary">
          Or ask your own question
        </label>
        <ChatInput
          onSend={(message) => {
            if (message.toLowerCase().includes("audit") || message.toLowerCase().includes("demo")) {
              setShowHandoffBanner(true);
            }
            void chat.sendMessage(message);
          }}
          disabled={chat.isLoading || isQuickReplyTransitioning}
          placeholder="Ask about integrations, pricing, or timelines"
        />
      </div>
    </div>
  );
}