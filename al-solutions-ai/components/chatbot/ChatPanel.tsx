import type { ReactNode } from "react";

export function ChatPanel({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen rounded-none border border-border-default bg-bg-surface p-4 md:inset-auto md:bottom-24 md:right-6 md:h-[560px] md:w-[380px] md:rounded-2xl">
      {children}
    </div>
  );
}