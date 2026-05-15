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
  processSteps: [
    {
      step: 1,
      title: "Lead flow audit and routing logic design (Days 1–7)",
      body:
        "We started by auditing Atlas Retail's lead flow across all eight stores. The pattern was chaotic: web inquiries arrived via a generic contact form, WhatsApp messages went to store managers' personal phones, and Instagram DMs sat in a social media inbox that nobody checked daily. There was no unified view of leads, no assignment logic, and no tracking of what happened after a lead was passed to a store. We interviewed every store manager, mapped their opening hours, identified their preferred communication channels, and documented their typical response times. From this, we designed a location-aware routing algorithm that considered: customer postcode proximity, store operating hours, manager channel preference (WhatsApp vs. email), and language (Arabic vs. English).",
    },
    {
      step: 2,
      title: "AI qualification and CRM integration (Days 8–21)",
      body:
        "We built an AI qualification layer that asked natural questions to understand purchase intent: product category, budget range, timeline, and preferred store location. The AI handled Arabic and English with full code-switching support — critical for Atlas Retail's customer base in mixed-language households. Qualified leads were written to HubSpot immediately, with custom properties for: product interest, budget band, preferred store, language, and communication channel. The deal was created in the 'New Chat Qualified' stage and assigned to the correct store manager based on the routing algorithm. Unqualified inquiries (vague questions, competitor research, out-of-region) were handled by the AI without creating a deal, but still logged for marketing analysis.",
    },
    {
      step: 3,
      title: "WhatsApp Business API and manager onboarding (Days 22–28)",
      body:
        "WhatsApp Business API approval took 5 business days. We configured message templates for lead notifications, follow-up reminders, and post-purchase feedback requests. Each store manager received a 30-minute training session on the new lead notification format: a WhatsApp message containing the customer's key details, a one-tap 'Accept Lead' button, and a link to the full conversation transcript in HubSpot. Managers could respond directly to the customer from their personal WhatsApp while the system logged the response back to HubSpot. This was critical for adoption — managers did not need to learn a new tool. They just needed to reply to WhatsApp messages, same as before, but now with structured data and tracking behind it.",
    },
    {
      step: 4,
      title: "Pilot, rollout, and optimisation (Days 29–35)",
      body:
        "We launched to two stores for the first week, then rolled out to all eight stores over the following seven days. The pilot revealed three important findings: first, some managers were slower to accept leads than others, creating a bottleneck that the routing algorithm could not solve — we added an escalation rule that re-routed unaccepted leads after 30 minutes. Second, weekend inquiries were being ignored because part-time staff did not check WhatsApp — we added email backup notifications for after-hours leads. Third, the AI occasionally misidentified the preferred store when customers were shopping for gifts for relatives in different cities — we added an explicit 'Is this for you or a gift?' question to the qualification flow. These three adjustments increased lead capture rate by an additional 12% post-launch.",
    },
  ],
  technicalDetails: {
    intro:
      "The Atlas Retail deployment used a location-aware routing engine built on a custom decision tree, integrated with HubSpot CRM and WhatsApp Business API via an approved BSP.",
    items: [
      {
        title: "Location-aware routing engine",
        description:
          "Custom decision tree algorithm considers customer proximity, store hours, manager availability, and channel preference to route each lead to the optimal store manager in under 200ms.",
      },
      {
        title: "HubSpot CRM connector",
        description:
          "Contact and deal creation via HubSpot Private App with custom property mapping for retail-specific fields: product interest, budget band, preferred store, and communication channel.",
      },
      {
        title: "WhatsApp Business API integration",
        description:
          "Meta-approved BSP connection with lead notification templates, two-way message sync, and automatic conversation logging back to HubSpot timeline for full audit trail.",
      },
      {
        title: "Manager dashboard",
        description:
          "Lightweight web dashboard showing each manager's lead acceptance rate, average response time, and conversion rate — no CRM training required, just a mobile-friendly link.",
      },
    ],
  },
  lessonsLearned: [
    "The biggest barrier to lead routing success is not the algorithm — it is manager adoption. Store managers already have habits and preferences. Any system that forces them to change their workflow will fail. We designed the system around WhatsApp because that's what they already used.",
    "Backup channels are essential. WhatsApp is reliable, but not universal. Some managers prefer email. Some check WhatsApp only during store hours. A routing system with a single channel is a routing system with single points of failure.",
    "Gift purchases break standard location-based routing. Customers shopping for relatives in other cities need explicit qualification questions. Without them, the algorithm sends gift leads to the wrong store.",
    "Escalation timeouts prevent leads from dying in the inbox. A 30-minute auto-escalation rule saved Atlas Retail an estimated 15–20 leads per week that would have been lost to slow response.",
    "Manager performance visibility drives behaviour change. When managers could see their own response time and conversion rate compared to other stores, natural competition emerged — no gamification required.",
  ],
  ctaSections: [
    {
      title: "Fix your lead routing",
      body:
        "See how much revenue you are losing to slow or missed lead responses. We audit your current flow, interview your team, and deliver a written routing plan with ROI estimates — no commitment.",
      linkHref: "/free-ai-audit",
      linkText: "Book a free lead routing audit",
    },
    {
      title: "Read the retail AI guide",
      body:
        "Learn how AI chatbots handle pre-purchase Q&A, abandoned-cart recovery on WhatsApp, and post-purchase support — with real benchmarks from MENA retail deployments.",
      linkHref: "/industries/retail",
      linkText: "Read the retail AI industry guide",
    },
  ],
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
