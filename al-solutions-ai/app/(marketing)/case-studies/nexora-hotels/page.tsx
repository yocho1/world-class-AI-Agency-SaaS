import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nexora Hotels Group Case Study | AL Solutions AI",
  description: "How Nexora Hotels Group launched a multilingual AI concierge across web and WhatsApp in 28 days.",
};

export default function NexoraHotelsCaseStudyPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Case study</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Nexora Hotels Group launched a multilingual AI system in 28 days.</h1>
        <p className="mt-4 text-text-secondary">
          A single AI concierge now handles first-response support on website and WhatsApp, routes qualified leads, and keeps the operations team in control.
        </p>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">Lead capture</p>
          <p className="mt-3 text-2xl font-medium text-text-primary">+44%</p>
          <p className="mt-2 text-xs text-text-tertiary">Nexora Hotels Group, 60 days post-launch</p>
        </article>
        <article className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">First response speed</p>
          <p className="mt-3 text-2xl font-medium text-text-primary">-62%</p>
          <p className="mt-2 text-xs text-text-tertiary">Nexora Hotels Group, 60 days post-launch</p>
        </article>
        <article className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">Go-live time</p>
          <p className="mt-3 text-2xl font-medium text-text-primary">28 days</p>
          <p className="mt-2 text-xs text-text-tertiary">Nexora Hotels Group, 60 days post-launch</p>
        </article>
      </section>

      <div className="mt-10 max-w-2xl space-y-4 text-text-secondary">
        <p>
          The deployment included Arabic, English, and French routing, WhatsApp handoff, CRM syncing, and a playbook for the front desk team.
        </p>
        <p>
          The result was a single system the business could measure instead of a collection of tools and handoffs.
        </p>
      </div>

      <Link className="mt-8 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300" href="/free-ai-audit">
        Book a similar deployment →
      </Link>
    </main>
  );
}