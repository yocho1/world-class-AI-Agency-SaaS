"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePostHog } from "@/hooks/usePostHog";
import { trackTestimonialViewed } from "@/lib/analytics/events";
import { Reveal } from "@/components/ui";

interface TestimonialItem {
  readonly id: number;
  readonly quote: string;
  readonly name: string;
  readonly title: string;
  readonly company: string;
  readonly initials: string;
  readonly linkedin: string | null;
  readonly metric: string;
  readonly metricNote: string;
}

interface TestimonialsProps {
  readonly items?: TestimonialItem[];
}

const ITEMS: TestimonialItem[] = [
  {
    id: 1,
    quote:
      "Before AL Solutions, we had three vendors, none of them talking to each other. Within 28 days we had a single AI system live on our website and WhatsApp that we can actually measure.",
    name: "Amina Nasser",
    title: "Chief Marketing Officer",
    company: "Nexora Hotels Group",
    initials: "AN",
    linkedin: null,
    metric: "+62% faster first response",
    metricNote: "Nexora Hotels, 60 days post-launch",
  },
  // TODO: Replace with real testimonial from FinEdge contact
  {
    id: 2,
    quote: "We were six months into a chatbot project with another vendor when we called AL Solutions. They had something live and working in 22 days.",
    name: "Sara Mensah",
    title: "VP of Operations",
    company: "FinEdge",
    initials: "SM",
    linkedin: null,
    metric: "22-day deployment",
    metricNote: "after 6 months of stall with previous vendor",
  },
];

export function Testimonials({ items = ITEMS }: TestimonialsProps) {
  const posthog = usePostHog();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [interactionMode, setInteractionMode] = useState<"auto" | "manual">("auto");
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeItem = useMemo(() => items[active], [active, items]);

  const goTo = useCallback((index: number) => {
    setInteractionMode("manual");
    setActive(index);
  }, []);

  const goPrevious = useCallback(() => {
    goTo((active - 1 + items.length) % items.length);
  }, [active, goTo, items.length]);

  const goNext = useCallback(() => {
    goTo((active + 1) % items.length);
  }, [active, goTo, items.length]);

  useEffect(() => {
    if (!posthog || !activeItem) {
      return;
    }

    trackTestimonialViewed(posthog, {
      testimonial_id: String(activeItem.id),
      auto_or_manual: interactionMode,
    });
  }, [activeItem, interactionMode, posthog]);

  useEffect(() => {
    if (isHovered || items.length <= 1) {
      return;
    }

    const timer = globalThis.setInterval(() => {
      setInteractionMode("auto");
      setActive((value) => (value + 1) % items.length);
    }, 6000);

    return () => {
      globalThis.clearInterval(timer);
    };
  }, [isHovered, items.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget = target ? ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable : false;

      if (isTypingTarget) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrevious]);

  useEffect(() => {
    const element = carouselRef.current;

    if (!element) {
      return;
    }

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="container py-10">
      <Reveal>
        <h2 className="text-3xl font-medium text-text-primary">What Our Clients Say</h2>

        <div ref={carouselRef} className="mt-6 rounded-2xl border border-border-subtle bg-bg-surface p-6 md:p-8">
          <div aria-atomic="true" aria-live="polite" aria-label="Client testimonials">
            <figure key={activeItem.id}>
              <blockquote className="max-w-3xl text-[1.05rem] font-normal italic leading-7 text-text-primary md:text-[1.125rem] md:leading-8">
                &quot;{activeItem.quote}&quot;
              </blockquote>

              <div className="mt-6 flex flex-col gap-4 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600/10 text-sm font-medium text-primary-500">
                    {activeItem.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{activeItem.name}</p>
                    <p className="text-sm text-text-secondary">{activeItem.title}</p>
                    <p className="text-xs text-text-tertiary">{activeItem.company}</p>
                  </div>
                </div>

              </div>

              <p className="mt-5 text-[1.05rem] font-medium text-primary-500 md:text-xl" data-attribution={activeItem.metricNote} title={activeItem.metricNote}>
                {activeItem.metric}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{activeItem.metricNote}</p>
            </figure>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous testimonial"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-default text-text-secondary transition-colors hover:border-primary-500 hover:text-primary-500"
                onClick={goPrevious}
                type="button"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                aria-label="Next testimonial"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-default text-text-secondary transition-colors hover:border-primary-500 hover:text-primary-500"
                onClick={goNext}
                type="button"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {items.map((item, index) => (
                <button
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-pressed={index === active}
                  className={`h-2 rounded-full transition-all ${index === active ? "w-9 bg-primary-500" : "w-2 bg-border-default hover:bg-text-tertiary"}`}
                  key={item.id}
                  onClick={() => goTo(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
