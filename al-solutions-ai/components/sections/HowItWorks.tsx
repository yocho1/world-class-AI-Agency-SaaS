const STEPS = ["Audit and scope", "Build and integrate", "Launch and optimize"];

export function HowItWorks() {
  return (
    <section className="container">
      <h2 className="text-3xl font-medium text-text-primary">How it works in 30 days</h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li className="rounded-2xl border border-border-subtle bg-bg-surface p-6" key={step}>
            <p className="text-xs text-text-tertiary">Step {index + 1}</p>
            <p className="mt-2 text-lg text-text-primary">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}