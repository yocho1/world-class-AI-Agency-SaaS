import Link from "next/link";
import { Card } from "@/components/ui";

const SERVICE_LINKS = [
  { title: "AI Chatbots", href: "/services/ai-chatbots", summary: "Customer-facing assistants that qualify, route, and convert." },
  { title: "Automation Systems", href: "/services/automation", summary: "Reduce manual ops with connected AI workflows." },
  { title: "Lead Conversion", href: "/services/lead-conversion", summary: "Turn web traffic into qualified meetings faster." },
  { title: "Web + AI Solutions", href: "/services/web-ai-solutions", summary: "Bundle a high-converting site with AI capabilities." },
];

export default function ServicesHubPage() {
  return (
    <main className="container py-20">
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
    </main>
  );
}