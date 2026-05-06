import React from "react";
import BlogListing from "@/components/blog/BlogListing";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog - AI Solutions",
  description: "Insights, case studies and how-tos on AI for growth.",
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Insights & Case Studies</h1>
      <p className="mb-8 text-lg text-text-secondary">Latest thinking on AI-driven growth, automation and conversions.</p>

      {/* @ts-expect-error Server -> Client prop */}
      <BlogListing posts={posts} />
    </main>
  );
}
 