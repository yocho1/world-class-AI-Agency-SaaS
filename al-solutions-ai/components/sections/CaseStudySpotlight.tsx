"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { usePostHog } from "@/hooks/usePostHog";
import { trackCaseStudyClick } from "@/lib/analytics/events";

interface CaseStudySpotlightProps {
  caseStudyId?: string;
}

export function CaseStudySpotlight({ caseStudyId = "hospitality-concierge-001" }: CaseStudySpotlightProps) {
  const reduceMotion = useReducedMotion();
  const posthog = usePostHog();

  return (
    <section className="container py-10">
      <motion.div
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="rounded-2xl border border-border-subtle bg-bg-surface p-8"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      >
        <p className="text-sm text-accent-400">Case Study Spotlight</p>
        <h2 className="mt-2 max-w-3xl text-2xl font-medium text-text-primary md:text-3xl">Hospitality group cut response time by 62% in four weeks.</h2>
        <p className="mt-3 max-w-2xl text-text-secondary">We deployed an AI concierge across web chat and WhatsApp, synced to CRM follow-up, and tuned multilingual routing for MENA guest support.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border-subtle px-4 py-3">
            <p className="text-xs text-text-tertiary">Lead capture</p>
            <p className="mt-1 text-xl font-medium text-text-primary">+44%</p>
          </div>
          <div className="rounded-xl border border-border-subtle px-4 py-3">
            <p className="text-xs text-text-tertiary">First response speed</p>
            <p className="mt-1 text-xl font-medium text-text-primary">-62%</p>
          </div>
          <div className="rounded-xl border border-border-subtle px-4 py-3">
            <p className="text-xs text-text-tertiary">Go-live time</p>
            <p className="mt-1 text-xl font-medium text-text-primary">28 days</p>
          </div>
        </div>

        <Link
          className="mt-7 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300"
          href="/case-studies"
          onClick={() => posthog && trackCaseStudyClick(posthog, { case_study_id: caseStudyId, position: 1 })}
        >
          Read full case study
        </Link>
      </motion.div>
    </section>
  );
}