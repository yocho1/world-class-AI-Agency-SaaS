"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui";

// =======================
// 1. HERO SECTION DATA
// =======================
const HERO_DATA = {
  service: "WhatsApp AI Agent (MENA)",
  headline: "Your buyers are on WhatsApp. Your competitors reply in 8 minutes. You reply in 4 hours.",
  subheadline: "A WhatsApp Business AI agent built specifically for MENA markets. Native Arabic dialects (Gulf, Levantine, Maghrebi, MSA), mid-message code-switching with English and French, live inventory matching, and CRM sync. Currently in production for one UAE real estate group handling 200+ qualified leads/day across two cities.",
  metric: "200+ daily enquiries handled · zero added headcount",
  cta: "Book free 30-min audit",
};

// =======================
// 2. WHO THIS IS FOR (Industries)
// =======================
const INDUSTRIES = [
  {
    icon: "🏘️",
    name: "Real estate agencies in GCC",
    description:
      "UAE, Saudi, Qatar, Kuwait. Buyers enquire in mixed Arabic-English at 10pm and lose interest by 8am the next morning. The AI captures budget, area, bedroom count, and timeline in 90 seconds, then surfaces 3 matching properties — in the same WhatsApp thread.",
  },
  {
    icon: "🛍️",
    name: "MENA D2C and e-commerce brands",
    description:
      "Buyers in Saudi and the UAE prefer WhatsApp over website chat 4:1. The AI answers product questions, qualifies size and preference, and routes to a human for final close — in Arabic, with the right register (formal for older buyers, Gulf-conversational for younger).",
  },
  {
    icon: "🏥",
    name: "UK businesses serving Arabic-speaking communities",
    description:
      "Homecare, healthcare, legal, and financial services in London, Birmingham, and Manchester serving Arabic-speaking diaspora. The AI handles enquiries in the customer's preferred language with full RTL support and dialect-appropriate responses.",
  },
];

// =======================
// 3. WHAT'S INCLUDED (Features)
// =======================
const FEATURES = [
  "WhatsApp Business API account (verified, with green tick)",
  "Native Arabic dialect handling: Gulf, Levantine, Maghrebi, Modern Standard",
  "Mid-message language switching (the buyer drives, the bot mirrors)",
  "Custom qualification flow: budget, location, timeline, decision-maker, financing",
  "Live property or inventory matching against your CMS, MLS feed, or HubSpot Custom Objects",
  "Carousel cards inside WhatsApp with photos, prices, and direct view-details buttons",
  "Hot-lead routing to a named human agent within 30 seconds (via Slack DM + SMS)",
  "HubSpot, Salesforce, or Pipedrive sync with structured fields per qualified lead",
  "Arabic-Indic and Western numeral handling (٠١٢ = 012, parsed and normalised)",
  "RTL-correct conversation summaries delivered to your team",
  "Compliance with Meta's WhatsApp Business policy and Saudi PDPL / UAE PDPL",
  "30 days of post-launch support and weekly conversation review",
];

// =======================
// 4. HOW IT WORKS (Timeline)
// =======================
const TIMELINE_STEPS = [
  {
    step: 1,
    title: "Free audit & scope (Day 0, 48 hours)",
    description:
      "30-minute call with a senior engineer who's shipped WhatsApp AI in MENA before. We diagnose your current enquiry-to-meeting funnel, sample 20 historical conversations to understand the language mix your buyers actually use, and send a written scope inside 48 hours.",
  },
  {
    step: 2,
    title: "WhatsApp Business API approval & conversation design (Days 1–10)",
    description:
      "We submit your WhatsApp Business API application (takes 5–10 working days in MENA). In parallel, we design the qualification flow against your real historical leads — not generic templates. The Meta verification process is the rate-limiting step on this project, which is why we kick it off Day 1.",
  },
  {
    step: 3,
    title: "Build, integrate, and Arabic dialect calibration (Days 11–22)",
    description:
      "Prompt engineering, dialect classifier training on your historical conversations, CRM integration, and inventory matching all built in parallel. We test extensively in Gulf and MSA against real native-speaker examples before launch — no Google-Translate-grade output reaches your buyers.",
  },
  {
    step: 4,
    title: "Go-live and calibration (Days 23–30)",
    description:
      "Live with all enquiries routed through the AI. Daily monitoring for 7 days, weekly reviews for 30. We tune dialect register, qualification thresholds, and hot-lead routing rules based on real Saudi and UAE buyer behaviour.",
  },
  {
    step: 5,
    title: "Handover and ongoing support (Day 30+)",
    description:
      "Full documentation, dialect classifiers, prompts, and credentials handed over. No retainer lock-in. Most MENA clients keep us on monthly for dialect drift monitoring and seasonal property catalogue updates, but it's optional.",
  },
];

// =======================
// 5. KEY METRICS (Stats)
// =======================
const KEY_METRICS = [
  { stat: "200+", label: "Qualified WhatsApp leads per day", note: "UAE real estate group, current production volume" },
  { stat: "47K+", label: "Conversations handled in 8 months", note: "Zero outages, zero buyer complaints escalated" },
  { stat: "91%", label: "Conversation completion rate", note: "After cutting from 7 questions to 4 in week 2" },
];

// =======================
// 6. RELATED CASE STUDY
// =======================
const RELATED_CASE_STUDY = {
  title: "UAE Real Estate Group (NDA)",
  headline: "WhatsApp AI handling 200+ qualified leads per day in Arabic + English across Dubai and Abu Dhabi",
  metric: "−78% response time · +41% lead-to-viewing conversion",
  metricNote: "26 days from contract to live, 3 agents redeployed to higher-value work",
  slug: "nexora-hotels",
  cta: "View full case study →",
};

// =======================
// 7. FAQ (Service-Specific)
// =======================
type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "How do I know your Arabic is production-grade and not Google-Translate-grade?",
    answer:
      "Test it. Type a message in your buyers' real dialect (Gulf, Saudi, Levantine, Egyptian, whatever) on our homepage demo. Try mid-message switching to English. Try Arabic-Indic numerals (٠١٢). Our production systems handle all of this. If our demo can't handle your test, we've failed and you've saved a call.",
  },
  {
    id: 2,
    question: "How long does WhatsApp Business API approval take in MENA?",
    answer:
      "5–10 working days for UAE, Saudi, and Qatar in our experience. We submit on Day 1 of the project so it doesn't delay launch. Meta's approval requires a verified business with a phone number, business address, and website — we'll tell you exactly what they need on the first call.",
  },
  {
    id: 3,
    question: "What if a buyer asks something the AI doesn't know?",
    answer:
      "The AI is built with confidence thresholds. If it isn't sure it can answer accurately (a financing-specific question, an unusual area, a property not in the inventory), it routes to a named human within 30 seconds via Slack DM and SMS. We've never had a client complaint about an AI hallucination in production because we refuse to ship a system that confidently invents answers.",
  },
  {
    id: 4,
    question: "Is this PDPL-compliant (Saudi / UAE data protection)?",
    answer:
      "Yes. Conversation transcripts can be stored entirely within Saudi or UAE data residency requirements if needed (we deploy via Azure OpenAI for in-region processing). We can sign DPAs and handle the buyer-consent flows required under PDPL. GDPR is also supported for UK and EU operations.",
  },
  {
    id: 5,
    question: "Will the AI replace my sales team?",
    answer:
      "It will replace the first 90 seconds of every conversation, which is the part your reps hate doing. The buyer's emotional decision to view a property or book a meeting still happens with a human. In our UAE deployment, the client redeployed 3 of 12 agents to higher-value outbound work; nobody was made redundant. If your model is 'AI replaces humans entirely,' we won't build it for you — it doesn't work in this market.",
  },
];

// =======================
// FAQ COMPONENT
// =======================
function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item) => (
        <details
          className="rounded-2xl border border-border-subtle bg-bg-surface p-5"
          key={item.id}
          open={openId === item.id}
          onToggle={(event) => setOpenId(event.currentTarget.open ? item.id : null)}
        >
          <summary
            aria-controls={`faq-answer-${item.id}`}
            aria-expanded={openId === item.id}
            className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-text-primary hover:text-accent-400 transition-colors"
            id={`faq-q-${item.id}`}
            onClick={(event) => {
              event.preventDefault();
              setOpenId(openId === item.id ? null : item.id);
            }}
          >
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className={`text-text-tertiary transition-transform duration-300 ${
                openId === item.id ? "rotate-180" : "rotate-0"
              }`}
            >
              ▾
            </span>
          </summary>
          <div
            aria-label={item.question}
            className="pt-3 text-sm text-text-secondary"
            id={`faq-answer-${item.id}`}
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

// =======================
// MAIN PAGE COMPONENT
// =======================
export default function LeadConversionPage() {
  return (
    <main className="min-h-screen bg-bg-default">
      {/* ===== 1. HERO SECTION ===== */}
      <section className="border-b border-border-subtle bg-gradient-to-b from-bg-surface to-bg-default py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <span className="inline-flex rounded-full bg-accent-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400">
                {HERO_DATA.service}
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-primary sm:mt-8 sm:text-5xl md:text-6xl">
                {HERO_DATA.headline}
              </h1>

              <p className="mt-6 max-w-2xl text-base text-text-secondary sm:mt-8 sm:text-lg md:text-xl">
                {HERO_DATA.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-accent-400 px-8 text-sm font-semibold text-bg-default transition-all hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
                  href="https://calendly.com/achraflachgar/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {HERO_DATA.cta}
                </a>
                <span className="inline-flex rounded-full bg-green-500/15 px-4 py-2 text-xs font-semibold text-green-600">
                  {HERO_DATA.metric}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 2. WHO THIS IS FOR ===== */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Who this is for
            </h2>
            <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              Any business where not all web visitors are real opportunities, and your sales time is precious.
            </p>

            <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3">
              {INDUSTRIES.map((industry, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8 transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
                >
                  <div className="text-5xl sm:text-6xl">{industry.icon}</div>
                  <h3 className="mt-4 text-lg font-bold text-text-primary">{industry.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 3. WHAT'S INCLUDED ===== */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              What&apos;s included
            </h2>
            <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              A complete conversion optimization system with AI-powered qualification and continuous improvement.
            </p>

            <div className="mt-12 sm:mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-2 max-w-4xl">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 font-bold text-sm">
                    ✓
                  </span>
                  <span className="text-base text-text-secondary leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 4. HOW IT WORKS (Timeline) ===== */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              How it works
            </h2>
            <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              From funnel audit to live optimization in 30 days.
            </p>

            <div className="mt-12 sm:mt-16 space-y-8 max-w-4xl">
              {TIMELINE_STEPS.map((item, idx) => (
                <div key={idx} className="flex gap-6 sm:gap-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent-400 bg-bg-surface text-sm font-bold text-accent-400">
                      {item.step}
                    </div>
                    {idx < TIMELINE_STEPS.length - 1 && (
                      <div className="h-16 w-1 bg-gradient-to-b from-accent-400/50 to-accent-400/10" />
                    )}
                  </div>

                  <div className="pb-4">
                    <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-base text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 5. KEY METRICS ===== */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Why lead conversion matters
            </h2>

            <div className="mt-12 sm:mt-16 grid gap-6 md:grid-cols-3">
              {KEY_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8 text-center transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
                >
                  <p className="text-4xl font-bold text-accent-400 sm:text-5xl">{metric.stat}</p>
                  <p className="mt-3 text-sm font-medium text-text-secondary">{metric.label}</p>
                  <p className="mt-2 text-xs text-text-tertiary">{metric.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 6. RELATED CASE STUDY ===== */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              How we delivered it
            </h2>

            <div className="mt-12 sm:mt-16 rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-surface to-bg-surface/50 p-8 sm:p-12">
              <span className="inline-flex rounded-full bg-accent-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400">
                Case Study
              </span>

              <h3 className="mt-6 text-2xl font-bold text-text-primary sm:text-3xl">
                {RELATED_CASE_STUDY.title}
              </h3>

              <p className="mt-4 text-base text-text-secondary sm:text-lg">{RELATED_CASE_STUDY.headline}</p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-600">
                    {RELATED_CASE_STUDY.metric}
                  </span>
                  <p className="mt-2 text-xs text-text-tertiary">{RELATED_CASE_STUDY.metricNote}</p>
                </div>

                <Link
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-400 transition-colors hover:text-accent-300"
                  href={`/case-studies/${RELATED_CASE_STUDY.slug}`}
                >
                  {RELATED_CASE_STUDY.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Resources */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">Related resources</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Link href="/case-studies/retail-routing" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">Atlas Retail case study</h3>
                <p className="mt-2 text-sm text-text-secondary">How Atlas Retail increased lead capture by 44% with intelligent AI routing across 8 stores in 35 days.</p>
              </Link>
              <Link href="/blog/ai-lead-qualification-guide" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">Lead qualification guide</h3>
                <p className="mt-2 text-sm text-text-secondary">How to build an AI qualification flow that scores, routes, and books meetings automatically.</p>
              </Link>
              <Link href="/industries/retail" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">Retail AI solutions</h3>
                <p className="mt-2 text-sm text-text-secondary">Pre-purchase Q&A, abandoned-cart recovery, and lead routing for e-commerce and retail brands.</p>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 7. FAQ ===== */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Questions about lead conversion?
            </h2>

            <div className="mt-12 sm:mt-16 max-w-3xl">
              <FaqAccordion />
            </div>

            <a
              className="mt-6 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300"
              href="https://calendly.com/achraflachgar/15min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Still have questions? Talk to our team →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== 8. BOTTOM CTA ===== */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-400/5 to-accent-400/0 p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                Ready to improve your conversion rate?
              </h2>

              <p className="mt-4 text-base text-text-secondary sm:text-lg">
                Let&apos;s review your funnel and identify 3–5 quick wins for lead conversion improvement.
              </p>

              <a
                className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent-400 px-8 text-sm font-semibold text-bg-default transition-all hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
                href="https://calendly.com/achraflachgar/15min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Free Audit
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}