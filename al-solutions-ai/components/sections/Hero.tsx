"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackHeroCTAClick, trackPageViewed } from "@/lib/analytics/events";
import { usePostHog } from "@/hooks/usePostHog";

interface HeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

const STATS = [
  { label: "Average launch cycle", value: "30 days" },
  { label: "Conversion lift achieved", value: "+2.3x" },
  { label: "Teams served", value: "120+" },
];

export function Hero({
  eyebrow = "Production AI shipped in 30 days",
  title = "Launch a real AI product, not another strategy deck.",
  description = "AL Solutions AI designs, builds, and deploys AI chatbots and automation systems for growth-stage teams across MENA and Europe.",
}: HeroProps) {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) {
      return;
    }

    trackPageViewed(posthog, {
      page: "marketing_home",
      referrer: document.referrer || "direct",
    });
  }, [posthog]);

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

      <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent-400">
        {eyebrow}
      </p>
      <h1 className="mt-5 max-w-5xl text-4xl font-medium leading-tight tracking-tight text-text-primary md:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
        {description}
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/free-ai-audit" onClick={() => trackClick("primary")}>
          <span className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700">
            Get Free AI Audit
          </span>
        </Link>
        <Link href="#live-demo" onClick={() => trackClick("secondary")}>
          <span className="inline-flex h-11 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated">
            See Live Demo
          </span>
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div className="rounded-2xl border border-border-subtle bg-bg-surface p-5" key={stat.label}>
            <p className="text-xs uppercase tracking-[0.14em] text-text-tertiary">{stat.label}</p>
            <p className="mt-2 text-2xl font-medium text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}