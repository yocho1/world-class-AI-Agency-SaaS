import Link from "next/link";
import { Card } from "@/components/ui";

const FEATURES = [
  "Multilingual lead qualification",
  "CRM handoff with context",
  "Custom brand tone and guardrails",
  "Analytics events on every interaction",
];

export default function AIChatbotsPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">AI Chatbots</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Ship a chatbot that actually answers, qualifies, and converts.</h1>
        <p className="mt-4 text-text-secondary">Built for customer-facing workflows where every message has to move a lead forward instead of just greeting them.</p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h2 className="text-xl font-medium text-text-primary">What it includes</h2>
          <ul className="mt-5 space-y-3 text-sm text-text-secondary">
            {FEATURES.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <Link className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
            Book a build audit
          </Link>
        </Card>
        <Card className="bg-bg-overlay/70">
          <p className="text-sm text-text-tertiary">Example use cases</p>
          <div className="mt-4 space-y-3 text-sm text-text-secondary">
            <p>• Hospitality guest support and booking flow</p>
            <p>• B2B sales qualification and meeting routing</p>
            <p>• Internal knowledge assistant for support teams</p>
          </div>
        </Card>
      </div>
    </main>
  );
}