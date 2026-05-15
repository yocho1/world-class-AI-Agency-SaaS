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
  processSteps: [
    {
      step: 1,
      title: "Discovery and knowledge-base audit (Days 1–5)",
      body:
        "We started by interviewing the front-desk, reservations, and marketing teams separately. Each team had a different view of what guests actually asked. The front desk saw check-in and policy questions. Reservations saw booking modifications and group inquiries. Marketing saw pre-booking research questions about amenities and location. We consolidated these into a single master question taxonomy of 67 distinct guest intents, then mapped each intent to a resolution type: fully automated, partially automated with human handoff, or fully human. We also audited the existing knowledge base — PDFs, FAQ pages, and internal SOPs — and found that 40% of the content was outdated or contradicted other sources. We cleaned this up before training the model.",
    },
    {
      step: 2,
      title: "AI training and multilingual conversation design (Days 6–14)",
      body:
        "We built the conversation flows around real guest behaviour, not theoretical personas. For example, we discovered that Arabic-speaking guests often started in English and switched to Arabic mid-conversation when the topic became personal (room preferences, dietary restrictions). The AI needed to handle this code-switching naturally. We trained the model on Modern Standard Arabic, Khaleeji dialect, and English, with French as a secondary language for European guests. We also built right-to-left UI components for the web widget and tested them across iOS Safari, Android Chrome, and desktop browsers. During this phase, we ran daily QA sessions with the Nexora team, refining responses based on their feedback until the brand voice matched their hospitality standards.",
    },
    {
      step: 3,
      title: "WhatsApp Business API and HubSpot integration (Days 15–21)",
      body:
        "Meta Business verification and WhatsApp Business API approval took 4 business days — faster than average because we prepared the business documentation in advance. We configured message templates for booking confirmations, check-in reminders, and post-stay feedback requests. The integration with HubSpot was the critical piece: every conversation created or updated a contact, wrote the transcript to the timeline, and moved the lifecycle stage when booking intent was detected. We built a custom property mapping for hospitality-specific fields: check-in date, room type preference, number of guests, special requests, and loyalty programme status. We also configured owner assignment rules so that leads from specific properties were routed to the correct reservations manager automatically.",
    },
    {
      step: 4,
      title: "Pilot launch and live optimisation (Days 22–28)",
      body:
        "We launched the system to 25% of website traffic and all WhatsApp inquiries for a single property. The front-desk team monitored conversations in real time via a shared dashboard, flagging responses that needed correction. In the first 72 hours, we identified 12 edge cases that the AI had not seen during training — mostly around unusual room requests and multi-city itineraries. We updated the model within 24 hours of each finding. By day 28, the system was handling 78% of conversations without human intervention, with a 4.2/5 guest satisfaction rating on automated responses. We then rolled it out to all properties.",
    },
  ],
  technicalDetails: {
    intro:
      "The Nexora deployment used a three-layer architecture: a React-based web chat widget, a Node.js AI orchestration service, and HubSpot as the CRM backbone. WhatsApp messages were handled via the Meta Business API through an approved BSP.",
    items: [
      {
        title: "Conversational AI layer",
        description:
          "GPT-4-class model with custom prompts for hospitality context, brand voice guardrails, and multilingual handling. Conversation state managed via Redis with 24-hour TTL for active sessions.",
      },
      {
        title: "HubSpot CRM connector",
        description:
          "Custom Node.js service using HubSpot Private App OAuth. Handles deduplication by email/phone, selective property updates (PATCH), and timeline note creation for full transcript logging.",
      },
      {
        title: "WhatsApp Business API",
        description:
          "Meta-approved BSP connection with sandbox testing, template approval for outbound messages, and webhook-based inbound message handling. Message queue processed via BullMQ on Redis.",
      },
      {
        title: "Knowledge base and RAG",
        description:
          "Retrieval-augmented generation using chunked hotel documentation, policies, and local area guides. Vector store powered by Pinecone with semantic search for contextually relevant responses.",
      },
    ],
  },
  lessonsLearned: [
    "The most important factor in a successful hotel AI deployment is not the model choice — it is the quality of the knowledge base. Outdated or contradictory information will surface quickly in guest conversations and damage trust.",
    "Multilingual QA needs to include real guest conversations, not just translated test scripts. Arabic dialect variation and code-switching patterns are impossible to predict without live data.",
    "Front-desk team buy-in is essential. The AI should augment their work, not replace it. We involved the team in daily QA sessions during the pilot, which turned skeptics into advocates.",
    "WhatsApp template approval is a bottleneck that most projects underestimate. Preparing business documentation and template wording before kickoff saves 1–2 weeks.",
    "Integration with the existing CRM is where most value is captured. A chatbot that captures leads but does not write them to the CRM is a chatbot that sales teams ignore.",
  ],
  ctaSections: [
    {
      title: "Deploy an AI concierge for your hotel",
      body:
        "See how a hospitality-focused AI chatbot would work for your property. We map your guest journeys, audit your knowledge base, and deliver a written scope report with timeline and pricing.",
      linkHref: "/free-ai-audit",
      linkText: "Book a free AI audit for your hotel",
    },
    {
      title: "Read the WhatsApp automation guide",
      body:
        "Learn how WhatsApp Business API works, what it costs, and how to set it up for a hotel or hospitality business — based on real deployments across the MENA region.",
      linkHref: "/blog/whatsapp-ai-chatbot-business",
      linkText: "Read the WhatsApp AI guide",
    },
  ],
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
