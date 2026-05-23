"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui";

// =======================
// 1. HERO SECTION DATA
// =======================
const HERO_DATA = {
  service: "AI Lead Qualification Agent",
  headline: "Your leads go cold in 4 hours. Our AI agent qualifies them in 60 seconds.",
  subheadline: "A production-grade WhatsApp and web AI agent that qualifies real buyers in Arabic, English, and French, routes the hot ones to a named human in under 30 seconds, and syncs every conversation to HubSpot or Salesforce. Live in 21–30 days. Written timeline, no scope creep.",
  metric: "−78% response time · +41% conversion",
  cta: "Book free 30-min audit",
};

// =======================
// 2. WHO THIS IS FOR (Industries)
// =======================
const INDUSTRIES = [
  {
    icon: "�",
    name: "Real estate agencies (UAE, Saudi, UK)",
    description:
      "Buyers message at 10pm and need a reply before they message your competitor. The AI qualifies budget, area, and timeline, surfaces 3 matching properties, and routes hot leads to a named agent in under 30 seconds. Currently running for one UAE group at 200+ qualified leads/day.",
  },
  {
    icon: "�",
    name: "Professional services firms",
    description:
      "High-value B2B leads expect a same-day response and most firms can't deliver. The AI handles initial discovery, qualifies fit against your ICP, captures the decision-maker's context, and books a meeting straight into your team's Calendly — with the conversation logged to HubSpot before the call starts.",
  },
  {
    icon: "🏥",
    name: "Healthcare and homecare operators",
    description:
      "Out-of-hours enquiries used to die in a voicemail. The AI handles intake, triages urgency, and escalates time-critical cases to on-call staff. Currently in production for a UK homecare group handling family enquiries 24/7 in English and Arabic.",
  },
];

// =======================
// 3. WHAT'S INCLUDED (Features)
// =======================
const FEATURES = [
  "WhatsApp Business API agent with verified business profile",
  "Native Arabic (Gulf, Levantine, Maghrebi, MSA), English, French",
  "Mid-conversation language switching (the buyer leads, the bot mirrors)",
  "Lead qualification with custom criteria (budget, location, timeline, fit)",
  "Live inventory or product matching against your database or CMS",
  "Hot-lead routing to named human agent in under 30 seconds",
  "HubSpot, Salesforce, or Pipedrive sync with structured fields, not freeform notes",
  "Web chat widget on your site with the same conversation history as WhatsApp",
  "Confidence-gated fallbacks (the AI knows when to escalate to human)",
  "Conversation transcripts and analytics dashboard",
  "30 days of post-launch support and weekly performance review",
];

// =======================
// 4. HOW IT WORKS (Timeline)
// =======================
const TIMELINE_STEPS = [
  {
    step: 1,
    title: "Free audit & scope (Day 0, 48 hours)",
    description:
      "30-minute call with a senior engineer (not a sales rep). We map your current lead flow, identify the highest-ROI conversation paths, and send you a written scope report inside 48 hours with a fixed price and timeline. If we don't think AI is the right answer for your business right now, we say so.",
  },
  {
    step: 2,
    title: "Discovery & conversation design (Days 1–5)",
    description:
      "We sit with your sales team to extract the qualification criteria that actually matter. We design the conversation flow against real historical lead data — not generic templates. Output: a documented conversation spec you approve before any code is written.",
  },
  {
    step: 3,
    title: "Build, integrate, and internal review (Days 6–20)",
    description:
      "WhatsApp Business API approval, CRM integration, multilingual prompt engineering, and inventory or product matching all built in parallel. You review a working demo on Day 10 and a near-final version on Day 15.",
  },
  {
    step: 4,
    title: "Go-live and 14-day calibration (Days 21–30)",
    description:
      "System goes live with all traffic routed through it. Daily monitoring for the first 7 days, weekly reviews for the next 30. We tune the hot-lead threshold, language-switching logic, and qualification questions based on real conversation data.",
  },
  {
    step: 5,
    title: "Handover and ongoing support (Day 30+)",
    description:
      "Full documentation handed over to your team. We don't lock you into a retainer. You can run the system yourself, hire us monthly for optimisation, or do a mix. Most clients choose mix.",
  },
];

// =======================
// 5. KEY METRICS (Stats)
// =======================
const KEY_METRICS = [
  { stat: "−78%", label: "Average response time", note: "UAE real estate group, 4h 23min → 58 sec, 60 days post-launch" },
  { stat: "+41%", label: "Lead-to-viewing conversion", note: "UAE real estate group, baseline 14.2% → 20.0% in Month 1" },
  { stat: "26", label: "Days from contract to live", note: "Actual delivery, against a 30-day commitment" },
];

// =======================
// 6. RELATED CASE STUDY
// =======================
const RELATED_CASE_STUDY = {
  title: "UAE Real Estate Group (NDA)",
  headline: "WhatsApp AI agent handling 200+ qualified leads per day in Arabic and English",
  metric: "−78% response time · +41% conversion",
  metricNote: "26 days from contract to live, 47,000+ conversations handled in 8 months",
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
    question: "How do I know your Arabic capability is real and not Google-Translate-grade?",
    answer:
      "Test it. Type a real message on our homepage live demo in whatever dialect or code-switched mix you'd use with a real buyer. Production systems we run handle Gulf, Levantine, Maghrebi, MSA, and mid-message language switching. If our demo doesn't handle your test message correctly, we've failed and you'll know in 30 seconds.",
  },
  {
    id: 2,
    question: "What happens if the AI gets a complex question wrong?",
    answer:
      "The AI has a confidence threshold. If it isn't certain it can answer accurately, it says so and routes the conversation to a named human agent within 30 seconds with the full transcript. Every uncertain interaction is logged and reviewed weekly so the knowledge base improves. We never let the AI hallucinate a confident-sounding wrong answer — that's the most common failure mode in production AI.",
  },
  {
    id: 3,
    question: "Will I be locked into a monthly retainer?",
    answer:
      "No. We do project pricing with 30 days of post-launch support included. After that, you can run the system yourself, hire us monthly for optimisation, or hand it off to your in-house team. We give you full documentation and credentials. This is a deliberate choice — we refuse to charge a retainer for work we're not doing.",
  },
  {
    id: 4,
    question: "What CRMs and platforms do you integrate with?",
    answer:
      "HubSpot, Salesforce, Pipedrive natively. WhatsApp Business API (Meta verified). Custom integrations via Zapier, Make, or n8n. If your stack is something else, we'll tell you in the free audit whether it's a 2-day connector or a 2-week project.",
  },
  {
    id: 5,
    question: "What data leaves my business?",
    answer:
      "Conversation transcripts go to your chosen LLM provider (OpenAI or Anthropic by default; we can deploy via Azure OpenAI for stricter EU residency requirements). Nothing is stored on AL Solutions AI infrastructure permanently — transcripts live in your CRM or your own cloud tenant. We're GDPR-compliant and can support a DPA on request.",
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
export default function AIChatbotsPage() {
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
              AI chatbots work best in customer-facing workflows where speed and first-response quality matter most.
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
              Every AI chatbot deployment includes everything needed to go from strategy to live production.
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
              From discovery to live production in 28 days.
            </p>

            <div className="mt-12 sm:mt-16 space-y-8 max-w-4xl">
              {TIMELINE_STEPS.map((item, idx) => (
                <div key={idx} className="flex gap-6 sm:gap-8">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent-400 bg-bg-surface text-sm font-bold text-accent-400">
                      {item.step}
                    </div>
                    {idx < TIMELINE_STEPS.length - 1 && (
                      <div className="h-16 w-1 bg-gradient-to-b from-accent-400/50 to-accent-400/10" />
                    )}
                  </div>

                  {/* Timeline content */}
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
              Why AI chatbots matter
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
              <Link href="/case-studies/hospitality-concierge" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">Nexora Hotels case study</h3>
                <p className="mt-2 text-sm text-text-secondary">How a multilingual AI concierge on web and WhatsApp cut response time by 62% in 28 days.</p>
              </Link>
              <Link href="/blog/whatsapp-ai-chatbot-business" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">WhatsApp AI chatbot guide</h3>
                <p className="mt-2 text-sm text-text-secondary">Complete playbook for deploying WhatsApp AI that captures leads 24/7 in Arabic and English.</p>
              </Link>
              <Link href="/industries/hospitality" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">Hospitality AI solutions</h3>
                <p className="mt-2 text-sm text-text-secondary">AI concierge, booking qualification, and guest support automation for hotels and tourism.</p>
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
              Questions about AI chatbots?
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
                Ready to deploy your AI chatbot?
              </h2>

              <p className="mt-4 text-base text-text-secondary sm:text-lg">
                Let&apos;s talk about your specific use case and map out a 28-day deployment plan.
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