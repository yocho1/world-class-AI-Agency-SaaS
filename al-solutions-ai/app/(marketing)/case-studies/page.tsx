import Link from "next/link";
import { Card } from "@/components/ui";

export const metadata = {
  title: "AI Chatbot Case Studies — Real MENA Deployments | AL Solutions AI",
  description:
    "Real AI deployments: +44% lead capture for hospitality, 31% cost reduction for fintech, +44% conversion for retail. Live in 28-30 days across MENA.",
  alternates: {
    canonical: "https://www.alsolutionsai.online/case-studies",
    languages: {
      en: "https://www.alsolutionsai.online/en/case-studies",
    },
  },
  openGraph: {
    url: "https://www.alsolutionsai.online/case-studies",
    title: "AI Chatbot Case Studies — Real MENA Deployments | AL Solutions AI",
    description:
      "Real AI deployments: +44% lead capture for hospitality, 31% cost reduction for fintech, +44% conversion for retail. Live in 28-30 days across MENA.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=AI Chatbot Case Studies&subtitle=Real deployments. Real results. 28-30 days.&tag=Case Studies",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=AI Chatbot Case Studies&subtitle=Real deployments. Real results. 28-30 days.&tag=Case Studies",
    ],
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