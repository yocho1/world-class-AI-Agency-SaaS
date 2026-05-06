"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui";

// =======================
// 1. HERO SECTION DATA
// =======================
const HERO_DATA = {
  service: "Lead Conversion",
  headline: "Turn high-intent web traffic into real sales conversations.",
  subheadline: "Optimize every step of your funnel with AI-powered qualification and fast response. Booked meetings are 3x higher.",
  metric: "+150% qualified lead rate",
  cta: "Book Free Audit",
};

// =======================
// 2. WHO THIS IS FOR (Industries)
// =======================
const INDUSTRIES = [
  {
    icon: "🚀",
    name: "SaaS & Tech Startups",
    description:
      "Capture high-intent prospects on pricing and demo pages. Qualify before routing to sales. Track conversion velocity from first click to booked meeting.",
  },
  {
    icon: "🏪",
    name: "E-Commerce & Retail",
    description:
      "Reduce cart abandonment with targeted messaging. Answer product questions in real-time. Increase AOV through smart recommendations and checkout assistance.",
  },
  {
    icon: "💼",
    name: "B2B Professional Services",
    description:
      "Qualify consulting and agency leads before handoff. Disqualify early to save sales time. Route to right team based on service and deal size.",
  },
];

// =======================
// 3. WHAT'S INCLUDED (Features)
// =======================
const FEATURES = [
  "Full funnel analysis and conversion bottleneck identification",
  "AI-powered lead scoring and qualification",
  "Real-time visitor engagement and intent detection",
  "Custom qualification sequences for different visitor profiles",
  "Automated meeting scheduling and calendar sync",
  "CRM integration with lead context and history",
  "A/B testing framework for messaging and CTAs",
  "Weekly conversion reports with actionable optimization recommendations",
];

// =======================
// 4. HOW IT WORKS (Timeline)
// =======================
const TIMELINE_STEPS = [
  {
    step: 1,
    title: "Conversion Audit (Days 1–5)",
    description:
      "We analyze your current funnel: which pages convert, where visitors drop off, which messaging resonates. We review your sales calls to understand qualification criteria.",
  },
  {
    step: 2,
    title: "Implement & Test (Days 6–20)",
    description:
      "We deploy AI qualification flows on key pages, set up meeting automation, and configure lead scoring. You review changes on Day 12 and we refine based on your feedback.",
  },
  {
    step: 3,
    title: "Optimize & Measure (Days 21–30)",
    description:
      "Go live. Monitor conversion rates daily. Run A/B tests on messaging and CTAs. Deliver optimization roadmap based on the first 2 weeks of live data.",
  },
];

// =======================
// 5. KEY METRICS (Stats)
// =======================
const KEY_METRICS = [
  { stat: "+150%", label: "Qualified lead rate", note: "Average improvement from baseline" },
  { stat: "3x", label: "Faster response time", note: "to high-intent prospects" },
  { stat: "22%", label: "Higher booking rate", note: "from qualified meetings routed to sales" },
];

// =======================
// 6. RELATED CASE STUDY
// =======================
const RELATED_CASE_STUDY = {
  title: "Nexora Hotels Group",
  headline: "Real-time guest inquiry qualification and response",
  metric: "+44% inquiry response rate",
  metricNote: "web and messaging channels combined",
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
    question: "How do you determine what makes a lead qualified?",
    answer:
      "We start by analyzing your best customers and your sales team's qualification criteria. We review 20-30 sales calls to understand intent signals, deal size indicators, and disqualification triggers. The AI learns from this training data.",
  },
  {
    id: 2,
    question: "What if someone gives the wrong answers during qualification?",
    answer:
      "Leads always get routed to your sales team. The AI score just determines the priority. A low-scored lead still reaches your team, but high-priority leads get faster response. Your team can always override scoring.",
  },
  {
    id: 3,
    question: "Can we qualify across different languages?",
    answer:
      "Yes. Our system supports Arabic, English, French, and others. Visitors answer qualification questions in their preferred language and all context is translated for your sales team.",
  },
  {
    id: 4,
    question: "How fast do we see conversion rate improvement?",
    answer:
      "Most clients see measurable improvements (5–15% higher conversion rate) by week 3. Full impact typically shows by week 6 once the AI has seen enough qualified interactions to optimize messaging.",
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
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-accent-400 px-8 text-sm font-semibold text-bg-default transition-all hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
                  href="/free-ai-audit"
                >
                  {HERO_DATA.cta}
                </Link>
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

            <Link
              className="mt-6 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300"
              href="/free-ai-audit"
            >
              Still have questions? Talk to our team →
            </Link>
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

              <Link
                className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent-400 px-8 text-sm font-semibold text-bg-default transition-all hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
                href="/free-ai-audit"
              >
                Schedule Free Audit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}