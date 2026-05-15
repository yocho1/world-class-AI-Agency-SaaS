import type { PostHog } from "posthog-js";
import type {
  CaseStudyClickedEvent,
  GenericPageEvent,
  HeroCTAEvent,
  ScrollDepthEvent,
  ServiceCardClickedEvent,
  TestimonialViewedEvent,
} from "@/types/analytics";

type PosthogLike = Pick<PostHog, "capture">;

type AnalyticsPayload = Record<string, unknown>;

async function mirrorAnalyticsEvent(eventName: string, payload: AnalyticsPayload) {
  if (!globalThis.window) {
    return;
  }

  try {
    await fetch("/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event_name: eventName,
        page: typeof payload.page === "string" ? payload.page : null,
        tenant_id: typeof payload.tenant_id === "string" ? payload.tenant_id : null,
        session_id: typeof payload.session_id === "string" ? payload.session_id : null,
        event_properties: payload,
      }),
    });
  } catch {
    // Analytics capture should never block the UI.
  }
}

export function trackPageViewed(posthog: PosthogLike, payload: GenericPageEvent) {
  posthog.capture("page_viewed", payload);
  void mirrorAnalyticsEvent("page_viewed", payload as unknown as AnalyticsPayload);
}

export function trackHeroCTAClick(posthog: PosthogLike, payload: HeroCTAEvent) {
  posthog.capture("hero_cta_clicked", payload);
  void mirrorAnalyticsEvent("hero_cta_clicked", payload as unknown as AnalyticsPayload);
}

export function trackServiceCardClick(posthog: PosthogLike, payload: ServiceCardClickedEvent) {
  posthog.capture("service_card_clicked", payload);
  void mirrorAnalyticsEvent("service_card_clicked", payload as unknown as AnalyticsPayload);
}

export function trackCaseStudyClick(posthog: PosthogLike, payload: CaseStudyClickedEvent) {
  posthog.capture("case_study_clicked", payload);
  void mirrorAnalyticsEvent("case_study_clicked", payload as unknown as AnalyticsPayload);
}

export function trackTestimonialViewed(posthog: PosthogLike, payload: TestimonialViewedEvent) {
  posthog.capture("testimonial_viewed", payload);
  void mirrorAnalyticsEvent("testimonial_viewed", payload as unknown as AnalyticsPayload);
}

export function trackPricingTabSwitched(
  posthog: PosthogLike,
  payload: { from: "monthly" | "annual"; to: "monthly" | "annual" }
) {
  posthog.capture("pricing_tab_switched", payload);
  void mirrorAnalyticsEvent("pricing_tab_switched", payload as unknown as AnalyticsPayload);
}

export function trackPricingTierSelected(
  posthog: PosthogLike,
  payload: { tier: string; billing: string }
) {
  posthog.capture("pricing_tier_selected", payload);
  void mirrorAnalyticsEvent("pricing_tier_selected", payload as unknown as AnalyticsPayload);
}

export function trackPricingFaqExpanded(posthog: PosthogLike, payload: { question_id: string }) {
  posthog.capture("pricing_faq_expanded", payload);
  void mirrorAnalyticsEvent("pricing_faq_expanded", payload as unknown as AnalyticsPayload);
}

export function trackFooterCTAClicked(posthog: PosthogLike, payload: { source: string }) {
  posthog.capture("footer_cta_clicked", payload);
  void mirrorAnalyticsEvent("footer_cta_clicked", payload as unknown as AnalyticsPayload);
}

export function trackScrollDepth(posthog: PosthogLike, payload: ScrollDepthEvent) {
  posthog.capture("scroll_depth_reached", payload);
  void mirrorAnalyticsEvent("scroll_depth_reached", payload as unknown as AnalyticsPayload);
}