import type { Metadata } from "next";
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

const siteUrl = "https://www.alsolutionsai.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Chatbot & Automation Agency for SMBs | AL Solutions AI",
  description:
    "AL Solutions AI builds and deploys custom AI chatbots, automation systems, and lead conversion tools for growth-stage companies across MENA and Europe. Production-ready in 30 days.",
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
    title: "AI Chatbots & Automation That Ship in 30 Days | AL Solutions AI",
    description:
      "Build and deploy a real AI product — not a prototype. Custom chatbots, automation systems, and lead conversion tools for growth teams in MENA and Europe.",
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
    title: "AI Chatbots & Automation That Ship in 30 Days | AL Solutions AI",
    description:
      "Custom AI chatbots, automation systems, and lead conversion tools. Production-ready in 30 days.",
    images: [`${siteUrl}/og/homepage.png`],
  },
  alternates: {
    canonical: siteUrl,
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

const STRUCTURED_DATA = [FAQ_SCHEMA, ...SERVICE_SCHEMA];

export default function MarketingHomePage() {
  return (
    <main className="space-y-16 pb-16 md:space-y-24 md:pb-24">
      {STRUCTURED_DATA.map((schema, index) => (
        <script
          key={`schema-${index}`}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          type="application/ld+json"
        />
      ))}
      <Hero />
      <SocialProofBar />
      <ProblemStatement />
      <ServicesOverview />
      <ROICalculator />
      <LiveAIDemo />
      <CaseStudySpotlight />
      <HowItWorks />
      <Testimonials />
      <WhyCompare />
      <FaqSection />
      <FinalCTA />
    </main>
  );
}