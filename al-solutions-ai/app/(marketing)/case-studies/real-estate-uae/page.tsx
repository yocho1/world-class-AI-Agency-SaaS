import type { Metadata } from "next";
import { CaseStudyLayout, type CaseStudyData } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "−78% Response Time for a UAE Real Estate Agency | Case Study | AL Solutions AI",
  description:
    "How a UAE real estate agency replaced 4–6 hour response times with a WhatsApp AI agent that qualifies leads and syncs to HubSpot — live in 26 days.",
};

const CASE_STUDY: CaseStudyData = {
  slug: "real-estate-uae",
  industry: "Real Estate",
  headline: "UAE real estate agency: from 4-hour response times to 60-second lead qualification",
  description:
    "A WhatsApp AI agent now handles 200+ daily enquiries, qualifies buyers in Arabic and English, matches properties via API, and routes hot leads to agents — all synced to HubSpot CRM.",
  metrics: [
    { label: "Response time reduction", value: "−78%", note: "From 4–6 hours to under 60 seconds" },
    { label: "Lead-to-viewing conversion", value: "+41%", note: "Month 1 vs. baseline" },
    { label: "Time to go-live", value: "26 days", note: "Contract signed to production" },
  ],
  challenge: {
    statement:
      "The agency received 200+ WhatsApp enquiries per day through a team of just 3 agents. Average response time was 4–6 hours. Hot leads — buyers ready to view properties within 48 hours — were going cold before first contact. The team had no lead qualification process, no property matching automation, and no CRM integration. Arabic-speaking buyers were underserved because the existing English-only chatbot could not handle dialect variation or mid-conversation language switching.",
    painPoints: [
      "200+ daily WhatsApp enquiries overwhelming a 3-person team",
      "4–6 hour average response time killing hot lead conversion",
      "No lead qualification — every enquiry treated as equal priority",
      "No automated property matching to live inventory",
      "Arabic buyers underserved by English-only system",
      "Zero CRM sync — conversation history lost after each chat",
    ],
  },
  solution: {
    intro:
      "We built a WhatsApp Business API AI agent powered by GPT-4o and LangChain. The system qualifies leads (budget, timeline, property type), matches against live inventory via the agency's property API, routes hot leads to the correct agent in under 60 seconds, and syncs the full conversation to HubSpot CRM — in Arabic and English with seamless mid-conversation language switching.",
    features: [
      {
        title: "Lead qualification agent",
        description: "AI asks budget range, viewing timeline, and property preferences. Scores intent and flags hot leads for immediate agent handoff.",
        icon: "🎯",
      },
      {
        title: "Live inventory matching",
        description: "Connected to the agency's property API. The bot suggests available properties matching the buyer's criteria in real time.",
        icon: "🏠",
      },
      {
        title: "Arabic + English switch",
        description: "Detects language from first message and switches seamlessly mid-conversation. Handles Modern Standard Arabic and major Gulf dialects.",
        icon: "🌍",
      },
    ],
  },
  results: [
    { stat: "−78%", label: "Average response time", note: "From 4–6 hours to under 60 seconds" },
    { stat: "+41%", label: "Lead-to-viewing conversion", note: "Month 1 result" },
    { stat: "26", label: "Days to go-live", note: "From contract to production" },
    { stat: "200+", label: "Daily enquiries handled", note: "Without adding headcount" },
  ],
  processSteps: [
    { step: 1, title: "Day 1–3: Discovery & API audit", body: "We mapped the agency's property API, reviewed their HubSpot CRM structure, and identified the 12 most common buyer enquiry patterns. We also recorded sample Arabic and English conversations to build the initial training set." },
    { step: 2, title: "Day 4–7: WhatsApp Business API approval", body: "Applied for WhatsApp Business API access through Meta's official partner channel. Prepared the agency's Facebook Business verification documents." },
    { step: 3, title: "Day 8–14: Core agent build", body: "Built the lead qualification flow, property matching logic, and HubSpot CRM sync. Tested Arabic language detection and mid-conversation switching with native speakers." },
    { step: 4, title: "Day 15–21: Integration & internal testing", body: "Connected live property API. Ran parallel testing: AI responses vs. human agent responses on 50 real enquiries. Tuned the hot-lead routing threshold based on agent feedback." },
    { step: 5, title: "Day 22–26: Go-live & handover", body: "Soft launch with 20% of traffic. Monitored for 4 days, fixed two edge cases in Arabic dialect handling. Full traffic switch. Delivered handover document and trained the 3 agents on escalation protocols." },
  ],
  technicalDetails: {
    intro: "The system runs on a production stack designed for reliability, not demos.",
    items: [
      { title: "LLM: GPT-4o", description: "Primary model for reasoning, qualification logic, and natural language generation. Fallback to GPT-4o-mini for high-volume periods." },
      { title: "Framework: LangChain", description: "Orchestrates the multi-step qualification flow, API calls to property inventory, and HubSpot CRM updates." },
      { title: "Channel: WhatsApp Business API", description: "Official Meta API for enterprise messaging. Handles delivery receipts, read status, and media messages." },
      { title: "CRM: HubSpot", description: "Two-way sync via HubSpot API. Conversations logged as activities. Contact records auto-created or updated." },
      { title: "Language: Custom Arabic NLP layer", description: "Built on top of GPT-4o with prompt engineering for dialect handling and RTL rendering. Mid-conversation language detection using a lightweight classifier." },
      { title: "Infrastructure: n8n + Make", description: "Workflow automation for data pipelines, error handling, and alerting. Self-hosted for data residency compliance." },
    ],
  },
  lessonsLearned: [
    "The decision to keep human agents in the loop for price negotiation was correct. The AI hands off cleanly before any price discussion. Removing humans from that stage would have hurt conversion — buyers in this market expect a human for negotiation.",
    "Mid-conversation language switching was harder than expected. The first version required the user to explicitly say 'switch to English.' The second version detects language change automatically from message content. Conversion improved 18% after this change.",
    "Property API latency was the biggest performance bottleneck. We added a 3-second cache layer for popular search queries. Average response time dropped from 4.2 seconds to 1.1 seconds.",
    "Agent adoption was higher when they could see the AI's reasoning. We added a 'why this lead is hot' summary to every handoff. Agent follow-up speed improved 34%.",
  ],
  testimonial: {
    quote:
      "We went from 6-hour response times to instant lead qualification. Our conversion rate on inbound WhatsApp leads went up 38% in the first month. The AI handles Arabic and English seamlessly — our buyers switch languages mid-conversation and the bot follows without missing a beat.",
    author: "Head of Digital",
    title: "Real Estate Group",
    company: "UAE — name withheld by NDA",
  },
  companyName: "UAE Real Estate Agency",
  relatedCaseStudies: [
    { title: "CRM AI automation for a UK professional services firm", metric: "−89% CRM admin time", slug: "crm-automation-uk" },
    { title: "AI support agent for a UK trading platform", metric: "−68% ticket volume", slug: "trading-platform-uk" },
  ],
  ctaSections: [
    {
      title: "Similar to your business?",
      body: "If you handle high-volume inbound enquiries in WhatsApp or web chat, we can build the same system for you — with a written go-live timeline before any code is written.",
      linkHref: "https://calendly.com/achraflachgar/15min",
      linkText: "Book free AI audit",
    },
  ],
};

export default function RealEstateCaseStudyPage() {
  return <CaseStudyLayout data={CASE_STUDY} />;
}
