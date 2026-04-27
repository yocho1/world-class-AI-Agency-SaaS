import type { HeroCTAEvent } from "@/types/analytics";

export function trackHeroCTAClick(posthog: { capture: (event: string, properties: HeroCTAEvent) => void }, payload: HeroCTAEvent) {
  posthog.capture("hero_cta_clicked", payload);
}