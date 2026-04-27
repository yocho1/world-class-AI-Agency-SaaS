import { Button } from "@/components/ui";

export function FinalCTA() {
  return (
    <section className="container rounded-2xl border border-border-default bg-bg-overlay p-10 text-center">
      <h2 className="text-3xl font-medium text-text-primary">Ready to ship your AI product in 30 days?</h2>
      <p className="mt-3 text-text-secondary">Book a free AI audit and receive a practical implementation roadmap.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button>Book free audit</Button>
        <Button variant="secondary">View pricing</Button>
      </div>
    </section>
  );
}