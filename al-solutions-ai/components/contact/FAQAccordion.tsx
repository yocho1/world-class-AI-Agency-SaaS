"use client";

import React, { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section aria-label="Frequently asked questions" className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-8">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <h3>
              <button
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => toggle(i)}
                className="w-full text-left px-4 py-3 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <span className="font-medium">{f.question}</span>
                <span className="text-sm text-muted">{openIndex === i ? "−" : "+"}</span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className={`${openIndex === i ? "block" : "hidden"} p-4 text-sm text-text-secondary bg-bg-elevated`}
            >
              <p className="leading-relaxed">{f.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
