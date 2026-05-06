import React from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import RelatedPosts from "@/components/blog/RelatedPosts";

type Props = { params: { slug: string } };

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const all = getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="container mx-auto px-4 py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-text-tertiary">
            <div className="font-medium">{post.author?.name}</div>
            <div>•</div>
            <div>{new Date(post.date).toLocaleDateString()}</div>
            <div>•</div>
            <div>{post.readTime}</div>
          </div>
          {post.excerpt && <p className="mt-4 text-lg text-text-secondary">{post.excerpt}</p>}
        </header>

        <section className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.body || "" }} />

        <RelatedPosts posts={related} />
      </article>
    </main>
  );
}
