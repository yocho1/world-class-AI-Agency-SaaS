import type { Metadata } from "next";
import Script from "next/script";
import { Reveal } from "@/components/ui";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Pricing — Transparent Project Pricing, No Retainers | AL Solutions AI",
  description:
    "Honest project pricing for production AI: Starter from £4,500, Growth from £9,500, Enterprise custom. 30-day go-live guarantee. 50/50 payment. No retainer lock-in.",
  alternates: alternatesFor("/pricing"),
  openGraph: {
    url: canonicalUrl("/pricing"),
    title: "AI Pricing — Transparent Project Pricing, No Retainers | AL Solutions AI",
    description:
      "Honest project pricing for production AI: Starter from £4,500, Growth from £9,500, Enterprise custom. 30-day go-live guarantee. 50/50 payment. No retainer lock-in.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=AI Pricing&subtitle=Honest project pricing. No retainers. 30-day go-live guarantee.&tag=Pricing",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=AI Pricing&subtitle=Honest project pricing. No retainers. 30-day go-live guarantee.&tag=Pricing",
    ],
  },
};

const CALENDLY_URL = "https://calendly.com/achraflachgar/15min";

// =======================
// PRICING PLANS DATA
// =======================
interface PricingPlan {
  name: string;
  price: string;
  description: string;
  timeline: string;
  isPopular: boolean;
  includedFeatures: string[];
  excludedFeatures: string[];
  notIncluded: string;
  cta: string;
  ctaHref: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "From £4,500",
    description: "For one specific, scoped problem — a WhatsApp lead-qualifier, a single-channel support agent, or a focused automation.",
    timeline: "21 days",
    isPopular: false,
    includedFeatures: [
      "1 production AI agent on 1 channel",
      "Custom prompt engineering & guardrails",
      "Knowledge base ingestion (up to 100 docs)",
      "1 CRM or tool integration (HubSpot / Pipedrive / Sheets)",
      "Multilingual: English + 1 (Arabic / French)",
      "PostHog analytics dashboard",
      "30 days of post-launch iteration",
      "Senior engineer on every call",
    ],
    excludedFeatures: [
      "Multiple channels (WhatsApp + Web + Voice)",
      "Salesforce / Zoho integration",
      "Custom Arabic dialect tuning",
      "SLA-backed uptime guarantees",
    ],
    notIncluded: "WhatsApp Business API fees (paid directly to Meta), OpenAI API usage at cost.",
    cta: "Book free 30-min audit",
    ctaHref: CALENDLY_URL,
  },
  {
    name: "Growth",
    price: "From £9,500",
    description: "The plan most clients buy. Multi-channel AI agents, CRM automation, and the systems behind real −70% admin / +40% conversion outcomes.",
    timeline: "30 days",
    isPopular: true,
    includedFeatures: [
      "Up to 3 connected AI agents (lead, support, CRM)",
      "WhatsApp Business API + Web + 1 more channel",
      "HubSpot / Salesforce / Pipedrive deep integration",
      "Multilingual: Arabic (MSA + Gulf), French, English",
      "Voice transcription & one-click CRM logging",
      "Custom routing logic + human-handoff workflow",
      "Conversation analytics + weekly performance review",
      "60 days of post-launch iteration",
      "Direct Slack/WhatsApp line to your engineer",
    ],
    excludedFeatures: [
      "Multi-region / multi-brand deployments",
      "Custom on-prem hosting",
      "Dedicated 24/7 SLA",
    ],
    notIncluded: "Third-party API costs (OpenAI, WhatsApp, Twilio) billed at cost with no markup.",
    cta: "Book free 30-min audit",
    ctaHref: CALENDLY_URL,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For multi-region, multi-brand, or compliance-heavy deployments. Trading platforms, large real estate networks, regulated services.",
    timeline: "6–12 weeks",
    isPopular: false,
    includedFeatures: [
      "Unlimited agents and workflows",
      "Multi-region / multi-brand deployment",
      "Custom dialect & compliance tuning",
      "On-prem or private-cloud hosting (AWS / Azure)",
      "SOC 2 / FCA / DFSA-aligned audit trails",
      "Dedicated engineering pod (2–3 senior engineers)",
      "24/7 SLA-backed uptime",
      "Quarterly optimisation roadmap",
      "Direct line to founder for the duration",
    ],
    excludedFeatures: [],
    notIncluded: "Defined together in scoping. We will not start without a written statement of work.",
    cta: "Talk to the founder",
    ctaHref: CALENDLY_URL,
  },
];

const PRICING_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why one-time project pricing instead of a monthly retainer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most AI agencies charge £2,000–£6,000/month indefinitely because the system never quite works. We charge a one-time project fee because our job is to make the system work, hand it over, and walk away. If you want ongoing optimisation after go-live, that's an optional, opt-in retainer — not a lock-in."
      }
    },
    {
      "@type": "Question",
      name: "Why are you cheaper than McKinsey, Deloitte, and the big AI consultancies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three reasons. First, we are a small senior team — no associate consultants billing at £400/hour to learn on your project. Second, we ship production code, not 80-page strategy decks. Third, we specialise: WhatsApp AI, multilingual agents, and CRM automation. Specialisation means we have already solved the hard parts of your project."
      }
    },
    {
      "@type": "Question",
      name: "What is the 30-day go-live guarantee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You pay 50% on signing. If your AI system is not in production within 30 days of project start (or the agreed timeline for Enterprise), we keep working at no extra cost until it is. The remaining 50% is only invoiced once the system is live and accepted by you."
      }
    },
    {
      "@type": "Question",
      name: "What happens if my requirements change mid-project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small changes (rewording, prompt tuning, new edge cases) are covered. Significant scope changes (new channels, new integrations, new languages) are scoped as a written change order so you decide whether to add them now or in a follow-up phase."
      }
    },
    {
      "@type": "Question",
      name: "Are third-party costs like OpenAI and WhatsApp included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — and we will not mark them up. OpenAI, WhatsApp Business API, Twilio, and any other infrastructure costs are billed directly by those providers to your account. We will give you a written estimate of monthly running costs before you sign."
      }
    },
    {
      "@type": "Question",
      name: "What if I'm not sure which plan I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Book a free 30-minute audit. We will tell you honestly which tier fits — or whether your problem is better solved without AI at all. We have turned away projects that did not need us."
      }
    },
    {
      "@type": "Question",
      name: "What currencies and payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We quote in GBP, USD, AED, or EUR depending on your jurisdiction. We accept bank transfer (preferred), Stripe card payments, and Wise. UK VAT registered."
      }
    }
  ]
};

// =======================
// PLAN CARD COMPONENT
// =======================
interface PlanCardProps {
  readonly plan: PricingPlan;
}

function PlanCard(props: Readonly<PlanCardProps>) {
  const { plan } = props;
  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 ${
        plan.isPopular
          ? "border-accent-400 bg-gradient-to-br from-bg-surface to-bg-surface/50 shadow-lg shadow-accent-400/10 md:scale-105 md:z-10"
          : "border-border-subtle bg-bg-surface hover:border-accent-400/50"
      }`}
    >
      {/* Most Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-4 left-6 inline-flex rounded-full bg-accent-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-bg-default">
          Most Popular
        </div>
      )}

      <div className="p-6 sm:p-8">
        {/* Plan Name & Price */}
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-text-tertiary">{plan.name}</p>
          {plan.isPopular && <div className="hidden sm:block h-1 flex-1 bg-gradient-to-r from-accent-400/20 to-transparent" />}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <p className="text-4xl font-bold text-text-primary sm:text-5xl">{plan.price}</p>
          {plan.price !== "Custom" && <span className="text-sm text-text-secondary">one-time</span>}
        </div>

        <p className="mt-4 text-sm text-text-secondary leading-relaxed">{plan.description}</p>

        {/* Delivery Timeline */}
        <div className="mt-6 rounded-lg bg-bg-overlay/50 px-4 py-3 border border-border-subtle/50">
          <p className="text-xs uppercase tracking-wider text-text-tertiary font-semibold">Delivery</p>
          <p className="mt-1 text-base font-medium text-accent-400">{plan.timeline}</p>
        </div>

        {/* CTA Button */}
        <a
          className={`mt-6 inline-flex w-full h-11 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
            plan.isPopular
              ? "bg-accent-400 text-bg-default hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
              : "bg-bg-surface border border-border-subtle text-text-primary hover:border-accent-400 hover:bg-bg-overlay"
          }`}
          href={plan.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {plan.cta}
        </a>

        {/* Divider */}
        <div className="mt-8 border-t border-border-subtle" />

        {/* Included Features */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider font-bold text-text-primary mb-4">What&apos;s included</p>
          <ul className="space-y-3">
            {plan.includedFeatures.map((feature) => (
              <li key={feature} className="flex gap-3 items-start">
                <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 font-bold text-xs flex-shrink-0">
                  ✓
                </span>
                <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded Features (greyed out) */}
        {plan.excludedFeatures.length > 0 && (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wider font-bold text-text-tertiary mb-4">Not in this plan</p>
            <ul className="space-y-3">
              {plan.excludedFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 items-start opacity-50">
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-border-subtle flex items-center justify-center text-text-tertiary font-bold text-xs flex-shrink-0">
                    —
                  </span>
                  <span className="text-sm text-text-tertiary leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What's NOT Included Note */}
        <div className="mt-8 pt-6 border-t border-border-subtle/50">
          <p className="text-xs text-text-tertiary leading-relaxed">
            <span className="font-semibold text-text-secondary">Not included:</span> {plan.notIncluded}
          </p>
        </div>
      </div>
    </div>
  );
}

// =======================
// FAQ ITEM COMPONENT
// =======================
interface PricingFaqItemProps {
  readonly question: string;
  readonly answer: string;
}

function PricingFaqItem(props: Readonly<PricingFaqItemProps>) {
  const { question, answer } = props;
  return (
    <details className="rounded-2xl border border-border-subtle bg-bg-surface p-5 group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-text-primary hover:text-accent-400 transition-colors">
        <span>{question}</span>
        <span className="text-text-tertiary transition-transform duration-300 group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="pt-4 text-sm text-text-secondary leading-relaxed">{answer}</div>
    </details>
  );
}

// =======================
// MAIN PAGE COMPONENT
// =======================
export default function PricingPage() {
  return (
    <main className="min-h-screen bg-bg-default">
      <Script
        id="pricing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_FAQ_SCHEMA) }}
        strategy="afterInteractive"
      />
      {/* Hero Section */}
      <section className="border-b border-border-subtle bg-gradient-to-b from-bg-surface to-bg-default py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Pricing</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                Honest project pricing. No retainers. No surprises.
              </h1>
              <p className="mt-6 max-w-2xl text-base text-text-secondary sm:text-lg">
                Pay once for a working system. Three tiers, every one tied to a written scope. The price you see covers the engineering, not a discovery phase that bills by the hour.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-secondary">
                <span className="inline-flex items-center gap-2"><span aria-hidden className="text-accent-400">✓</span> 50/50 payment terms</span>
                <span className="inline-flex items-center gap-2"><span aria-hidden className="text-accent-400">✓</span> 30-day go-live guarantee</span>
                <span className="inline-flex items-center gap-2"><span aria-hidden className="text-accent-400">✓</span> Senior engineer on every call</span>
                <span className="inline-flex items-center gap-2"><span aria-hidden className="text-accent-400">✓</span> No retainer lock-in</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Risk Reversal Banner */}
      <section className="border-b border-border-subtle bg-bg-surface/40 py-6">
        <div className="container">
          <Reveal>
            <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-accent-400/30 bg-gradient-to-br from-accent-400/10 to-accent-400/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-400/20 text-accent-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent-400">Our 30-day go-live guarantee</p>
                  <p className="mt-1 text-base font-medium text-text-primary">
                    If your AI system isn&apos;t live in production within 30 days of project start, we keep working — at no extra cost — until it is.
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Pay 50% on signing, 50% at go-live. Your risk is capped at the deposit until you see it working.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              {PRICING_PLANS.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="border-t border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Complete feature comparison
            </h2>
            <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              Detailed breakdown of capabilities across all three plans.
            </p>

            <div className="mt-12 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-4 px-4 font-bold text-text-primary bg-bg-surface/50">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-text-primary bg-bg-surface/50">Starter</th>
                    <th className="text-center py-4 px-4 font-bold text-text-primary bg-bg-surface/50 border-l border-r border-accent-400/30">
                      Growth <span className="block text-xs font-normal text-accent-400 mt-1">Most Popular</span>
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-text-primary bg-bg-surface/50">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Production AI agents", launch: "1", growth: "Up to 3", scale: "Unlimited" },
                    { feature: "Delivery timeline", launch: "21 days", growth: "30 days", scale: "6–12 weeks" },
                    { feature: "Web chat", launch: "✓", growth: "✓", scale: "✓" },
                    { feature: "WhatsApp Business API", launch: "—", growth: "✓", scale: "✓" },
                    { feature: "Voice / call transcription", launch: "—", growth: "✓", scale: "✓" },
                    { feature: "CRM integration", launch: "1 (HubSpot/Pipedrive)", growth: "HubSpot/Salesforce/Pipedrive", scale: "Any (custom API)" },
                    { feature: "Languages supported", launch: "English + 1", growth: "AR / FR / EN", scale: "Any + dialect tuning" },
                    { feature: "Arabic dialect tuning", launch: "—", growth: "MSA + Gulf", scale: "Custom" },
                    { feature: "Analytics (PostHog)", launch: "✓", growth: "✓ + weekly review", scale: "✓ + quarterly roadmap" },
                    { feature: "Hosting", launch: "Our cloud", growth: "Our cloud", scale: "On-prem / private" },
                    { feature: "Compliance audit trail", launch: "—", growth: "Basic", scale: "SOC 2 / FCA / DFSA" },
                    { feature: "Post-launch iteration", launch: "30 days", growth: "60 days", scale: "Ongoing in scope" },
                    { feature: "Direct line to engineer", launch: "Email", growth: "Slack/WhatsApp", scale: "Dedicated pod" },
                    { feature: "30-day go-live guarantee", launch: "✓", growth: "✓", scale: "Per agreed timeline" },
                  ].map((row, idx) => (
                    <tr key={row.feature} className={`border-b border-border-subtle/50 ${idx % 2 === 0 ? "bg-bg-default" : "bg-bg-surface/30"}`}>
                      <td className="py-4 px-4 text-text-primary font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-text-secondary">{row.launch}</td>
                      <td className="py-4 px-4 text-center text-text-secondary border-l border-r border-accent-400/20">
                        {row.growth}
                      </td>
                      <td className="py-4 px-4 text-center text-text-secondary">{row.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-lg bg-bg-overlay/50 border border-border-subtle p-4 text-sm text-text-secondary">
              <p>
                <span className="font-semibold text-text-primary">Legend:</span> ✓ = Included | — = Not included in this plan | Custom features and add-ons available for all plans
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why no retainer trust band */}
      <section className="border-t border-border-subtle py-12 sm:py-16">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Why we refuse to charge a monthly retainer.
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
                  <p className="text-xs uppercase tracking-wider font-bold text-accent-400">The retainer trap</p>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    Most AI agencies charge £2k–£6k per month indefinitely. They are incentivised to make the system <em>almost</em> work — because if it ever fully works, the retainer ends.
                  </p>
                </div>
                <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
                  <p className="text-xs uppercase tracking-wider font-bold text-accent-400">Our model</p>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    Fixed price. Written scope. Production-grade system delivered, documented, and handed over to your team. We get paid once and walk away.
                  </p>
                </div>
                <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
                  <p className="text-xs uppercase tracking-wider font-bold text-accent-400">Want ongoing help?</p>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    Optional optimisation retainer (£1,500–£3,000/mo) is available <em>after</em> go-live, opt-in, cancellable any month. Most clients do not buy it.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="border-t border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Pricing questions, answered honestly.
            </h2>

            <div className="mt-12 max-w-3xl space-y-4">
              <PricingFaqItem
                question="Why one-time project pricing instead of a monthly retainer?"
                answer="Most AI agencies charge £2,000–£6,000/month indefinitely because the system never quite works. We charge a one-time project fee because our job is to make the system work, hand it over, and walk away. If you want ongoing optimisation after go-live, that&apos;s an optional, opt-in retainer — not a lock-in."
              />
              <PricingFaqItem
                question="Why are you cheaper than McKinsey, Deloitte, and the big AI consultancies?"
                answer="Three reasons. First, we are a small senior team — no associate consultants billing at £400/hour to learn on your project. Second, we ship production code, not 80-page strategy decks. Third, we specialise: WhatsApp AI, multilingual agents, and CRM automation. Specialisation means we have already solved the hard parts of your project."
              />
              <PricingFaqItem
                question="What is the 30-day go-live guarantee?"
                answer="You pay 50% on signing. If your AI system is not in production within 30 days of project start (or the agreed timeline for Enterprise), we keep working at no extra cost until it is. The remaining 50% is only invoiced once the system is live and accepted by you."
              />
              <PricingFaqItem
                question="What happens if my requirements change mid-project?"
                answer="Small changes (rewording, prompt tuning, new edge cases) are covered. Significant scope changes (new channels, new integrations, new languages) are scoped as a written change order so you decide whether to add them now or in a follow-up phase. No surprise invoices."
              />
              <PricingFaqItem
                question="Are third-party costs like OpenAI and WhatsApp included?"
                answer="No — and we will not mark them up. OpenAI, WhatsApp Business API, Twilio, and any other infrastructure costs are billed directly by those providers to your account. We will give you a written estimate of monthly running costs before you sign. For most clients this is £150–£800/month depending on volume."
              />
              <PricingFaqItem
                question="What if I'm not sure which plan I need?"
                answer="Book a free 30-minute audit. We will tell you honestly which tier fits — or whether your problem is better solved without AI at all. We have turned away projects that did not need us. Our reputation is worth more than one bad-fit deal."
              />
              <PricingFaqItem
                question="What currencies and payment methods do you accept?"
                answer="We quote in GBP, USD, AED, or EUR depending on your jurisdiction. We accept bank transfer (preferred), Stripe card payments, and Wise. UK VAT registered. Invoices include a clear breakdown so your finance team has no surprises."
              />
            </div>

            <a
              className="mt-8 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Still unsure? Book a free 30-minute audit →
            </a>
          </Reveal>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-400/5 to-accent-400/0 p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                Not sure which tier fits?
              </h2>

              <p className="mt-4 text-base text-text-secondary sm:text-lg">
                A 30-minute call with a senior engineer (not a sales rep) tells you which tier you need — or whether AI is the wrong fit right now. We will tell you either way.
              </p>

              <a
                className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent-400 px-8 text-sm font-semibold text-bg-default shadow-lg shadow-accent-400/20 transition-all hover:bg-accent-300 hover:shadow-xl hover:shadow-accent-400/30"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book free 30-min audit →
              </a>
              <p className="mt-4 text-xs text-text-tertiary">
                No sales pitch. No follow-up spam. Written summary in your inbox within 48 hours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}