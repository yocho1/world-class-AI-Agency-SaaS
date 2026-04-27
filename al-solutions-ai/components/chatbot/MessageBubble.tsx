interface MessageBubbleProps {
  from: "ai" | "user";
  content: string;
}

export function MessageBubble({ from, content }: MessageBubbleProps) {
  const isUser = from === "user";

  return (
    <div className={isUser ? "ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-primary-600 px-4 py-2 text-sm text-white" : "max-w-[85%] rounded-2xl rounded-bl-sm border border-border-subtle bg-bg-elevated px-4 py-2 text-sm text-text-primary"}>
      {content}
    </div>
  );
}