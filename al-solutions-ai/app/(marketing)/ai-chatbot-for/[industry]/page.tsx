import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryLayout, type IndustryLandingData } from "@/components/IndustryLayout";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

const INDUSTRIES: Record<string, IndustryLandingData> = {
  "real-estate": {
    path: "/ai-chatbot-for/real-estate",
    industry: "Real Estate",
    eyebrow: "Industry · Real Estate",
    headline: "AI Chatbot for Real Estate — Instant Property Q&A, Lead Qualification, 24/7 Availability.",
    subheadline:
      "We deploy AI chatbots for real estate agencies, property developers, and PropTech platforms across MENA and Europe. Answer property questions instantly in Arabic and English, qualify buyer intent, and route hot leads to your sales team with full conversation context.",
    painPoints: [
      "Property inquiries flood in at all hours — evenings, weekends, holidays — and slow response times cost you qualified buyers.",
      "Your agents spend 60% of their time answering the same questions (price, size, location, availability) instead of closing deals.",
      "Leads from WhatsApp, Instagram, and your website sit in separate inboxes with no unified qualification or routing.",
      "Generic chatbots can&apos;t answer property-specific questions like \"Is this unit still available?\" or \"What are the payment terms?\" because they have no access to your listings.",
    ],
    outcomes: [
      { stat: "+180%", label: "Lead response rate", note: "Real estate client, first 60 days" },
      { stat: "-55%", label: "Agent time on triage", note: "Routine inquiries automated" },
      { stat: "3x", label: "Faster lead qualification", note: "Vs. manual phone/email qualification" },
    ],
    useCases: [
      {
        title: "Property inquiry automation",
        body: "Answer price, size, floor plan, availability, and payment-plan questions instantly by integrating with your CRM or property management system. The AI only shows accurate, live data — never guessing.",
      },
      {
        title: "Buyer qualification and scoring",
        body: "Qualify buyers on budget range, timeline, financing preference, and property type before routing to the right agent. Hot leads get priority routing; nurture-stage leads enter an automated follow-up sequence.",
      },
      {
        title: "WhatsApp property alerts",
        body: "Send new-listing alerts, price-drop notifications, and viewing reminders via WhatsApp Business API with full opt-in consent management. Higher open rates than email with direct two-way conversation capability.",
      },
      {
        title: "Off-plan and developer sales",
        body: "Handle high-volume off-plan sales inquiries with automated unit selection, payment-plan explanations, and document-request workflows. Route serious buyers to your sales centre with full pre-qualification data.",
      },
    ],
    faqs: [
      {
        question: "Can the AI access our live property listings?",
        answer:
          "Yes — we integrate with your CRM, property management system, or listing feed via REST API. The AI answers questions using live data, not a static knowledge base. When a unit is sold, the AI knows immediately.",
      },
      {
        question: "Does it work for off-plan and new developments?",
        answer:
          "Absolutely. Off-plan sales generate massive inquiry volumes. We build unit-selection flows, payment-plan calculators, and document-request automation that scales with your sales volume without adding headcount.",
      },
      {
        question: "Which languages does it support?",
        answer:
          "Arabic (Modern Standard, Khaleeji, and Najdi dialects), English, and French as standard. The AI handles code-switching naturally — a buyer can ask in Arabic and follow up in English without breaking the conversation.",
      },
      {
        question: "How long until it&apos;s live?",
        answer:
          "Standard real estate deployments go live in 30 days from signed contract, including WhatsApp Business API verification and CRM integration. Tightly-scoped single-agent deployments can ship in 14 days.",
      },
      {
        question: "What does it cost?",
        answer:
          "Real estate AI chatbot projects typically run $4,500 to $18,000 USD as one-time fees, depending on listing system integrations, number of languages, and workflow complexity. See alsolutionsai.online/pricing for full details.",
      },
    ],
  },
  healthcare: {
    path: "/ai-chatbot-for/healthcare",
    industry: "Healthcare",
    eyebrow: "Industry · Healthcare & Medical",
    headline: "AI Chatbot for Healthcare — Appointment Booking, Patient Q&A, HIPAA-Ready Architecture.",
    subheadline:
      "We deploy AI chatbots for clinics, hospitals, and healthtech platforms across MENA and Europe. Handle appointment scheduling, pre-visit questionnaires, and routine patient questions in Arabic and English — with privacy-first architecture designed for healthcare compliance.",
    painPoints: [
      "Your reception team spends 70% of their time answering the same questions: opening hours, doctor availability, insurance acceptance, and appointment rescheduling.",
      "Patients expect instant answers on WhatsApp, but your current system routes everything to a human queue with 4–6 hour response times.",
      "No-show rates run 20–30% because patients forget appointments and your reminder system is one-way SMS with no rescheduling option.",
      "Generic chatbots can&apos;t handle healthcare-specific queries and create liability risk by giving incorrect medical information.",
    ],
    outcomes: [
      { stat: "-40%", label: "No-show rate", note: "Healthcare client, 90 days post-launch" },
      { stat: "+220%", label: "Appointment booking rate", note: "Web + WhatsApp combined" },
      { stat: "-65%", label: "Reception call volume", note: "Routine queries automated" },
    ],
    useCases: [
      {
        title: "Intelligent appointment booking",
        body: "Patients book, reschedule, and cancel appointments via web chat or WhatsApp by selecting their preferred doctor, date, and time slot. The AI checks real-time availability against your practice-management system and sends confirmation with calendar invite.",
      },
      {
        title: "Pre-visit questionnaires",
        body: "Automated symptom triage and pre-visit data collection via conversational forms. Responses are structured, exportable, and written directly to your EHR or practice-management system before the patient arrives.",
      },
      {
        title: "WhatsApp appointment reminders",
        body: "Two-way WhatsApp reminders 24 hours and 2 hours before appointments, with one-tap reschedule and cancellation options. Patients reply directly to confirm or move their slot — no phone calls required.",
      },
      {
        title: "Insurance and billing Q&A",
        body: "Answer coverage questions, co-pay estimates, and billing inquiries using your specific insurance panel and fee schedule. Escalate complex cases to your billing team with full conversation context.",
      },
    ],
    faqs: [
      {
        question: "Is the AI trained to give medical advice?",
        answer:
          "No — and it never will. Our healthcare chatbots are explicitly scoped to administrative, scheduling, and general-practice information only. Any symptom or treatment question outside the approved scope triggers an immediate escalation to a clinical professional with full context.",
      },
      {
        question: "What compliance standards do you support?",
        answer:
          "We design deployments to support HIPAA (US), GDPR (EU/UK), Saudi PDPL, and UAE health data regulations. All patient data is encrypted in transit and at rest, with access controls, audit logging, and data-residency options available.",
      },
      {
        question: "Which practice management systems do you integrate with?",
        answer:
          "We integrate with most major systems including Epic, Cerner, Salesforce Health Cloud, and regional platforms via REST API or HL7 FHIR. If your system has an API, we can connect it.",
      },
      {
        question: "How long until it&apos;s live?",
        answer:
          "Healthcare deployments typically go live in 30–45 days, including compliance review, API integration, and staff training. We work closely with your clinical and IT teams during the scoping phase to ensure the AI stays within approved conversational boundaries.",
      },
      {
        question: "What does a healthcare AI deployment cost?",
        answer:
          "Healthcare chatbot projects typically run $6,500 to $25,000+ USD as one-time fees, depending on EHR integrations, compliance requirements, and workflow complexity. See alsolutionsai.online/pricing for full details.",
      },
    ],
  },
  legal: {
    path: "/ai-chatbot-for/legal",
    industry: "Legal",
    eyebrow: "Industry · Legal Services",
    headline: "AI Chatbot for Law Firms — Client Intake, Case Triage, 24/7 Availability in Arabic & English.",
    subheadline:
      "We deploy AI chatbots for law firms, legal consultancies, and in-house legal teams across MENA and Europe. Automate client intake, qualify case types, answer common legal questions, and route high-value inquiries to the right partner — all with full confidentiality safeguards.",
    painPoints: [
      "Your intake team spends hours qualifying prospects who are not a fit for your practice area, billing range, or jurisdiction.",
      "Potential clients message at odd hours and expect a response within minutes — not the 24–48 hour turnaround your team currently manages.",
      "Routine questions (\"Do you handle employment disputes?\", \"What are your fees?\", \"Which courts do you cover?\") consume partner time that should be billable.",
      "Leads from multiple channels — website, WhatsApp, LinkedIn, referrals — arrive disconnected with no unified intake record.",
    ],
    outcomes: [
      { stat: "+150%", label: "Intake form completion", note: "Legal client, post-launch" },
      { stat: "-70%", label: "Unqualified calls", note: "Routed away from partners" },
      { stat: "24/7", label: "Client availability", note: "Without adding night staff" },
    ],
    useCases: [
      {
        title: "Intelligent client intake",
        body: "Qualify prospects by practice area, jurisdiction, timeline, and budget range before they reach a partner. The AI captures case summaries, urgency levels, and preferred contact methods, then routes to the right lawyer with a structured intake brief.",
      },
      {
        title: "Practice-area Q&A",
        body: "Answer common questions about your services, fee structures, jurisdictions, and processes using approved language reviewed by your firm. The AI never gives legal advice — it explains your firm's capabilities and escalates substantive questions to a lawyer.",
      },
      {
        title: "WhatsApp client communication",
        body: "Meet clients on their preferred channel. WhatsApp Business API deployment with end-to-end encryption, document-sharing capability, and conversation logging that integrates with your practice-management system.",
      },
      {
        title: "Document collection automation",
        body: "Guide clients through document-collection workflows for specific case types — contracts, ID documents, correspondence, evidence. The AI explains what is needed, why it matters, and how to submit it securely.",
      },
    ],
    faqs: [
      {
        question: "Can the AI give legal advice?",
        answer:
          "No — and we explicitly design against it. Our legal chatbots answer administrative and procedural questions only. Any question that requires legal analysis, interpretation, or advice triggers an immediate escalation to a qualified lawyer with full conversation context.",
      },
      {
        question: "How do you handle confidentiality?",
        answer:
          "All conversations are encrypted end-to-end, stored with access controls, and governed by your firm's data-retention policy. We can deploy on infrastructure that satisfies your jurisdiction's legal-professional privilege requirements, including on-premise or private-cloud options.",
      },
      {
        question: "Which practice management systems do you integrate with?",
        answer:
          "We integrate with Clio, LexisNexis, Salesforce, and most practice-management platforms via API. Custom integrations with in-house systems are available for larger firms.",
      },
      {
        question: "How long until it&apos;s live?",
        answer:
          "Legal deployments typically go live in 30 days from signed contract, including intake-flow design, approved-answer library creation, and staff training. Complex multi-office deployments may take 45 days.",
      },
      {
        question: "What does a legal AI deployment cost?",
        answer:
          "Legal chatbot projects typically run $5,000 to $20,000 USD as one-time fees, depending on the number of practice areas, jurisdictions, and integrations. See alsolutionsai.online/pricing for full details.",
      },
    ],
  },
  ecommerce: {
    path: "/ai-chatbot-for/ecommerce",
    industry: "E-Commerce",
    eyebrow: "Industry · E-Commerce & D2C",
    headline: "AI Chatbot for E-Commerce — Pre-Purchase Q&A, Cart Recovery, Order Support, Live in 30 Days.",
    subheadline:
      "We deploy AI chatbots for e-commerce and D2C brands across MENA and Europe. Handle pre-purchase questions, recover abandoned carts on WhatsApp, automate order tracking, and scale customer support without scaling headcount.",
    painPoints: [
      "70% of cart abandonments happen because a simple question goes unanswered — size, shipping time, payment options, or return policy.",
      "Your support team is overwhelmed by repetitive order-status and return questions that follow the same pattern every time.",
      "Email cart-recovery has a 15% open rate; WhatsApp has 90% — but you have no automated WhatsApp recovery system.",
      "Customers expect instant answers at all hours, but your team works business hours in one timezone.",
    ],
    outcomes: [
      { stat: "+35%", label: "Cart recovery revenue", note: "E-commerce client, 60 days" },
      { stat: "-60%", label: "Support ticket volume", note: "Post-purchase queries automated" },
      { stat: "+200%", label: "Pre-purchase engagement", note: "Web chat conversion rate" },
    ],
    useCases: [
      {
        title: "Pre-purchase product Q&A",
        body: "Answer size, fit, material, compatibility, and feature questions in real time using your product catalog and knowledge base. The AI pulls live inventory, pricing, and shipping data — never guessing.",
      },
      {
        title: "Abandoned-cart recovery on WhatsApp",
        body: "Send personalised, consented WhatsApp messages to shoppers who abandoned their cart. Include product images, current stock status, and one-tap checkout links. Recovery revenue typically increases 25–40% within 60 days.",
      },
      {
        title: "Order tracking and post-purchase support",
        body: "Automate order-status, tracking, delivery-estimate, and return-initiation queries end-to-end. Integrate with your shipping carrier and helpdesk to provide real-time updates without human intervention.",
      },
      {
        title: "Returns and exchange automation",
        body: "Guide customers through return-policy checks, eligibility verification, and return-label generation. Escalate edge cases to your support team with full order history and conversation context.",
      },
    ],
    faqs: [
      {
        question: "Which e-commerce platforms do you integrate with?",
        answer:
          "Shopify, WooCommerce, Magento, BigCommerce, and custom backends with REST or GraphQL APIs. We do live inventory, price, and order-status lookups — not stale snapshots.",
      },
      {
        question: "Is WhatsApp cart recovery compliant?",
        answer:
          "Yes — when handled correctly. We manage Meta Business verification, message-template approval, and explicit opt-in consent flows. All recovery messaging complies with GDPR, PDPL, and local marketing-consent law.",
      },
      {
        question: "Can the AI handle multiple languages?",
        answer:
          "Yes — Arabic (Modern Standard, Khaleeji, Najdi), English, and French as standard. Customers can switch languages mid-conversation and the AI responds in the same register.",
      },
      {
        question: "How long until it&apos;s live?",
        answer:
          "E-commerce deployments typically go live in 30 days, including platform integration, WhatsApp Business API verification, and cart-recovery workflow setup. Simple storefront chatbots can ship in 14 days.",
      },
      {
        question: "What does an e-commerce AI deployment cost?",
        answer:
          "E-commerce chatbot projects typically run $3,500 to $18,000 USD as one-time fees, depending on platform integrations, number of channels, and workflow complexity. See alsolutionsai.online/pricing for full details.",
      },
    ],
  },
  education: {
    path: "/ai-chatbot-for/education",
    industry: "Education",
    eyebrow: "Industry · Education & EdTech",
    headline: "AI Chatbot for Education — Admissions, Student Support, Course Q&A, Multilingual by Default.",
    subheadline:
      "We deploy AI chatbots for universities, training institutes, and EdTech platforms across MENA and Europe. Handle admissions inquiries, course questions, student support, and administrative requests in Arabic, English, and French — reducing staff workload and improving student experience.",
    painPoints: [
      "Admissions teams drown in repetitive questions about deadlines, requirements, fees, and program details during peak application season.",
      "International students message at all hours from different time zones, and delayed responses cost you enrolled candidates.",
      "Current support is fragmented across email, WhatsApp, phone, and social media with no unified record of student inquiries.",
      "Existing chatbots can&apos;t answer course-specific questions because they have no access to your curriculum, schedule, or admission requirements.",
    ],
    outcomes: [
      { stat: "+300%", label: "Inquiry response speed", note: "Education client, post-launch" },
      { stat: "-50%", label: "Admissions staff workload", note: "Routine queries automated" },
      { stat: "+45%", label: "Application completion rate", note: "Guided chat support vs. email only" },
    ],
    useCases: [
      {
        title: "Admissions inquiry automation",
        body: "Answer program details, entry requirements, deadlines, fees, and application-process questions instantly. The AI pulls data from your admissions system and course catalog so answers are always current and accurate.",
      },
      {
        title: "Student onboarding and orientation",
        body: "Guide new students through enrollment steps, document submission, orientation schedules, and campus resources. Automated reminders and checklists keep students on track without staff follow-up calls.",
      },
      {
        title: "Course and schedule Q&A",
        body: "Answer questions about course content, prerequisites, instructor details, class schedules, and room locations by integrating with your student-information system. Students get instant answers instead of waiting for registrar office hours.",
      },
      {
        title: "WhatsApp student communication",
        body: "Meet students on their preferred channel. Send deadline reminders, schedule changes, and event notifications via WhatsApp Business API with two-way conversation capability for follow-up questions.",
      },
    ],
    faqs: [
      {
        question: "Can the AI access our course catalog and schedules?",
        answer:
          "Yes — we integrate with your student information system, LMS, or admissions platform via API. The AI answers questions using live data, so when a course is full or a deadline changes, students get accurate information immediately.",
      },
      {
        question: "Does it work for K-12 schools as well as universities?",
        answer:
          "Yes. We deploy for universities, colleges, training institutes, language schools, and K-12 institutions. The conversation flows and data sources are tailored to your specific institution type and student demographics.",
      },
      {
        question: "Which languages does it support?",
        answer:
          "Arabic (Modern Standard, Khaleeji, Najdi), English, and French as standard, with additional languages available. This is critical for MENA institutions serving international student populations.",
      },
      {
        question: "How long until it&apos;s live?",
        answer:
          "Education deployments typically go live in 30 days from signed contract, including SIS/LMS integration, WhatsApp Business API verification, and staff training. Simple inquiry-only chatbots can ship in 14 days.",
      },
      {
        question: "What does an education AI deployment cost?",
        answer:
          "Education chatbot projects typically run $4,500 to $20,000 USD as one-time fees, depending on system integrations, number of programs, and workflow complexity. See alsolutionsai.online/pricing for full details.",
      },
    ],
  },
};

const VALID_SLUGS = Object.keys(INDUSTRIES);

interface Props {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  return VALID_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const data = INDUSTRIES[industry];
  if (!data) return {};

  return {
    title: `AI Chatbot for ${data.industry} | AL Solutions AI`,
    description: data.subheadline.slice(0, 160),
    alternates: alternatesFor(data.path),
    openGraph: {
      url: canonicalUrl(data.path),
      title: `AI Chatbot for ${data.industry} | AL Solutions AI`,
      description: data.subheadline.slice(0, 160),
    },
  };
}

export default async function ProgrammaticIndustryPage({ params }: Props) {
  const { industry } = await params;
  const data = INDUSTRIES[industry];
  if (!data) notFound();

  return <IndustryLayout data={data} />;
}
