import { Card } from "@/components/ui";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Analytics</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">See how visitors move from attention to action.</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Sessions", "12.4k"],
          ["Chat opens", "38%"],
          ["Audit requests", "4.8%"],
        ].map(([label, value]) => (
          <Card key={label} className="p-6">
            <p className="text-sm text-text-tertiary">{label}</p>
            <p className="mt-2 text-3xl font-medium text-text-primary">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}