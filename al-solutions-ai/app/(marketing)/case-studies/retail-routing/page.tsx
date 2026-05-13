import type { Metadata } from "next";
import { CaseStudyLayout, type CaseStudyData } from "@/components/CaseStudyLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Atlas Retail: +44% Lead Capture in 35 Days | AL Solutions AI",
  description:
    "How Atlas Retail increased lead capture rate by 44% with intelligent lead routing and WhatsApp automation. From concept to live in 35 days.",
  alternates: alternatesFor("/case-studies/retail-routing"),
  openGraph: {
    url: canonicalUrl("/case-studies/retail-routing"),
    title: "Atlas Retail: +44% Lead Capture in 35 Days | AL Solutions AI",
    description:
      "How Atlas Retail increased lead capture rate by 44% with intelligent lead routing and WhatsApp automation. From concept to live in 35 Days.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=Atlas Retail +44% Lead Capture in 35 Days&subtitle=Intelligent lead routing and WhatsApp automation.&tag=Case Study",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=Atlas Retail +44% Lead Capture in 35 Days&subtitle=Intelligent lead routing and WhatsApp automation.&tag=Case Study",
    ],
  },
};

const caseStudyData: CaseStudyData = {
  slug: "retail-routing",
  industry: "Retail",
  companyName: "Atlas Retail",
  headline: "How Atlas Retail captured 44% more leads with AI routing",
  description:
    "A multi-store retail chain was losing qualified leads to slow response times and manual handoffs. Store managers handled web inquiries during open hours—but store hours weren&apos;t consistent across locations. Leads from evening and weekend shoppers went unanswered.",
  metrics: [
    {
      label: "Lead Capture Rate",
      value: "+44%",
      note: "Web inquiries now routed in real-time regardless of location open hours",
    },
    {
      label: "Response Time",
      value: "-58%",
      note: "Average time from inquiry to first reply from local store manager",
    },
    {
      label: "Time to Production",
      value: "35 days",
      note: "From discovery call to live system across all 8 store locations",
    },
  ],
  challenge: {
    statement:
      "Atlas Retail operates eight stores across the MENA region with varying operating hours. Web leads were coming in 24/7, but staff could only respond during their location&apos;s business hours. Late-night and weekend inquiries sat in an inbox until Monday morning—by then, customers had moved to competitors. Manual routing meant important leads got lost between store teams.",
    painPoints: [
      "Web leads arriving outside store hours; no one responding until opening time",
      "Manual routing between store managers; no clear assignment logic; duplicate contact attempts",
      "Regional customers in different time zones; no way to prioritize by store location",
      "No record of why leads were lost or which store should have owned each one",
      "Store managers using personal WhatsApp accounts; no consistency, no audit trail",
    ],
  },
  solution: {
    intro:
      "We built an intelligent AI router that receives every web inquiry, understands the customer&apos;s intent and location, then automatically routes to the appropriate store manager—by SMS, WhatsApp, or email based on their preference. The system respects store hours, escalates after-hours inquiries, and logs everything for performance tracking.",
    features: [
      {
        title: "Location-Aware Routing",
        description:
          "AI understands which store the customer is closest to or most interested in. Routes the lead instantly to the right manager, even outside store hours.",
        icon: "📍",
      },
      {
        title: "Multi-Channel Delivery",
        description:
          "Store managers receive leads via WhatsApp, SMS, or email—their choice. Urgent leads escalate; off-hours leads queue for morning review with priority tags.",
        icon: "📱",
      },
      {
        title: "Closed-Loop Analytics",
        description:
          "Every lead tracked from inquiry to conversion or loss. Managers see which inquiries converted, which were abandoned, and why—enabling quick optimization.",
        icon: "📊",
      },
    ],
  },
  results: [
    {
      stat: "+44%",
      label: "Lead Capture Increase",
      note: "Total qualified leads captured; before vs. 60 days post-launch",
    },
    {
      stat: "-58%",
      label: "Response Time Drop",
      note: "Average time from inquiry to store manager first response",
    },
    {
      stat: "8/8",
      label: "Stores Fully Integrated",
      note: "All locations live within 35 days; zero downtime during rollout",
    },
    {
      stat: "92%",
      label: "Lead Assignment Accuracy",
      note: "AI routing to correct store first time; verified against store feedback",
    },
  ],
  testimonial: {
    quote:
      "The team understood our business model immediately. They didn&apos;t over-engineer the solution—just built exactly what we needed, on time, under budget.",
    author: "Khaled Al-Rashid",
    title: "Founder & CEO",
    company: "Atlas Retail",
  },
  relatedCaseStudies: [
    {
      title: "Nexora Hotels: -62% first response time",
      metric: "-62% response time",
      slug: "hospitality-concierge",
    },
    {
      title: "FinEdge: 31% lower ops cost",
      metric: "31% lower ops cost",
      slug: "fintech-automation",
    },
  ],
};

export default function RetailRoutingCase() {
  return <CaseStudyLayout data={caseStudyData} />;
}
