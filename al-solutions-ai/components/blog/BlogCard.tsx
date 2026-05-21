"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Author = {
  name: string;
  avatar?: string;
};

export type BlogCardProps = {
  title: string;
  slug: string;
  date: string; // ISO or readable
  author: Author;
  readTime: string | number; // minutes or formatted text
  excerpt: string;
  coverImageSrc?: string | null;
  category?: string;
  featured?: boolean;
};

export function BlogCard({
  title,
  slug,
  date,
  author,
  readTime,
  excerpt,
  coverImageSrc,
  category,
  featured = false,
}: BlogCardProps) {
  const cardClass = featured
    ? "lg:col-span-2 row-auto"
    : "";

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className={`group ${cardClass}`}>
      <Link href={`/blog/${slug}`} className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-bg-surface border border-border-subtle">
        {/* Cover */}
        <div className="relative w-full bg-gradient-to-r from-bg-elevated via-bg-surface to-bg-default">
          {coverImageSrc ? (
            <div className="aspect-video relative w-full">
              <Image src={coverImageSrc} alt={title} fill className="object-cover object-center" />
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-bg-elevated to-bg-surface">
              <div className="h-32 w-full" />
            </div>
          )}
          {category && (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-bg-default/80 px-3 py-1 text-xs font-semibold text-text-primary backdrop-blur">
              {category}
            </span>
          )}
          {featured && (
            <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-accent-400 px-3 py-1 text-xs font-semibold text-bg-default">
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5 md:p-6">
          {category && (
            <div className="inline-flex mb-3 rounded-full bg-accent-400/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-400">
              {category}
            </div>
          )}

          <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-2 leading-tight line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
            {excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between pt-4 border-t border-border-subtle">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-accent-400 flex-shrink-0 flex items-center justify-center text-xs font-semibold text-bg-default">
                {author.avatar ? (
                  <Image src={author.avatar} alt={author.name} fill className="object-cover object-center" />
                ) : (
                  initials
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide">{author.name}</p>
                <p className="text-xs text-text-tertiary">
                  {formattedDate}
                </p>
              </div>
            </div>


            <div className="flex-shrink-0 text-xs font-medium text-text-tertiary">
              {typeof readTime === "number" ? `${readTime} min` : readTime}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default BlogCard;
