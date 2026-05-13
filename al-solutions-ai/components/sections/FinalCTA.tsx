"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";
import { trackEvent } from "@/lib/analytics";

interface FinalCTAProps {
  readonly title?: string;
  readonly description?: string;
  readonly primaryText?: string;
  readonly secondaryText?: string;
}

export function FinalCTA({
  title = "Ready to ship your AI product in 30 days?",
  description = "Book a free AI audit and get a practical implementation roadmap with timeline, integration scope, and exact pricing for your use case.",
  primaryText = "Book Free Audit",
  secondaryText = "View Pricing",
}: Readonly<FinalCTAProps>) {
  return (
    <section className="section-padding container">
      <Reveal>
        <div className="rounded-2xl border border-border-default bg-bg-overlay p-10 text-center">
          <h2 className="text-3xl font-medium text-text-primary">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-text-secondary">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              aria-label="Book a free AI audit"
              className="inline-flex h-12 items-center rounded-lg bg-accent-400 px-7 text-base font-semibold text-bg-default shadow-lg shadow-accent-400/20 transition-all hover:bg-accent-300 hover:shadow-xl hover:shadow-accent-400/30"
              href="/free-ai-audit"
              onClick={() => trackEvent("audit_cta_click", { button_location: "final_cta" })}
            >
              {primaryText}
            </Link>
            <Link aria-label="View pricing for custom AI projects" className="inline-flex h-12 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated" href="/pricing">
              {secondaryText}
            </Link>
          </div>
          <p className="mt-4 text-xs text-text-tertiary">
            30-min call · Written scope report · No commitment
          </p>
        </div>
      </Reveal>
    </section>
  );
}