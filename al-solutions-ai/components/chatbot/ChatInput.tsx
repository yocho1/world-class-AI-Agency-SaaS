"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: Readonly<ChatInputProps>) {
  const [value, setValue] = useState("");

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) {
          return;
        }
        onSend(value.trim());
        setValue("");
      }}
    >
      <input
        className="h-10 flex-1 rounded-md border border-border-subtle bg-bg-elevated px-3 text-sm text-text-primary"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask about our AI services..."
        value={value}
      />
      <button className="h-8 w-8 rounded-full bg-primary-600 text-white disabled:opacity-50" disabled={!value.trim()} type="submit">
        {">"}
      </button>
    </form>
  );
}