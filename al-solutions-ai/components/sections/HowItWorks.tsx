"use client";

import { Reveal } from "@/components/ui";

interface Step {
  title: string;
  details: string;
}

interface HowItWorksProps {
  steps?: Step[];
  title?: string;
}

const STEPS: Step[] = [
  {
    title: "Audit and scope",
    details: "We map your data sources, journeys, and conversion bottlenecks into a launch-ready technical scope. Deliverable: technical scope document within 48 hours.",
  },
  {
    title: "Build and integrate",
    details: "Our team ships the assistant, back-office automations, and CRM integrations with weekly demos. Deliverable: working demo every Friday.",
  },
  {
    title: "Launch and optimize",
    details: "After go-live, we tune prompts and workflows based on real user behavior and target KPIs. Deliverable: monthly performance report + optimization log.",
  },
];

export function HowItWorks({ steps = STEPS, title = "How We Build and Deploy Your AI in 30 Days" }: HowItWorksProps) {
  return (
    <section className="container py-10">
      <Reveal>
        <h2 className="text-3xl font-medium text-text-primary">{title}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              className="rounded-2xl border border-border-subtle bg-bg-surface p-6"
              key={step.title}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">Step {index + 1}</p>
              {index === 0 ? (
                <a className="mt-2 inline-flex text-lg text-primary-400 hover:text-primary-300" href="/free-ai-audit">
                  {step.title}
                </a>
              ) : (
                <p className="mt-2 text-lg text-text-primary">{step.title}</p>
              )}
              <p className="mt-2 text-sm text-text-secondary">{step.details}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}