import Link from "next/link";
import { Card } from "@/components/ui";

const POSTS = [
  { title: "How to launch an AI chatbot in 30 days", slug: "launch-ai-chatbot-30-days" },
  { title: "Why most automation projects stall", slug: "automation-projects-stall" },
  { title: "Conversion lessons from real AI deployments", slug: "conversion-lessons-deployments" },
];

export default function BlogPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Blog</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Practical AI implementation notes, benchmarks, and launch lessons.</h1>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {POSTS.map((post) => (
          <Card key={post.slug}>
            <h2 className="text-xl font-medium text-text-primary">{post.title}</h2>
            <Link className="mt-6 inline-flex text-sm text-accent-400 hover:text-accent-300" href={`/blog/${post.slug}`}>
              Read article
            </Link>
          </Card>
        ))}
      </section>
    </main>
  );
}