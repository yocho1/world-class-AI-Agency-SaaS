import type { Metadata } from "next";
import { GeoLandingLayout, type GeoLandingData } from "@/components/GeoLandingLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

const PATH = "/ai-chatbot-agency-london";

export const metadata: Metadata = {
  title: "AI Chatbot Agency London | UK-Based AI Automation in 30 Days | AL Solutions AI",
  description:
    "London-based AI chatbot and automation agency. UK Companies House No. 11521309, founded 2018. HubSpot & Salesforce-integrated AI live in 30 days for fintech, e-commerce, SaaS, and professional services.",
  alternates: alternatesFor(PATH),
  openGraph: {
    url: canonicalUrl(PATH),
    title: "AI Chatbot Agency London | UK-Based AI Automation in 30 Days",
    description:
      "London-based AI chatbot and automation agency. UK Companies House No. 11521309, founded 2018. HubSpot & Salesforce-integrated AI live in 30 days.",
  },
};

const DATA: GeoLandingData = {
  path: PATH,
  city: "London",
  countryCode: "GB",
  country: "United Kingdom",
  eyebrow: "AI Chatbot Agency · London",
  headline: "London AI Chatbot Agency — Production AI Shipped in 30 Days, Not Six Months.",
  subheadline:
    "AL Solutions AI is a UK-registered AI chatbot and automation agency (Companies House No. 11521309, founded 2018) building production-grade AI for London-based fintech, e-commerce, SaaS, and professional services teams. HubSpot, Salesforce, and Intercom-integrated. GDPR-compliant. Live in 30 days.",
  valueProps: [
    {
      title: "UK-registered, GDPR-first",
      description:
        "Companies House No. 11521309. Data processing agreements ready on day one. UK-based contracting, UK-jurisdiction terms, and full GDPR data subject rights handling baked into every deployment.",
    },
    {
      title: "30-day go-live",
      description:
        "Most London agencies quote 3–6 months for a production AI chatbot. We ship in 30 days — backed by our go-live guarantee. If we miss, we work for free until your AI is live.",
    },
    {
      title: "HubSpot & Salesforce native",
      description:
        "We&apos;re built around the CRMs UK growth teams actually use. HubSpot Smart CRM handoff, Salesforce Sales Cloud routing, Intercom escalation, and custom webhook integrations all included.",
    },
    {
      title: "Senior team, no offshore handoff",
      description:
        "Your account is run by the senior team that scoped it. No bait-and-switch. No async chains across 14 time zones. Direct accountability for KPIs and SLAs.",
    },
  ],
  localContext: [
    "London is one of the most competitive AI agency markets in the world. Founders here have heard every variation of the AI sales pitch, from $5,000 prototype shops to $250,000 enterprise transformation programmes that ship a slide deck and an engagement model. The bar for credibility is high, and rightly so.",
    "Our position is straightforward: we are a small, senior UK-registered team that ships production AI chatbots and automation systems in 30 days, integrated with the CRMs you already pay for. We are GDPR-first by default, our contracts are governed by English law, and our 30-day go-live guarantee is backed by a 50/50 milestone payment structure that caps your risk at the deposit.",
    "If you&apos;re a London-based growth team that needs a working AI system shipped to production rather than a roadmap and a quote, this is what we do.",
  ],
  whyHere: [
    {
      heading: "GDPR is treated as table stakes",
      body: "We sign DPAs as standard, not as an enterprise add-on. Data residency, sub-processor disclosure, and Article 28 controller/processor language are built into every engagement.",
    },
    {
      heading: "English-law contracts and UK invoicing",
      body: "Master Services Agreement governed by the laws of England and Wales. UK VAT-compliant invoicing. Payment in GBP, EUR, or USD as required. Companies House No. 11521309.",
    },
    {
      heading: "Built around HubSpot and Salesforce",
      body: "These are the CRMs London growth teams use. We integrate AI handoff with both natively, including custom property mapping, lifecycle stage progression, and timeline-event creation for full sales-team visibility.",
    },
    {
      heading: "30-day go-live guarantee",
      body: "Pay 50% on signing, 50% at go-live. If your AI system isn&apos;t live in production within 30 days of project start, we keep working at no additional cost until it is. Risk is capped at the deposit.",
    },
  ],
  industries: [
    {
      name: "Fintech & InsurTech",
      description:
        "Pre-screening, KYC question deflection, product eligibility, and FCA-aware conversation routing. Audit-logged with full conversation export for compliance reviews.",
    },
    {
      name: "B2B SaaS",
      description:
        "Demo qualification, pricing-page deflection, integration questions, and customer-success deflection for routine support. HubSpot + Intercom integration native.",
    },
    {
      name: "E-Commerce & D2C",
      description:
        "Pre-purchase Q&A, returns and shipping deflection, abandoned-cart recovery on web and WhatsApp, and post-purchase upsell flows. Shopify and WooCommerce supported.",
    },
    {
      name: "Professional Services",
      description:
        "Inbound qualification for legal, accounting, and consulting firms. Conflict-check pre-screening, matter-type routing, and Calendly handoff for partner-level meetings.",
    },
    {
      name: "Real Estate & PropTech",
      description:
        "Lettings and sales inquiry qualification, viewing booking, and tenant communications automation. Reapit, Alto, and JupiX-compatible CRM integration.",
    },
    {
      name: "Healthcare & Clinics",
      description:
        "Private-clinic patient intake, appointment booking, and triage. CQC-aware conversation guardrails. NHS interoperability available on request.",
    },
  ],
  metrics: [
    { stat: "30 days", label: "From contract to live", note: "Average across 2024 deployments" },
    { stat: "+150%", label: "Qualified lead rate uplift", note: "B2B SaaS deployment, 30 days post-launch" },
    { stat: "12", label: "Production deployments", note: "Live client systems shipped in 2024" },
  ],
  faqs: [
    {
      question: "Are you UK-based or offshore?",
      answer:
        "AL Solutions AI is a UK-registered company (Companies House No. 11521309) founded in 2018, with senior team members in the UK and continental Europe. We are not a reseller fronting an offshore agency. Your project is delivered by the same team that scopes it.",
    },
    {
      question: "Do you sign Data Processing Agreements?",
      answer:
        "Yes. We sign GDPR-compliant DPAs (Article 28 standard contractual clauses) on every UK engagement. Data residency, sub-processor list, and breach notification timelines are documented in writing before kickoff.",
    },
    {
      question: "What CRMs do you integrate with?",
      answer:
        "HubSpot, Salesforce, Pipedrive, Zoho, Intercom, Freshdesk, Reapit (real estate), and any platform with a REST API or webhook system. We map qualified leads to the right pipeline with full conversation context, not just a name and email.",
    },
    {
      question: "What does a London AI chatbot project cost?",
      answer:
        "Projects start at $2,500 USD for a single-workflow Launch deployment and run up to $25,000+ for multi-workflow Scale engagements. Pricing is one-time. UK invoicing is available with VAT applied where required. Full pricing at alsolutionsai.online/pricing.",
    },
    {
      question: "Can you ship in less than 30 days?",
      answer:
        "Our Launch tier ships in 14 days for single-workflow chatbots. Most multi-channel engagements (web + WhatsApp + CRM integration) ship in 30 days. Faster timelines are possible for tightly-scoped projects — get in touch with your specifics.",
    },
    {
      question: "Do you work with non-London UK clients?",
      answer:
        "Yes. We work with growth teams across the UK and continental Europe. The London focus reflects where the largest concentration of our pipeline sits, but our delivery is fully remote with on-site visits for kickoff and milestones when useful.",
    },
  ],
  closingCtaTitle: "Ready to ship production AI for your London business?",
  closingCtaBody:
    "Book a 30-minute audit. We&apos;ll review your current funnel, identify three specific AI automation opportunities, and send you a written scope report with timelines and pricing — no commitment.",
};

export default function LondonPage() {
  return <GeoLandingLayout data={DATA} />;
}
