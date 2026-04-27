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
}