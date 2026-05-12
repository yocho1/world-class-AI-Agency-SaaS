import fs from "node:fs";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";

type RawPost = {
  slug: string;
  content: string;
};

export type Post = {
  title: string;
  slug: string;
  date: string;
  author: { name: string; avatar?: string };
  authorTitle?: string;
  readTime: string;
  excerpt: string;
  published?: boolean;
  coverImageSrc?: string | null;
  category?: string;
  featured?: boolean;
  body?: string;
};

function parseFrontmatter(raw: string): { attrs: Partial<Post>; body: string } {
  const fmMatch = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/.exec(raw);
  if (!fmMatch) return { attrs: {}, body: raw };
  const fm = fmMatch[1];
  const body = fmMatch[2] || "";

  const attrs: Record<string, string | boolean> = {};
  fm.split(/\r?\n/).forEach((line) => {
    const [k, ...rest] = line.split(":");
    if (!k) return;
    const key = k.trim();
    const val = rest.join(":").trim();
    if (val === "true") attrs[key] = true;
    else if (val === "false") attrs[key] = false;
    else attrs[key] = val.replaceAll(/^"|"$/g, "").replaceAll(/^'|'$/g, "");
  });

  return { attrs, body };
}

function readContentDir(): RawPost[] {
  try {
    const contentDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(contentDir)) return [];
    const files = fs.readdirSync(contentDir).filter((f) => /\.mdx?$|\.markdown$/.test(f));
    return files.map((f) => ({ slug: f.replace(/\.mdx?$|\.markdown$/, ""), content: fs.readFileSync(path.join(contentDir, f), "utf-8") }));
  } catch {
    return [];
  }
}

export function getAllPosts(): Post[] {
  const raws = readContentDir();
  const posts = raws.map((r) => {
    const { attrs, body } = parseFrontmatter(r.content);
    return {
      title: attrs.title || r.slug.replaceAll(/[-_]/g, " "),
      slug: r.slug,
      date: attrs.date || new Date().toISOString(),
      author: { name: attrs.author || "Asim Jan" },
      authorTitle: attrs.authorTitle || "Founder & Director, AL Solutions AI",
      readTime: attrs.readTime || "4 min",
      excerpt: attrs.excerpt || "",
      published: attrs.published,
      coverImageSrc: attrs.coverImageSrc || null,
      category: attrs.category || "How-to",
      featured: !!attrs.featured,
      body: body,
    } as Post;
  });

  // sort by date desc
  posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = getAllPosts();
  const found = posts.find((p) => p.slug === slug);
  if (!found) return null;

  // render markdown body to sanitized HTML
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processor: any = unified();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file = await processor
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(found.body || "");
    found.body = String(file);
  } catch {
    // fallback to raw body
  }

  return found;
}
