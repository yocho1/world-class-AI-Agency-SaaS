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
  caseStudyId = "hospitality-concierge-001",
  title = "Real Results: From Idea to Live AI in 28 Days",
  description = "We deployed an AI concierge across web chat and WhatsApp, synced to CRM follow-up, and tuned multilingual routing for MENA guest support.",
  metrics = {
    leadCapture: "+44%",
    firstResponseSpeed: "-62%",
    goLiveTime: "28 days",
  },
  ctaText = "Read Nexora Hotels case study →",
}: CaseStudySpotlightProps) {
  const posthog = usePostHog();

  return (
    <section className="section-padding container">
      <Reveal>
        <div className="rounded-2xl border border-border-subtle bg-bg-surface p-8">
          <h2 className="text-2xl font-medium text-text-primary md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-text-secondary">{description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border-subtle px-4 py-3">
              <p className="text-xs text-text-tertiary">Lead capture</p>
              <p className="text-metric mt-1 text-xl font-semibold text-[#00D97E]" data-attribution="Nexora Hotels Group, 60 days post-launch" title="Nexora Hotels Group, 60 days post-launch">{metrics.leadCapture}</p>
              <p className="mt-1 text-xs text-text-tertiary">Nexora Hotels Group, 60 days post-launch</p>
            </div>
            <div className="rounded-xl border border-border-subtle px-4 py-3">
              <p className="text-xs text-text-tertiary">First response speed</p>
              <p className="text-metric mt-1 text-xl font-semibold text-[#00D97E]" data-attribution="Nexora Hotels Group, 60 days post-launch" title="Nexora Hotels Group, 60 days post-launch">{metrics.firstResponseSpeed}</p>
              <p className="mt-1 text-xs text-text-tertiary">Nexora Hotels Group, 60 days post-launch</p>
            </div>
            <div className="rounded-xl border border-border-subtle px-4 py-3">
              <p className="text-xs text-text-tertiary">Go-live time</p>
              <p className="text-metric mt-1 text-xl font-semibold text-[#00D97E]" data-attribution="Nexora Hotels Group, 60 days post-launch" title="Nexora Hotels Group, 60 days post-launch">{metrics.goLiveTime}</p>
              <p className="mt-1 text-xs text-text-tertiary">Nexora Hotels Group, 60 days post-launch</p>
            </div>
          </div>

          <Link
            className="mt-7 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300"
            href="/case-studies/nexora-hotels"
            aria-label="Read Nexora Hotels Group full AI case study"
            onClick={() => posthog && trackCaseStudyClick(posthog, { case_study_id: caseStudyId, position: 1 })}
          >
            {ctaText}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}