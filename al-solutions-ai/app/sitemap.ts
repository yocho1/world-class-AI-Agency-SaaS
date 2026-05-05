import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsolutionsai.com";
const locales = ["en", "ar", "fr"] as const;

const staticPaths = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/ai-chatbots", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/automation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/lead-conversion", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/web-ai-solutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/free-ai-audit", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
] as const;

function getLocalizedUrl(locale: (typeof locales)[number], path: string) {
  return path === "" ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    staticPaths.map((entry) => ({
      url: getLocalizedUrl(locale, entry.path),
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
  );
}
