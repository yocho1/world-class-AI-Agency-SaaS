import type { Metadata } from "next";
import { CaseStudyLayout, type CaseStudyData } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "−68% Support Tickets for a UK Trading Platform | Case Study | AL Solutions AI",
  description:
    "How a UK crypto/FX trading platform reduced support ticket volume by 68% with a multilingual AI agent handling KYC, onboarding, and account queries — live in 31 days.",
};

const CASE_STUDY: CaseStudyData = {
  slug: "trading-platform-uk",
  industry: "Fintech & Trading",
  headline: "UK trading platform: −68% support tickets with a multilingual AI agent",
  description:
    "An AI support agent now handles KYC questions, account status queries, and onboarding flows in English, Arabic, and French — integrated with the internal ticketing system and scaling with 3× user growth.",
  metrics: [
    { label: "Support ticket volume", value: "−68%", note: "First 60 days post-launch" },
    { label: "First-response time", value: "−81%", note: "AI vs. human queue" },
    { label: "Time to go-live", value: "31 days", note: "Contract signed to production" },
  ],
  challenge: {
    statement:
      "The platform was onboarding 300+ new users per week. The compliance team was overwhelmed with basic KYC questions ('What documents do I need?', 'Why was my verification rejected?', 'How long does approval take?'). The live chat support queue averaged 22 minutes during peak trading hours. The team had no automated onboarding flow and no way to handle the 40% of enquiries that came in Arabic and French. Every new user growth target meant hiring more support staff — a model that was not sustainable.",
    painPoints: [
      "300+ new users per week, compliance team overwhelmed",
      "22-minute average live chat queue during peak hours",
      "40% of enquiries in Arabic and French — no multilingual support",
      "Basic KYC questions consuming 60%+ of support time",
      "Support headcount growing linearly with user growth",
      "No integration between chat and internal ticketing system",
    ],
  },
  solution: {
    intro:
      "We built a multilingual AI support agent powered by GPT-4o and a custom LangChain routing layer. The system handles FAQs, KYC pre-screening, account status queries, and escalation routing — in English, Arabic, and French with mid-conversation language detection. Integrated with the internal ticketing system via REST API so complex cases automatically create structured tickets with full conversation history.",
    features: [
      {
        title: "KYC pre-screening",
        description: "AI guides users through document requirements before submission. Flags incomplete applications and explains rejection reasons in plain language.",
        icon: "🛡️",
      },
      {
        title: "Multilingual routing",
        description: "Detects language from first message and maintains it. Switches seamlessly when users change language mid-conversation — no restart required.",
        icon: "🌍",
      },
      {
        title: "Ticketing integration",
        description: "Complex enquiries auto-create structured tickets in the internal system with full conversation history, user ID, and suggested resolution path.",
        icon: "🎫",
      },
    ],
  },
  results: [
    { stat: "−68%", label: "Support ticket volume", note: "First 60 days" },
    { stat: "−81%", label: "First-response time", note: "AI-first vs. human queue" },
    { stat: "3×", label: "User growth sustained", note: "Flat compliance headcount" },
    { stat: "31", label: "Days to go-live", note: "From contract to production" },
  ],
  processSteps: [
    { step: 1, title: "Day 1–4: Compliance workflow audit", body: "Shadowed the compliance team for 3 days. Documented the 47 most frequent KYC question patterns. Identified the 8 question types that consumed 60% of support time but had standard answers." },
    { step: 2, title: "Day 5–10: Knowledge base & language training", body: "Built a structured knowledge base from compliance documentation. Created Arabic and French translations for all standard responses. Trained the language detection classifier on 500+ real user messages." },
    { step: 3, title: "Day 11–18: Agent build & API integration", body: "Built the FAQ handler, KYC pre-screener, and escalation router. Integrated with the internal ticketing system via REST API. Tested end-to-end flow with compliance team on staging environment." },
    { step: 4, title: "Day 19–25: Parallel testing & tuning", body: "Ran AI responses alongside human agents for 20% of enquiries. Compliance team reviewed AI accuracy daily. Tuned escalation thresholds to ensure no high-risk KYC cases were handled by AI alone." },
    { step: 5, title: "Day 26–31: Go-live & monitoring", body: "Full traffic switch. 24/7 monitoring for first week. Fixed edge case in French number formatting for account balances. Delivered handover playbook and trained team on escalation protocols." },
  ],
  technicalDetails: {
    intro: "The system handles regulated financial enquiries — reliability and auditability were non-negotiable.",
    items: [
      { title: "LLM: GPT-4o", description: "Primary model with fine-tuned prompting for financial compliance tone. Temperature set to 0.3 for consistent, conservative responses." },
      { title: "Framework: LangChain", description: "Multi-agent routing: FAQ agent, KYC agent, and escalation agent. Each has distinct system prompt and guardrails." },
      { title: "Channel: Web chat + WhatsApp", description: "Same AI backend serving both channels. Session state shared across devices for seamless handoff." },
      { title: "Ticketing: Custom REST API", description: "Direct integration with the platform's internal ticketing system. Tickets created with structured fields: user ID, enquiry type, AI confidence score, and full transcript." },
      { title: "Language: Custom multilingual classifier", description: "Lightweight classifier (distilBERT-based) for real-time language detection. Trained on 500+ labelled messages across English, Arabic, and French." },
      { title: "Monitoring: PostHog + Slack alerts", description: "Every AI response tracked. Escalation events trigger Slack alerts to compliance team. Weekly accuracy reports shared with stakeholders." },
    ],
  },
  lessonsLearned: [
    "The multilingual routing logic — detecting language mid-conversation and switching without restart — was the hardest engineering problem. It was worth every day spent on it. Arabic-speaking users who previously abandoned the English chatbot returned at 4× the previous rate after launch.",
    "We initially allowed the AI to answer KYC rejection reasons directly. The compliance team flagged this as a risk — the AI might oversimplify a complex regulatory decision. We switched to a 'here are the most common reasons, but your case will be reviewed individually' model. Agent trust increased and escalation accuracy improved.",
    "The ticketing integration was under-scoped in the original timeline. The internal system had no webhook support, so we built a polling-based sync. This added 4 days to the build. In future projects, we now validate API documentation before committing to the go-live date.",
    "User satisfaction scores were lower in week 1 because the AI was too cautious — it escalated too many enquiries to humans. We tuned the confidence threshold from 0.85 to 0.72 after reviewing 200 real conversations. Ticket deflection improved from 52% to 68% without dropping satisfaction below 4.2/5.",
  ],
  testimonial: {
    quote:
      "We were drowning in KYC questions and account status queries. The AI support agent now handles 68% of our ticket volume in three languages. Our compliance team headcount stayed flat while user volume tripled. The multilingual routing was the hardest part to get right — and it was worth every day spent on it.",
    author: "Head of Operations",
    title: "Trading Platform",
    company: "UK — name withheld by NDA",
  },
  companyName: "UK Trading Platform",
  relatedCaseStudies: [
    { title: "WhatsApp AI for a UAE real estate agency", metric: "−78% response time", slug: "real-estate-uae" },
    { title: "CRM AI automation for a UK professional services firm", metric: "−89% CRM admin time", slug: "crm-automation-uk" },
  ],
  ctaSections: [
    {
      title: "Similar to your business?",
      body: "If your support team is drowning in repetitive enquiries and you need multilingual coverage, we can scope the same system for your platform.",
      linkHref: "https://calendly.com/achraflachgar/15min",
      linkText: "Book free AI audit",
    },
  ],
};

export default function TradingPlatformCaseStudyPage() {
  return <CaseStudyLayout data={CASE_STUDY} />;
}
