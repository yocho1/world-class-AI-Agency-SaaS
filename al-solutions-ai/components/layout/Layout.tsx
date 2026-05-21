import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Chatbot = dynamic(() => import("../chatbot/Chatbot").then((mod) => ({ default: mod.Chatbot })), {
  ssr: false,
});

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-bg-base text-text-primary">
      {/* Subtle dot-grid texture for premium feel */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-50" aria-hidden="true" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
}