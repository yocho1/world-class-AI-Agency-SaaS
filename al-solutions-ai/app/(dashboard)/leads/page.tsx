import { Card } from "@/components/ui";

const LEADS = [
  { name: "Nexora Hotels", status: "Qualified", value: "$8.5k" },
  { name: "Atlas Retail", status: "Contacted", value: "$6.5k" },
  { name: "FinEdge", status: "New", value: "$12k" },
];

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Leads</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">Track and prioritize every inbound opportunity.</h1>
      </div>

      <div className="grid gap-4">
        {LEADS.map((lead) => (
          <Card className="flex items-center justify-between p-6" key={lead.name}>
            <div>
              <p className="text-lg font-medium text-text-primary">{lead.name}</p>
              <p className="mt-1 text-sm text-text-secondary">Status: {lead.status}</p>
            </div>
            <p className="text-sm text-accent-400">{lead.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}