import type { Metadata } from "next";
import { CaseStudyLayout, type CaseStudyData } from "@/components/CaseStudyLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FinEdge: 31% Lower Ops Cost in 22 Days | AL Solutions AI",
  description:
    "How FinEdge cut operational costs by 31% through AI-powered customer support automation. From implementation delay to live production in under 4 weeks.",
  alternates: alternatesFor("/case-studies/fintech-automation"),
  openGraph: {
    url: canonicalUrl("/case-studies/fintech-automation"),
    title: "FinEdge: 31% Lower Ops Cost in 22 Days | AL Solutions AI",
    description:
      "How FinEdge cut operational costs by 31% through AI-powered customer support automation. From implementation delay to live production in under 4 weeks.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=FinEdge 31% Lower Ops Cost in 22 Days&subtitle=AI-powered support automation live in under 4 weeks.&tag=Case Study",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=FinEdge 31% Lower Ops Cost in 22 Days&subtitle=AI-powered support automation live in under 4 weeks.&tag=Case Study",
    ],
  },
};

const caseStudyData: CaseStudyData = {
  slug: "fintech-automation",
  industry: "Fintech",
  companyName: "FinEdge",
  headline: "How FinEdge cut ops costs 31% by automating support tier 1",
  description:
    "FinEdge, a fast-growing fintech platform, was stuck in support chaos. Six months into a custom chatbot build with another vendor and still no production system. Every customer support question tied up a human agent. Growing user base meant growing support costs—unsustainable.",
  metrics: [
    {
      label: "Operational Cost Reduction",
      value: "-31%",
      note: "Annualized savings on tier-1 support labor, measured at day 90",
    },
    {
      label: "Time to Production",
      value: "22 days",
      note: "Live system handling real support requests after 6 months of delays elsewhere",
    },
    {
      label: "Support Automation Rate",
      value: "68%",
      note: "Tier-1 inquiries now handled fully by AI; zero human intervention",
    },
  ],
  challenge: {
    statement:
      "FinEdge had invested six months and significant budget into a custom chatbot with another vendor. The project stalled. No MVP, no timeline, no end in sight. Meanwhile, customer support costs were climbing. Every new user meant more support tickets, more agents to hire, more overhead. The company needed a production system fast—not a vaporware project.",
    painPoints: [
      "Six-month project with zero production output; another six months estimated remaining",
      "Every customer inquiry required human review; agents drowning in repetitive tier-1 questions",
      "No automation in place; support team scaling linearly with user growth",
      "Customer frustration mounting; response times degrading as volume increased",
      "Budget and morale exhausted; executive pressure to find a solution immediately",
    ],
  },
  solution: {
    intro:
      "We interviewed the FinEdge support team, mapped their top 50 questions, and built an AI system that handles 68% of support inquiries automatically. Account status checks, fee explanations, transaction disputes, KYC issues—the AI routes complex cases to human agents while resolving routine questions instantly. The entire system was live and handling real customer traffic in 22 days.",
    features: [
      {
        title: "Tier-1 Automation",
        description:
          "AI answers account status, fees, transaction history, and basic KYC questions. Resolves 68% of incoming support tickets without human intervention.",
        icon: "🤖",
      },
      {
        title: "Intelligent Escalation",
        description:
          "Complex disputes or sensitive issues route automatically to specialized agents with full conversation context. Agents focus only on high-value problems.",
        icon: "⬆️",
      },
      {
        title: "Continuous Learning",
        description:
          "System logs every interaction and learns from agent corrections. Support quality improves weekly; automation rate increases over time.",
        icon: "📈",
      },
    ],
  },
  results: [
    {
      stat: "-31%",
      label: "Operational Cost Reduction",
      note: "Annualized tier-1 support labor savings at 90 days post-launch",
    },
    {
      stat: "68%",
      label: "Fully Automated Inquiries",
      note: "Tier-1 support tickets resolved by AI with zero escalation",
    },
    {
      stat: "22 days",
      label: "Time to Production",
      note: "From discovery to live system handling real customer support",
    },
    {
      stat: "94%",
      label: "Customer Satisfaction Score",
      note: "AI responses rated; same NPS as human agents for routine issues",
    },
  ],
  testimonial: {
    quote:
      "We were six months into a chatbot project with another vendor when we called AL Solutions. They had something live and working in 22 days.",
    author: "Sara Mensah",
    title: "VP of Operations",
    company: "FinEdge",
  },
  processSteps: [
    {
      step: 1,
      title: "Emergency scoping and vendor transition (Days 1–3)",
      body:
        "FinEdge came to us in crisis mode. Their previous vendor had spent six months on a custom Dialogflow-based chatbot with no production output. We conducted a rapid 3-day audit: interviewed the support team lead, reviewed the top 100 support ticket types from the previous quarter, and analysed the failed vendor's technical architecture. The core issue was clear — the previous vendor had over-engineered a flexible framework instead of solving the specific problem of tier-1 support deflection. We scrapped the legacy codebase and proposed a focused scope: handle the 68% of inquiries that were purely informational, and escalate the rest cleanly.",
    },
    {
      step: 2,
      title: "Support taxonomy and compliance guardrails (Days 4–10)",
      body:
        "We mapped every tier-1 inquiry type into a decision tree: account status, transaction history, fee explanations, card activation, password reset, KYC document status, and product eligibility. For each type, we defined the exact information the AI could provide, the fallback for missing data, and the escalation path to a human agent. Critically, we built compliance guardrails: the AI was explicitly prohibited from giving financial advice, interpreting regulations, or making predictions about investment outcomes. Any question outside the approved taxonomy triggered an immediate escalation with a pre-written disclaimer. This documentation was reviewed by FinEdge's compliance team before any model training began.",
    },
    {
      step: 3,
      title: "Model training and CRM integration (Days 11–17)",
      body:
        "We trained the AI on FinEdge's support documentation, FAQ database, and anonymised ticket history. The model learned to recognise 47 distinct intent patterns and respond with pre-approved answer templates for 31 of them. For the remaining 16, it used retrieval-augmented generation against the knowledge base with strict citation requirements. The HubSpot integration was configured to create tickets (not contacts, since FinEdge used a ticket-based support model), route them to the correct queue based on intent, and write the full transcript to the ticket timeline. We also built a real-time dashboard showing deflection rate, escalation rate, and average handle time.",
    },
    {
      step: 4,
      title: "Live pilot and rapid iteration (Days 18–22)",
      body:
        "We launched the system to 50% of incoming support volume, with human agents reviewing every AI response in real time for the first week. The agents flagged 23 responses that needed adjustment — mostly around edge cases in fee explanations and regional product differences. We updated the model within hours of each flag. By day 22, the AI was handling 68% of tier-1 inquiries without human intervention, with a 94% customer satisfaction score on automated responses — identical to the human agent score for the same question types. The system went live to 100% of volume on day 23.",
    },
  ],
  technicalDetails: {
    intro:
      "The FinEdge deployment used a retrieval-augmented generation architecture with strict guardrails, integrated with HubSpot Service Hub for ticket management and Salesforce for customer data lookup.",
    items: [
      {
        title: "RAG-based answer generation",
        description:
          "Retrieval-augmented generation using chunked support docs and FAQ entries. Every AI-generated answer includes a citation to the source document. If no relevant source is found, the system escalates rather than hallucinating.",
      },
      {
        title: "Intent classification layer",
        description:
          "Fine-tuned classifier model recognises 47 support intent patterns with 96.3% accuracy. Classifier runs before the generation model, enabling fast routing and guardrail application.",
      },
      {
        title: "HubSpot Service Hub connector",
        description:
          "Custom ticket creation and routing via HubSpot Private App. Tickets automatically categorised by intent, assigned to the correct support queue, and enriched with customer history from Salesforce.",
      },
      {
        title: "Audit and compliance logging",
        description:
          "Every conversation logged with timestamp, intent classification, AI response, source citations, and escalation reason. Logs exportable in CSV and JSON for compliance reviews.",
      },
    ],
  },
  lessonsLearned: [
    "A failed vendor engagement is not a reason to abandon AI — it is a reason to scope more tightly. FinEdge's previous project failed because it tried to solve every support problem at once. We succeeded by focusing on the 68% of inquiries that were purely informational.",
    "Compliance guardrails must be designed before model training, not after. Building them into the prompt and guardrail layers from day one prevents the AI from ever generating a non-compliant response.",
    "Human-in-the-loop review during the pilot is non-negotiable for fintech deployments. The support team's real-time feedback during the first week corrected 23 edge cases that would have taken weeks to discover through automated monitoring alone.",
    "Ticket-based support models require different CRM integration patterns than sales-led models. FinEdge needed tickets, not deals — and the integration architecture had to reflect that from the start.",
    "Customer satisfaction on AI responses can match human agents for routine questions, but only if the answers are consistent, accurate, and clearly cited. Uncertainty destroys trust faster in fintech than in any other industry we work with.",
  ],
  ctaSections: [
    {
      title: "Automate your support tier 1",
      body:
        "See how much of your support volume could be handled by AI without compromising compliance or customer satisfaction. We audit your ticket history, map your inquiry taxonomy, and deliver a written scope with deflection estimates.",
      linkHref: "/free-ai-audit",
      linkText: "Book a free support automation audit",
    },
    {
      title: "Read the AI automation guide for SMEs",
      body:
        "A practical guide to choosing your first automation project, realistic ROI benchmarks, and the build-vs-buy-vs-agency decision — written for MENA fintech and SME teams.",
      linkHref: "/blog/ai-automation-mena-sme",
      linkText: "Read the SME automation guide",
    },
  ],
  relatedCaseStudies: [
    {
      title: "Nexora Hotels: -62% first response time",
      metric: "-62% response time",
      slug: "hospitality-concierge",
    },
    {
      title: "Atlas Retail: +44% lead capture rate",
      metric: "+44% capture rate",
      slug: "retail-routing",
    },
  ],
};

export default function FintechAutomationCase() {
  return <CaseStudyLayout data={caseStudyData} />;
}
