import Link from "next/link";
import { Card } from "@/components/ui";

const BENEFITS = ["Capture more qualified inquiries", "Qualify intent before handoff", "Shorten response time", "Improve booked meetings"];

export default function LeadConversionPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Lead Conversion</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Turn high-intent traffic into real sales conversations.</h1>
        <p className="mt-4 text-text-secondary">This track focuses on the moments where visitors are most likely to convert and reduces drop-off before contact.</p>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-medium text-text-primary">What improves</h2>
          <ul className="mt-5 space-y-3 text-sm text-text-secondary">
            {BENEFITS.map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
          <Link className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
            Review your funnel
          </Link>
        </Card>

        <Card className="bg-bg-overlay/70">
          <p className="text-sm text-text-tertiary">Common entry points</p>
          <div className="mt-4 space-y-3 text-sm text-text-secondary">
            <p>• Homepage hero and demo flow</p>
            <p>• Chatbot qualification sequence</p>
            <p>• Pricing and audit request paths</p>
          </div>
        </Card>
      </section>
    </main>
  );
}