"use client";

import { Reveal } from "@/components/ui";
import { trackEvent } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/achraflachgar/15min";

interface FinalCTAProps {
  readonly title?: string;
  readonly description?: string;
  readonly primaryText?: string;
  readonly secondaryText?: string;
}

export function FinalCTA({
  title = "See what AI would actually do for your business.",
  description = "A 30-minute call with a senior engineer. You will get a written scope report within 48 hours: what to build, how long it takes, what it costs, and whether AI is the right investment right now.",
  primaryText = "Book free 30-min audit →",
  secondaryText = "View pricing",
}: Readonly<FinalCTAProps>) {
  return (
    <section className="section-padding container">
      <Reveal>
        <div className="rounded-2xl border border-border-default bg-bg-overlay p-10 text-center">
          <h2 className="text-3xl font-medium text-text-primary">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-text-secondary">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              aria-label="Book a free 30-minute AI audit with a senior engineer"
              className="inline-flex h-12 items-center rounded-lg bg-accent-400 px-7 text-base font-semibold text-bg-default shadow-lg shadow-accent-400/20 transition-all hover:bg-accent-300 hover:shadow-xl hover:shadow-accent-400/30"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("audit_cta_click", { button_location: "final_cta" })}
            >
              {primaryText}
            </a>
            <a aria-label="View pricing for custom AI projects" className="inline-flex h-12 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated" href="/pricing">
              {secondaryText}
            </a>
          </div>
          <p className="mt-4 text-xs text-text-tertiary">
            No sales pitch. No follow-up spam. Honest assessment — we have turned down projects that did not need us.
          </p>
        </div>
      </Reveal>
    </section>
  );
}