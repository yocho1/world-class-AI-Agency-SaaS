import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL, SUPPORTED_LOCALES, DEFAULT_LOCALE, hreflangAlternates } from "@/lib/seo";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || SITE_URL;

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

function localeUrl(locale: string, path: string) {
  const normalised = path === "/" ? "" : path;
  return `${baseUrl}/${locale}${normalised}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Emit one sitemap entry per (locale, path) with hreflang alternates so
  // crawlers see canonical locale-prefixed URLs (matching middleware routing).
  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((entry) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: localeUrl(locale, entry.path),
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: locale === DEFAULT_LOCALE ? entry.priority : entry.priority * 0.8,
      alternates: { languages: hreflangAlternates(entry.path) },
    })),
  );

  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.flatMap((post) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: localeUrl(locale, `/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: locale === DEFAULT_LOCALE ? 0.8 : 0.6,
      alternates: { languages: hreflangAlternates(`/blog/${post.slug}`) },
    })),
  );

  return [...staticEntries, ...blogEntries];
}
