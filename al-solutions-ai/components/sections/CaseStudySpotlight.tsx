"use client";

import Link from "next/link";
import { usePostHog } from "@/hooks/usePostHog";
import { trackCaseStudyClick } from "@/lib/analytics/events";
import { Reveal } from "@/components/ui";

interface CaseStudySpotlightProps {
  readonly caseStudyId?: string;
  readonly title?: string;
  readonly description?: string;
  readonly metrics?: {
    leadCapture: string;
    firstResponseSpeed: string;
    goLiveTime: string;
  };
  readonly ctaText?: string;
}

export function CaseStudySpotlight({
  caseStudyId = "real-estate-uae-001",
  title = "UAE Real Estate: −78% response time, +41% conversion in 26 days",
  description = "A WhatsApp AI agent now handles 200+ daily enquiries, qualifies buyers in Arabic and English, matches properties via API, and routes hot leads to agents — all synced to HubSpot.",
  metrics = {
    leadCapture: "+41%",
    firstResponseSpeed: "−78%",
    goLiveTime: "26 days",
  },
  ctaText = "Read case study →",
}: CaseStudySpotlightProps) {
  const posthog = usePostHog();

  return (
    <section className="section-padding container">
      <Reveal>
        <div className="rounded-2xl border border-border-subtle bg-bg-surface p-8 glow-accent transition-all duration-300 hover:border-accent-400/20">
          <h2 className="text-2xl font-medium text-text-primary md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-text-secondary">{description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border-subtle bg-bg-elevated/50 px-4 py-3 transition-all duration-300 hover:border-accent-400/20 hover:-translate-y-0.5">
              <p className="text-xs text-text-tertiary">Lead-to-viewing conversion</p>
              <p className="text-metric mt-1 text-xl font-semibold text-[#00D97E]" data-attribution="UAE Real Estate Agency, Month 1" title="UAE Real Estate Agency, Month 1">{metrics.leadCapture}</p>
              <p className="mt-1 text-xs text-text-tertiary">UAE Real Estate Agency, Month 1</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-bg-elevated/50 px-4 py-3 transition-all duration-300 hover:border-accent-400/20 hover:-translate-y-0.5">
              <p className="text-xs text-text-tertiary">Response time reduction</p>
              <p className="text-metric mt-1 text-xl font-semibold text-[#00D97E]" data-attribution="UAE Real Estate Agency, Month 1" title="UAE Real Estate Agency, Month 1">{metrics.firstResponseSpeed}</p>
              <p className="mt-1 text-xs text-text-tertiary">UAE Real Estate Agency, Month 1</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-bg-elevated/50 px-4 py-3 transition-all duration-300 hover:border-accent-400/20 hover:-translate-y-0.5">
              <p className="text-xs text-text-tertiary">Go-live time</p>
              <p className="text-metric mt-1 text-xl font-semibold text-[#00D97E]" data-attribution="UAE Real Estate Agency, 26 days" title="UAE Real Estate Agency, 26 days">{metrics.goLiveTime}</p>
              <p className="mt-1 text-xs text-text-tertiary">UAE Real Estate Agency, 26 days</p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex text-sm font-medium text-accent-400 hover:text-accent-300"
              href="/case-studies/real-estate-uae"
              aria-label="Read UAE real estate case study"
              onClick={() => posthog && trackCaseStudyClick(posthog, { case_study_id: caseStudyId, position: 1 })}
            >
              {ctaText}
            </Link>
            <a
              href="https://calendly.com/achraflachgar/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              Similar to your business? Book free AI audit →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}