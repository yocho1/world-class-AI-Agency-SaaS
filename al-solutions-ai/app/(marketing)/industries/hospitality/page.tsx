import type { Metadata } from "next";
import { IndustryLayout, type IndustryLandingData } from "@/components/IndustryLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

const PATH = "/industries/hospitality";

export const metadata: Metadata = {
  title: "AI Chatbot for Hotels & Hospitality | Multilingual AI Concierge | AL Solutions AI",
  description:
    "AI concierge and WhatsApp automation for hotels, F&B, and hospitality groups across MENA and Europe. Native Arabic, English, French. Live in 30 days.",
  alternates: alternatesFor(PATH),
  openGraph: {
    url: canonicalUrl(PATH),
    title: "AI Chatbot for Hotels & Hospitality | Multilingual AI Concierge",
    description:
      "AI concierge and WhatsApp automation for hotels, F&B, and hospitality groups across MENA and Europe. Live in 30 days.",
  },
};

const DATA: IndustryLandingData = {
  path: PATH,
  industry: "Hospitality",
  eyebrow: "Industry · Hospitality & Travel",
  headline: "AI Concierge for Hotels — Multilingual, WhatsApp-First, Live in 30 Days.",
  subheadline:
    "We build production-grade AI concierge systems for hotels, resorts, F&B groups, and tourism operators. Native Arabic, English, and French support. WhatsApp and web deployed together. Qualified inquiries routed to your team with full context — not just a contact form ping.",
  painPoints: [
    "Inquiries arrive in Arabic, English, and French at all hours — and your front desk can&apos;t triage every channel during peak season.",
    "WhatsApp is the dominant channel for guests in MENA, but most hotel chatbots treat it as an afterthought instead of a first-class deployment surface.",
    "Booking inquiries die in shared inboxes because there&apos;s no automatic qualification (room type, dates, party size) before a human picks them up.",
    "Existing chatbot vendors took six months to ship a prototype that still doesn&apos;t handle Khaleeji Arabic naturally.",
  ],
  outcomes: [
    { stat: "+62%", label: "Faster first response", note: "Hospitality client, post-launch" },
    { stat: "-52%", label: "Support ticket volume", note: "90 days post-launch" },
    { stat: "+44%", label: "Inquiry-to-booking conversion", note: "Web + WhatsApp combined" },
  ],
  useCases: [
    {
      title: "Multilingual booking inquiry qualification",
      body: "Capture room type, date range, party size, and special requirements in Arabic, English, or French. Route qualified inquiries directly to revenue or front-office teams with full conversation context — not just a name and email.",
    },
    {
      title: "WhatsApp guest concierge",
      body: "Pre-arrival, in-stay, and post-stay messaging on WhatsApp Business API. Room-service ordering, late checkout requests, F&B reservations, and quick FAQs handled instantly without burning agent time.",
    },
    {
      title: "F&B reservation automation",
      body: "Restaurant and bar reservations across multiple outlets, with capacity-aware availability checks, allergy and dietary preferences captured up front, and OpenTable / SevenRooms / Tock integration available.",
    },
    {
      title: "OTA leakage recovery",
      body: "Capture direct-booking intent on your website before guests bounce to OTAs. Highlight loyalty perks, package upgrades, and direct-only rate plans during the inquiry conversation itself.",
    },
  ],
  relatedCaseStudy: {
    title: "Nexora Hotels: -62% response time in 28 days",
    summary:
      "How we replaced three failed chatbot vendors with a live AI concierge across web and WhatsApp in just 28 days. +44% lead capture rate.",
    href: "/case-studies/hospitality-concierge",
  },
  faqs: [
    {
      question: "Does the AI concierge replace our front desk?",
      answer:
        "No — it removes the volume of repetitive triage work so your front-desk and revenue teams spend their time on high-value guest interactions. Routine FAQs, availability checks, and pre-booking qualification are handled by AI; complex requests escalate to a human with full conversation context.",
    },
    {
      question: "Can the AI handle Arabic, English, and French in the same conversation?",
      answer:
        "Yes. Our chatbots are trained for natural code-switching — guests can mix languages mid-message and the AI responds in the same register. We support Modern Standard Arabic, Khaleeji and Najdi dialects, English, and French as standard.",
    },
    {
      question: "Which PMS / OTA / booking platforms do you integrate with?",
      answer:
        "We&apos;ve integrated with most major hospitality stacks: Opera Cloud, Mews, Cloudbeds, OpenTable, SevenRooms, Tock, and a range of in-house PMS systems via REST APIs and webhooks. If your platform exposes an API, we can route inquiries and bookings to it with full context.",
    },
    {
      question: "How long until our AI concierge is live?",
      answer:
        "Standard timeline is 30 days from signed contract to live production, including WhatsApp Business API verification. Single-property deployments can ship in 14 days for tightly-scoped Launch tier engagements.",
    },
    {
      question: "What does an AI concierge project cost?",
      answer:
        "Hospitality projects typically run $6,500 to $25,000 USD as one-time fees, depending on the number of properties, languages, and integrations. Pricing is structured 50% on signing and 50% at go-live. See alsolutionsai.online/pricing for full tier details.",
    },
  ],
};

export default function HospitalityIndustryPage() {
  return <IndustryLayout data={DATA} />;
}
