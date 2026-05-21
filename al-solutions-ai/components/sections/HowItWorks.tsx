"use client";

import { Reveal, StaggerReveal } from "@/components/ui";

const CALENDLY_URL = "https://calendly.com/achraflachgar/15min";

interface Step {
  title: string;
  details: string;
  duration: string;
}

interface HowItWorksProps {
  steps?: Step[];
  title?: string;
}

const STEPS: Step[] = [
  {
    title: "Free audit + written scope",
    duration: "48 hours",
    details: "A 30-minute call with a senior engineer to map your highest-ROI automation opportunity. You receive a written scope report: what to build, tech stack, timeline, cost, and honest go/no-go recommendation.",
  },
  {
    title: "Build + weekly demo",
    duration: "21–30 days",
    details: "We build the AI agent, integrate your CRM and channels, and deploy to a staging environment. You see a working demo every Friday. No black-box development.",
  },
  {
    title: "Go-live + 30-day iteration",
    duration: "30 days post-launch",
    details: "The system goes into production. We monitor real conversations, tune prompts based on actual user behaviour, and fix edge cases. Only then do we invoice the second 50%.",
  },
];

export function HowItWorks({ steps = STEPS, title = "How we work — from first call to live AI" }: HowItWorksProps) {
  return (
    <section className="container py-10">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-medium text-text-primary">{title}</h2>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent-400 hover:text-accent-300"
          >
            Start with a free audit →
          </a>
        </div>
        <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-3" staggerDelay={0.12}>
          {steps.map((step, index) => (
            <li
              className="rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all duration-300 hover:border-accent-400/20 hover:bg-bg-elevated hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-400/5"
              key={step.title}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-400/10 text-sm font-bold text-accent-400">
                  {index + 1}
                </span>
                <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">{step.duration}</p>
              </div>
              <p className="mt-3 text-lg font-medium text-text-primary">{step.title}</p>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{step.details}</p>
            </li>
          ))}
        </StaggerReveal>
      </Reveal>
    </section>
  );
}