"use client";

import { StaggerReveal } from "@/components/ui";

interface TeamMember {
  name: string;
  title: string;
  linkedin: string;
  bio?: string;
  built?: string;
  isFounder?: boolean;
}

const TEAM: TeamMember[] = [
  {
    name: "Asim Jan",
    title: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/asimjan/",
    isFounder: true,
    bio: "I started AL Solutions AI after watching three clients waste six months and six figures on chatbot projects that never shipped. I personally design every system architecture and stay involved through go-live. The AI agents we build today are the ones I wish I'd had when I was running operations for SMEs across MENA.",
  },
  {
    name: "Hamza Laaich",
    title: "AI Engineer",
    linkedin: "https://www.linkedin.com/in/hamza-laaich-253146228/",
    built: "WhatsApp Business API AI agent with real-time Arabic dialect handling and HubSpot CRM sync",
  },
  {
    name: "Sadak Errahman",
    title: "AI Engineer",
    linkedin: "https://www.linkedin.com/in/sadak-errahman/",
    built: "Multilingual RAG pipeline supporting Modern Standard Arabic, Gulf dialects, French, and English with mid-conversation language switching",
  },
  {
    name: "Antoine Willerval",
    title: "AI Engineer",
    linkedin: "https://www.linkedin.com/in/antoine-willerval/",
    built: "CRM automation system that extracts deal context from call recordings and auto-updates HubSpot with one-click human approval",
  },
];

function MemberCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  if (member.isFounder) {
    return (
      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:col-span-2 lg:col-span-2 transition-all duration-300 hover:border-accent-400/20 hover:bg-bg-elevated hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-400/5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-xl font-bold text-white shadow-lg shadow-accent-400/20">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-text-primary">{member.name}</h3>
              <span className="rounded-full bg-accent-400/10 px-2.5 py-0.5 text-xs font-semibold text-accent-400">
                {member.title}
              </span>
            </div>
            {member.bio && (
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-text-secondary">
                {member.bio}
              </p>
            )}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all duration-300 hover:border-accent-400/20 hover:bg-bg-elevated hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-400/5">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-bg-elevated to-bg-overlay text-base font-bold text-text-primary border border-border-subtle shadow-sm">
          {initials}
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary">{member.name}</h3>
          <p className="text-xs text-text-tertiary">{member.title}</p>
        </div>
      </div>
      {member.built && (
        <p className="mt-4 text-sm text-text-secondary">
          <span className="font-medium text-text-primary">Built:</span>{" "}
          {member.built}
        </p>
      )}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>
    </div>
  );
}

export function TeamSection() {
  return (
    <section aria-label="Team" className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent-400">
            The people building your system
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Senior engineers. No account managers.
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            You always talk to the person who wrote the code. That is a feature, not a limitation.
          </p>
        </div>

        <StaggerReveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.12}>
          {TEAM.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </StaggerReveal>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border-subtle bg-bg-elevated p-6 sm:p-8">
          <h3 className="text-base font-semibold text-text-primary">Why we stay small on purpose</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            We have never hired a sales team, a project manager, or an account executive. When you work with AL Solutions AI, you speak directly to the engineer who designs your system and stays with it through go-live.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            This is not because we cannot afford to grow. It is because we have seen what happens when agencies scale: your project gets handed from a closer to a project manager to a junior developer who was briefed in a 15-minute call. By the time the system is live, nobody on the team remembers why a specific decision was made.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Staying small means every project gets senior attention. It means the person you spoke to on the audit call is the same person debugging your integration at 10pm three days before launch. It means we can say no to projects that do not fit — and yes to the ones where we know we will deliver real results.
          </p>
        </div>
      </div>
    </section>
  );
}
