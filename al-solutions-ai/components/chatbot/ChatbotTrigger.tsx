"use client";

interface ChatbotTriggerProps {
  onClick: () => void;
}

export function ChatbotTrigger({ onClick }: ChatbotTriggerProps) {
  return (
    <button
      aria-label="Open assistant"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/40"
      onClick={onClick}
      type="button"
    >
      AI
    </button>
  );
}