import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Chatbot = dynamic(() => import("../chatbot/Chatbot").then((mod) => ({ default: mod.Chatbot })), {
  ssr: false,
});

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-text-primary">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <Chatbot />
    </div>
  );
}