"use client";

import { useState } from "react";
import { Reveal, StaggerReveal } from "@/components/ui";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "How long does it take to build and launch an AI chatbot with AL Solutions AI?",
    answer: "Most projects go live within 21–30 days from the signed agreement. The timeline depends on the complexity of integrations required (e.g. CRM sync, WhatsApp Business API approval, custom knowledge base). We provide a written go-live timeline after the free audit call.",
  },
  {
    id: 2,
    question: "Do you build AI chatbots that work in Arabic?",
    answer: "Yes. Arabic is a core language for our AI systems, not an add-on. Our chatbots handle Modern Standard Arabic and major Gulf dialects, switch seamlessly between Arabic and English mid-conversation, and render correctly in right-to-left layouts. This is one of the areas where we have deeper experience than most UK AI agencies.",
  },
  {
    id: 3,
    question: "Which CRM systems do you integrate with?",
    answer: "We integrate with HubSpot, Salesforce, Pipedrive, and custom CRM systems via API. Our AI agents can log conversations, update contact records, extract deal context from calls, and trigger automated workflows — all reviewed and approved by your team before any data is written.",
  },
  {
    id: 4,
    question: "What is included in the free AI audit?",
    answer: "The free audit is a 30-minute call with a senior member of our team (not a sales rep). You will receive a written scope report within 48 hours that identifies the highest-ROI automation opportunities for your specific business, a recommended tech stack, a realistic timeline, and an honest assessment of whether AI is the right investment at this stage.",
  },
  {
    id: 5,
    question: "Do you offer ongoing support after the system goes live?",
    answer: "Yes. Every project includes a 30-day post-launch support window. After that, we offer optional monthly maintenance and optimisation packages, or hand over full documentation so your team can manage the system independently. We do not lock clients into retainers — this is a deliberate choice.",
  },
];

interface FaqSectionProps {
  readonly title?: string;
}

export function FaqSection({ title = "Questions we hear most often" }: Readonly<FaqSectionProps>) {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="section-padding container">
      <Reveal>
        <h2 className="text-3xl font-medium text-text-primary">{title}</h2>
        <StaggerReveal className="mt-6 space-y-3" staggerDelay={0.08}>
          {FAQ_ITEMS.map((item) => (
            <details className="rounded-2xl border border-border-subtle bg-bg-surface p-5 transition-all duration-300 hover:border-accent-400/20 hover:bg-bg-elevated open:hover:bg-bg-surface" key={item.id} open={openId === item.id} onToggle={(event) => setOpenId(event.currentTarget.open ? item.id : null)}>
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
        </StaggerReveal>
        <a
          className="mt-5 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300"
          href="https://calendly.com/achraflachgar/15min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Still have questions? Book a free 30-minute call →
        </a>
      </Reveal>
    </section>
  );
}