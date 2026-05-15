"use client";

import { Hero } from "./Hero";
import { useExperiment } from "@/hooks/useExperiment";

import type { ExperimentVariant } from "@/hooks/useExperiment";

interface HeroPayload {
  title: string;
  description: string;
  ctaPrimaryText: string;
}

const HERO_VARIANTS: readonly ExperimentVariant<HeroPayload>[] = [
  {
    id: "control",
    payload: {
      title: "Your competitors just went live with AI. Here's how to do it in 30 days.",
      description:
        "AL Solutions AI builds and deploys AI chatbots and automation systems that are live, working, and generating leads — not sitting in a deck.",
      ctaPrimaryText: "Get Free AI Audit",
    },
  },
  {
    id: "variant_b",
    payload: {
      title: "Stop losing leads to slow response times. Deploy AI in 30 days.",
      description:
        "We build production-grade AI chatbots that qualify leads, answer questions in Arabic, English & French, and route hot prospects to your sales team — live in 30 days, not 6 months.",
      ctaPrimaryText: "Book Free AI Audit",
    },
  },
];

interface HomepageHeroProps {
  title?: string;
  description?: string;
  ctaPrimaryText?: string;
  stats?: Parameters<typeof Hero>[0]["stats"];
}

export function HomepageHero({
  title,
  description,
  ctaPrimaryText,
  stats,
}: HomepageHeroProps) {
  const experimentPayload = useExperiment("homepage_hero_v1", HERO_VARIANTS);

  // Use CMS/localized props if provided, otherwise fall back to experiment variant
  const resolvedTitle = title ?? experimentPayload?.title ?? HERO_VARIANTS[0].payload.title;
  const resolvedDescription =
    description ?? experimentPayload?.description ?? HERO_VARIANTS[0].payload.description;
  const resolvedCtaPrimaryText =
    ctaPrimaryText ?? experimentPayload?.ctaPrimaryText ?? HERO_VARIANTS[0].payload.ctaPrimaryText;

  return (
    <Hero
      title={resolvedTitle}
      description={resolvedDescription}
      ctaPrimaryText={resolvedCtaPrimaryText}
      stats={stats}
      experimentVariant={experimentPayload ? HERO_VARIANTS.find(v => v.payload.title === experimentPayload.title)?.id ?? "control" : undefined}
    />
  );
}
