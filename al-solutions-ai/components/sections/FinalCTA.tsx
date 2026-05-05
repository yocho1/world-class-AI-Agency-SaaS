"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";

interface FinalCTAProps {
  title?: string;
}

export function FinalCTA({ title = "Ready to ship your AI product in 30 days?" }: FinalCTAProps) {
  return (
    <section className="container pb-16 pt-10">
      <Reveal>
        <div className="rounded-2xl border border-border-default bg-bg-overlay p-10 text-center">
          <h2 className="text-3xl font-medium text-text-primary">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-text-secondary">Book a free AI audit and get a practical implementation roadmap with timeline, integration scope, and exact pricing for your use case.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link aria-label="Book a free AI audit" className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
              Book Free Audit
            </Link>
            <Link aria-label="View pricing for custom AI projects" className="inline-flex h-11 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated" href="/pricing">
              View Pricing
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}