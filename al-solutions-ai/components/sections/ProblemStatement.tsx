"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ProblemStatementProps {
  painPoints?: string[];
}

const DEFAULT_PAIN_POINTS = [
  "Prototype fatigue: 3 agencies, zero deployments.",
  "Disconnected tools that break customer experience.",
  "No owner for launch KPIs after handoff.",
];

export function ProblemStatement({ painPoints = DEFAULT_PAIN_POINTS }: ProblemStatementProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container py-10">
      <motion.h2
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="max-w-3xl text-3xl font-medium text-text-primary md:text-4xl"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      >
        Most AI projects fail before launch. We build for production from day one.
      </motion.h2>
      <motion.p
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="mt-4 max-w-3xl text-text-secondary"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        transition={{ delay: 0.06 }}
      >
        Teams overpay for prototypes, weeks vanish in vendor handoffs, and nothing reaches production. Our sprint model merges product, AI engineering, and growth execution into one accountable team.
      </motion.p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {painPoints.map((painPoint, index) => (
          <motion.article
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            className="rounded-2xl border border-border-subtle bg-bg-surface p-5"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            key={painPoint}
            transition={{ delay: 0.1 + index * 0.08 }}
          >
            <p className="text-sm text-text-secondary">{painPoint}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}