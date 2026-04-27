import { Card } from "@/components/ui";

const SERVICES = [
  "Custom AI chatbots",
  "Automation systems",
  "Lead conversion engines",
  "Web + AI product bundles",
];

export function ServicesOverview() {
  return (
    <section className="container grid gap-4 md:grid-cols-2">
      {SERVICES.map((service) => (
        <Card key={service} className="hover:border-primary-600/60 hover:shadow-[0_0_0_1px_rgba(108,99,255,0.2)]">
          <h3 className="text-xl font-medium text-text-primary">{service}</h3>
          <p className="mt-2 text-text-secondary">Outcome-first implementation customized for your workflow.</p>
        </Card>
      ))}
    </section>
  );
}