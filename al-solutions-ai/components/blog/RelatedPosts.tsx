"use client";

import React from "react";
import BlogCard, { BlogCardProps } from "./BlogCard";

type Props = {
  posts: BlogCardProps[];
};

export default function RelatedPosts({ posts }: Props) {
  if (!posts || posts.length === 0) return null;
  return (
    <aside className="mt-10">
      <h4 className="mb-4 text-lg font-semibold">Related articles</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <BlogCard key={p.slug} {...p} />
        ))}
      </div>
    </aside>
  );
}
