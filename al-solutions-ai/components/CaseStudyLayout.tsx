import Image from "next/image";
import Link from "next/link";
import AuditCtaLink from "@/components/analytics/AuditCtaLink";

export interface CaseStudyData {
  slug: string;
  industry: string;
  headline: string;
  description: string;
  metrics: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  challenge: {
    statement: string;
    painPoints: string[];
  };
  solution: {
    intro: string;
    features: Array<{
      title: string;
      description: string;
      icon: string; // emoji or lucide icon name
    }>;
  };
  results: Array<{
    stat: string;
    label: string;
    note?: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    title: string;
    company: string;
    avatarSrc?: string;
  };
  companyName: string;
  relatedCaseStudies?: Array<{
    title: string;
    metric: string;
    slug: string;
  }>;
  /** Optional: detailed step-by-step process narrative */
  processSteps?: Array<{
    step: number;
    title: string;
    body: string;
  }>;
  /** Optional: technical architecture / implementation details */
  technicalDetails?: {
    intro: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  /** Optional: lessons learned and key takeaways */
  lessonsLearned?: string[];
  /** Optional: mid-page CTA sections with links */
  ctaSections?: Array<{
    title: string;
    body: string;
    linkHref: string;
    linkText: string;
  }>;
}

export function CaseStudyLayout({ data }: { data: CaseStudyData }) {
  return (
    <main className="min-h-screen bg-bg-default">
      {/* Breadcrumb */}
      <div className="container py-6 sm:py-8">
        <Link className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-400" href="/case-studies">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to case studies
        </Link>
      </div>

      {/* Hero Section */}
      <section className="border-b border-border-subtle bg-gradient-to-b from-bg-surface to-bg-default py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="inline-flex rounded-full bg-accent-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-400 sm:px-4 sm:py-1.5">
                {data.industry}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-text-primary sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl">
              {data.headline}
            </h1>

            <p className="mt-6 max-w-2xl text-base text-text-secondary sm:mt-8 sm:text-lg md:text-xl">
              {data.description}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 md:grid-cols-3">
            {data.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8 transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">{metric.label}</p>
                <p className="mt-4 text-4xl font-bold text-accent-400 sm:text-5xl">{metric.value}</p>
                <p className="mt-3 text-xs text-text-tertiary">{metric.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">The challenge</h2>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{data.challenge.statement}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Key pain points</h3>
                <ul className="mt-6 space-y-4">
                  {data.challenge.painPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-text-secondary sm:text-base">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">What we built</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg">
              {data.solution.intro}
            </p>

            <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-3">
              {data.solution.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8 transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
                >
                  <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="mt-4 text-base font-bold text-text-primary sm:text-lg">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">The results</h2>

            <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data.results.map((result, idx) => (
                <div key={idx} className="rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8">
                  <p className="text-3xl font-bold text-accent-400 sm:text-4xl md:text-5xl">{result.stat}</p>
                  <p className="mt-3 font-semibold text-text-primary">{result.label}</p>
                  {result.note && <p className="mt-2 text-xs text-text-tertiary">{result.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">How we delivered it</h2>
              <div className="mt-10 space-y-8 max-w-4xl">
                {data.processSteps.map((step) => (
                  <div key={step.step} className="flex gap-6 sm:gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent-400 bg-bg-surface text-sm font-bold text-accent-400">
                        {step.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">{step.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-text-secondary">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Details Section */}
      {data.technicalDetails && (
        <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">Technical implementation</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                {data.technicalDetails.intro}
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {data.technicalDetails.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
                  >
                    <h3 className="text-base font-bold text-text-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Sections */}
      {data.ctaSections && data.ctaSections.length > 0 && (
        <section className="border-b border-border-subtle bg-bg-surface py-12 sm:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl space-y-6">
              {data.ctaSections.map((cta, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-400/5 to-transparent p-6 sm:p-8"
                >
                  <h3 className="text-lg font-bold text-text-primary">{cta.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">{cta.body}</p>
                  <Link
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-400 transition-colors hover:text-accent-300"
                    href={cta.linkHref}
                  >
                    {cta.linkText}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lessons Learned Section */}
      {data.lessonsLearned && data.lessonsLearned.length > 0 && (
        <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">What we learned</h2>
              <ul className="mt-10 space-y-4">
                {data.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex gap-3 text-base leading-relaxed text-text-secondary sm:text-lg">
                    <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-accent-400" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      <section className="border-b border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-10 md:p-12">
            <svg className="h-8 w-8 text-accent-400 sm:h-10 sm:w-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.75-5-7-5S0 3.75 0 5v6c0 1 0 4 7 4s7 .75 7 4v6c0 1-4 2-7 2s-4 0-4-1m8 0c1.25 0 4-1 4-8V5c0-1.25-4.75-5-7-5s-7 3.75-7 5v6c0 1 0 4 7 4s7 .75 7 4v6c0 1-4 2-7 2s-4 0-4-1" />
            </svg>

            <blockquote className="mt-6 text-xl font-medium leading-relaxed text-text-primary sm:mt-8 sm:text-2xl md:text-3xl">
              &ldquo;{data.testimonial.quote}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-4 sm:mt-10">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-border-subtle sm:h-16 sm:w-16">
                {data.testimonial.avatarSrc ? (
                  <Image
                    alt={data.testimonial.author}
                    className="object-cover"
                    fill
                    sizes="64px"
                    src={data.testimonial.avatarSrc}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-400/20 to-accent-400/10 text-base font-semibold text-accent-400 sm:text-lg">
                    {data.testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-text-primary">{data.testimonial.author}</p>
                <p className="text-sm text-text-secondary">
                  {data.testimonial.title} <span className="hidden sm:inline">•</span> <span className="sm:hidden">at</span> {data.testimonial.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies Section */}
      {data.relatedCaseStudies && data.relatedCaseStudies.length > 0 && (
        <section className="border-t border-border-subtle bg-bg-surface py-12 sm:py-16 md:py-20">
          <div className="container">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">Related case studies</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {data.relatedCaseStudies.map((study) => (
                <div
                  key={study.slug}
                  className="rounded-2xl border border-border-subtle bg-bg-default p-6 sm:p-8 transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] font-semibold text-text-tertiary">{study.metric}</p>
                  <h3 className="mt-3 text-xl font-medium text-text-primary">{study.title}</h3>
                  <Link className="mt-6 inline-flex text-sm text-accent-400 hover:text-accent-300 transition-colors" href={`/case-studies/${study.slug}`}>
                    Read story
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-3xl border border-accent-400/20 bg-gradient-to-br from-accent-400/5 to-transparent p-8 text-center sm:p-10 md:p-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">Ready for results like this?</h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg">
              Start with a free AI audit to identify your fastest path to production.
            </p>
            <AuditCtaLink
              className="mt-6 inline-flex h-12 items-center rounded-lg bg-accent-400 px-6 text-sm font-semibold text-bg-default transition-all duration-300 hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20 sm:mt-8 sm:h-13 sm:px-8 sm:text-base"
              href="/free-ai-audit"
              buttonLocation="case_study"
            >
              Book Free AI Audit
            </AuditCtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
