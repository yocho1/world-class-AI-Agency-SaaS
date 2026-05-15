export type CTAType = "primary" | "secondary";

export type BillingType = "monthly" | "annual";

export interface HeroCTAEvent {
  cta_variant: CTAType;
  scroll_depth: number;
}

export interface ServiceCardClickedEvent {
  service: string;
  position: number;
}

export interface TestimonialViewedEvent {
  testimonial_id: string;
  auto_or_manual: "auto" | "manual";
}

export interface CaseStudyClickedEvent {
  case_study_id: string;
  position: number;
}

export interface GenericPageEvent {
  page: string;
  referrer: string;
  session_id?: string;
}

export interface ScrollDepthEvent {
  page: string;
  depth: number; // 0–100
  milestone: 25 | 50 | 75 | 100;
}