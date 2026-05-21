"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled = false, placeholder = "Ask about our AI services..." }: Readonly<ChatInputProps>) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim() || disabled) {
      return;
    }
    onSend(value.trim());
    setValue("");
  };

  return (
    <form
      className="border-t border-border-subtle pt-3"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <input
          data-chat-input
          className="h-12 flex-1 rounded-lg border border-border-subtle bg-bg-elevated px-4 text-sm text-text-primary placeholder-text-tertiary focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600/20 disabled:opacity-50"
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
        />
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white transition-all hover:bg-primary-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-600 disabled:hover:scale-100"
          disabled={!value.trim() || disabled}
          type="submit"
          aria-label="Send message"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.9429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.01449553 C3.34915502,0.9 2.40734225,0.9 1.77946707,1.4429026 C0.994623095,2.05 0.837654326,3.1394557 1.15159189,3.92494257 L3.03521743,10.3659356 C3.03521743,10.5230331 3.34915502,10.6801305 3.50612381,10.6801305 L16.6915026,11.4656174 C16.6915026,11.4656174 17.1624089,11.4656174 17.1624089,11.0505983 L17.1624089,12.0925825 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
          </svg>
        </button>
      </div>
    </form>
  );
}