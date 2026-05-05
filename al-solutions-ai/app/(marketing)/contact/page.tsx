import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact AL Solutions AI",
  description: "Start a conversation with AL Solutions AI about your next chatbot, automation system, or lead conversion project.",
};

export default function ContactPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Contact</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Talk to the team about your next AI deployment.</h1>
        <p className="mt-4 max-w-2xl text-text-secondary">
          If you want to scope a chatbot, automation workflow, or a full web + AI build, start with the free AI audit and we will map the fastest path to production.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
          Book Free AI Audit
        </Link>
        <Link className="inline-flex h-11 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated" href="/services">
          Explore Services
        </Link>
      </div>
    </main>
  );
}
