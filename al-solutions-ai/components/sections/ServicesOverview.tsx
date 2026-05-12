"use client";

import Link from "next/link";
import { Card, Reveal } from "@/components/ui";
import { usePostHog } from "@/hooks/usePostHog";
import { trackServiceCardClick } from "@/lib/analytics/events";

interface ServiceItem {
  title: string;
  summary: string;
  metric: string;
  metricAttribution: string;
  href: string;
}

interface ServicesOverviewProps {
  services?: ServiceItem[];
  title?: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: "AI Chatbots",
    summary:
      "An AI assistant that qualifies leads 24/7, routes hot prospects to your team, and answers in Arabic, English, or French — without a support hire.",
    metric: "+44% qualified meetings booked",
    metricAttribution: "Nexora Hotels Group, 60 days post-launch",
    href: "/services/ai-chatbots",
  },
  {
    title: "Automation",
    summary:
      "Eliminate the manual steps between your CRM, inbox, and ops tools. Our automation systems run without oversight and document every action.",
    metric: "Average 200+ hours saved per month",
    metricAttribution: "Average across 12 client deployments, 2024",
    href: "/services/automation",
  },
  {
    title: "Lead Conversion",
    summary:
      "Behavior-aware qualification flows that identify intent, engage at the right moment, and hand off ready-to-close leads directly to your sales team.",
    metric: "+2.3x average demo booking rate",
    metricAttribution: "Average across 12 client deployments, 2024",
    href: "/services/lead-conversion",
  },
  {
    title: "Web + AI Bundle",
    summary:
      "A complete build: optimized landing experience, AI product layer, CRM integration, and a go-live date you can hold us to.",
    metric: "Full stack live in 30 days",
    metricAttribution: "Average launch cadence for bundled builds",
    href: "/services/web-ai-solutions",
  },
];

function getServiceCtaText(title: string) {
  switch (title) {
    case "AI Chatbots":
      return {
        ariaLabel: "See AI chatbot examples and case studies",
        text: "See AI chatbot examples →",
      };
    case "Automation":
      return {
        ariaLabel: "See automation examples and case studies",
        text: "See automation examples →",
      };
    case "Lead Conversion":
      return {
        ariaLabel: "See lead conversion examples and case studies",
        text: "See lead conversion examples →",
      };
    default:
      return {
        ariaLabel: "See bundle examples and case studies",
        text: "See bundle examples →",
      };
  }
}

export function ServicesOverview(props: Readonly<ServicesOverviewProps>) {
  const { services = SERVICES, title = "AI Chatbot & Automation Services for MENA and Europe" } = props;
  const posthog = usePostHog();

  const onServiceClick = (service: string, position: number) => {
    if (!posthog) {
      return;
    }

    trackServiceCardClick(posthog, { service, position });
  };

  return (
    <section className="section-padding container">
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-medium text-text-primary md:text-4xl">{title}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <Card className="h-full hover:border-primary-600/60 hover:shadow-[0_0_0_1px_rgba(108,99,255,0.2)]" key={service.title}>
              <h3 className="text-xl font-medium text-text-primary">{service.title}</h3>
              <p className="mt-2 max-w-prose text-text-secondary">{service.summary}</p>
              <p className="mt-5 inline-flex rounded-pill border-[0.5px] border-[rgba(0,217,126,0.3)] bg-[rgba(0,217,126,0.1)] px-3 py-1.5 text-sm font-semibold text-[#00D97E]" data-attribution={service.metricAttribution} title={service.metricAttribution}>
                {service.metric}
              </p>
              <p className="mt-1 text-xs text-text-tertiary">{service.metricAttribution}</p>
              {(() => {
                const cta = getServiceCtaText(service.title);

                return (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      aria-label={`Learn more about ${service.title}`}
                      className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                      href={service.href}
                      onClick={() => onServiceClick(service.title, index + 1)}
                    >
                      Learn more about {service.title}
                    </Link>
                    <Link
                      aria-label={cta.ariaLabel}
                      className="inline-flex h-11 items-center rounded-lg border border-border-default px-4 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated"
                      href={service.href}
                    >
                      {cta.text}
                    </Link>
                  </div>
                );
              })()}
            </Card>
          ))}
        </div>
      </Reveal>
    </section>
  );
}