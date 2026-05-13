import Link from "next/link";
import { Card } from "@/components/ui";
import Script from "next/script";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata = {
  title: "AI Chatbot & Automation Services | WhatsApp AI | AL Solutions AI",
  description:
    "Custom AI chatbots, WhatsApp automation, lead qualification, web+AI bundles. Production-ready in 30 days for MENA, UAE, Saudi Arabia, and Europe.",
  alternates: alternatesFor("/services"),
  openGraph: {
    url: canonicalUrl("/services"),
    title: "AI Chatbot & Automation Services | WhatsApp AI | AL Solutions AI",
    description:
      "Custom AI chatbots, WhatsApp automation, lead qualification, web+AI bundles. Production-ready in 30 days for MENA, UAE, Saudi Arabia, and Europe.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=AI Chatbot and Automation Services&subtitle=Custom AI chatbots, WhatsApp AI, live in 30 days.&tag=Services",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=AI Chatbot and Automation Services&subtitle=Custom AI chatbots, WhatsApp AI, live in 30 days.&tag=Services",
    ],
  },
};

const SERVICE_LINKS = [
  { title: "AI Chatbots", href: "/services/ai-chatbots", summary: "Customer-facing assistants that qualify, route, and convert." },
  { title: "Automation Systems", href: "/services/automation", summary: "Reduce manual ops with connected AI workflows." },
  { title: "Lead Conversion", href: "/services/lead-conversion", summary: "Turn web traffic into qualified meetings faster." },
  { title: "Web + AI Solutions", href: "/services/web-ai-solutions", summary: "Bundle a high-converting site with AI capabilities." },
];

// Service ItemList Schema
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICE_LINKS.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      url: `https://www.alsolutionsai.online${service.href}`,
      provider: {
        "@type": "Organization",
        name: "AL Solutions AI",
      },
    },
  })),
};

export default function ServicesHubPage() {
  return (
    <main className="container py-20">
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        strategy="afterInteractive"
      />

      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Services</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Choose the implementation track that matches your next outcome.</h1>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {SERVICE_LINKS.map((service) => (
          <Card key={service.href}>
            <h2 className="text-xl font-medium text-text-primary">{service.title}</h2>
            <p className="mt-2 text-text-secondary">{service.summary}</p>
            <Link className="mt-6 inline-flex text-sm text-accent-400 hover:text-accent-300" href={service.href}>
              Explore service
            </Link>
          </Card>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-text-primary">By industry</h2>
        <p className="mt-2 max-w-2xl text-text-secondary">
          See how we deploy AI for the specific workflows in your sector.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Hospitality & Travel", href: "/industries/hospitality", summary: "AI concierge for hotels, F&B, and tourism — multilingual on web and WhatsApp." },
            { title: "Fintech & Financial Services", href: "/industries/fintech", summary: "Compliance-first AI support with KYC pre-screening and audit logging." },
            { title: "Retail & E-Commerce", href: "/industries/retail", summary: "Pre-purchase Q&A, abandoned-cart recovery on WhatsApp, and post-purchase support." },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border-subtle bg-bg-surface p-5 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
            >
              <h3 className="text-base font-semibold text-text-primary group-hover:text-accent-400">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-text-primary">By location</h2>
        <p className="mt-2 max-w-2xl text-text-secondary">
          Local engagement detail for the markets we work in most.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { title: "AI Chatbot Agency · Dubai", href: "/ai-chatbot-agency-dubai", summary: "Arabic and English AI for UAE businesses, WhatsApp-first, live in 30 days." },
            { title: "AI Chatbot Agency · London", href: "/ai-chatbot-agency-london", summary: "UK-registered, GDPR-first AI for London growth teams." },
            { title: "AI Automation · Saudi Arabia", href: "/ai-automation-agency-saudi-arabia", summary: "Native Arabic AI for Riyadh, Jeddah, and Eastern Province businesses." },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border-subtle bg-bg-surface p-5 transition-all hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5"
            >
              <h3 className="text-base font-semibold text-text-primary group-hover:text-accent-400">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}