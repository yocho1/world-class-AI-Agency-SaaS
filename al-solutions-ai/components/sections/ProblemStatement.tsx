"use client";

import { Reveal, StaggerReveal } from "@/components/ui";

interface ProblemStatementProps {
  readonly painPoints?: string[];
  readonly title?: string;
  readonly descriptionOne?: string;
  readonly descriptionTwo?: string;
}

const DEFAULT_PAIN_POINTS = [
  "You paid a big consultancy for a 12-week strategy deck. Nothing was built.",
  "Your team receives 200+ WhatsApp enquiries daily. Hot leads wait 4+ hours. By then they have contacted 3 other agencies.",
  "Your CRM pipeline is fiction. Reps skip updates, forecasting is guesswork, and no one knows which deals are real.",
];

export function ProblemStatement({
  painPoints = DEFAULT_PAIN_POINTS,
  title = "Most AI projects never reach production.",
  descriptionOne = "You have heard the promises. 'Deploy in 30 days.' 'AI that never sleeps.' Then you discover the demo was a PowerPoint, the 'live' system breaks on Arabic text, and the agency is now billing a monthly retainer for a system that does not work.",
  descriptionTwo = "We built AL Solutions AI because we were tired of watching good businesses waste money on AI theatre. We ship production systems — ones that handle real Arabic enquiries, log real calls to real CRMs, and convert real leads while your team sleeps. Then we hand you the keys and walk away.",
}: Readonly<ProblemStatementProps>) {
  return (
    <section className="section-padding container">
      <Reveal>
        <h2 className="max-w-3xl text-3xl font-medium text-text-primary md:text-4xl">{title}</h2>
        <p className="mt-4 max-w-prose text-text-secondary leading-relaxed">{descriptionOne}</p>
        <p className="mt-4 max-w-prose text-text-secondary leading-relaxed">{descriptionTwo}</p>

        <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-3" staggerDelay={0.12}>
          {painPoints.map((painPoint) => (
            <article
              className="rounded-2xl border border-border-subtle bg-bg-surface p-5 transition-all duration-300 hover:border-accent-400/20 hover:bg-bg-elevated hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-400/5"
              key={painPoint}
            >
              <p className="text-sm text-text-secondary leading-relaxed">{painPoint}</p>
            </article>
          ))}
        </StaggerReveal>
      </Reveal>
    </section>
  );
}