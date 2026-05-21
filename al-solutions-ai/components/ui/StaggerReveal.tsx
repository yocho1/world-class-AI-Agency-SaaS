"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

type StaggerRevealProps = PropsWithChildren<{
  className?: string;
  staggerDelay?: number;
  childClassName?: string;
}>;

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.1,
  childClassName,
}: StaggerRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item} className={childClassName}>
              {child}
            </motion.div>
          ))
        : (
          <motion.div variants={item} className={childClassName}>
            {children}
          </motion.div>
        )}
    </motion.div>
  );
}
