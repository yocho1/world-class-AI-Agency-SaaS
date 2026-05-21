"use client";

import { useEffect, useRef, useState } from "react";
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

const PROMPT_CHIPS = [
  { label: "Can this integrate with HubSpot?", message: "Can this integrate with HubSpot?" },
  { label: "How fast can you go live?", message: "How fast can you go live?" },
  { label: "Do you support Arabic?", message: "Do you support Arabic?" },
  { label: "I'd like a free audit", message: "I'd like a free audit", isAudit: true },
];

interface LiveAIDemoProps {
  readonly title?: string;
  readonly eyebrow?: string;
  readonly intro?: string;
  readonly outcomesLabel?: string;
  readonly ctaText?: string;
}

export function LiveAIDemo({
  title = "This is what we'd build for you",
  eyebrow = "See it working",
  intro = "The assistant below is the exact system we deploy for clients. It qualifies leads, answers product questions, routes to booking, and switches between Arabic, French, and English.",
  outcomesLabel = "In 90 seconds you will see:",
  ctaText = "Want this for your business?",
}: LiveAIDemoProps) {
  const outcomes = [
    {
      stat: "1",
      label: "How the AI qualifies a lead in under 60 seconds",
      attribution: null as string | null,
    },
    {
      stat: "2",
      label: "Multilingual switching between Arabic, French, and English",
      attribution: null as string | null,
    },
    {
      stat: "3",
      label: "Automatic routing to a free audit booking when intent is detected",
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

          <div className="mt-6 rounded-xl border border-border-subtle bg-bg-overlay p-4">
            <p className="text-center text-sm text-text-tertiary">
              This is the exact system we&apos;d build for your business. It runs on the same stack we deploy for clients.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {PROMPT_CHIPS.map((chip) =>
                chip.isAudit ? (
                  <a
                    key={chip.label}
                    href="https://calendly.com/achraflachgar/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-1.5 text-xs font-medium text-accent-400 transition-colors hover:bg-accent-400/20"
                  >
                    {chip.label}
                  </a>
                ) : (
                  <button
                    key={chip.label}
                    type="button"
                    className="inline-flex items-center rounded-full border border-border-subtle bg-bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent-400 hover:text-text-primary"
                    onClick={() => {
                      const input = document.querySelector("[data-chat-input]") as HTMLInputElement | null;
                      const form = input?.closest("form");
                      if (input && form) {
                        input.value = chip.message;
                        input.focus();
                        form.requestSubmit();
                      }
                    }}
                  >
                    {chip.label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-6">
            {shouldLoadDemo ? <EmbeddedChatDemo /> : <ChatDemoSkeleton />}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-overlay p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">{outcomesLabel}</p>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                {outcomes.map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-400/10 text-[10px] font-bold text-accent-400">
                      {item.stat}
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="https://calendly.com/achraflachgar/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg bg-accent-400 px-6 text-sm font-semibold text-bg-default shadow-lg shadow-accent-400/20 transition-all hover:bg-accent-300 hover:shadow-xl hover:shadow-accent-400/30"
            >
              {ctaText} <span className="ml-1">→</span>
            </a>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}