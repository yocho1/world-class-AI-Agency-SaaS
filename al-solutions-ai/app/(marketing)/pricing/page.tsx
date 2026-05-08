export const metadata = {
  title: "AI Chatbot Pricing — From $2,500 | AL Solutions AI",
  description:
    "Transparent, one-time project pricing for custom AI chatbots and automation. Launch plan from $2,500. Growth plan from $6,500. No retainers, no surprises.",
  canonical: "https://www.alsolutionsai.online/pricing",
  openGraph: {
    url: "https://www.alsolutionsai.online/pricing",
    title: "AI Chatbot Pricing — From $2,500 | AL Solutions AI",
    description:
      "Transparent, one-time project pricing for custom AI chatbots and automation. Launch plan from $2,500. Growth plan from $6,500. No retainers, no surprises.",
  },
};

import Link from "next/link";
import { Reveal } from "@/components/ui";

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
    name: "Launch",
    price: "$2,500",
    description: "For teams validating one AI use case with a fast, focused scope.",
    timeline: "14 days",
    isPopular: false,
    includedFeatures: [
      "1 AI workflow",
      "Lead capture setup",
      "Web chat deployment",
      "Basic analytics",
      "Weekly check-ins",
      "30 days post-launch support",
      "Email notifications",
      "Brand customization",
    ],
    excludedFeatures: ["CRM integration", "Multiple workflows", "Priority support", "Advanced analytics"],
    notIncluded: "CRM integration, mobile channels, multi-workflow routing",
    cta: "Book free audit",
    ctaHref: "/free-ai-audit",
  },
  {
    name: "Growth",
    price: "$6,500",
    description: "For companies ready to bundle chatbot, automation, and reporting in one launch.",
    timeline: "30 days",
    isPopular: true,
    includedFeatures: [
      "3 AI workflows",
      "CRM integration (HubSpot, Salesforce, Zoho)",
      "Analytics dashboard",
      "WhatsApp & SMS deployment",
      "Priority support (24-48hr response)",
      "60 days post-launch support",
      "Custom brand tone & guardrails",
      "Advanced routing logic",
      "Performance optimization",
      "Conversation audit",
    ],
    excludedFeatures: ["Multiple team workspaces", "Dedicated strategy team", "White-label options"],
    notIncluded: "Multiple team workspaces, ongoing monthly optimization, white-label resale",
    cta: "Start Growth Plan",
    ctaHref: "/free-ai-audit",
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For multi-team deployments and deeper operational automation.",
    timeline: "Custom",
    isPopular: false,
    includedFeatures: [
      "Unlimited AI workflows",
      "Custom integrations (any API)",
      "Dedicated strategy session",
      "Enterprise support (priority)",
      "Multiple team workspaces",
      "Advanced compliance & security",
      "White-label options",
      "Ongoing quarterly optimization",
      "SLA guarantees",
      "Custom training program",
    ],
    excludedFeatures: [],
    notIncluded: "Discussed during consultation",
    cta: "Contact sales",
    ctaHref: "/free-ai-audit",
  },
];

// =======================
// PLAN CARD COMPONENT
// =======================
interface PlanCardProps {
  plan: PricingPlan;
}

function PlanCard({ plan }: PlanCardProps) {
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
        <Link
          className={`mt-6 inline-flex w-full h-11 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
            plan.isPopular
              ? "bg-accent-400 text-bg-default hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
              : "bg-bg-surface border border-border-subtle text-text-primary hover:border-accent-400 hover:bg-bg-overlay"
          }`}
          href={plan.ctaHref}
        >
          {plan.cta}
        </Link>

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
  question: string;
  answer: string;
}

function PricingFaqItem({ question, answer }: PricingFaqItemProps) {
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
      {/* Hero Section */}
      <section className="border-b border-border-subtle bg-gradient-to-b from-bg-surface to-bg-default py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Pricing</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                Transparent pricing for production AI work.
              </h1>
              <p className="mt-6 max-w-2xl text-base text-text-secondary sm:text-lg md:text-lg">
                Choose the engagement model that matches your rollout speed, internal bandwidth, and integration depth. All prices are one-time project fees.
              </p>
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
                    <th className="text-center py-4 px-4 font-bold text-text-primary bg-bg-surface/50">Launch</th>
                    <th className="text-center py-4 px-4 font-bold text-text-primary bg-bg-surface/50 border-l border-r border-accent-400/30">
                      Growth
                      <span className="block text-xs font-normal text-accent-400 mt-1">Most Popular</span>
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-text-primary bg-bg-surface/50">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "AI Workflows", launch: "1", growth: "3", scale: "Unlimited" },
                    { feature: "Delivery Timeline", launch: "14 days", growth: "30 days", scale: "Custom" },
                    { feature: "CRM Integration", launch: "—", growth: "✓", scale: "✓" },
                    { feature: "Web Chat", launch: "✓", growth: "✓", scale: "✓" },
                    { feature: "WhatsApp & SMS", launch: "—", growth: "✓", scale: "✓" },
                    { feature: "Analytics Dashboard", launch: "Basic", growth: "✓", scale: "Advanced" },
                    { feature: "Custom Integrations", launch: "—", growth: "—", scale: "✓" },
                    { feature: "Multiple Workspaces", launch: "—", growth: "—", scale: "✓" },
                    { feature: "White-Label Options", launch: "—", growth: "—", scale: "✓" },
                    { feature: "Post-Launch Support", launch: "30 days", growth: "60 days", scale: "Ongoing" },
                    { feature: "Priority Support", launch: "—", growth: "24-48hr", scale: "Dedicated" },
                    { feature: "Ongoing Optimization", launch: "—", growth: "—", scale: "Quarterly" },
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

      {/* Pricing FAQ */}
      <section className="border-t border-border-subtle py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Pricing questions?
            </h2>

            <div className="mt-12 max-w-3xl space-y-4">
              <PricingFaqItem
                question="Do you charge monthly or one-time?"
                answer="All pricing is one-time project fees. After your project launches, you can purchase ongoing support or optimization on a retainer basis, but the core delivery cost is paid once at project start."
              />
              <PricingFaqItem
                question="What if the project goes over 30 days?"
                answer="We aim to deliver on timeline. If a project exceeds the planned timeline due to scope creep, we discuss it with you first. Most delays are avoided through clear requirements and weekly check-ins. Custom plans include flexibility for timeline adjustments."
              />
              <PricingFaqItem
                question="Can I upgrade my plan later?"
                answer="Yes. If you start with Launch and want to add AI workflows later, we can scope additional work as separate projects or fold it into an expanded engagement. Talk to our team about your growth plans."
              />
              <PricingFaqItem
                question="Do you offer refunds?"
                answer="We don&apos;t offer refunds on completed work. However, if a deliverable doesn&apos;t meet our quality standards or your requirements, we&apos;ll iterate at no extra charge until you&apos;re satisfied."
              />
              <PricingFaqItem
                question="What currencies do you accept?"
                answer="We quote in USD. We accept wire transfers, credit cards (via Stripe), and international payment methods. Contact us if you need invoicing in a different currency."
              />
            </div>

            <Link
              className="mt-8 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300"
              href="/free-ai-audit"
            >
              Still have questions? Talk to our team →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-400/5 to-accent-400/0 p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                Not sure which plan is right for you?
              </h2>

              <p className="mt-4 text-base text-text-secondary sm:text-lg">
                Let&apos;s discuss your project scope, timeline, and goals. We&apos;ll recommend the best plan during a free 30-minute consultation.
              </p>

              <Link
                className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent-400 px-8 text-sm font-semibold text-bg-default transition-all hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
                href="/free-ai-audit"
              >
                Book Free Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}