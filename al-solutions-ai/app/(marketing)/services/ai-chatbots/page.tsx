"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui";

// =======================
// 1. HERO SECTION DATA
// =======================
const HERO_DATA = {
  service: "AI Chatbots",
  headline: "AI Chatbots That Qualify Leads in Arabic, English & French — Live in 14 Days.",
  subheadline: "Native multilingual AI deployed across web, WhatsApp, and SMS. CRM-integrated from day one. No prototypes, no half-built integrations to clean up later.",
  metric: "+62% faster first response",
  cta: "Book Free Audit",
};

// =======================
// 2. WHO THIS IS FOR (Industries)
// =======================
const INDUSTRIES = [
  {
    icon: "🏨",
    name: "Hospitality & Travel",
    description:
      "Qualify guests in real-time across web, WhatsApp, and SMS. Route bookings directly to team. Reduce response time from hours to seconds.",
  },
  {
    icon: "🛍️",
    name: "E-Commerce & Retail",
    description:
      "Answer product questions before checkout abandonment. Capture size/preference data. Hand off qualified buyers to sales team with full context.",
  },
  {
    icon: "⚕️",
    name: "Healthcare & B2B Services",
    description:
      "Screen intake forms 24/7. Qualify appointments. Route urgent cases to the right specialist. Support team during off-hours.",
  },
];

// =======================
// 3. WHAT'S INCLUDED (Features)
// =======================
const FEATURES = [
  "Multilingual lead qualification (Arabic, English, French)",
  "CRM integration with full context handoff",
  "Custom brand tone and conversation guardrails",
  "Real-time analytics and performance tracking",
  "Web chat, WhatsApp, and SMS deployment",
  "60 days of post-launch support and optimization",
  "Custom workflow routing logic",
  "Conversation audit and continuous improvement",
];

// =======================
// 4. HOW IT WORKS (Timeline)
// =======================
const TIMELINE_STEPS = [
  {
    step: 1,
    title: "Strategy & Discovery (Days 1–5)",
    description:
      "We map your lead flow, identify qualification criteria, and set up integrations with your CRM and messaging channels. You provide use cases; we design the conversation logic.",
  },
  {
    step: 2,
    title: "Build & Deploy (Days 6–20)",
    description:
      "Our team trains the model on your brand voice, builds custom workflows, and deploys across web, WhatsApp, and SMS. You review progress on Days 10 and 15.",
  },
  {
    step: 3,
    title: "Launch & Optimize (Days 21–28)",
    description:
      "Go live. Monitor real conversations. Refine guardrails and routing rules based on live data. Train your team on analytics and handoff workflows.",
  },
];

// =======================
// 5. KEY METRICS (Stats)
// =======================
const KEY_METRICS = [
  { stat: "+62%", label: "Faster first response", note: "Average across deployed chatbots" },
  { stat: "-40%", label: "Support operational cost", note: "Through automation of routine queries" },
  { stat: "28", label: "Days to live production", note: "End-to-end deployment timeline" },
];

// =======================
// 6. RELATED CASE STUDY
// =======================
const RELATED_CASE_STUDY = {
  title: "Nexora Hotels Group",
  headline: "Multilingual AI concierge across web and WhatsApp",
  metric: "+44% response rate",
  metricNote: "on inquiries routed to team",
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
    question: "How does your AI handle complex questions it doesn't know?",
    answer:
      "The chatbot is trained to recognize knowledge gaps and routes complex questions to your team with full conversation context. This fallback is logged so you can continuously improve the AI's knowledge base.",
  },
  {
    id: 2,
    question: "Can I customize the chatbot's tone and personality?",
    answer:
      "Absolutely. We train the model on your brand voice, company values, and desired tone. You provide examples of how you want responses phrased, and the AI learns to match your style.",
  },
  {
    id: 3,
    question: "Does the chatbot work with non-English languages?",
    answer:
      "Yes. Our chatbots natively support Arabic, English, and French. We can add other languages on request. Multilingual conversations (mixing languages mid-chat) are fully supported.",
  },
  {
    id: 4,
    question: "What happens to conversation data? Is it secure?",
    answer:
      "All conversation data is encrypted in transit and at rest. We comply with GDPR and regional data privacy laws. You own all conversation data and can export it anytime.",
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
                Ready to deploy your AI chatbot?
              </h2>

              <p className="mt-4 text-base text-text-secondary sm:text-lg">
                Let&apos;s talk about your specific use case and map out a 28-day deployment plan.
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