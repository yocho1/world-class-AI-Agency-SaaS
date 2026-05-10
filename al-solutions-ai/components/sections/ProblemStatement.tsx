"use client";

import { Reveal } from "@/components/ui";

interface ProblemStatementProps {
  readonly painPoints?: string[];
  readonly title?: string;
  readonly descriptionOne?: string;
  readonly descriptionTwo?: string;
}

const DEFAULT_PAIN_POINTS = [
  "Prototype fatigue: 3 agencies, zero deployments.",
  "Disconnected tools that break customer experience.",
  "No owner for launch KPIs after handoff.",
];

export function ProblemStatement({
  painPoints = DEFAULT_PAIN_POINTS,
  title = "Most AI projects die in the prototype phase.",
  descriptionOne = "You&apos;ve probably hired an agency that delivered a demo. Or a consultant who delivered a roadmap. Neither shipped anything real.",
  descriptionTwo = "Teams overpay for prototypes, weeks vanish in vendor handoffs, and nothing reaches production. Our sprint model merges product, AI engineering, and growth execution into one accountable team.",
}: Readonly<ProblemStatementProps>) {
  return (
    <section className="section-padding container">
      <Reveal>
        <h2 className="max-w-3xl text-3xl font-medium text-text-primary md:text-4xl">{title}</h2>
        <p className="mt-4 max-w-prose text-text-secondary">{descriptionOne}</p>
        <p className="mt-4 max-w-prose text-text-secondary">{descriptionTwo}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {painPoints.map((painPoint) => (
            <article
              className="rounded-2xl border border-border-subtle bg-bg-surface p-5"
              key={painPoint}
            >
              <p className="text-sm text-text-secondary">{painPoint}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}