import React from "react";
import BlogListing from "@/components/blog/BlogListing";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "AI Automation & Chatbot Blog for MENA Businesses | AL Solutions AI",
  description:
    "Practical guides on deploying AI chatbots, automating business workflows, and growing revenue with AI. Written for MENA and European growth teams.",
  alternates: { canonical: "https://www.alsolutionsai.online/blog" },
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
    <main className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Insights & Case Studies</h1>
      <p className="mb-8 text-lg text-text-secondary">Latest thinking on AI-driven growth, automation and conversions.</p>

      <BlogListing posts={posts} />
    </main>
  );
}
 