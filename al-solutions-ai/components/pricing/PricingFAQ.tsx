const FAQS = [
  { question: "How fast can we launch?", answer: "Most teams go live in 30 days." },
  { question: "Do you support Arabic?", answer: "Yes, we support multilingual deployments including Arabic and French." },
];

export function PricingFAQ() {
  return (
    <div className="space-y-4">
      {FAQS.map((item) => (
        <details className="rounded-xl border border-border-subtle bg-bg-surface p-4" key={item.question}>
          <summary className="cursor-pointer text-sm font-medium text-text-primary">{item.question}</summary>
          <p className="mt-2 text-sm text-text-secondary">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}