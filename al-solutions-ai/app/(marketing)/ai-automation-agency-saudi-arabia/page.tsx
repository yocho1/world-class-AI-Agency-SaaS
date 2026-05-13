import type { Metadata } from "next";
import { GeoLandingLayout, type GeoLandingData } from "@/components/GeoLandingLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

const PATH = "/ai-automation-agency-saudi-arabia";

export const metadata: Metadata = {
  title: "AI Automation Agency Saudi Arabia | Arabic AI for KSA Business | AL Solutions AI",
  description:
    "AI chatbot and automation agency for Saudi Arabia. Native Arabic AI for Riyadh, Jeddah, and Eastern Province businesses. WhatsApp, HubSpot, and Salesforce integration. Live in 30 days.",
  alternates: alternatesFor(PATH),
  openGraph: {
    url: canonicalUrl(PATH),
    title: "AI Automation Agency Saudi Arabia | Arabic AI for KSA Business",
    description:
      "AI chatbot and automation agency for Saudi Arabia. Native Arabic AI for Riyadh, Jeddah, and Eastern Province businesses. Live in 30 days.",
  },
};

const DATA: GeoLandingData = {
  path: PATH,
  city: "Saudi Arabia",
  countryCode: "SA",
  country: "Saudi Arabia",
  eyebrow: "AI Automation Agency · Saudi Arabia",
  headline: "AI Automation Agency for Saudi Arabia — Native Arabic AI, Live in 30 Days.",
  subheadline:
    "We deploy production-grade AI chatbots and automation systems for Saudi-based businesses across Riyadh, Jeddah, Dammam, and the Eastern Province. Native Modern Standard and Najdi Arabic, WhatsApp-first, integrated with HubSpot, Salesforce, and the CRMs your team already uses.",
  valueProps: [
    {
      title: "Native Arabic AI",
      description:
        "Modern Standard Arabic with Najdi (Riyadh) and Hejazi (Jeddah) dialect handling. Right-to-left UI. Arabic-aware date, time, and currency formatting throughout.",
    },
    {
      title: "WhatsApp-first deployment",
      description:
        "WhatsApp Business API is the dominant channel in KSA. Every chatbot ships with WhatsApp included — Meta verification, template approval, and CRM routing all handled.",
    },
    {
      title: "Vision 2030-aligned",
      description:
        "We build for the digital-transformation timelines Saudi growth teams are operating to. 30-day go-live, owned by your team, no perpetual vendor lock-in.",
    },
    {
      title: "Sharia and PDPL aware",
      description:
        "Conversation guardrails, data-handling, and audit logging designed with Saudi PDPL and sector-specific compliance reviews in mind. Documented in writing before kickoff.",
    },
  ],
  localContext: [
    "Saudi Arabia is the largest digital consumer market in the GCC, and one of the fastest-moving for AI adoption. Vision 2030 has driven rapid digitisation across hospitality, retail, real estate, fintech, and government services — and customer expectations have moved with it. A Saudi customer messaging a brand at midnight expects an Arabic-language response within seconds, on WhatsApp, with full context.",
    "Most Saudi businesses we audit have a chatbot that fails one of two basic tests: it doesn&apos;t handle Arabic dialects naturally, or it isn&apos;t connected to the CRM and messaging stack the rest of the company runs on. Either failure means qualified inquiries die in the inbox while sales teams chase cold prospects.",
    "AL Solutions AI was built specifically to close that gap for MENA-facing businesses. We&apos;re a UK-registered company (Companies House No. 11521309) founded in 2018, with a senior delivery team that ships multilingual production AI in 30 days. Our Saudi engagements are remote-delivered with on-site presence in Riyadh and Jeddah for kickoff and milestones when the engagement requires it.",
  ],
  whyHere: [
    {
      heading: "Arabic that actually works for Saudi customers",
      body: "We train chatbots for Modern Standard Arabic, Najdi, and Hejazi dialects, and we handle the natural English/Arabic code-switching real KSA customers use mid-message. Generic translation-layer chatbots break here; ours don&apos;t.",
    },
    {
      heading: "WhatsApp as a first-class channel",
      body: "Meta Business verification, template approval, opt-in compliance, and CRM-routed handoff are all included in every Saudi deployment. You don&apos;t need a separate WhatsApp vendor.",
    },
    {
      heading: "PDPL-aware data handling",
      body: "Saudi Personal Data Protection Law compliance is built into our default deployment posture. Data residency options, audit logging, consent management, and breach notification timelines documented before kickoff.",
    },
    {
      heading: "Senior delivery, no offshore handoff",
      body: "Your project is run by the same senior team that scopes it. No bait-and-switch. Direct accountability for KPIs, weekly progress reviews, and a written go-live checklist signed off before launch.",
    },
  ],
  industries: [
    {
      name: "Retail & E-Commerce",
      description:
        "Pre-purchase Q&A, stock and shipping checks, abandoned-cart recovery on WhatsApp, and bilingual customer support automation for Saudi retail and D2C brands.",
    },
    {
      name: "Real Estate",
      description:
        "Lead qualification for off-plan and ready-to-move projects across Riyadh, Jeddah, and NEOM-adjacent developments. Budget, area, and timeline captured before agent handoff.",
    },
    {
      name: "Hospitality & Tourism",
      description:
        "AI concierge for hotels, F&B groups, and tourism operators serving Saudi domestic and inbound religious tourism. Multilingual booking and instant qualified-lead handoff.",
    },
    {
      name: "Fintech & Banking",
      description:
        "KYC pre-screening, product eligibility (Murabaha, Tawarruq, etc.), FAQ deflection, and qualified handoff to relationship managers — with audit logging for SAMA compliance reviews.",
    },
    {
      name: "Healthcare & Clinics",
      description:
        "Patient intake, appointment booking, and triage for private clinics. Arabic-first conversation flows for clinics serving GCC and inbound medical-tourism patients.",
    },
    {
      name: "Education & Training",
      description:
        "Programme inquiries, enrolment qualification, and parent communications for K-12 and higher-education institutions across KSA. Bilingual by default.",
    },
  ],
  metrics: [
    { stat: "30 days", label: "From contract to live", note: "Average across 2024 deployments" },
    { stat: "+44%", label: "Qualified lead capture", note: "Retail client, 30 days post-launch" },
    { stat: "12", label: "Production deployments", note: "Live client systems shipped in 2024" },
  ],
  faqs: [
    {
      question: "Do you have a presence in Saudi Arabia?",
      answer:
        "AL Solutions AI is registered in the UK (Companies House No. 11521309) and serves Saudi clients remotely from the UK and continental Europe. We schedule on-site visits in Riyadh and Jeddah for kickoff and key milestones when the engagement requires it. Our delivery hours overlap fully with KSA business hours.",
    },
    {
      question: "Can your AI handle Saudi Arabic dialects?",
      answer:
        "Yes. We train Saudi-deployed chatbots for Modern Standard Arabic, Najdi (Riyadh), and Hejazi (Jeddah) dialects, plus the natural English/Arabic code-switching pattern most KSA customers use. This is configured per-client based on your customer segment.",
    },
    {
      question: "Are you compliant with Saudi PDPL?",
      answer:
        "Yes. Our default deployment posture includes data-residency options, audit logging, consent management flows, and breach notification timelines aligned with Saudi Personal Data Protection Law. We document data handling in writing before kickoff and can adjust based on your sector-specific requirements.",
    },
    {
      question: "Is WhatsApp Business API included?",
      answer:
        "WhatsApp deployment is included in every Saudi chatbot project. We handle Meta Business verification, template approval, opt-in compliance, and CRM routing. You don&apos;t need a separate WhatsApp vendor.",
    },
    {
      question: "What does a Saudi AI automation project cost?",
      answer:
        "Projects start at $2,500 USD for a single-workflow Launch deployment and run up to $25,000+ for multi-workflow Scale engagements. Pricing is one-time, with 50% on signing and 50% at go-live. Invoicing in USD or SAR available. See alsolutionsai.online/pricing for full details.",
    },
    {
      question: "How long until our AI is live for Saudi customers?",
      answer:
        "Standard timeline is 30 days from signed contract to live production. We back this with our 30-day go-live guarantee — if we miss the deadline, we work at no additional cost until launch.",
    },
  ],
  closingCtaTitle: "Ready to deploy AI for your Saudi business?",
  closingCtaBody:
    "Book a 30-minute audit. We&apos;ll review your current customer touchpoints across web and WhatsApp, identify three specific automation opportunities, and send you a written scope report — no commitment.",
};

export default function SaudiArabiaPage() {
  return <GeoLandingLayout data={DATA} />;
}
