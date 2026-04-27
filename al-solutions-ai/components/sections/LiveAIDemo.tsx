"use client";

import Link from "next/link";
import { Card } from "@/components/ui";

interface LiveAIDemoProps {
  title?: string;
}

export function LiveAIDemo({ title = "Preview the AI concierge experience" }: LiveAIDemoProps) {
  return (
    <section className="container py-10" id="live-demo">
      <Card className="relative overflow-hidden border-primary-700/50 bg-[radial-gradient(circle_at_80%_10%,rgba(22,163,74,0.12),transparent_35%),radial-gradient(circle_at_15%_85%,rgba(108,99,255,0.15),transparent_30%)]">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Live AI demo</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-medium text-text-primary md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Explore how our assistant qualifies leads, answers service questions, and routes hot opportunities directly into your CRM in under 90 seconds.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-border-subtle bg-bg-overlay p-5">
            <p className="text-sm text-text-tertiary">Demo transcript snapshot</p>
            <div className="mt-4 space-y-3 text-sm">
              <p className="rounded-lg bg-bg-elevated px-4 py-3 text-text-secondary">Visitor: &quot;Can this integrate with HubSpot and WhatsApp?&quot;</p>
              <p className="rounded-lg bg-primary-600/15 px-4 py-3 text-text-primary">
                AI Concierge: &quot;Yes. We deploy both integrations in Sprint 2 and hand you tracked conversion events in PostHog.&quot;
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border-subtle bg-bg-overlay p-5">
            <p className="text-sm text-text-tertiary">Outcomes from this flow</p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>+38% qualified meetings booked</li>
              <li>-52% support load on sales teams</li>
              <li>24/7 multilingual lead capture</li>
            </ul>
            <Link className="mt-6 inline-flex h-11 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated" href="/free-ai-audit">
              Request Your Demo Build
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}