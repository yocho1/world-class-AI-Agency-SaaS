import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  CaseStudySpotlight,
  FaqSection,
  FinalCTA,
  Hero,
  HowItWorks,
  LiveAIDemo,
  ProblemStatement,
  ROICalculator,
  ServicesOverview,
  SocialProofBar,
  Testimonials,
  WhyCompare,
} from "@/components/sections";
import LeadCaptureModal from "@/components/forms/LeadCaptureModal";
import arMessages from "@/messages/ar.json";
import Script from "next/script";

const siteUrl = "https://www.alsolutionsai.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Chatbot Agency for MENA & Europe | AL Solutions AI",
  description:
    "AL Solutions AI builds custom AI chatbots, WhatsApp automation, and lead conversion systems. Production-ready in 30 days. Free AI audit included.",
  keywords: [
    "AI chatbot agency",
    "AI automation agency",
    "custom AI chatbot development",
    "AI agency MENA",
    "business automation AI",
    "AI chatbot for SMB",
    "AI lead generation",
    "chatbot development company",
    "AI automation MENA",
    "WhatsApp AI chatbot",
    "Arabic AI chatbot",
    "lead qualification AI",
  ],
  openGraph: {
    title: "AI Chatbot Agency for MENA & Europe | AL Solutions AI",
    description:
      "AL Solutions AI builds custom AI chatbots, WhatsApp automation, and lead conversion systems. Production-ready in 30 days. Free AI audit included.",
    url: siteUrl,
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
    title: "AI Chatbot Agency for MENA & Europe | AL Solutions AI",
    description:
      "AL Solutions AI builds custom AI chatbots, WhatsApp automation, and lead conversion systems. Production-ready in 30 days. Free AI audit included.",
    images: [`${siteUrl}/og/homepage.png`],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: "https://www.alsolutionsai.online/en",
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
      name: "How long does it take to launch an AI chatbot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our standard launch cycle is 30 days from contract signing to production deployment.",
      },
    },
    {
      "@type": "Question",
      name: "What languages does your AI support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our chatbots support Arabic, English, and French natively, with full RTL support for Arabic interfaces.",
      },
    },
    {
      "@type": "Question",
      name: "Do you integrate with existing CRM systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we integrate with HubSpot, Salesforce, Zoho, and custom CRM systems via API. WhatsApp integrations included in all plans.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the free AI audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 30-minute strategy call, analysis of your current operations, and a written report identifying 3 specific automation opportunities with estimated ROI and timeline.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a custom AI chatbot cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Projects start at $2,500 for a single-workflow implementation. Full pricing at alsolutionsai.online/pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide support after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All plans include 60 days of post-launch support. Enterprise plans include monthly performance reviews and an optimization log.",
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
        <script
          key={key}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          type="application/ld+json"
        />
      ))}
      <Hero
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
      <ProblemStatement title={home?.sections.problemStatement} />
      <ServicesOverview title={home?.sections.servicesOverview} />
      <ROICalculator />
      <LiveAIDemo title={home?.sections.liveDemo} />
      <CaseStudySpotlight title={home?.sections.caseStudySpotlight} />
      <div className="gradient-divider" />
      <HowItWorks title={home?.sections.howItWorks} />
      <Testimonials title={home?.sections.testimonials} />
      <WhyCompare title={home?.sections.comparison} />
      <FaqSection title={home?.sections.faq} />
      <div className="gradient-divider" />
      <FinalCTA title={home?.sections.finalCta} />
      <LeadCaptureModal />
    </main>
  );
}