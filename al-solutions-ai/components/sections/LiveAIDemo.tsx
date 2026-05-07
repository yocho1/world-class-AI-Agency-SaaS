"use client";

import Link from "next/link";
import { Card, Reveal } from "@/components/ui";
import { EmbeddedChatDemo } from "@/components/chatbot/EmbeddedChatDemo";

interface LiveAIDemoProps {
  readonly title?: string;
  readonly eyebrow?: string;
  readonly intro?: string;
  readonly outcomesLabel?: string;
  readonly ctaText?: string;
}

export function LiveAIDemo({
  title = "See the AI Working — Live",
  eyebrow = "Live AI demo",
  intro = "Explore how our assistant qualifies leads, answers service questions, and routes hot opportunities directly into your CRM in under 90 seconds.",
  outcomesLabel = "Outcomes from this flow",
  ctaText = "Request Your Demo Build",
}: LiveAIDemoProps) {
  const outcomes = [
    {
      stat: "+38%",
      label: "qualified meetings booked",
      attribution: "avg. across 2024 client deployments",
    },
    {
      stat: "-52%",
      label: "support ticket volume",
      attribution: "Nexora Hotels, 90 days post-launch",
    },
    {
      stat: "24/7",
      label: "lead capture in Arabic, English, and French",
      attribution: null as string | null,
    },
  ];

  return (
    <section className="container py-10" id="live-demo">
      <Reveal>
        <Card className="relative overflow-hidden border-primary-700/50 bg-[radial-gradient(circle_at_80%_10%,rgba(22,163,74,0.12),transparent_35%),radial-gradient(circle_at_15%_85%,rgba(108,99,255,0.15),transparent_30%)]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent-400">{eyebrow}</p>
            <h2 className="mt-3 max-w-3xl text-2xl font-medium text-text-primary md:text-3xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-text-secondary">{intro}</p>
          </div>

          <div className="mt-8">
            <EmbeddedChatDemo />
          </div>

          <p className="mt-4 text-center text-sm italic text-muted-foreground">
            This is the same AI we&apos;d deploy for your business.
          </p>

          <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-overlay p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-text-tertiary">{outcomesLabel}</p>
              <ul className="mt-3 space-y-3 text-sm text-text-secondary">
                {outcomes.map((item) => (
                  <li key={item.label}>
                    <span className="block text-base font-medium text-text-primary">{item.stat}</span>
                    <span className="block text-sm text-text-secondary">{item.label}</span>
                    {item.attribution ? (
                      <span className="mt-1 block text-xs text-muted-foreground">{item.attribution}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <Link className="inline-flex h-11 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated" href="/free-ai-audit">
              {ctaText}
            </Link>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}