"use client";

import React, { useMemo, useState } from "react";
import BlogCard, { BlogCardProps } from "./BlogCard";

type Props = {
  posts: BlogCardProps[];
};

const CATEGORIES = ["All", "Automation", "Case Studies", "How-to"];

export default function BlogListing({ posts }: Props) {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (category === "All") return posts;
    return posts.filter((p) => (p.category || "").toLowerCase() === category.toLowerCase());
  }, [posts, category]);

  // Featured: first post flagged featured or most recent
  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <section>
      <div className="mb-6 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${category === c ? "bg-accent-400 text-bg-default" : "bg-bg-surface text-text-primary border border-border-subtle"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
        {featured && (
          <div className="lg:col-span-3 md:col-span-2">
            <BlogCard {...featured} featured />
          </div>
        )}

        {rest.map((p) => (
          <BlogCard key={p.slug} {...p} />
        ))}
      </div>
    </section>
  );
}
