import type { Metadata } from "next";
import { IndustryLayout, type IndustryLandingData } from "@/components/IndustryLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

const PATH = "/industries/retail";

export const metadata: Metadata = {
  title: "AI Chatbot for Retail & E-Commerce | WhatsApp Automation | AL Solutions AI",
  description:
    "AI chatbots and WhatsApp automation for retail and e-commerce. Pre-purchase Q&A, abandoned-cart recovery, post-purchase support. Live in 30 days across MENA & UK.",
  alternates: alternatesFor(PATH),
  openGraph: {
    url: canonicalUrl(PATH),
    title: "AI Chatbot for Retail & E-Commerce | WhatsApp Automation",
    description:
      "AI chatbots and WhatsApp automation for retail and e-commerce. Pre-purchase Q&A, abandoned-cart recovery, post-purchase support.",
  },
};

const DATA: IndustryLandingData = {
  path: PATH,
  industry: "Retail",
  eyebrow: "Industry · Retail & E-Commerce",
  headline: "AI for Retail & E-Commerce — Pre-Purchase Q&A, WhatsApp Cart Recovery, Live in 30 Days.",
  subheadline:
    "We deploy production AI chatbots for D2C, retail, and e-commerce brands across MENA and the UK. Pre-purchase Q&A, size and stock checks, abandoned-cart recovery on WhatsApp, post-purchase support, and CRM-integrated lead routing — shipped in 30 days, not six months.",
  painPoints: [
    "Pre-purchase questions go unanswered overnight, and you lose the customer to a competitor by morning.",
    "Abandoned-cart recovery is still being run by an email tool that ignores the dominant channel for your customer base — WhatsApp.",
    "Returns and shipping inquiries eat 50–70% of customer service capacity but follow predictable patterns the AI could handle.",
    "Existing chatbot tools can&apos;t check live inventory, can&apos;t respect your shipping windows, and can&apos;t route post-purchase issues into your helpdesk with full context.",
  ],
  outcomes: [
    { stat: "+44%", label: "Lead capture rate", note: "Retail client, post-launch" },
    { stat: "+150%", label: "Qualified inquiry rate", note: "WhatsApp + web combined" },
    { stat: "30 days", label: "From contract to live", note: "Average across 2024 deployments" },
  ],
  useCases: [
    {
      title: "Pre-purchase product Q&A",
      body: "Size, fit, material, stock availability, and shipping-window questions answered in real time on web and WhatsApp. Live inventory checks against your Shopify, WooCommerce, or custom catalog backend.",
    },
    {
      title: "Abandoned-cart recovery on WhatsApp",
      body: "Trigger consented WhatsApp recovery messages with personalised product details, current stock status, and one-tap checkout links. Higher open and conversion rates than email — when handled compliantly.",
    },
    {
      title: "Post-purchase support automation",
      body: "Order tracking, returns initiation, refund status, and exchange handling automated end-to-end, with escalation paths to your helpdesk for non-routine cases. Klaviyo, Gorgias, Zendesk, and Freshdesk supported.",
    },
    {
      title: "Lead routing to sales teams",
      body: "High-intent inquiries (B2B wholesale, bulk orders, custom requests) qualified and routed to the right sales person in HubSpot or Salesforce, with full conversation context and pricing tier flags.",
    },
  ],
  relatedCaseStudy: {
    title: "Atlas Retail: +44% lead capture in 35 days",
    summary:
      "How Atlas Retail increased lead capture rate by 44% with intelligent lead routing and WhatsApp automation, from concept to live in 35 days.",
    href: "/case-studies/retail-routing",
  },
  faqs: [
    {
      question: "Which e-commerce platforms do you integrate with?",
      answer:
        "Shopify, WooCommerce, Magento, BigCommerce, and most custom catalog backends with REST or GraphQL APIs. We do live stock and price checks against your platform, not against a stale snapshot.",
    },
    {
      question: "Is WhatsApp Business compliant for cart-recovery messages?",
      answer:
        "Yes — when handled correctly. We manage Meta Business verification, message-template approval, and consent-managed opt-in flows so your WhatsApp messaging stays within Meta&apos;s commerce-policy guidelines and local marketing-consent law (GDPR, PDPL, etc.).",
    },
    {
      question: "Can the AI handle multilingual customer queries?",
      answer:
        "Yes. We support Arabic (Modern Standard, Khaleeji, Najdi), English, and French as standard, plus other languages on request. Customers can switch languages mid-conversation and the AI responds in the same register.",
    },
    {
      question: "What CRMs and helpdesks do you integrate with?",
      answer:
        "HubSpot, Salesforce, Klaviyo, Gorgias, Zendesk, Freshdesk, Intercom, and any platform with a REST API or webhook. Lead handoff and ticket creation include full conversation context and customer purchase history.",
    },
    {
      question: "How long until our retail AI is live?",
      answer:
        "Standard timeline is 30 days from signed contract to live production, including WhatsApp Business API verification and full e-commerce integration. Single-workflow deployments can ship in 14 days for tightly-scoped Launch tier engagements.",
    },
    {
      question: "What does a retail AI deployment cost?",
      answer:
        "Retail engagements typically run $2,500 to $25,000+ USD as one-time fees, depending on the number of workflows, channels, and integrations. Pricing is structured 50% on signing and 50% at go-live. See alsolutionsai.online/pricing for full details.",
    },
  ],
};

export default function RetailIndustryPage() {
  return <IndustryLayout data={DATA} />;
}
