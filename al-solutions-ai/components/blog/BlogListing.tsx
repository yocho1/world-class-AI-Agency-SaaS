"use client";

import React, { useMemo, useState } from "react";
import BlogCard, { BlogCardProps } from "./BlogCard";

type Props = {
  posts: BlogCardProps[];
};

const CATEGORIES = ["All", "Real Estate AI", "CRM Automation", "Multilingual AI", "How-to"];

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
      {/* Category Filters */}
      <div className="mb-10 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              category === c
                ? "bg-accent-400 text-bg-default shadow-lg shadow-accent-400/20"
                : "bg-bg-surface text-text-primary border border-border-subtle hover:border-accent-400 hover:bg-bg-default"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured Post (Full Width) */}
      <div className="mb-12">
        {featured && (
          <div className="lg:col-span-3 md:col-span-2">
            <BlogCard {...featured} featured />
          </div>
        )}
      </div>

      {/* Grid Posts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <BlogCard key={p.slug} {...p} />
        ))}
      </div>
    </section>
  );
}
