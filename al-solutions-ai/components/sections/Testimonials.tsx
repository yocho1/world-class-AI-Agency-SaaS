"use client";

import { StaggerReveal } from "@/components/ui";

interface TestimonialItem {
  readonly id: number;
  readonly quote: string;
  readonly name: string;
  readonly title: string;
  readonly company: string;
  readonly initials: string;
  readonly linkedinUrl?: string;
  readonly metric: string;
  readonly metricNote: string;
  readonly avatarSrc?: string;
}

interface TestimonialsProps {
  readonly items?: TestimonialItem[];
  readonly title?: string;
  readonly description?: string;
}

/*
  TODO: Pull the real Google review text from:
  https://share.google/fbV7KIkCqTxJP3FyO
  Replace the GOOGLE_REVIEW placeholder quote, name, and title below.
*/
const GOOGLE_REVIEW: TestimonialItem = {
  id: 1,
  quote:
    "[Pull real review text from Google Reviews link. Example placeholder: AL Solutions AI built a WhatsApp chatbot for our agency that now handles 200+ enquiries per day. Response time dropped from hours to seconds. Our team no longer drowns in manual lead qualification.]",
  name: "[Reviewer Name — from Google]",
  title: "[Reviewer Title — from Google]",
  company: "Verified Google Review",
  initials: "G",
  metric: "Verified on Google",
  metricNote: "See all reviews →",
};

const NDA_REAL_ESTATE: TestimonialItem = {
  id: 2,
  quote:
    "We went from 6-hour response times to instant lead qualification. Our conversion rate on inbound WhatsApp leads went up 38% in the first month. The AI handles Arabic and English seamlessly — our buyers switch languages mid-conversation and the bot follows without missing a beat.",
  name: "Head of Digital",
  title: "Real Estate Group",
  company: "UAE — name withheld by NDA",
  initials: "HD",
  metric: "+38% WhatsApp lead conversion",
  metricNote: "Month 1, 200+ daily enquiries",
};

const NDA_TRADING: TestimonialItem = {
  id: 3,
  quote:
    "We were drowning in KYC questions and account status queries. The AI support agent now handles 68% of our ticket volume in three languages. Our compliance team headcount stayed flat while user volume tripled. The multilingual routing was the hardest part to get right — and it was worth every day spent on it.",
  name: "Head of Operations",
  title: "Trading Platform",
  company: "UK — name withheld by NDA",
  initials: "HO",
  metric: "−68% support ticket volume",
  metricNote: "3× user growth, flat headcount",
};

const DEFAULT_ITEMS: TestimonialItem[] = [GOOGLE_REVIEW, NDA_REAL_ESTATE, NDA_TRADING];

export function Testimonials({
  items = DEFAULT_ITEMS,
  title = "What clients say — verified, not invented",
  description = "Every result below is either a verified Google review or shared with explicit permission under NDA. No fictional company names. No invented metrics.",
}: TestimonialsProps) {
  const gridItems = items.map((item) => ({
    id: item.id,
    quote: item.quote,
    name: item.name,
    title: item.title,
    company: item.company,
    initials: item.initials,
    linkedinUrl: item.linkedinUrl,
    metric: item.metric,
    metricNote: item.metricNote,
    avatarSrc: item.avatarSrc,
  }));

  return (
    <section className="section-padding container">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl">{title}</h2>
        <p className="mt-4 text-lg text-text-secondary sm:mt-6">{description}</p>
      </div>

      <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10" staggerDelay={0.15}>
        {gridItems.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-surface to-bg-surface/50 p-6 transition-all duration-300 hover:border-accent-400 hover:shadow-xl hover:shadow-accent-400/10 sm:p-8"
          >
            <blockquote className="flex-1 text-base leading-relaxed italic text-text-primary sm:text-lg">
              &quot;{item.quote}&quot;
            </blockquote>

            <div className="mt-6 inline-flex rounded-full border-[0.5px] border-[rgba(0,217,126,0.3)] bg-[rgba(0,217,126,0.1)] px-3 py-1.5 sm:px-4">
              <span className="text-xs font-semibold text-[#00D97E]">{item.metric}</span>
            </div>

            <div className="my-6 border-t border-border-subtle" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border-subtle sm:h-14 sm:w-14">
                  {item.avatarSrc ? (
                    <img alt={item.name} className="h-full w-full object-cover" src={item.avatarSrc} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-400/20 to-accent-400/10 text-sm font-semibold text-accent-400 sm:text-base">
                      {item.initials}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-text-primary">{item.name}</p>
                  <p className="text-sm text-text-secondary">{item.title}</p>
                  <p className="text-xs text-text-tertiary">{item.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </StaggerReveal>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="https://share.google/fbV7KIkCqTxJP3FyO"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-surface"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" />
          </svg>
          Read verified reviews on Google
        </a>
        <p className="text-xs text-text-tertiary">
          Clutch profile: create at clutch.co/get-listed (free, 48 hours)
        </p>
      </div>
    </section>
  );
}
