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
    label: "Companies live in production",
    value: "120+",
    attribution: "Current production deployments across client accounts",
  },
];

export function Hero({
  eyebrow = "Production AI shipped in 30 days",
  title = "Your competitors just went live with AI. Here's how to do it in 30 days.",
  description = "AL Solutions AI builds and deploys AI chatbots and automation systems that are live, working, and generating leads — not sitting in a deck.",
  ctaPrimaryText = "See the AI Working",
  ctaSecondaryText = "Get Free AI Audit",
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
    <section className="container relative overflow-hidden pb-14 pt-16 md:pt-24">
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 top-44 h-48 w-48 rounded-full bg-primary-600/10 blur-3xl" />
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent-400">
          {eyebrow}
        </p>
        <h1 className="hero-headline mt-5 max-w-5xl text-4xl font-medium leading-tight tracking-tight text-text-primary md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
          {description}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="#live-demo" aria-label="See the AI working — view live demo" onClick={() => trackClick("primary")}>
            <span className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700">
              {ctaPrimaryText}
            </span>
          </Link>
          <Link
            href="/free-ai-audit"
            aria-label="Get your free AI audit — no commitment required"
            onClick={() => {
              trackEvent("audit_cta_click", { button_location: "hero" });
              trackClick("secondary");
            }}
          >
            <span className="inline-flex h-11 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated">
              {ctaSecondaryText}
            </span>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div className="rounded-2xl border border-border-subtle bg-bg-surface p-5" key={stat.label}>
              <p className="text-2xl font-medium text-text-primary" data-attribution={stat.attribution} title={stat.attribution}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
              <p className="mt-0.5 text-xs text-text-tertiary">{stat.attribution}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}