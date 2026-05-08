import Link from "next/link";
import { Card } from "@/components/ui";

export const metadata = {
  title: "AI Chatbot Case Studies — Real Results in Production | AL Solutions AI",
  description:
    "See how AL Solutions AI deployed AI chatbots and automation for hospitality, fintech, and retail clients in MENA. Real metrics, real timelines, real deployments.",
  alternates: { canonical: "https://www.alsolutionsai.online/case-studies" },
  openGraph: {
    url: "https://www.alsolutionsai.online/case-studies",
    title: "AI Chatbot Case Studies — Real Results in Production | AL Solutions AI",
    description:
      "See how AL Solutions AI deployed AI chatbots and automation for hospitality, fintech, and retail clients in MENA. Real metrics, real timelines, real deployments.",
  },
};

const CASE_STUDIES = [
  { title: "Hospitality AI concierge", metric: "-62% response time", slug: "hospitality-concierge" },
  { title: "Retail lead routing", metric: "+44% capture rate", slug: "retail-routing" },
  { title: "Fintech support automation", metric: "31% lower ops cost", slug: "fintech-automation" },
];

export default function CaseStudiesPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Case studies</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Proof from real deployments, not concept decks.</h1>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {CASE_STUDIES.map((study) => (
          <Card key={study.slug}>
            <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">{study.metric}</p>
            <h2 className="mt-3 text-xl font-medium text-text-primary">{study.title}</h2>
            <Link className="mt-6 inline-flex text-sm text-accent-400 hover:text-accent-300" href={`/case-studies/${study.slug}`}>
              Read story
            </Link>
          </Card>
        ))}
      </section>
    </main>
  );
}