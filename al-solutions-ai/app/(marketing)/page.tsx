import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  CaseStudySpotlight,
  FaqSection,
  FinalCTA,
  HowItWorks,
  LiveAIDemo,
  ProblemStatement,
  ROICalculator,
  ServicesOverview,
  SocialProofBar,
  TeamSection,
  TechStackBar,
  Testimonials,
  WhyCompare,
} from "@/components/sections";
import { HomepageHero } from "@/components/sections/HomepageHero";
import LeadCaptureModal from "@/components/forms/LeadCaptureModal";
import arMessages from "@/messages/ar.json";
import Script from "next/script";

const siteUrl = "https://www.alsolutionsai.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Chatbot & Automation Agency | UK & MENA | AL Solutions AI",
  description:
    "We build AI agents that qualify leads, automate CRM, and support customers in Arabic, French, and English. UK-registered. Live in 30 days. Book a free audit.",
  keywords: [
    "AI chatbot agency UK",
    "WhatsApp AI chatbot for real estate",
    "Arabic AI chatbot UK",
    "AI lead qualification agent UK",
    "CRM automation agency UK",
    "AI chatbot for trading platform",
    "AI agency MENA",
    "AI automation agency",
    "multilingual AI chatbot",
    "HubSpot AI integration",
    "WhatsApp Business API AI",
    "AI customer support agent",
  ],
  openGraph: {
    title: "AI Chatbot & Automation Agency | UK & MENA | AL Solutions AI",
    description:
      "We build AI agents that qualify leads, automate CRM, and support customers in Arabic, French, and English. UK-registered. Live in 30 days. Book a free audit.",
    url: `${siteUrl}/en`,
    siteName: "AL Solutions AI",
    images: [
      {
        url: `${siteUrl}/og/homepage.png`,
        width: 1200,
        height: 630,
        alt: "AL Solutions AI — AI chatbots and automation that ship in 30 days",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot & Automation Agency | UK & MENA | AL Solutions AI",
    description:
      "We build AI agents that qualify leads, automate CRM, and support customers in Arabic, French, and English. UK-registered. Live in 30 days. Book a free audit.",
    images: [`${siteUrl}/og/homepage.png`],
  },
  alternates: {
    canonical: `${siteUrl}/en`,
    languages: {
      en: `${siteUrl}/en`,
      ar: `${siteUrl}/ar`,
      fr: `${siteUrl}/fr`,
      "x-default": `${siteUrl}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const SERVICE_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Chatbots",
    serviceType: "AI Chatbot Development",
    provider: { "@type": "Organization", name: "AL Solutions AI", url: siteUrl },
    areaServed: ["MENA", "Europe"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automation",
    serviceType: "Business Process Automation",
    provider: { "@type": "Organization", name: "AL Solutions AI", url: siteUrl },
    areaServed: ["MENA", "Europe"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Lead Conversion",
    serviceType: "Lead Conversion Systems",
    provider: { "@type": "Organization", name: "AL Solutions AI", url: siteUrl },
    areaServed: ["MENA", "Europe"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web + AI Solutions",
    serviceType: "AI Product Development",
    provider: { "@type": "Organization", name: "AL Solutions AI", url: siteUrl },
    areaServed: ["MENA", "Europe"],
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to build and launch an AI chatbot with AL Solutions AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects go live within 21–30 days from the signed agreement. The timeline depends on the complexity of integrations required (e.g. CRM sync, WhatsApp Business API approval, custom knowledge base). We provide a written go-live timeline after the free audit call.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build AI chatbots that work in Arabic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Arabic is a core language for our AI systems, not an add-on. Our chatbots handle Modern Standard Arabic and major Gulf dialects, switch seamlessly between Arabic and English mid-conversation, and render correctly in right-to-left layouts. This is one of the areas where we have deeper experience than most UK AI agencies.",
      },
    },
    {
      "@type": "Question",
      name: "Which CRM systems do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We integrate with HubSpot, Salesforce, Pipedrive, and custom CRM systems via API. Our AI agents can log conversations, update contact records, extract deal context from calls, and trigger automated workflows — all reviewed and approved by your team before any data is written.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the free AI audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free audit is a 30-minute call with a senior member of our team (not a sales rep). You will receive a written scope report within 48 hours that identifies the highest-ROI automation opportunities for your specific business, a recommended tech stack, a realistic timeline, and an honest assessment of whether AI is the right investment at this stage.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer ongoing support after the system goes live?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every project includes a 30-day post-launch support window. After that, we offer optional monthly maintenance and optimisation packages, or hand over full documentation so your team can manage the system independently. We do not lock clients into retainers — this is a deliberate choice.",
      },
    },
  ],
};

const STRUCTURED_DATA = SERVICE_SCHEMA.map((schema) => ({ key: schema.name, schema }));

export default function MarketingHomePage() {
  const requestHeaders = headers();
  const locale = requestHeaders.get("x-locale") ?? "en";
  const home = locale === "ar" ? arMessages.homepage : null;

  return (
    <main className="space-y-16 pb-16 md:space-y-24 md:pb-24">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        strategy="afterInteractive"
      />
      {STRUCTURED_DATA.map(({ key, schema }) => (
        <Script
          key={key}
          id={`service-schema-${key}`}
          strategy="afterInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomepageHero
        title={home?.hero.headline}
        description={home?.hero.subheadline}
        ctaPrimaryText={home?.hero.ctaPrimary}
        stats={home ? [
          { value: home.stats.contractToLive.value, label: home.stats.contractToLive.label, attribution: "" },
          { value: home.stats.conversionLift.value, label: home.stats.conversionLift.label, attribution: "" },
          { value: home.stats.companiesLive.value, label: home.stats.companiesLive.label, attribution: "" },
        ] : undefined}
      />
      <div className="gradient-divider" />
      <SocialProofBar />
      <div className="gradient-divider" />
      <TeamSection />
      <div className="gradient-divider" />
      <ProblemStatement title={home?.sections.problemStatement} />
      <ServicesOverview title={home?.sections.servicesOverview} />
      <ROICalculator />
      <LiveAIDemo title={home?.sections.liveDemo} />
      <CaseStudySpotlight title={home?.sections.caseStudySpotlight} />
      <div className="gradient-divider" />
      <HowItWorks title={home?.sections.howItWorks} />
      <Testimonials title={home?.sections.testimonials} />
      <TechStackBar />
      <WhyCompare title={home?.sections.comparison} />
      <FaqSection title={home?.sections.faq} />
      <div className="gradient-divider" />
      <FinalCTA title={home?.sections.finalCta} />
      <LeadCaptureModal />
    </main>
  );
}