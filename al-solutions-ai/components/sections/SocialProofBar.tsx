"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

interface SocialProofBarProps {
  clients?: string[];
}

const DEFAULT_CLIENTS = ["Nexora Hotels", "MediCore", "Atlas Retail", "Zain Mobility", "EduBridge", "FinEdge", "Sahara Foods"];

export function SocialProofBar({ clients = DEFAULT_CLIENTS }: SocialProofBarProps) {
  const reduceMotion = useReducedMotion();
  const row = [...clients, ...clients];
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: 24, ease: "linear", repeat: Infinity },
    });
  }, [controls, reduceMotion]);

  return (
    <section className="border-y border-border-subtle bg-bg-surface py-6">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-text-tertiary">Trusted by teams shipping customer-facing AI</p>
        <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {reduceMotion ? (
            <div className="flex flex-wrap justify-center gap-3 text-sm text-text-secondary">
              {clients.map((client) => (
                <span className="rounded-full border border-border-subtle px-4 py-1.5" key={client}>
                  {client}
                </span>
              ))}
            </div>
          ) : (
            <motion.div
              animate={controls}
              className="flex w-max gap-3"
              onHoverEnd={() =>
                controls.start({
                  x: ["0%", "-50%"],
                  transition: { duration: 24, ease: "linear", repeat: Infinity },
                })
              }
              onHoverStart={() => controls.stop()}
            >
              {row.map((client, index) => (
                <span className="rounded-full border border-border-subtle px-4 py-1.5 text-sm text-text-secondary" key={`${client}-${index}`}>
                  {client}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}