"use client";

import { StaggerReveal } from "@/components/ui";

const LOGOS = [
  { name: "OpenAI" },
  { name: "Anthropic" },
  { name: "LangChain" },
  { name: "HubSpot" },
  { name: "Salesforce" },
  { name: "WhatsApp" },
  { name: "n8n" },
  { name: "Make" },
  { name: "Twilio" },
  { name: "Stripe" },
];

function LogoBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex h-10 items-center rounded-lg border border-border-subtle bg-bg-elevated px-4 text-sm font-semibold text-text-tertiary transition-all duration-300 hover:border-accent-400/30 hover:text-text-secondary hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent-400/5">
      {name}
    </span>
  );
}

export function TechStackBar() {
  return (
    <section aria-label="Tech stack" className="section-padding-sm border-y border-border-subtle bg-bg-surface">
      <div className="container">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary">
          Built on the same infrastructure as the world&apos;s best AI teams
        </p>
        <StaggerReveal className="mt-6 flex flex-wrap items-center justify-center gap-3" staggerDelay={0.05}>
          {LOGOS.map((logo) => (
            <LogoBadge key={logo.name} name={logo.name} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
