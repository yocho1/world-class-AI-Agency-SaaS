"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui";

// =======================
// 1. HERO SECTION DATA
// =======================
const HERO_DATA = {
  service: "CRM AI Automation",
  headline: "Your reps spend 45 minutes a day updating the CRM. We can give them most of that back.",
  subheadline: "A production AI system that listens to your sales calls, extracts structured fields (stage, next step, blockers, stakeholders, competitors), and stages an update for one-click human approval in HubSpot or Salesforce. Live in 19–30 days. Mandatory human approval — the AI never writes to your CRM unsupervised.",
  metric: "−89% CRM admin time · 61% → 94% pipeline accuracy",
  cta: "Book free 30-min audit",
};

// =======================
// 2. WHO THIS IS FOR (Industries)
// =======================
const INDUSTRIES = [
  {
    icon: "�",
    name: "B2B sales teams (10–50 reps)",
    description:
      "Reps spending 30+ min/day on CRM admin instead of selling. The AI captures structured call notes, stages updates for approval, and gives your CRO a forecast they can actually trust. Currently in production for a UK professional services firm with 12 reps.",
  },
  {
    icon: "📞",
    name: "Inside sales & SDR teams",
    description:
      "High-velocity outbound teams making 60+ calls/day where the meeting notes never get logged consistently. The AI captures every call, extracts intent and next-step, and writes structured data to HubSpot — with the SDR approving in 20 seconds.",
  },
  {
    icon: "🛠️",
    name: "Operations & RevOps leaders",
    description:
      "Pipeline accuracy below 80%, forecasts the board doesn't trust, and clean-data initiatives that keep failing. The AI standardises stage definitions across reps, flags low-confidence extractions for review, and gives RevOps a single audit trail of every CRM change.",
  },
];

// =======================
// 3. WHAT'S INCLUDED (Features)
// =======================
const FEATURES = [
  "Call capture from Aircall, Dialpad, Gong, Zoom, or Microsoft Teams",
  "Whisper large-v3 transcription with speaker diarization (rep vs. prospect labeled)",
  "GPT-4o structured extraction against your specific funnel stage definitions",
  "Mandatory human approval in HubSpot or Salesforce (the AI never writes unsupervised)",
  "One-click approval flow via Slack DM and CRM task (20–60 second interaction)",
  "Confidence scoring — low-confidence extractions are flagged for review",
  "Stakeholder, blocker, and competitor extraction with audit log",
  "Automated CRM activity logging for short calls (under 90 sec) without rep input",
  "GDPR-compliant: audio deleted within 24 hours, transcripts in your own tenant",
  "Weekly accuracy review for the first 30 days to calibrate against your team",
  "30 days of post-launch support, no retainer required",
];

// =======================
// 4. HOW IT WORKS (Timeline)
// =======================
const TIMELINE_STEPS = [
  {
    step: 1,
    title: "Free audit & scope (Day 0, 48 hours)",
    description:
      "30-minute call with a senior engineer. We diagnose whether your problem is genuinely CRM admin time vs. something else (often it's a pipeline definition problem, not an AI problem). Written scope and fixed price inside 48 hours, or we tell you we won't build it.",
  },
  {
    step: 2,
    title: "Funnel definition & call sampling (Days 1–7)",
    description:
      "We sit with your sales leadership to lock down your funnel stage definitions in writing — most companies have ambiguity here, and AI can't be more accurate than your own ground truth. Then we sample 50 historical calls to calibrate extraction accuracy before any code goes live.",
  },
  {
    step: 3,
    title: "Build, integrate, and shadow test (Days 8–22)",
    description:
      "Dialer integration, Whisper transcription pipeline, GPT-4o extraction, CRM staging, and Slack approval UI all built in parallel. System runs in shadow mode for the last week (extractions happen but nothing writes to CRM yet) so you can review accuracy before launch.",
  },
  {
    step: 4,
    title: "Go-live and calibration (Days 23–30)",
    description:
      "System goes live with all calls routed through it. Daily monitoring for the first 7 days. We tune the confidence threshold, field mappings, and approval UX based on how your reps actually use it. By Day 30 you'll be measuring time saved.",
  },
  {
    step: 5,
    title: "Handover and optional ongoing support (Day 30+)",
    description:
      "Full documentation handed over. No retainer lock-in. Most clients keep us on for monthly optimisation (£500–£1,500/month) but it's optional — you can take it in-house at any time.",
  },
];

// =======================
// 5. KEY METRICS (Stats)
// =======================
const KEY_METRICS = [
  { stat: "−89%", label: "CRM admin time per rep", note: "UK professional services firm, 45 min/day → 5 min/day, 90 days post-launch" },
  { stat: "94%", label: "Pipeline accuracy", note: "UK professional services firm, baseline 61% → 94% within 90 days" },
  { stat: "3.5h", label: "Selling time recovered per rep per week", note: "Net of approval-flow time (20–60 sec per call)" },
];

// =======================
// 6. RELATED CASE STUDY
// =======================
const RELATED_CASE_STUDY = {
  title: "UK Professional Services Firm (NDA)",
  headline: "CRM AI for 12-person sales team — mandatory human approval, 89% time reduction",
  metric: "−89% CRM admin time · +33pp pipeline accuracy",
  metricNote: "19 days from contract to live, 3.5 hours/rep/week recovered",
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
    question: "Does the AI write to my CRM automatically?",
    answer:
      "No, and we won't build it that way even if you ask. Every CRM update goes through a one-click human approval flow that takes 20–60 seconds. The reason: GPT-4o is excellent and still mis-extracts about 1 in 80 calls in our testing. If those errors got written automatically, you'd lose forecast credibility and the system would die politically inside 3 months. Approval gates prevent that.",
  },
  {
    id: 2,
    question: "How accurate is the field extraction?",
    answer:
      "On the firm we're currently running this for, field accuracy after the 30-day calibration is 94% for stage, 96% for next-step, 91% for blocker identification. The remaining error rate is what the human approval flow catches. We benchmark against a labelled sample of 50 historical calls during week 1 so you see accuracy before launch.",
  },
  {
    id: 3,
    question: "What dialers and CRMs do you support?",
    answer:
      "Dialers: Aircall, Dialpad, Gong, Chorus, Zoom Phone, Microsoft Teams. CRMs: HubSpot and Salesforce natively, Pipedrive on request. For other stacks we'll assess in the free audit and tell you if it's a 2-day connector or a 2-week build.",
  },
  {
    id: 4,
    question: "What happens to the call audio? Is it GDPR-compliant?",
    answer:
      "Audio is processed for transcription and deleted within 24 hours by default — we can configure shorter retention on request. Transcripts and extracted fields are stored in your own CRM or your own cloud tenant; nothing lives permanently on AL Solutions AI infrastructure. We sign DPAs as standard and support EU/UK data residency via Azure OpenAI if you require it.",
  },
  {
    id: 5,
    question: "Will reps actually use this, or will they ignore it like every other CRM tool?",
    answer:
      "This is the right question. The reason most CRM tools get ignored is that they add work. This subtracts work — the rep approves in 20 seconds and saves 45 minutes elsewhere. In production at our current client, the rep adoption rate is 100% because skipping the approval means they have to write the notes manually themselves. We pilot with 2–3 reps before rolling out to the full team so you de-risk adoption.",
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
export default function AutomationPage() {
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
              Any team losing hours to repetitive, error-prone manual work across multiple tools.
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
              End-to-end workflow automation with monitoring and ongoing optimization.
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
              From workflow audit to live automation in 30 days.
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
              Why automation matters
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
              <Link href="/case-studies/fintech-automation" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">FinEdge case study</h3>
                <p className="mt-2 text-sm text-text-secondary">How FinEdge cut operational support costs by 31% with AI-powered tier-1 automation in 22 days.</p>
              </Link>
              <Link href="/blog/ai-automation-mena-sme" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">AI automation for SMEs</h3>
                <p className="mt-2 text-sm text-text-secondary">Where to start, what to automate first, and realistic ROI benchmarks for MENA small businesses.</p>
              </Link>
              <Link href="/blog/hubspot-ai-integration-guide" className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-400">HubSpot AI integration guide</h3>
                <p className="mt-2 text-sm text-text-secondary">Step-by-step playbook for connecting an AI chatbot to HubSpot CRM without breaking your pipeline.</p>
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
              Questions about automation?
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
                Ready to automate your workflows?
              </h2>

              <p className="mt-4 text-base text-text-secondary sm:text-lg">
                Let&apos;s audit your current process and identify the quickest wins for automation.
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