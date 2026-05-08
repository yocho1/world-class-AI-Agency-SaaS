import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.alsolutionsai.online";

const staticPaths = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/services/ai-chatbots", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services/automation", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services/lead-conversion", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services/web-ai-solutions", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/case-studies", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/case-studies/hospitality-concierge", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/case-studies/retail-routing", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/case-studies/fintech-automation", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.5 },
  { path: "/free-ai-audit", changeFrequency: "monthly" as const, priority: 0.9 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticEntries = staticPaths.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  // Dynamic blog posts
  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
