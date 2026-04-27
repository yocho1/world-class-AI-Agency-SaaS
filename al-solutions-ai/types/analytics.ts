export type CTAType = "primary" | "secondary";

export interface HeroCTAEvent {
  cta_variant: CTAType;
  scroll_depth: number;
}