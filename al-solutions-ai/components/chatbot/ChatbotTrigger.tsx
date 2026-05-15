"use client";

interface ChatbotTriggerProps {
  onClick: () => void;
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

export function ChatbotTrigger({ onClick }: ChatbotTriggerProps) {
  return (
    <button
      aria-label="Open assistant"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/40 transition-transform hover:scale-105 active:scale-95"
      onClick={onClick}
      type="button"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-primary-600 opacity-0 animate-ping [animation-duration:3s] [animation-iteration-count:3]" />
      {/* Notification dot */}
      <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
      </span>
      <SparklesIcon className="h-6 w-6" />
    </button>
  );
}