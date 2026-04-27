"use client";

import { useEffect, useMemo, useState } from "react";
import { usePostHog } from "@/hooks/usePostHog";
import { trackTestimonialViewed } from "@/lib/analytics/events";

interface TestimonialItem {
  id: string;
  quote: string;
  person: string;
  role: string;
  metric: string;
}

interface TestimonialsProps {
  items?: TestimonialItem[];
}

const ITEMS: TestimonialItem[] = [
  {
    id: "testi-1",
    quote: "Their team replaced three disconnected vendors and launched a full AI concierge in under a month.",
    person: "Amina N.",
    role: "CMO, Nexora Hotels",
    metric: "+2.3x lead conversion",
  },
  {
    id: "testi-2",
    quote: "We reduced support response lag from hours to minutes while keeping quality consistent across Arabic and English.",
    person: "Khalid R.",
    role: "Head of CX, Atlas Retail",
    metric: "48h faster support flow",
  },
  {
    id: "testi-3",
    quote: "The automation stack paid for itself in one quarter. Sales now gets qualified meetings, not noise.",
    person: "Leila S.",
    role: "COO, FinEdge",
    metric: "31% lower ops cost",
  },
];

export function Testimonials({ items = ITEMS }: TestimonialsProps) {
  const posthog = usePostHog();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeItem = useMemo(() => items[active], [active, items]);

  useEffect(() => {
    if (!posthog || !activeItem) {
      return;
    }

    trackTestimonialViewed(posthog, {
      testimonial_id: activeItem.id,
      auto_or_manual: "auto",
    });
  }, [activeItem, posthog]);

  useEffect(() => {
    if (isHovered || items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % items.length);
    }, 5400);

    return () => {
      window.clearInterval(timer);
    };
  }, [isHovered, items.length]);

  const goTo = (index: number) => {
    setActive(index);

    if (!posthog) {
      return;
    }

    trackTestimonialViewed(posthog, {
      testimonial_id: items[index].id,
      auto_or_manual: "manual",
    });
  };

  return (
    <section className="container py-10">
      <h2 className="text-3xl font-medium text-text-primary">Trusted outcomes, not vanity prototypes</h2>

      <div
        className="mt-6 rounded-2xl border border-border-subtle bg-bg-surface p-6 md:p-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <figure key={activeItem.id}>
          <blockquote className="max-w-3xl text-lg text-text-primary md:text-2xl">&quot;{activeItem.quote}&quot;</blockquote>
          <figcaption className="mt-4 text-sm text-text-secondary">
            {activeItem.person} • {activeItem.role}
          </figcaption>
          <p className="mt-4 text-base font-medium text-accent-400">{activeItem.metric}</p>
        </figure>

        <div className="mt-6 flex items-center gap-2">
          {items.map((item, index) => (
            <button
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2 rounded-full transition-all ${index === active ? "w-9 bg-accent-400" : "w-2 bg-border-default hover:bg-text-tertiary"}`}
              key={item.id}
              onClick={() => goTo(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}