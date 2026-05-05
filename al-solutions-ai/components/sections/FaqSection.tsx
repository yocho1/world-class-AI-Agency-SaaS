"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "How long does it take to launch an AI chatbot?",
    answer: "Our standard launch cycle is 30 days from contract signing to production deployment.",
  },
  {
    id: 2,
    question: "What languages does your AI support?",
    answer: "Our chatbots support Arabic, English, French, and can be configured for additional languages.",
  },
  {
    id: 3,
    question: "Do you integrate with existing CRM systems?",
    answer: "Yes — we integrate with HubSpot, Salesforce, Zoho, and custom CRM systems via API.",
  },
  {
    id: 4,
    question: "What is included in the free AI audit?",
    answer:
      "The free AI audit includes a 30-minute strategy call, analysis of your current operations, and a written report identifying 3 specific automation opportunities with estimated ROI.",
  },
  {
    id: 5,
    question: "How much does a custom AI chatbot cost?",
    answer: "Our AI chatbot projects start at $2,500 for a single-workflow implementation. Full pricing is available on our pricing page.",
  },
  {
    id: 6,
    question: "Do you provide support after launch?",
    answer: "Yes — all plans include 60 days of post-launch support. Enterprise plans include ongoing optimization and monthly performance reviews.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="container py-10">
      <Reveal>
        <h2 className="text-3xl font-medium text-text-primary">Frequently asked questions</h2>
        <div className="mt-6 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details className="rounded-2xl border border-border-subtle bg-bg-surface p-5" key={item.id} open={openId === item.id} onToggle={(event) => setOpenId(event.currentTarget.open ? item.id : null)}>
              <summary
                aria-controls={`faq-answer-${item.id}`}
                aria-expanded={openId === item.id}
                className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium text-text-primary"
                id={`faq-q-${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenId(openId === item.id ? null : item.id);
                }}
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className={`text-text-tertiary transition-transform ${openId === item.id ? "rotate-180" : "rotate-0"}`}>
                  ▾
                </span>
              </summary>
              <div aria-label={item.question} className="pt-3 text-sm text-text-secondary" id={`faq-answer-${item.id}`}>
                {item.answer}
              </div>
            </details>
          ))}
        </div>
        <Link className="mt-5 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300" href="/free-ai-audit">
          Still have questions? Talk to our team →
        </Link>
      </Reveal>
    </section>
  );
}