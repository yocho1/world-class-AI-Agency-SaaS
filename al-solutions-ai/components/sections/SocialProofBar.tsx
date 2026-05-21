"use client";

import { StaggerReveal } from "@/components/ui";

const CREDENTIALS = [
  { label: "UK Registered", value: "Co. No. 11521309" },
  { label: "Founded", value: "2018" },
  { label: "Languages", value: "Arabic · English · French" },
  { label: "Stack", value: "GPT-4o · Claude · LangChain" },
  { label: "Integrations", value: "HubSpot · Salesforce · WhatsApp" },
  { label: "Serving", value: "MENA & Europe" },
];

export function SocialProofBar() {
  return (
    <section
      aria-label="Company credentials"
      className="section-padding-sm border-y border-border-subtle bg-bg-surface"
    >
      <div className="container">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-400/10 px-3 py-1 sm:px-4 sm:py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">
              Built for production
            </span>
          </div>
          <h2 className="text-xl font-bold leading-tight text-text-primary sm:text-2xl md:text-3xl">
            A senior team shipping real AI systems —
            <span className="bg-gradient-to-r from-accent-400 via-accent-300 to-accent-400 bg-clip-text text-transparent">
              {" "}not slide decks.
            </span>
          </h2>
        </div>

        <StaggerReveal className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" staggerDelay={0.06}>
          {CREDENTIALS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border-subtle bg-gradient-to-br from-bg-surface to-bg-surface/50 p-4 text-center transition-all duration-300 hover:border-accent-400/20 hover:bg-bg-elevated hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-400/5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{item.value}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}