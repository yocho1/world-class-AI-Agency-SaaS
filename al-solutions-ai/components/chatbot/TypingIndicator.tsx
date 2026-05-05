export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-text-tertiary" aria-live="polite" aria-label="Assistant is typing">
      <div className="flex gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="h-1.5 w-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="h-1.5 w-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <span className="text-xs">Thinking...</span>
    </div>
  );
}