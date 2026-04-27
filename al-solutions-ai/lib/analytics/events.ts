import type { PostHog } from "posthog-js";
import type {
  CaseStudyClickedEvent,
  GenericPageEvent,
  HeroCTAEvent,
  ServiceCardClickedEvent,
  TestimonialViewedEvent,
} from "@/types/analytics";

type PosthogLike = Pick<PostHog, "capture">;

export function trackPageViewed(posthog: PosthogLike, payload: GenericPageEvent) {
  posthog.capture("page_viewed", payload);
}

export function trackHeroCTAClick(posthog: PosthogLike, payload: HeroCTAEvent) {
  posthog.capture("hero_cta_clicked", payload);
}

export function trackServiceCardClick(posthog: PosthogLike, payload: ServiceCardClickedEvent) {
  posthog.capture("service_card_clicked", payload);
}

export function trackCaseStudyClick(posthog: PosthogLike, payload: CaseStudyClickedEvent) {
  posthog.capture("case_study_clicked", payload);
}

export function trackTestimonialViewed(posthog: PosthogLike, payload: TestimonialViewedEvent) {
  posthog.capture("testimonial_viewed", payload);
}