import { CaseStudySpotlight, FinalCTA, Hero, HowItWorks, LiveAIDemo, ProblemStatement, ServicesOverview, SocialProofBar, Testimonials } from "@/components/sections";

export default function MarketingHomePage() {
  return (
    <main className="space-y-16 pb-16 md:space-y-24 md:pb-24">
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