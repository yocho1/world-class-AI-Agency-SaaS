import type { ReactNode } from "react";

export function ChatPanel({ children }: { children: ReactNode }) {
  return <div className="fixed bottom-24 right-6 z-50 h-[560px] w-[380px] rounded-2xl border border-border-default bg-bg-surface p-4">{children}</div>;
}