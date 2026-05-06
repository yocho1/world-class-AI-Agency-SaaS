import type { Metadata } from "next";
import { CaseStudyLayout, type CaseStudyData } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Nexora Hotels Case Study | AL Solutions AI",
  description: "How Nexora Hotels Group launched a multilingual AI concierge across web and WhatsApp in 28 days.",
};

const NEXORA_CASE_STUDY: CaseStudyData = {
  slug: "nexora-hotels",
  industry: "Hospitality",
  headline: "Nexora Hotels Group launched a multilingual AI concierge in 28 days",
  description:
    "A single AI system now handles first-response support on website and WhatsApp, qualifies and routes leads to the sales team, and keeps operations in control across 12 properties.",
  metrics: [
    {
      label: "Lead capture increase",
      value: "+44%",
      note: "Measured 60 days post-launch vs. baseline",
    },
    {
      label: "First response speed",
      value: "-62%",
      note: "AI-first support vs. manual queue",
    },
    {
      label: "Time to production",
      value: "28 days",
      note: "Contract to live system",
    },
  ],
  challenge: {
    statement:
      "Nexora Hotels Group was losing 30% of web inquiries because response times exceeded 4 hours. The hospitality team had no real-time visibility into leads, and manual support was expensive and inconsistent across their 12 properties.",
    painPoints: [
      "Inquiries going stale before manual follow-up",
      "No lead qualification or routing to sales team",
      "WhatsApp requests mixed in with email — no system",
      "Guests expecting instant Arabic, English, and French support",
      "Operations team had no performance data",
    ],
  },
  solution: {
    intro: "We built a unified AI concierge that handles first-contact support, qualifies leads in real-time, and routes to the right team member based on property and inquiry type.",
    features: [
      {
        title: "Multilingual concierge",
        description: "Fluent Arabic, English, and French support for web, email, and WhatsApp channels.",
        icon: "🌍",
      },
      {
        title: "Lead qualification & routing",
        description: "AI scores intent and routes hot leads to sales team within 30 seconds.",
        icon: "🎯",
      },
      {
        title: "CRM + property sync",
        description: "Every interaction syncs to Salesforce; operations see real-time dashboard.",
        icon: "📊",
      },
    ],
  },
  results: [
    {
      stat: "+44%",
      label: "Lead capture rate",
      note: "Inquiries now answered in <90 seconds",
    },
    {
      stat: "-62%",
      label: "Response time",
      note: "AI first-response vs. manual queue",
    },
    {
      stat: "28",
      label: "Days to production",
      note: "Full system live and trained",
    },
    {
      stat: "3x",
      label: "Support volume",
      note: "Same team, 3x more inquiries handled",
    },
  ],
  testimonial: {
    quote:
      "We were losing guests before we could even respond to them. Now every inquiry gets an instant AI reply, qualified leads hit our sales team immediately, and we finally have real data on what guests are asking for. The 28-day timeline meant we had revenue impact in Q2.",
    author: "Marcus Chen",
    title: "Director of Revenue",
    company: "Nexora Hotels Group",
    avatarSrc: "/images/case-study-nexora-avatar.svg",
  },
  companyName: "Nexora Hotels Group",
};

export default function NexoraHotelsCaseStudyPage() {
  return <CaseStudyLayout data={NEXORA_CASE_STUDY} />;
}