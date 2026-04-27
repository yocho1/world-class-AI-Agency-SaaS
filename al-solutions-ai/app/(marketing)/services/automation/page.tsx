import Link from "next/link";
import { Card } from "@/components/ui";

const STEPS = ["Map the workflow", "Automate the handoff", "Measure the time saved", "Tune based on usage"];

export default function AutomationPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Automation Systems</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Remove repetitive ops work without breaking the process.</h1>
        <p className="mt-4 text-text-secondary">We connect the tools your team already uses and turn manual steps into tracked, repeatable workflows.</p>
      </div>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <h2 className="text-xl font-medium text-text-primary">Delivery flow</h2>
          <ol className="mt-5 space-y-3 text-sm text-text-secondary">
            {STEPS.map((step, index) => (
              <li key={step}>Step {index + 1}: {step}</li>
            ))}
          </ol>
          <Link className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
            Plan an automation sprint
          </Link>
        </Card>

        <Card className="bg-bg-overlay/70">
          <p className="text-sm text-text-tertiary">Typical outcomes</p>
          <div className="mt-4 space-y-3 text-sm text-text-secondary">
            <p>• Faster lead routing into CRM</p>
            <p>• Fewer manual follow-ups across sales and support</p>
            <p>• Cleaner operations with measurable time savings</p>
          </div>
        </Card>
      </section>
    </main>
  );
}