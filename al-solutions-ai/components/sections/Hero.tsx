"use client";

import Link from "next/link";
import { trackHeroCTAClick } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics";
import { usePostHog } from "@/hooks/usePostHog";
import { Reveal } from "@/components/ui";

interface HeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  stats?: typeof STATS;
}

const STATS = [
  {
    label: "From contract to live AI",
    value: "30 days",
    attribution: "Average across all 2024 deployments",
  },
  {
    label: "Average lead conversion lift",
    value: "+2.3x",
    attribution: "Average across 12 client deployments, 2024",
  },
  {
    label: "Production deployments",
    value: "12",
    attribution: "Live client systems shipped in 2024",
  },
];

export function Hero({
  eyebrow = "Production AI shipped in 30 days",
  title = "Your competitors just went live with AI. Here's how to do it in 30 days.",
  description = "AL Solutions AI builds and deploys AI chatbots and automation systems that are live, working, and generating leads — not sitting in a deck.",
  ctaPrimaryText = "Get Free AI Audit",
  ctaSecondaryText = "See the AI Working",
  stats = STATS,
}: Readonly<HeroProps>) {
  const posthog = usePostHog();

  const trackClick = (variant: "primary" | "secondary") => {
    if (!posthog) {
      return;
    }

    trackHeroCTAClick(posthog, {
      cta_variant: variant,
      scroll_depth: Math.round(window.scrollY),
    });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden section-padding"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(91, 33, 246, 0.15) 0%, transparent 60%), #080812",
      }}
    >
      <div className="container">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent-400">
            {eyebrow}
          </p>
          <h1 className="hero-headline mt-5 max-w-5xl text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-prose text-base text-[#94A3B8] md:text-lg">
            {description}
          </p>
          <div className="mt-9 flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/free-ai-audit"
                aria-label="Get your free AI audit — no commitment required"
                onClick={() => {
                  trackEvent("audit_cta_click", { button_location: "hero" });
                  trackClick("primary");
                }}
              >
                <span className="inline-flex h-12 items-center rounded-lg bg-accent-400 px-7 text-base font-semibold text-bg-default shadow-lg shadow-accent-400/20 transition-all hover:bg-accent-300 hover:shadow-xl hover:shadow-accent-400/30">
                  {ctaPrimaryText}
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link href="#live-demo" aria-label="See the AI working — view live demo" onClick={() => trackClick("secondary")}>
                <span className="inline-flex h-12 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated">
                  {ctaSecondaryText}
                </span>
              </Link>
            </div>
            <p className="text-xs text-[#94A3B8]">
              30-min call · Written scope report · No commitment
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div className="rounded-2xl border border-dark-border bg-dark-card p-5" key={stat.label}>
                <p className="text-metric text-2xl font-medium text-[#00D97E]" data-attribution={stat.attribution} title={stat.attribution}>
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#64748B]">{stat.label}</p>
                <p className="mt-0.5 text-xs text-[#64748B]">{stat.attribution}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}