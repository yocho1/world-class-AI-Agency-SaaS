import React from "react";
import BlogListing from "@/components/blog/BlogListing";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "AI Chatbot & Automation Blog for MENA Businesses | AL Solutions AI",
  description:
    "Practical guides on AI chatbots, WhatsApp automation, and lead conversion for MENA and European teams. By Asim Jan, AL Solutions AI — updated weekly.",
  alternates: {
    canonical: "https://www.alsolutionsai.online/blog",
    languages: {
      en: "https://www.alsolutionsai.online/en/blog",
    },
  },
  openGraph: {
    url: "https://www.alsolutionsai.online/blog",
    title: "AI Chatbot & Automation Blog for MENA Businesses | AL Solutions AI",
    description:
      "Practical guides on AI chatbots, WhatsApp automation, and lead conversion for MENA and European teams. By Asim Jan, AL Solutions AI — updated weekly.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=AI Automation Blog for MENA&subtitle=Guides on AI chatbots, WhatsApp automation, lead conversion.&tag=Blog",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=AI Automation Blog for MENA&subtitle=Guides on AI chatbots, WhatsApp automation, lead conversion.&tag=Blog",
    ],
  },
};

export default async function BlogPage() {
  const allPosts = getAllPosts();
  const posts = allPosts.filter(
    (post) => post.published !== false && !["README", "DRAFT", "TEST"].includes(post.slug.toUpperCase()),
  );

  return (
    <main className="min-h-screen bg-bg-default">
      {/* Hero Section */}
      <section className="border-b border-border-subtle bg-gradient-to-b from-bg-surface to-bg-default py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Resources</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">
              AI Insights for Growth Teams
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              Practical guides on deploying AI chatbots, automating business workflows, and capturing leads 24/7. Built for MENA growth teams and SME founders.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Listing Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <BlogListing posts={posts} />
        </div>
      </section>
    </main>
  );
}
 