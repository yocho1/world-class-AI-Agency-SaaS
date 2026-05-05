"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";

interface SocialProofBarProps {
  readonly clients?: string[];
}

const DEFAULT_CLIENTS = ["Nexora Hotels", "MediCore", "Atlas Retail", "Zain Mobility", "EduBridge", "FinEdge", "Sahara Foods"];

export function SocialProofBar({ clients = DEFAULT_CLIENTS }: SocialProofBarProps) {
  const hasAnonymisedClients = clients.some((client) => client.includes("*"));

  return (
    <section className="border-y border-border-subtle bg-bg-surface py-6">
      <div className="container">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.18em] text-text-tertiary">Trusted by teams shipping customer-facing AI</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {clients.map((client) => {
              const clientSlug = client
                .toLowerCase()
                .split(/[^a-z0-9]+/g)
                .filter(Boolean)
                .join("-");

              return (
                <Link
                  aria-label={`${client} — AL Solutions AI client`}
                  className="rounded-full border border-border-subtle px-4 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-default hover:text-text-primary"
                  href={`/case-studies#${clientSlug}`}
                  key={client}
                  rel="noopener noreferrer"
                >
                  {client}
                </Link>
              );
            })}
          </div>
          {hasAnonymisedClients ? (
            <p className="mt-3 text-center text-xs text-text-tertiary">Names anonymised at client request where marked *</p>
          ) : null}
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Shown with client permission. Some names anonymised per NDA.
          </p>
        </Reveal>
      </div>
    </section>
  );
}