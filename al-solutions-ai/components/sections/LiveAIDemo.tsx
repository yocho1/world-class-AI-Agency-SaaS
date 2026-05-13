"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Card, Reveal } from "@/components/ui";

// Lazy-load the heavy chat widget so it never blocks first paint.
// Combined with IntersectionObserver below, it only initialises when the
// section enters the viewport.
const EmbeddedChatDemo = dynamic(
  () =>
    import("@/components/chatbot/EmbeddedChatDemo").then((mod) => ({
      default: mod.EmbeddedChatDemo,
    })),
  {
    ssr: false,
    loading: () => <ChatDemoSkeleton />,
  },
);

function ChatDemoSkeleton() {
  return (
    <div
      aria-hidden
      className="flex h-[420px] w-full animate-pulse flex-col gap-3 rounded-2xl border border-border-subtle bg-bg-overlay p-6"
    >
      <div className="h-3 w-32 rounded bg-border-subtle" />
      <div className="mt-4 h-4 w-3/4 rounded bg-border-subtle" />
      <div className="h-4 w-2/3 rounded bg-border-subtle" />
      <div className="mt-auto h-10 w-full rounded-lg bg-border-subtle" />
    </div>
  );
}

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

  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoadDemo, setShouldLoadDemo] = useState(false);

  useEffect(() => {
    if (shouldLoadDemo || typeof IntersectionObserver === "undefined") {
      return;
    }
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoadDemo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoadDemo]);

  return (
    <section ref={sectionRef} className="container py-10" id="live-demo">
      <Reveal>
        <Card className="relative overflow-hidden border-primary-700/50 bg-[radial-gradient(circle_at_80%_10%,rgba(22,163,74,0.12),transparent_35%),radial-gradient(circle_at_15%_85%,rgba(108,99,255,0.15),transparent_30%)]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent-400">{eyebrow}</p>
            <h2 className="mt-3 max-w-3xl text-2xl font-medium text-text-primary md:text-3xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-text-secondary">{intro}</p>
          </div>

          <div className="mt-8">
            {shouldLoadDemo ? <EmbeddedChatDemo /> : <ChatDemoSkeleton />}
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
                    <span className="text-metric block text-base font-semibold text-[#00D97E]">{item.stat}</span>
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