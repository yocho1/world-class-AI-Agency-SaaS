import type { Metadata } from "next";
import { IndustryLayout, type IndustryLandingData } from "@/components/IndustryLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

const PATH = "/industries/fintech";

export const metadata: Metadata = {
  title: "AI Chatbot for Fintech | Compliance-First Customer Support AI | AL Solutions AI",
  description:
    "Compliance-aware AI chatbots for fintech, neobanks, and lending businesses. KYC pre-screening, FCA/SAMA-aware guardrails, audit logging. Live in 30 days.",
  alternates: alternatesFor(PATH),
  openGraph: {
    url: canonicalUrl(PATH),
    title: "AI Chatbot for Fintech | Compliance-First Customer Support AI",
    description:
      "Compliance-aware AI chatbots for fintech, neobanks, and lending businesses. KYC pre-screening, audit logging, deployed in 30 days.",
  },
};

const DATA: IndustryLandingData = {
  path: PATH,
  industry: "Fintech",
  eyebrow: "Industry · Fintech & Financial Services",
  headline: "AI Customer Support for Fintech — Compliance-First, Audit-Logged, Live in 30 Days.",
  subheadline:
    "We deploy production AI chatbots for fintech, neobanks, lending platforms, and payment companies across MENA and Europe. KYC pre-screening, regulator-aware conversation guardrails, full audit logging, and CRM-routed handoff to your relationship managers.",
  painPoints: [
    "Support volume scales with new customer acquisition, but routine FAQs (statement requests, transaction status, eligibility questions) eat 60–70% of agent time.",
    "Compliance teams won&apos;t approve a chatbot that can give vague or off-script answers to regulated product questions — and most off-the-shelf bots can&apos;t pass review.",
    "KYC and product eligibility pre-screening is still being done manually, costing 10–15 minutes per inquiry before a customer even gets routed.",
    "WhatsApp is where customers want to message, but the existing helpdesk has no compliant way to handle it with audit trails.",
  ],
  outcomes: [
    { stat: "31%", label: "Lower operational cost", note: "Fintech support automation, post-launch" },
    { stat: "22 days", label: "From contract to live", note: "FinEdge deployment" },
    { stat: "100%", label: "Conversation audit logging", note: "Default for every fintech engagement" },
  ],
  useCases: [
    {
      title: "Tier-1 support deflection",
      body: "Statement and transaction queries, password resets, card activation, fee explanations, and routine product FAQs handled by AI with audit-logged transcripts. Anything non-routine escalates to a human with full context.",
    },
    {
      title: "Eligibility pre-screening",
      body: "Loan, credit card, or account-opening inquiries pre-qualified through a controlled conversation flow — capturing the data points your underwriting team actually needs before a relationship manager picks up.",
    },
    {
      title: "Compliance-aware guardrails",
      body: "Conversation flows reviewed against regulator guidance (FCA, SAMA, DFSA, CBUAE depending on jurisdiction). Out-of-scope questions trigger documented fallbacks, never speculative answers.",
    },
    {
      title: "WhatsApp customer support",
      body: "WhatsApp Business API deployment with consent-managed opt-in flows, message-template approval, and full audit logging that satisfies financial-services compliance reviews.",
    },
  ],
  relatedCaseStudy: {
    title: "FinEdge: 31% lower ops cost in 22 days",
    summary:
      "How FinEdge cut operational support costs by 31% through AI-powered customer support automation, deployed in under 4 weeks after a stalled vendor engagement.",
    href: "/case-studies/fintech-automation",
  },
  faqs: [
    {
      question: "How do you handle conversations that touch regulated advice?",
      answer:
        "Every fintech deployment includes scoped guardrails reviewed with your compliance team before launch. Out-of-scope or regulated-advice questions trigger a documented fallback that escalates to a licensed human agent with full conversation context. The AI never speculates on regulated topics.",
    },
    {
      question: "What audit and logging standards do you support?",
      answer:
        "Every conversation is logged with timestamps, user identifiers, agent actions, and message content (subject to your data-retention policy). Logs are exportable in standard formats for compliance reviews. We can integrate with your SIEM or log warehouse on request.",
    },
    {
      question: "Are you GDPR / PDPL / DPDP compliant?",
      answer:
        "Yes. Our default deployment posture supports GDPR (UK and EU), Saudi PDPL, UAE PDPL, and India DPDP. Data residency options, sub-processor disclosure, breach notification timelines, and DSR handling are documented before kickoff.",
    },
    {
      question: "Which financial regulators have you deployed alongside?",
      answer:
        "We&apos;ve worked with growth teams supervised by the FCA (UK), SAMA (Saudi Arabia), CBUAE / DFSA (UAE), and EU national regulators. We don&apos;t provide regulatory advice, but we structure conversation flows and documentation to support your compliance team&apos;s review process.",
    },
    {
      question: "What does a fintech AI deployment cost?",
      answer:
        "Fintech engagements typically run $6,500 to $25,000+ USD as one-time fees, depending on the number of workflows, regulatory jurisdictions, and integration depth. Pricing is structured 50% on signing and 50% at go-live. See alsolutionsai.online/pricing for full details.",
    },
  ],
};

export default function FintechIndustryPage() {
  return <IndustryLayout data={DATA} />;
}
