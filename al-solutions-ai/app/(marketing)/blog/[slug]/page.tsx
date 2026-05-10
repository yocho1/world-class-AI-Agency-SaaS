import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import RelatedPosts from "@/components/blog/RelatedPosts";
import AuditCtaLink from "@/components/analytics/AuditCtaLink";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | AL Solutions AI`,
    description: post.excerpt,
     alternates: {
       canonical: `https://www.alsolutionsai.online/blog/${params.slug}`,
       languages: {
         en: `https://www.alsolutionsai.online/en/blog/${params.slug}`,
       },
     },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const all = getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const initials = post.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "AA";

  // BlogPosting Schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageSrc || "https://www.alsolutionsai.online/images/al-solutions-ai-logo.svg",
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || "AL Solutions AI",
    },
    publisher: {
      "@type": "Organization",
      name: "AL Solutions AI",
      logo: {
        "@type": "ImageObject",
        url: "https://www.alsolutionsai.online/images/al-solutions-ai-logo.svg",
      },
    },
  };

  return (
    <main className="min-h-screen bg-bg-default">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* Breadcrumb */}
      <div className="container py-6 sm:py-8 border-b border-border-subtle">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-400"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>
      </div>

      {/* Hero Section */}
      <section className="border-b border-border-subtle bg-gradient-to-b from-bg-surface to-bg-default py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Category Badge */}
            {post.category && (
              <div className="inline-flex rounded-full bg-accent-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-400 mb-6">
                {post.category}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mt-6 max-w-prose text-lg text-text-secondary leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Metadata */}
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-400 text-sm font-semibold text-bg-default">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{post.author?.name || "Guest Author"}</p>
                  <p className="text-sm text-text-tertiary">
                    {formattedDate} • {post.readTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Prose Styling */}
            <div
              className="prose prose-sm md:prose-base max-w-none
                prose-headings:font-semibold prose-headings:text-text-primary
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3
                prose-p:max-w-prose prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-accent-400 prose-a:underline hover:prose-a:text-accent-300
                prose-strong:text-text-primary prose-strong:font-semibold
                prose-code:bg-bg-surface prose-code:text-text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded-sm
                prose-pre:bg-bg-surface prose-pre:border prose-pre:border-border-subtle prose-pre:rounded-sm prose-pre:overflow-x-auto
                prose-ul:list-disc prose-ul:pl-6 prose-ul:text-text-secondary
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-accent-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-text-secondary
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-bg-surface prose-th:text-text-primary prose-th:font-semibold prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-border-subtle
                prose-td:p-3 prose-td:text-text-secondary prose-td:border prose-td:border-border-subtle
              "
              dangerouslySetInnerHTML={{ __html: post.body || "" }}
            />
          </div>
        </div>
      </article>

      {/* Author Bio Section */}
      <section className="border-t border-border-subtle bg-bg-surface py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border-subtle bg-bg-default p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-accent-400 text-sm font-semibold text-bg-default">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-text-primary">{post.author?.name || "Guest Author"}</h3>
                  <p className="mt-2 max-w-prose text-sm text-text-secondary leading-relaxed">
                    Writes about AI implementation, automation, and growth strategies for MENA businesses. Learn from real case studies and practical guides.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-3xl font-bold text-text-primary">More insights</h2>
            <RelatedPosts posts={related} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border-subtle bg-bg-surface py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-400/5 to-transparent p-8 text-center sm:p-10 md:p-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Ready to implement AI?</h2>
            <p className="mx-auto mt-4 max-w-prose text-base leading-relaxed text-text-secondary sm:text-lg">
              Get a free AI audit and discover exactly what an AI system would look like for your business.
            </p>
            <AuditCtaLink
              href="/contact"
              className="mt-6 inline-flex h-12 items-center rounded-lg bg-accent-400 px-6 text-sm font-semibold text-bg-default transition-all duration-300 hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20 sm:mt-8 sm:h-13 sm:px-8 sm:text-base"
              buttonLocation="blog_post"
            >
              Book Free AI Audit
            </AuditCtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
