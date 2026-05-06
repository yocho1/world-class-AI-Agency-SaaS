"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui";

// =======================
// 1. HERO SECTION DATA
// =======================
const HERO_DATA = {
  service: "Web + AI Solutions",
  headline: "Launch a high-converting website and AI layer in one sprint.",
  subheadline: "Bundle a modern marketing site with an embedded AI chatbot. No integration friction. One vendor. Unified messaging.",
  metric: "45 days to launch",
  cta: "Book Free Audit",
};

// =======================
// 2. WHO THIS IS FOR (Industries)
// =======================
const INDUSTRIES = [
  {
    icon: "🚀",
    name: "Early-Stage Startups",
    description:
      "You need a professional web presence AND AI capability to stand out. We build both together on the same timeline instead of managing two vendors.",
  },
  {
    icon: "🔄",
    name: "Companies Rebranding",
    description:
      "You're upgrading your website. This is the perfect time to add AI capabilities without a separate project. Same sprint, same vendor, unified UX.",
  },
  {
    icon: "🎯",
    name: "Growth-Stage Teams",
    description:
      "You're scaling customer conversations. A new website + AI chatbot can handle more inquiries at the same cost. Faster response, better conversion.",
  },
];

// =======================
// 3. WHAT'S INCLUDED (Features)
// =======================
const FEATURES = [
  "Custom marketing website (Next.js, optimized for conversion)",
  "Embedded AI chatbot with multilingual support",
  "CRM integration and lead routing",
  "Analytics dashboard and event tracking",
  "SEO optimization and performance tuning",
  "Responsive mobile design and accessibility audit",
  "60 days of unified post-launch support",
  "Content strategy and messaging framework",
];

// =======================
// 4. HOW IT WORKS (Timeline)
// =======================
const TIMELINE_STEPS = [
  {
    step: 1,
    title: "Strategy & Design (Days 1–10)",
    description:
      "We align on brand positioning, messaging hierarchy, and AI use cases. We design wireframes for key pages and AI conversation flows in parallel. You provide brand assets and sales insights.",
  },
  {
    step: 2,
    title: "Build & Integrate (Days 11–35)",
    description:
      "We build the website and AI chatbot simultaneously. Same codebase, same hosting, unified analytics. You review milestones on Days 15, 25, and 32. We integrate AI into specific pages as we build them.",
  },
  {
    step: 3,
    title: "Launch & Optimize (Days 36–45)",
    description:
      "Go live with full site and AI. Monitor performance for 14 days. Refine messaging based on real visitor behavior. Hand off playbooks and training.",
  },
];

// =======================
// 5. KEY METRICS (Stats)
// =======================
const KEY_METRICS = [
  { stat: "45", label: "Days to full launch", note: "Web + AI combined timeline" },
  { stat: "3x", label: "Faster than separate projects", note: "No integration delays between vendors" },
  { stat: "1", label: "Unified vendor", note: "Single point of contact for full experience" },
];

// =======================
// 6. RELATED CASE STUDY
// =======================
const RELATED_CASE_STUDY = {
  title: "Nexora Hotels Group",
  headline: "Unified web + AI platform for guest engagement",
  metric: "+44% visitor conversion to inquiry",
  metricNote: "web and AI channels combined",
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
    question: "Can we bundle an existing website with a new AI layer?",
    answer:
      "Yes. If you already have a website, we can audit it and embed AI into your existing site. This takes 25-30 days instead of 45. We'll need access to your codebase or a redesign discussion if your site isn't built on a modern stack.",
  },
  {
    id: 2,
    question: "What about ongoing updates and support after launch?",
    answer:
      "We provide 60 days of active support. After that, we can offer a retainer for ongoing optimization, content updates, and AI tuning. Or we hand off playbooks for your team to manage independently.",
  },
  {
    id: 3,
    question: "How much input do we need to provide on design?",
    answer:
      "We handle design and UX, but we need your brand assets, messaging strategy, and feedback on prototypes. Typical time commitment is 2-3 hours per week for 6 weeks. Less if you give us full creative autonomy.",
  },
  {
    id: 4,
    question: "Can the website and AI work independently if we need to?",
    answer:
      "Yes. Both the website and AI chatbot are built as independent systems that share a data layer. You can update one without touching the other. We architect for flexibility from day one.",
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
export default function WebAISolutionsPage() {
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
              Teams that need a modern website AND AI capability to compete in their market.
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
              A complete bundled solution: high-converting website + AI layer, delivered together.
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
              From strategy to launch in 45 days. Web and AI built in parallel.
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
              Why bundle your platform
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
              Questions about bundled solutions?
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
                Ready to launch your platform?
              </h2>

              <p className="mt-4 text-base text-text-secondary sm:text-lg">
                Let&apos;s discuss your vision and create a timeline for web + AI delivery.
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