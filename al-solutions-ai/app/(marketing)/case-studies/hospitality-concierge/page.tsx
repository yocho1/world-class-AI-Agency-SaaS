import type { Metadata } from "next";
import { CaseStudyLayout, type CaseStudyData } from "@/components/CaseStudyLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nexora Hotels: -62% Response Time in 28 Days | AL Solutions AI",
  description:
    "How Nexora Hotels Group replaced 3 failed vendors with a live AI concierge system on web and WhatsApp in just 28 days. +44% lead capture rate.",
  alternates: alternatesFor("/case-studies/hospitality-concierge"),
  openGraph: {
    url: canonicalUrl("/case-studies/hospitality-concierge"),
    title: "Nexora Hotels: -62% Response Time in 28 Days | AL Solutions AI",
    description:
      "How Nexora Hotels Group replaced 3 failed vendors with a live AI concierge system on web and WhatsApp in just 28 days. +44% lead capture rate.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=Nexora Hotels -62% Response Time in 28 Days&subtitle=Live AI concierge on web and WhatsApp. +44% lead capture.&tag=Case Study",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=Nexora Hotels -62% Response Time in 28 Days&subtitle=Live AI concierge on web and WhatsApp. +44% lead capture.&tag=Case Study",
    ],
  },
};

const caseStudyData: CaseStudyData = {
  slug: "hospitality-concierge",
  industry: "Hospitality",
  companyName: "Nexora Hotels Group",
  headline: "How Nexora Hotels went from 3 failed vendors to live AI in 28 days",
  description:
    "Managing guest inquiries across web and WhatsApp manually while losing overnight bookings. A proven vendor had failed. Nexora Hotels needed a partner who could deliver fast—and keep it simple.",
  metrics: [
    {
      label: "Lead Capture Rate",
      value: "+44%",
      note: "Web & WhatsApp combined, 60 days post-launch",
    },
    {
      label: "Response Time",
      value: "-62%",
      note: "Average first response, peak hours",
    },
    {
      label: "Time to Production",
      value: "28 days",
      note: "From kickoff to live system",
    },
  ],
  challenge: {
    statement:
      "Nexora Hotels was losing bookings overnight. Guest inquiries came in through the website and WhatsApp simultaneously, but the team could only respond during business hours. Every message delayed meant a potential revenue loss. A year-long chatbot project with a previous vendor had failed, leaving the team skeptical about AI solutions.",
    painPoints: [
      "Guest inquiries landing in separate channels with no unified view—web and WhatsApp siloed",
      "Manual responses during business hours only; overnight bookings slipped away to competitors",
      "Previous chatbot vendor required 12+ months with zero results; trust in AI solutions eroded",
      "No integration with the existing HubSpot CRM; customer data remained fragmented",
      "Multilingual support (Arabic, English, French) unaddressed; losing regional guests",
    ],
  },
  solution: {
    intro:
      "We deployed a unified AI concierge that sits on both web and WhatsApp, understands guest intent in real time, routes inquiries to the right team member, and syncs everything back into HubSpot. The system is multilingual—responding naturally in Arabic, English, and French—and learns from every guest interaction.",
    features: [
      {
        title: "Unified Concierge",
        description:
          "Single AI system manages both website inquiries and WhatsApp messages. Guests get a seamless experience; your team gets one inbox.",
        icon: "🤖",
      },
      {
        title: "HubSpot Integration",
        description:
          "Every conversation syncs to HubSpot. Guest history, booking intent, and follow-up actions live in the same CRM your team already uses.",
        icon: "🔗",
      },
      {
        title: "Multilingual Routing",
        description:
          "Arabic, English, French—the system understands and responds in the guest&apos;s language, then routes to the right team member or assigns a task.",
        icon: "🌍",
      },
    ],
  },
  results: [
    {
      stat: "+44%",
      label: "Lead Capture Rate",
      note: "Web and WhatsApp inquiries now converted at 44% higher rate",
    },
    {
      stat: "-62%",
      label: "First Response Time",
      note: "Average response to guest inquiry, peak business hours",
    },
    {
      stat: "99.2%",
      label: "System Uptime",
      note: "28 days straight, zero downtime through summer peak",
    },
    {
      stat: "3 languages",
      label: "Supported Natively",
      note: "Arabic, English, French—guests reply in their language",
    },
  ],
  testimonial: {
    quote:
      "Before AL Solutions, we had three vendors, none of them talking to each other. Within 28 days we had a single AI system live on our website and WhatsApp that we can actually measure.",
    author: "Amina Nasser",
    title: "Chief Marketing Officer",
    company: "Nexora Hotels Group",
  },
  relatedCaseStudies: [
    {
      title: "Atlas Retail: +44% lead capture rate",
      metric: "+44% capture rate",
      slug: "retail-routing",
    },
    {
      title: "FinEdge: 31% lower ops cost",
      metric: "31% lower ops cost",
      slug: "fintech-automation",
    },
  ],
};

export default function HospitalityConciergeCase() {
  return <CaseStudyLayout data={caseStudyData} />;
}
