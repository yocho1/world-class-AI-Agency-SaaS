"use client";

import { Card } from "@/components/ui";
import { usePostHog } from "@/hooks/usePostHog";
import { trackServiceCardClick } from "@/lib/analytics/events";

interface ServiceItem {
  title: string;
  summary: string;
}

interface ServicesOverviewProps {
  services?: ServiceItem[];
}

const SERVICES: ServiceItem[] = [
  {
    title: "Custom AI chatbots",
    summary: "High-intent assistants tuned for multilingual support, sales qualification, and lead routing.",
  },
  {
    title: "Automation systems",
    summary: "Connect CRM, inbox, and ops tools with AI workflows that remove repetitive manual steps.",
  },
  {
    title: "Lead conversion engines",
    summary: "Behavior-aware qualification flows with dynamic prompts that boost booked demos.",
  },
  {
    title: "Web + AI product bundles",
    summary: "A complete build stream for landing experience, AI product layer, and measurable GTM outcomes.",
  },
];

export function ServicesOverview({ services = SERVICES }: ServicesOverviewProps) {
  const posthog = usePostHog();

  const onServiceClick = (service: string, position: number) => {
    if (!posthog) {
      return;
    }

    trackServiceCardClick(posthog, { service, position });
  };

  return (
    <section className="container py-10">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Core solutions</p>
        <h2 className="mt-3 text-3xl font-medium text-text-primary md:text-4xl">Everything needed to move from idea to shipped AI product</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <button
            className="text-left"
            key={service.title}
            onClick={() => onServiceClick(service.title, index + 1)}
            type="button"
          >
            <Card className="h-full hover:border-primary-600/60 hover:shadow-[0_0_0_1px_rgba(108,99,255,0.2)]">
              <h3 className="text-xl font-medium text-text-primary">{service.title}</h3>
              <p className="mt-2 text-text-secondary">{service.summary}</p>
            </Card>
          </button>
        ))}
      </div>
    </section>
  );
}