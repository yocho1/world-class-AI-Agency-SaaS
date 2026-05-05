import type { ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming = false }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`${
          isUser
            ? "max-w-[75%] rounded-3xl rounded-br-sm bg-primary-600 px-4 py-3 text-sm text-white"
            : "max-w-[85%] rounded-3xl rounded-bl-sm border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-primary"
        } ${isStreaming ? "animate-pulse" : ""}`}
      >
        {message.content || (isStreaming ? "..." : "")}
      </div>
    </div>
  );
}