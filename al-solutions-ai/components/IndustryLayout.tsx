import Link from "next/link";
import Script from "next/script";
import { Reveal } from "@/components/ui";
import { canonicalUrl, SITE_URL } from "@/lib/seo";

export interface IndustryLandingData {
  /** URL path without locale prefix, e.g. "/industries/hospitality" */
  readonly path: string;
  /** Industry name in copy, e.g. "Hospitality" */
  readonly industry: string;
  readonly eyebrow: string;
  readonly headline: string;
  readonly subheadline: string;
  readonly painPoints: ReadonlyArray<string>;
  readonly outcomes: ReadonlyArray<{ readonly stat: string; readonly label: string; readonly note: string }>;
  readonly useCases: ReadonlyArray<{ readonly title: string; readonly body: string }>;
  readonly relatedCaseStudy?: {
    readonly title: string;
    readonly summary: string;
    readonly href: string;
  };
  readonly faqs: ReadonlyArray<{ readonly question: string; readonly answer: string }>;
}

export function IndustryLayout({ data }: { data: IndustryLandingData }) {
  const url = canonicalUrl(data.path);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI Chatbots & Automation for ${data.industry}`,
    serviceType: "AI Chatbot Development",
    provider: { "@type": "Organization", name: "AL Solutions AI", url: SITE_URL },
    areaServed: ["MENA", "Europe", "United Kingdom"],
    url,
  };

  return (
    <main className="min-h-screen bg-bg-default">
      <Script
        id={`industry-faq-${data.industry.toLowerCase().replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`industry-service-${data.industry.toLowerCase().replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* HERO */}
      <section className="border-b border-border-subtle bg-gradient-to-b from-bg-surface to-bg-default py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <span className="inline-flex rounded-full bg-accent-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400">
                {data.eyebrow}
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-primary sm:mt-8 sm:text-5xl md:text-6xl">
                {data.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-base text-text-secondary sm:mt-8 sm:text-lg md:text-xl">
                {data.subheadline}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/free-ai-audit"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-accent-400 px-8 text-sm font-semibold text-bg-default shadow-lg shadow-accent-400/20 transition-all hover:bg-accent-300 hover:shadow-xl hover:shadow-accent-400/30"
                >
                  Book Free AI Audit
                </Link>
                <p className="text-xs text-text-tertiary">
                  30-min call · Written scope report · No commitment
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="border-b border-border-subtle py-12 sm:py-16">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                The pattern we keep seeing in {data.industry.toLowerCase()}
              </h2>
              <ul className="mt-8 space-y-4">
                {data.painPoints.map((p) => (
                  <li key={p} className="flex gap-3 text-base leading-relaxed text-text-secondary">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="border-b border-border-subtle py-12 sm:py-16">
        <div className="container">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {data.outcomes.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-border-subtle bg-bg-surface p-6 text-center"
                >
                  <p className="text-4xl font-bold text-accent-400 sm:text-5xl">{m.stat}</p>
                  <p className="mt-3 text-sm font-medium text-text-secondary">{m.label}</p>
                  <p className="mt-2 text-xs text-text-tertiary">{m.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              What we deploy for {data.industry.toLowerCase()} clients
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {data.useCases.map((u) => (
                <div
                  key={u.title}
                  className="rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
                >
                  <h3 className="text-base font-bold text-text-primary">{u.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{u.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* RELATED CASE STUDY */}
      {data.relatedCaseStudy ? (
        <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-surface to-bg-surface/50 p-8 sm:p-12">
                <span className="inline-flex rounded-full bg-accent-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400">
                  Related case study
                </span>
                <h3 className="mt-4 text-2xl font-bold text-text-primary sm:text-3xl">
                  {data.relatedCaseStudy.title}
                </h3>
                <p className="mt-3 text-base text-text-secondary">{data.relatedCaseStudy.summary}</p>
                <Link
                  href={data.relatedCaseStudy.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-400 hover:text-accent-300"
                >
                  Read the full case study →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {data.industry} AI questions
            </h2>
            <div className="mt-10 max-w-3xl space-y-4">
              {data.faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-2xl border border-border-subtle bg-bg-surface p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-text-primary transition-colors hover:text-accent-400">
                    <span>{f.question}</span>
                    <span className="text-text-tertiary transition-transform duration-300 group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{f.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl border border-accent-400/30 bg-gradient-to-br from-accent-400/10 to-accent-400/0 p-8 text-center sm:p-12">
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                Ready to deploy AI for your {data.industry.toLowerCase()} business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
                Book a 30-minute audit. We&apos;ll review your current customer touchpoints, identify
                three specific automation opportunities, and send you a written scope report — no
                commitment.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/free-ai-audit"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-accent-400 px-8 text-sm font-semibold text-bg-default shadow-lg shadow-accent-400/20 transition-all hover:bg-accent-300 hover:shadow-xl hover:shadow-accent-400/30"
                >
                  Book Free AI Audit
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-border-default px-6 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated"
                >
                  See Case Studies
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
