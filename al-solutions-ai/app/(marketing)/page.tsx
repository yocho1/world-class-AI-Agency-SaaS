import type { Metadata } from "next";
import { CaseStudySpotlight, FinalCTA, Hero, HowItWorks, LiveAIDemo, ProblemStatement, ServicesOverview, SocialProofBar, Testimonials } from "@/components/sections";

export const metadata: Metadata = {
  title: "AL Solutions AI | AI Products Built in 30 Days",
  description:
    "AL Solutions AI builds customer-facing chatbots and AI automation systems for growth teams across MENA and Europe.",
  openGraph: {
    title: "AL Solutions AI | AI Products Built in 30 Days",
    description: "From strategy to launch-ready AI in 30 days. Chatbots, automation, and growth systems.",
    type: "website",
  },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AL Solutions AI",
  description: "AI product agency building chatbots and automation systems in 30 days.",
  url: "https://www.alsolutions.ai",
  areaServed: ["MENA", "Europe"],
};

export default function MarketingHomePage() {
  return (
    <main className="space-y-16 pb-16 md:space-y-24 md:pb-24">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} type="application/ld+json" />
      <Hero />
      <SocialProofBar />
      <ProblemStatement />
      <ServicesOverview />
      <LiveAIDemo />
      <CaseStudySpotlight />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}