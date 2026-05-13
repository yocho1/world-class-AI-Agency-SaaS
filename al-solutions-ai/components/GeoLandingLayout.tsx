import Link from "next/link";
import Script from "next/script";
import { Reveal } from "@/components/ui";
import { canonicalUrl, SITE_URL } from "@/lib/seo";

export interface GeoLandingFaq {
  readonly question: string;
  readonly answer: string;
}

export interface GeoLandingData {
  /** URL path without locale prefix, e.g. "/ai-chatbot-agency-dubai" */
  readonly path: string;
  /** City or region name as used in copy, e.g. "Dubai" */
  readonly city: string;
  /** ISO 3166-1 alpha-2 country code, e.g. "AE" */
  readonly countryCode: string;
  /** Human-readable country name, e.g. "United Arab Emirates" */
  readonly country: string;
  /** Eyebrow tag, e.g. "AI Chatbot Agency · Dubai" */
  readonly eyebrow: string;
  /** Main H1 headline */
  readonly headline: string;
  /** Hero supporting paragraph */
  readonly subheadline: string;
  /** 3–4 short value props shown as a card grid */
  readonly valueProps: ReadonlyArray<{
    readonly title: string;
    readonly description: string;
  }>;
  /** Local context paragraph(s) — long-form prose for SEO depth */
  readonly localContext: ReadonlyArray<string>;
  /** Why-this-city paragraphs */
  readonly whyHere: ReadonlyArray<{
    readonly heading: string;
    readonly body: string;
  }>;
  /** Local industries / use cases */
  readonly industries: ReadonlyArray<{
    readonly name: string;
    readonly description: string;
  }>;
  /** Outcome stats */
  readonly metrics: ReadonlyArray<{
    readonly stat: string;
    readonly label: string;
    readonly note: string;
  }>;
  /** Page-specific FAQ entries */
  readonly faqs: ReadonlyArray<GeoLandingFaq>;
  /** Closing CTA section copy */
  readonly closingCtaTitle: string;
  readonly closingCtaBody: string;
}

function buildSchemas(data: GeoLandingData) {
  const url = canonicalUrl(data.path);
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `AL Solutions AI — ${data.city}`,
    url,
    image: `${SITE_URL}/images/al-solutions-ai-logo.svg`,
    description: data.subheadline,
    areaServed: {
      "@type": "City",
      name: data.city,
      containedInPlace: { "@type": "Country", name: data.country },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: data.city,
      addressCountry: data.countryCode,
    },
    knowsLanguage: ["en", "ar", "fr"],
    serviceType: [
      "AI Chatbot Development",
      "WhatsApp Business Automation",
      "Business Process Automation",
      "Lead Conversion Systems",
    ],
    provider: { "@type": "Organization", name: "AL Solutions AI", url: SITE_URL },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return { localBusiness, faq };
}

export function GeoLandingLayout({ data }: { data: GeoLandingData }) {
  const { localBusiness, faq } = buildSchemas(data);

  return (
    <main className="min-h-screen bg-bg-default">
      <Script
        id={`geo-localbusiness-${data.city.toLowerCase().replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <Script
        id={`geo-faq-${data.city.toLowerCase().replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
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

      {/* VALUE PROPS */}
      <section className="border-b border-border-subtle py-12 sm:py-16">
        <div className="container">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data.valueProps.map((vp) => (
                <div
                  key={vp.title}
                  className="rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
                >
                  <h3 className="text-base font-bold text-text-primary">{vp.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{vp.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOCAL CONTEXT (long-form prose for SEO depth) */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Why {data.city} businesses are deploying AI now
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-text-secondary">
                {data.localContext.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY HERE (subheaded paragraphs) */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                What makes our {data.city} engagements different
              </h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {data.whyHere.map((block) => (
                  <div key={block.heading}>
                    <h3 className="text-lg font-bold text-text-primary">{block.heading}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{block.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Industries we deploy for in {data.city}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {data.industries.map((ind) => (
                <div
                  key={ind.name}
                  className="rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
                >
                  <h3 className="text-base font-bold text-text-primary">{ind.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {ind.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* METRICS */}
      <section className="border-b border-border-subtle py-12 sm:py-16">
        <div className="container">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {data.metrics.map((m) => (
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

      {/* FAQ */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {data.city} AI agency questions
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
                {data.closingCtaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
                {data.closingCtaBody}
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
              <p className="mt-4 text-xs text-text-tertiary">
                30-min call · Written scope report · No commitment
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
