import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Case Studies — Real Results, Honest Reporting | AL Solutions AI",
  description:
    "Production AI deployments: −78% response time for real estate, −68% support tickets for trading, −89% CRM admin for professional services. All results verified or shared under NDA.",
  alternates: alternatesFor("/case-studies"),
  openGraph: {
    url: canonicalUrl("/case-studies"),
    title: "AI Case Studies — Real Results, Honest Reporting | AL Solutions AI",
    description:
      "Production AI deployments: −78% response time for real estate, −68% support tickets for trading, −89% CRM admin for professional services. All results verified or shared under NDA.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=AI Case Studies&subtitle=Real deployments. Honest reporting. No fictional names.&tag=Case Studies",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=AI Case Studies&subtitle=Real deployments. Honest reporting. No fictional names.&tag=Case Studies",
    ],
  },
};

const INDUSTRIES = ["All", "Real Estate", "Fintech & Trading", "Professional Services", "Retail"];

const CASE_STUDIES = [
  {
    title: "WhatsApp AI agent for UAE real estate",
    metric: "−78% response time · +41% conversion",
    slug: "real-estate-uae",
    industry: "Real Estate",
    stat: "−78%",
    statLabel: "Response time",
  },
  {
    title: "Multilingual AI support for UK trading platform",
    metric: "−68% tickets · −81% response time",
    slug: "trading-platform-uk",
    industry: "Fintech & Trading",
    stat: "−68%",
    statLabel: "Support tickets",
  },
  {
    title: "AI call logging for UK professional services",
    metric: "−89% CRM admin · 61% → 94% accuracy",
    slug: "crm-automation-uk",
    industry: "Professional Services",
    stat: "−89%",
    statLabel: "CRM admin time",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Case studies</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">
          Proof from real deployments, not concept decks.
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          Every case study below is either a verified result or shared with explicit permission under NDA.
          No fictional company names. No invented metrics.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {INDUSTRIES.map((industry) => (
          <span
            key={industry}
            className="inline-flex items-center rounded-full border border-border-subtle bg-bg-elevated px-3 py-1 text-xs font-medium text-text-tertiary"
          >
            {industry}
          </span>
        ))}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {CASE_STUDIES.map((study) => (
          <Card key={study.slug}>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-400">
                {study.industry}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-accent-400">{study.stat}</p>
            <p className="text-xs text-text-tertiary">{study.statLabel}</p>
            <h2 className="mt-4 text-lg font-medium text-text-primary">{study.title}</h2>
            <p className="mt-1 text-sm text-text-secondary">{study.metric}</p>
            <Link
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-400 hover:text-accent-300"
              href={`/case-studies/${study.slug}`}
            >
              Read case study <span aria-hidden>→</span>
            </Link>
          </Card>
        ))}
      </section>
    </main>
  );
}