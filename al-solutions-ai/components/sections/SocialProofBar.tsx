"use client";

interface SocialProofBarProps {
  clients?: string[];
}

const DEFAULT_CLIENTS = ["Nexora Hotels", "MediCore", "Atlas Retail", "Zain Mobility", "EduBridge", "FinEdge", "Sahara Foods"];

export function SocialProofBar({ clients = DEFAULT_CLIENTS }: SocialProofBarProps) {
  return (
    <section className="border-y border-border-subtle bg-bg-surface py-6">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-text-tertiary">Trusted by teams shipping customer-facing AI</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {clients.map((client) => (
            <span className="rounded-full border border-border-subtle px-4 py-1.5 text-sm text-text-secondary" key={client}>
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}