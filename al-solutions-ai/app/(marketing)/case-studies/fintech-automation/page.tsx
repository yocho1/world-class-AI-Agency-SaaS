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
