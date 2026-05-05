"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";

type Conversation = {
  id: string;
  lead_id: string | null;
  channel: string;
  started_at: string;
  updated_at: string;
};

type Message = {
  id: string;
  role: string;
  content: string;
  created_at: string;
  optimistic?: boolean;
};

function prependConversation(prev: Conversation[], incoming: Conversation): Conversation[] {
  return [incoming, ...prev];
}

function replaceConversation(prev: Conversation[], incoming: Conversation): Conversation[] {
  return prev.map((conv) => (conv.id === incoming.id ? incoming : conv));
}

function removeConversation(prev: Conversation[], id: string): Conversation[] {
  return prev.filter((conv) => conv.id !== id);
}

function mergeIncomingMessage(prev: Message[], incoming: Message): Message[] {
  if (prev.some((m) => m.id === incoming.id)) {
    return prev;
  }

  if (incoming.role === "user") {
    const optimisticIndex = prev.findIndex(
      (m) => m.optimistic && m.role === "user" && m.content === incoming.content
    );
    if (optimisticIndex >= 0) {
      const next = [...prev];
      next[optimisticIndex] = incoming;
      return next;
    }
  }

  return [...prev, incoming];
}

export default function ConversationsView() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState("connecting");
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const assistantTypingStartedAtRef = useRef<number | null>(null);
  const assistantTypingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ASSISTANT_TYPING_MIN_MS = 650;

  function beginAssistantTyping() {
    if (assistantTypingTimeoutRef.current) {
      clearTimeout(assistantTypingTimeoutRef.current);
      assistantTypingTimeoutRef.current = null;
    }
    assistantTypingStartedAtRef.current = Date.now();
    setIsAssistantTyping(true);
  }

  function endAssistantTyping() {
    const startedAt = assistantTypingStartedAtRef.current;
    const elapsed = startedAt ? Date.now() - startedAt : ASSISTANT_TYPING_MIN_MS;
    const remaining = Math.max(ASSISTANT_TYPING_MIN_MS - elapsed, 0);

    if (assistantTypingTimeoutRef.current) {
      clearTimeout(assistantTypingTimeoutRef.current);
      assistantTypingTimeoutRef.current = null;
    }

    if (remaining === 0) {
      assistantTypingStartedAtRef.current = null;
      setIsAssistantTyping(false);
      return;
    }

    assistantTypingTimeoutRef.current = setTimeout(() => {
      assistantTypingStartedAtRef.current = null;
      assistantTypingTimeoutRef.current = null;
      setIsAssistantTyping(false);
    }, remaining);
  }

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    [messages]
  );

  useEffect(() => {
    let mounted = true;
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((j) => {
        if (!mounted) return;
        if (j.ok) setConversations(j.data || []);
      })
      .catch(() => {});

    const supabase = createSupabaseBrowserClient();

    const convChannel = supabase
      .channel("public:conversations")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "conversations" },
        (payload: RealtimePostgresInsertPayload<Conversation>) => {
          setConversations((current) => prependConversation(current, payload.new));
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "conversations" },
        (payload: RealtimePostgresUpdatePayload<Conversation>) => {
          setConversations((current) => replaceConversation(current, payload.new));
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "conversations" },
        (payload: RealtimePostgresDeletePayload<Conversation>) => {
          const oldId = payload.old?.id;
          if (typeof oldId === "string") {
            setConversations((current) => removeConversation(current, oldId));
          }
        }
      )
      .subscribe((status) => {
        setRealtimeStatus(status.toLowerCase());
      });

    return () => {
      mounted = false;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      supabase.removeChannel(convChannel);
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    setSendError(null);
    let mounted = true;
    fetch(`/api/conversations/${selected.id}`)
      .then((r) => r.json())
      .then((j) => {
        if (!mounted) return;
        if (j.ok) setMessages(j.data.messages || []);
      })
      .finally(() => setLoading(false));

    const supabase = createSupabaseBrowserClient();
    const msgChannel = supabase
      .channel(`public:messages`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${selected.id}` },
        (payload: RealtimePostgresInsertPayload<Message>) => {
          if (payload.new.role === "assistant") {
            endAssistantTyping();
          }
          setMessages((m) => mergeIncomingMessage(m, payload.new));
        }
      )
      .subscribe((status) => {
        setRealtimeStatus(status.toLowerCase());
      });

    return () => {
      mounted = false;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      supabase.removeChannel(msgChannel);
      if (assistantTypingTimeoutRef.current) {
        clearTimeout(assistantTypingTimeoutRef.current);
        assistantTypingTimeoutRef.current = null;
      }
    };
  }, [selected]);

  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [sortedMessages.length]);

  async function send() {
    if (!selected || !input.trim() || isSending) return;
    const content = input.trim();
    const tempId = `tmp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      role: "user",
      content,
      created_at: new Date().toISOString(),
      optimistic: true,
    };

    setSendError(null);
    setIsSending(true);
    beginAssistantTyping();
    setMessages((m) => [...m, optimisticMessage]);
    setInput("");

    try {
      const body = { role: "user", content };
      const res = await fetch(`/api/conversations/${selected.id}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const j = await res.json();

      if (!j.ok) {
        throw new Error(j.error || "Failed to send message");
      }

      const userMessage = j.data?.userMessage as Message | undefined;
      const assistantMessage = j.data?.assistantMessage as Message | undefined;
      if (assistantMessage) {
        endAssistantTyping();
      }

      setMessages((prev) => {
        let next = prev;
        if (userMessage) {
          next = mergeIncomingMessage(next, userMessage);
        }
        if (assistantMessage) {
          next = mergeIncomingMessage(next, assistantMessage);
        }
        return next;
      });
    } catch (error) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      endAssistantTyping();
      setSendError(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setIsSending(false);
      endAssistantTyping();
    }
  }

  const hasConversations = conversations.length > 0;

  let messageContent: React.ReactNode = null;

  if (loading) {
    messageContent = <div className="text-sm text-text-tertiary">Loading...</div>;
  } else if (sortedMessages.length === 0) {
    messageContent = <div className="text-sm text-text-tertiary">No messages yet.</div>;
  } else {
    messageContent = sortedMessages.map((m) => (
      <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
        <div
          className={`inline-block p-2 rounded ${m.role === "user" ? "bg-primary-600 text-white" : "bg-bg-elevated text-text-primary"} ${m.optimistic ? "opacity-70" : "opacity-100"}`}
        >
          {m.content}
        </div>
        <div className="text-xs text-text-tertiary mt-1">{new Date(m.created_at).toLocaleString()}</div>
      </div>
    ));
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="mb-4 flex items-center justify-between text-xs text-text-tertiary">
          <span>Conversations</span>
          <span className="hidden sm:inline">Realtime: {realtimeStatus}</span>
        </div>
        <div className="space-y-2">
          {hasConversations ? (
            conversations.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c)}
                className={`w-full min-h-11 rounded border p-3 text-left ${selected?.id === c.id ? "border-primary-600 bg-primary-50" : "border-border-default"}`}
              >
                <div className="text-sm font-medium">{c.channel}</div>
                <div className="text-xs text-text-tertiary">{new Date(c.updated_at).toLocaleString()}</div>
              </button>
            ))
          ) : (
            <div className="rounded-lg border border-border-subtle bg-bg-surface p-6">
              <p className="text-sm text-text-primary">No conversations yet.</p>
              <p className="mt-2 text-sm text-text-secondary">
                Share your chatbot link to start collecting visitor questions and leads.
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex h-11 items-center rounded-lg border border-border-default px-4 text-sm text-text-primary hover:border-border-strong"
              >
                View public site
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="lg:col-span-8">
        {selected ? (
          <div className="flex flex-col h-full">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-medium">Conversation - {selected.channel}</div>
              <div className="text-xs text-text-tertiary sm:hidden">Realtime: {realtimeStatus}</div>
            </div>
            <div ref={messageListRef} className="flex-1 overflow-auto space-y-3 p-3 border border-border-default rounded bg-bg-surface min-h-[320px]">
              {messageContent}
              {isAssistantTyping ? (
                <div className="text-left" aria-live="polite" aria-label="Assistant is typing">
                  <div className="inline-flex items-center gap-1 rounded bg-bg-elevated text-text-primary p-2 border border-border-subtle">
                    <span className="h-1.5 w-1.5 rounded-full bg-text-tertiary animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-text-tertiary animate-bounce [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-text-tertiary animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              ) : null}
            </div>
            {sendError ? <div className="mt-2 text-xs text-red-500">{sendError}</div> : null}
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Type a message..."
                className="h-11 flex-1 rounded border border-border-default px-3"
              />
              <button
                type="button"
                onClick={() => {
                  void send();
                }}
                disabled={isSending || !input.trim()}
                className="inline-flex h-11 items-center justify-center rounded bg-primary-600 px-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-text-tertiary">Select a conversation to view messages.</div>
        )}
      </div>
    </div>
  );
}
