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
      title: "Your leads go cold in 4 hours. We fix that in 60 seconds.",
      description:
        "We built a WhatsApp AI agent for a UAE real estate agency that cut response time by 78% and grew lead-to-viewing conversion by 41%. It qualifies buyers, matches properties, and syncs to HubSpot — in Arabic and English.",
      ctaPrimaryText: "Book free AI audit",
    },
  },
  {
    id: "variant_b",
    payload: {
      title: "Your competitors answer leads in 4 hours. We do it in 60 seconds.",
      description:
        "AL Solutions AI builds multilingual AI agents that qualify leads, automate CRM updates, and handle customer support — in Arabic, French, and English. Live in 21–30 days, no retainer lock-in.",
      ctaPrimaryText: "Book free AI audit",
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
