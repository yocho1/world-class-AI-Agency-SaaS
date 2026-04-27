import Link from "next/link";
import { Button, Card } from "@/components/ui";

const TIERS = [
  {
    name: "Launch",
    price: "$2,500",
    description: "For teams validating one AI use case with a fast, focused scope.",
    features: ["1 AI workflow", "Lead capture setup", "14-day delivery", "Weekly check-ins"],
  },
  {
    name: "Growth",
    price: "$6,500",
    description: "For companies ready to bundle chatbot, automation, and reporting in one launch.",
    features: ["3 AI workflows", "CRM integration", "Analytics dashboard", "Priority support"],
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For multi-team deployments and deeper operational automation.",
    features: ["Multiple workspaces", "Custom integrations", "Dedicated strategy", "Ongoing optimization"],
  },
];

export default function PricingPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Pricing</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Transparent pricing for production AI work.</h1>
        <p className="mt-4 text-text-secondary">Choose the engagement model that matches your rollout speed, internal bandwidth, and integration depth.</p>
      </div>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        {TIERS.map((tier, index) => (
          <Card className={index === 1 ? "border-primary-600/70 bg-bg-overlay" : "bg-bg-surface"} key={tier.name}>
            <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">{tier.name}</p>
            <p className="mt-3 text-4xl font-medium text-text-primary">{tier.price}</p>
            <p className="mt-3 text-sm text-text-secondary">{tier.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-text-secondary">
              {tier.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Link className="mt-8 inline-flex" href="/free-ai-audit">
              <Button className="w-full" variant={index === 1 ? "primary" : "secondary"}>
                {index === 1 ? "Start Growth Plan" : "Book free audit"}
              </Button>
            </Link>
          </Card>
        ))}
      </section>
    </main>
  );
}