"use client";

import { useCallback, useRef, useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";

interface UseChathooks {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  conversationId: string | null;
  sessionId: string;
  leadCaptured: boolean;
  sendMessage: (content: string) => Promise<void>;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setError: (error: string | null) => void;
}

export function useChat(): UseChathooks {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const sessionIdRef = useRef<string>(uuidv4());

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((current) => [...current, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setError(null);
    setLeadCaptured(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        setError("Message cannot be empty");
        return;
      }

      try {
        setError(null);
        setIsLoading(true);

        // Prepare messages for API (includes current message)
        const apiMessages = messages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({
            role: m.role,
            content: m.content,
          }))
          .concat({ role: "user", content: content.trim() });

        // Add user message to local state
        const userMessage: ChatMessage = {
          id: uuidv4(),
          role: "user",
          content: content.trim(),
          createdAt: new Date().toISOString(),
        };
        addMessage(userMessage);

        // Create assistant message placeholder
        const assistantId = uuidv4();
        const assistantMessage: ChatMessage = {
          id: assistantId,
          role: "assistant",
          content: "", // Will be filled by streaming
          createdAt: new Date().toISOString(),
        };
        addMessage(assistantMessage);

        // Send to chat API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": "chatbot-client",
          },
          body: JSON.stringify({
            messages: apiMessages,
            conversationId,
            sessionId: sessionIdRef.current,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `API error: ${response.status}`
          );
        }

        // Get conversation ID from response headers
        const newConvId = response.headers.get("X-Conversation-ID");
        if (newConvId && newConvId !== "unknown") {
          setConversationId(newConvId);
        }

        if (response.headers.get("X-Lead-Captured") === "true") {
          setLeadCaptured(true);
        }

        // Stream response
        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.replace("data: ", "");
              if (jsonStr === "[DONE]") {
                continue;
              }

              try {
                const data = JSON.parse(jsonStr);
                if (data.token) {
                  assistantContent += data.token;
                  // Update assistant message with streamed content
                  setMessages((current) =>
                    current.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: assistantContent }
                        : m
                    )
                  );
                }
              } catch {
                // Skip parse errors
              }
            }
          }
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send message";
        setError(errorMessage);
        console.error("Chat error:", err);

        // Remove incomplete assistant message on error
        setMessages((current) =>
          current.filter((m) => !(m.role === "assistant" && !m.content))
        );
      }
    },
    [messages, conversationId, addMessage]
  );

  return {
    messages,
    isLoading,
    error,
    conversationId,
    sessionId: sessionIdRef.current,
    leadCaptured,
    sendMessage,
    addMessage,
    clearMessages,
    setError,
  };
}