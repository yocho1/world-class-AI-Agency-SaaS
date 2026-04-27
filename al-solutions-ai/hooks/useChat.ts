"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const pushMessage = (message: ChatMessage) => {
    setMessages((current) => [...current, message]);
  };

  return { messages, pushMessage };
}