import { Card } from "@/components/ui";

export function Testimonials() {
  return (
    <section className="container grid gap-4 md:grid-cols-3">
      {["2.3x lead conversion", "48h faster support", "31% lower ops costs"].map((metric) => (
        <Card key={metric}>
          <p className="text-2xl font-medium text-accent-400">{metric}</p>
          <p className="mt-2 text-text-secondary">Verified customer outcome from production deployment.</p>
        </Card>
      ))}
    </section>
  );
}