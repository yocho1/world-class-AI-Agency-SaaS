"use client";

interface ProblemStatementProps {
  painPoints?: string[];
}

const DEFAULT_PAIN_POINTS = [
  "Prototype fatigue: 3 agencies, zero deployments.",
  "Disconnected tools that break customer experience.",
  "No owner for launch KPIs after handoff.",
];

export function ProblemStatement({ painPoints = DEFAULT_PAIN_POINTS }: ProblemStatementProps) {
  return (
    <section className="container py-10">
      <h2 className="max-w-3xl text-3xl font-medium text-text-primary md:text-4xl">
        Most AI projects fail before launch. We build for production from day one.
      </h2>
      <p className="mt-4 max-w-3xl text-text-secondary">
        Teams overpay for prototypes, weeks vanish in vendor handoffs, and nothing reaches production. Our sprint model merges product, AI engineering, and growth execution into one accountable team.
      </p>

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
    </section>
  );
}