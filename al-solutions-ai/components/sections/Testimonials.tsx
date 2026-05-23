"use client";

import { ClutchBadge, StaggerReveal } from "@/components/ui";

const CLUTCH_PROFILE_URL = process.env.NEXT_PUBLIC_CLUTCH_PROFILE_URL;

type VerificationSource = "google" | "nda";

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
  readonly verifiedBy?: VerificationSource;
  readonly stars?: number;
  readonly reviewUrl?: string;
}

interface TestimonialsProps {
  readonly items?: TestimonialItem[];
  readonly title?: string;
  readonly description?: string;
}

/*
  Verified Google reviews from https://share.google/fbV7KIkCqTxJP3FyO
  Names shortened to "First Initial." per privacy convention.
  Quote text preserved verbatim from Google.
*/
const GOOGLE_ANSHUL: TestimonialItem = {
  id: 1,
  quote:
    "As a software business owner, I’ve worked with a number of AI agencies over the past few years, but my experience with AL Solutions AI has been the best by far. They helped us in implementing multiple AI agents for a healthcare software solution we developed for the UAE market and were extremely involved throughout the entire process, guiding us from ideation and planning to full execution. What really stood out was their commitment to timelines, clear communication, and consistently high-quality work.",
  name: "Anshul K.",
  title: "Software business owner",
  company: "Healthcare software · UAE market",
  initials: "AK",
  metric: "Verified Google Review",
  metricNote: "11 months ago",
  verifiedBy: "google",
  stars: 5,
  reviewUrl: "https://share.google/fbV7KIkCqTxJP3FyO",
};

const GOOGLE_JEWEL: TestimonialItem = {
  id: 2,
  quote:
    "We partnered with AL Solutions AI to build and launch AI-powered voice agents for our homecare businesses. The difference has been huge. Out-of-hours calls used to be a big headache — staff queries, urgent family concerns, last-minute changes. Since introducing the AI voice agent, everything is faster, smoother, and far less stressful. They didn’t just give us tech — they understood our industry, our challenges, and delivered a working solution from idea to live system in no time.",
  name: "Jewel Home Support",
  title: "Homecare operator",
  company: "Verified Google Review",
  initials: "JH",
  metric: "Verified Google Review",
  metricNote: "7 months ago",
  verifiedBy: "google",
  stars: 5,
  reviewUrl: "https://share.google/fbV7KIkCqTxJP3FyO",
};

const GOOGLE_SIMON: TestimonialItem = {
  id: 3,
  quote:
    "Great service, they set me up an automated booking system for my business and it all uses AI to negate the need to have to deal with other complicated booking systems. Top work 5/5!",
  name: "Simon W.",
  title: "Business owner",
  company: "Verified Google Review",
  initials: "SW",
  metric: "Verified Google Review",
  metricNote: "1 year ago",
  verifiedBy: "google",
  stars: 5,
  reviewUrl: "https://share.google/fbV7KIkCqTxJP3FyO",
};

const GOOGLE_MIRZA: TestimonialItem = {
  id: 4,
  quote:
    "Working with AL Solutions AI was a great decision. The team is knowledgeable, responsive, and genuinely cares about delivering value. Whether it’s automation, AI consulting, or tech development, they know their stuff. Highly recommend them for growing businesses.",
  name: "Mirza B.",
  title: "Founder",
  company: "Verified Google Review",
  initials: "MB",
  metric: "Verified Google Review",
  metricNote: "11 months ago",
  verifiedBy: "google",
  stars: 5,
  reviewUrl: "https://share.google/fbV7KIkCqTxJP3FyO",
};

const NDA_REAL_ESTATE: TestimonialItem = {
  id: 5,
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
  id: 6,
  quote:
    "We were drowning in KYC questions and account status queries. The AI support agent now handles 68% of our ticket volume in three languages. Our compliance team headcount stayed flat while user volume tripled. The multilingual routing was the hardest part to get right — and it was worth every day spent on it.",
  name: "Head of Operations",
  title: "Trading Platform",
  company: "UK — name withheld by NDA",
  initials: "HO",
  metric: "−68% support ticket volume",
  metricNote: "3× user growth, flat headcount",
};

const DEFAULT_ITEMS: TestimonialItem[] = [
  GOOGLE_ANSHUL,
  GOOGLE_JEWEL,
  NDA_REAL_ESTATE,
  NDA_TRADING,
  GOOGLE_SIMON,
  GOOGLE_MIRZA,
];

export function Testimonials({
  items = DEFAULT_ITEMS,
  title = "What clients say — verified, not invented",
  description = "Verified Google reviews from real client engagements, plus two NDA testimonials with explicit permission. Names shortened per privacy convention. No invented quotes, no invented metrics.",
}: TestimonialsProps) {
  const gridItems = items;

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
            {item.verifiedBy === "google" && item.stars && (
              <div className="mb-4 flex items-center gap-1" aria-label={`${item.stars} out of 5 stars`}>
                {Array.from({ length: item.stars }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden="true">
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            )}

            <blockquote className="flex-1 text-base leading-relaxed italic text-text-primary sm:text-lg">
              &quot;{item.quote}&quot;
            </blockquote>

            {item.verifiedBy === "google" ? (
              <a
                href={item.reviewUrl ?? "https://share.google/fbV7KIkCqTxJP3FyO"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-3 py-1.5 transition-colors hover:border-accent-400 sm:px-4"
                aria-label="Verified Google Review — read on Google"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-xs font-semibold text-text-primary">{item.metric}</span>
              </a>
            ) : (
              <div className="mt-6 inline-flex w-fit rounded-full border-[0.5px] border-[rgba(0,217,126,0.3)] bg-[rgba(0,217,126,0.1)] px-3 py-1.5 sm:px-4">
                <span className="text-xs font-semibold text-[#00D97E]">{item.metric}</span>
              </div>
            )}

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
          Read all reviews on Google →
        </a>

        {CLUTCH_PROFILE_URL && <ClutchBadge profileUrl={CLUTCH_PROFILE_URL} />}
      </div>
    </section>
  );
}
