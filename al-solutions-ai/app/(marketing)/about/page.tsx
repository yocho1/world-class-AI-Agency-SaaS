import { Card } from "@/components/ui";

export default function AboutPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">About</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Built by operators who care about launch speed and measurable outcomes.</h1>
        <p className="mt-4 text-text-secondary">AL Solutions AI combines product design, engineering, and AI deployment into one execution path so teams can move from idea to shipped workflow without handoff loss.</p>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Speed", "Production-first delivery in 30 days or less."],
          ["Clarity", "Every engagement starts with a concrete scope and measurable KPIs."],
          ["Support", "We stay close through launch, tuning, and iteration."],
        ].map(([title, body]) => (
          <Card key={title}>
            <h2 className="text-xl font-medium text-text-primary">{title}</h2>
            <p className="mt-2 text-text-secondary">{body}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}