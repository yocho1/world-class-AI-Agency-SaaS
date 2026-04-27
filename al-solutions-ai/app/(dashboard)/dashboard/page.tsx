import Link from "next/link";
import { Card } from "@/components/ui";

const METRICS = [
  { label: "New leads", value: "128", delta: "+18%" },
  { label: "Reply rate", value: "74%", delta: "+6%" },
  { label: "Booked audits", value: "21", delta: "+4" },
  { label: "Avg. response time", value: "3m 18s", delta: "-42%" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Operations snapshot</p>
          <h1 className="mt-2 text-3xl font-medium text-text-primary md:text-4xl">Your pipeline is live and ready.</h1>
        </div>
        <Link className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
          Create new audit
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((metric) => (
          <Card key={metric.label} className="space-y-2 p-6">
            <p className="text-sm text-text-tertiary">{metric.label}</p>
            <p className="text-3xl font-medium text-text-primary">{metric.value}</p>
            <p className="text-sm text-accent-400">{metric.delta} vs last week</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-text-primary">Recent activity</h2>
            <Link className="text-sm text-accent-400 hover:text-accent-300" href="/conversations">
              View conversations
            </Link>
          </div>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>• New audit request from Nexora Hotels</p>
            <p>• 4 high-intent leads tagged as qualified</p>
            <p>• 2 conversations escalated to human follow-up</p>
          </div>
        </Card>

        <Card className="space-y-5 p-6">
          <h2 className="text-xl font-medium text-text-primary">Next actions</h2>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li>• Review the latest lead scoring signals</li>
            <li>• Update chatbot copy for the hospitality campaign</li>
            <li>• Export this week’s qualified leads</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}