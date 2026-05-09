import React from "react";
import BlogListing from "@/components/blog/BlogListing";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "AI Automation & Chatbot Blog for MENA Businesses | AL Solutions AI",
  description:
    "Practical guides on deploying AI chatbots, automating business workflows, and growing revenue with AI. Written for MENA and European growth teams.",
  alternates: {
    canonical: "https://www.alsolutionsai.online/blog",
    languages: {
      en: "https://www.alsolutionsai.online/en/blog",
    },
  },
  openGraph: {
    url: "https://www.alsolutionsai.online/blog",
    title: "AI Automation & Chatbot Blog for MENA Businesses | AL Solutions AI",
    description:
      "Practical guides on deploying AI chatbots, automating business workflows, and growing revenue with AI. Written for MENA and European growth teams.",
  },
};

export default async function BlogPage() {
  const posts = getAllPosts();

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
 