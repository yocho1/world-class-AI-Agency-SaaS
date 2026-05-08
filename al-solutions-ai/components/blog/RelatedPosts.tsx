"use client";

import React from "react";
import BlogCard, { BlogCardProps } from "./BlogCard";

type Props = {
  posts: BlogCardProps[];
};

export default function RelatedPosts({ posts }: Props) {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="mt-16 border-t border-border-subtle pt-12">
      <h2 className="mb-8 text-2xl font-bold text-text-primary">More from the blog</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.slug} {...p} />
        ))}
      </div>
    </section>
  );
}
