import type { Metadata } from "next";
import { GeoLandingLayout, type GeoLandingData } from "@/components/GeoLandingLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

const PATH = "/ai-chatbot-agency-dubai";

export const metadata: Metadata = {
  title: "AI Chatbot Agency Dubai | Arabic & English AI in 30 Days | AL Solutions AI",
  description:
    "Dubai-focused AI chatbot agency building Arabic and English AI for hospitality, retail, real estate, and fintech. Live in 30 days with WhatsApp, HubSpot, and Salesforce integration.",
  alternates: alternatesFor(PATH),
  openGraph: {
    url: canonicalUrl(PATH),
    title: "AI Chatbot Agency Dubai | Arabic & English AI in 30 Days",
    description:
      "Dubai-focused AI chatbot agency building Arabic and English AI for hospitality, retail, real estate, and fintech. Live in 30 days.",
  },
};

const DATA: GeoLandingData = {
  path: PATH,
  city: "Dubai",
  countryCode: "AE",
  country: "United Arab Emirates",
  eyebrow: "AI Chatbot Agency · Dubai",
  headline: "AI Chatbot Agency for Dubai Businesses — Arabic & English AI, Live in 30 Days.",
  subheadline:
    "We build production-grade AI chatbots and WhatsApp automation for Dubai-based hospitality, retail, real estate, and fintech teams. Native Arabic & English support, integrated with HubSpot, Salesforce, and your existing CRM — in 30 days, not six months.",
  valueProps: [
    {
      title: "Native Arabic & English",
      description:
        "Modern Standard Arabic, Khaleeji dialect handling, and full English support — with seamless mid-conversation switching for real Dubai customers.",
    },
    {
      title: "WhatsApp-first",
      description:
        "WhatsApp Business API is the dominant channel in the UAE. Every chatbot ships with WhatsApp deployment included, not as an afterthought.",
    },
    {
      title: "30-day go-live",
      description:
        "We back every Dubai engagement with our 30-day go-live guarantee. If we miss the deadline, we work for free until your AI is live.",
    },
    {
      title: "Integrated with your stack",
      description:
        "HubSpot, Salesforce, Zoho, Bitrix24, and custom CRMs supported. Lead handoff with full conversation context, not just a contact form submission.",
    },
  ],
  localContext: [
    "Dubai is one of the most digitally-mature B2C markets in the MENA region. WhatsApp adoption is near-universal, customers expect instant Arabic-language replies, and the cost of slow first-response on a hot inquiry is measured in lost revenue per minute. Generic English-only chatbots built for North American funnels simply do not perform here.",
    "Most Dubai businesses we audit have one of three problems: a chatbot that can&apos;t handle Arabic properly, a CRM that isn&apos;t connected to their messaging stack, or both. The result is qualified inquiries falling through the cracks while sales teams chase cold lists. AL Solutions AI was built to close that gap.",
    "We&apos;re a UK-registered company (Companies House No. 11521309) founded in 2018, with a senior delivery team that deploys multilingual AI specifically for MENA-facing businesses. Our Dubai engagements ship in 30 days, not six months — and they ship in production, not as a slide deck.",
  ],
  whyHere: [
    {
      heading: "We speak the customer&apos;s actual language",
      body: "Our chatbots handle Modern Standard Arabic and Gulf dialect (Khaleeji) without the translation-layer brittleness of off-the-shelf tools. Real Dubai customers don&apos;t type formal Arabic — they mix English, Arabic, and dialect mid-sentence. Our AI is trained for that.",
    },
    {
      heading: "WhatsApp is treated as a first-class channel",
      body: "WhatsApp Business API integration is included in every Dubai deployment. Templates, opt-in flows, conversation routing, and full CRM context — not bolted on after the fact.",
    },
    {
      heading: "Arabic-first conversation design",
      body: "Right-to-left UI on the web widget, Arabic-aware date/time/currency formatting, and conversation flows designed for the way Arabic speakers actually phrase requests. This is the layer most agencies skip.",
    },
    {
      heading: "Senior delivery, no offshore handoff",
      body: "Your project is run by the same senior team that scopes it. No bait-and-switch to junior implementers. No 14-time-zone async chains. Direct accountability for KPIs from day one.",
    },
  ],
  industries: [
    {
      name: "Hospitality & Tourism",
      description:
        "AI concierge across web and WhatsApp for hotels, F&B, and tourism operators. Multilingual booking inquiries, room availability, and instant qualified-lead handoff to revenue teams.",
    },
    {
      name: "Real Estate",
      description:
        "24/7 lead qualification for off-plan, secondary-market, and rental inquiries. Capture budget, area, bedroom count, and timeline before routing to the right agent — in Arabic or English.",
    },
    {
      name: "E-Commerce & Retail",
      description:
        "Product Q&A, size and stock checks, abandoned-cart recovery on WhatsApp, and post-purchase support automation. Tested for Dubai shipping windows and Khaleeji shopping patterns.",
    },
    {
      name: "Fintech & Banking",
      description:
        "KYC pre-screening, product eligibility, FAQ deflection, and qualified handoff to relationship managers — with full audit logging for SCA / DFSA compliance reviews.",
    },
    {
      name: "Healthcare & Clinics",
      description:
        "Patient intake, appointment booking, and triage routing across web and WhatsApp. Arabic-first conversation flows for clinics and aesthetic providers serving GCC patients.",
    },
    {
      name: "Education & Training",
      description:
        "Programme inquiries, enrolment qualification, and parent communications for K-12 and higher-education institutions across the UAE. Bilingual by default.",
    },
  ],
  metrics: [
    { stat: "30 days", label: "From contract to live", note: "Average across 2024 deployments" },
    { stat: "+62%", label: "Faster first response", note: "Hospitality client, post-launch" },
    { stat: "12", label: "Production deployments", note: "Live client systems shipped in 2024" },
  ],
  faqs: [
    {
      question: "Do you have a physical office in Dubai?",
      answer:
        "AL Solutions AI is registered in the UK (Companies House No. 11521309) and serves clients across the UAE remotely. We meet clients on-site in Dubai for kickoff and key milestones when the engagement requires it. Our delivery team works in overlapping GCC and European hours, so daytime communication in UAE time is always available.",
    },
    {
      question: "Can your AI handle Arabic dialects, not just Modern Standard Arabic?",
      answer:
        "Yes. We train every Dubai-deployed chatbot for Khaleeji (Gulf) dialect alongside Modern Standard Arabic, and we handle the code-switching pattern most Arabic speakers actually use — mixing English, MSA, and dialect within a single message. This is configured per-client based on your customer segment.",
    },
    {
      question: "Is WhatsApp Business API included or separate?",
      answer:
        "WhatsApp deployment is included in every Dubai chatbot project. We handle Meta Business verification, template approval, opt-in compliance, and CRM routing. You don&apos;t need a separate WhatsApp vendor.",
    },
    {
      question: "What does a Dubai AI chatbot project cost?",
      answer:
        "Projects start at $2,500 USD for a single-workflow Launch deployment and run up to $25,000+ for multi-workflow Scale engagements. Pricing is one-time, with 50% on signing and 50% at go-live. See alsolutionsai.online/pricing for full details.",
    },
    {
      question: "How long until our AI chatbot is live for Dubai customers?",
      answer:
        "Standard timeline is 30 days from signed contract to live production. We back this with a 30-day go-live guarantee — if we miss the deadline, we work at no additional cost until launch.",
    },
    {
      question: "What CRMs do you integrate with for UAE businesses?",
      answer:
        "HubSpot, Salesforce, Zoho, Bitrix24, Pipedrive, and custom REST/webhook-based CRMs. We&apos;ve integrated with most platforms used by UAE growth teams. If your CRM has an API, we can route qualified leads to it with full conversation context.",
    },
  ],
  closingCtaTitle: "Ready to deploy AI for your Dubai business?",
  closingCtaBody:
    "Book a 30-minute audit. We&apos;ll review your current customer touchpoints, identify three specific automation opportunities, and send you a written scope report — no commitment.",
};

export default function DubaiPage() {
  return <GeoLandingLayout data={DATA} />;
}
