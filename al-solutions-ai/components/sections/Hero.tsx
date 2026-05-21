"use client";

import Link from "next/link";
import { trackHeroCTAClick, trackExperimentConverted } from "@/lib/analytics/events";
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
  experimentVariant?: string;
}

const STATS = [
  {
    label: "From contract to live AI",
    value: "21–30 days",
    attribution: "Written timeline, no scope creep",
  },
  {
    label: "Average lead response time",
    value: "60 sec",
    attribution: "Down from 4–6 hours, UAE real estate case study",
  },
  {
    label: "Lead-to-viewing conversion lift",
    value: "+41%",
    attribution: "Month 1 result, UAE real estate agency",
  },
];

const TRUST_SIGNALS = [
  "UK-registered company · Co. No. 11521309",
  "Live in 21–30 days · No retainer lock-in",
  "Arabic, French & English · Built for UK & MENA markets",
];

export function Hero({
  eyebrow = "AI Chatbots & Automation for UK & MENA",
  title = "Your leads go cold in 4 hours. We fix that in 60 seconds.",
  description = "We built a WhatsApp AI agent for a UAE real estate agency that cut response time by 78% and grew lead-to-viewing conversion by 41%. It qualifies buyers, matches properties, and syncs to HubSpot — in Arabic and English.",
  ctaPrimaryText = "Book free AI audit",
  ctaSecondaryText = "See it working \u2192",
  stats = STATS,
  experimentVariant,
}: Readonly<HeroProps>) {
  const posthog = usePostHog();

  const trackClick = (ctaVariant: "primary" | "secondary") => {
    if (!posthog) {
      return;
    }

    trackHeroCTAClick(posthog, {
      cta_variant: ctaVariant,
      scroll_depth: Math.round(window.scrollY),
    });

    if (experimentVariant) {
      trackExperimentConverted(posthog, {
        experiment_id: "homepage_hero_v1",
        variant: experimentVariant,
        conversion_type: "hero_cta",
      });
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden section-padding"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(91, 33, 246, 0.15) 0%, transparent 60%), #080812",
      }}
    >
      {/* Subtle ambient orbs for visual depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(0,229,196,0.4) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full blur-[140px] opacity-15"
        style={{ background: "radial-gradient(circle, rgba(91,33,246,0.5) 0%, transparent 70%)" }}
      />
      <div className="container relative z-10">
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
              <a
                href="https://calendly.com/achraflachgar/15min"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book your free AI audit — 30 minutes, no commitment"
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
              </a>
              <Link href="#live-demo" aria-label="See the AI working — view live demo" onClick={() => trackClick("secondary")}>
                <span className="inline-flex h-12 items-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated">
                  {ctaSecondaryText}
                </span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#94A3B8]">
              {TRUST_SIGNALS.map((signal) => (
                <span key={signal} className="flex items-center gap-1">
                  <svg className="h-3 w-3 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {signal}
                </span>
              ))}
            </div>
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