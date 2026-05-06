import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import "./globals.css";

const siteUrl = "https://www.alsolutionsai.online";
const supportedLocales = new Set(["en", "ar", "fr"]);
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AL Solutions AI",
  url: siteUrl,
  description: "AI agency specializing in custom chatbots, automation systems, and lead conversion tools for SMBs in MENA and Europe.",
  areaServed: ["Middle East", "North Africa", "Europe"],
  serviceType: ["AI Chatbot Development", "Business Process Automation", "Lead Conversion Systems"],
};

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AL Solutions AI",
  description: "Production-grade AI chatbots and automation systems delivered in 30 days.",
  icons: {
    icon: [
      { url: "/images/Favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon.ico?v=3", type: "image/x-icon", sizes: "any" },
    ],
    apple: "/images/Favicon.svg?v=3",
    shortcut: "/favicon.ico?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = headers();
  const localeHeader = requestHeaders.get("x-locale") ?? "en";
  const dirHeader = requestHeaders.get("x-dir") ?? (localeHeader === "ar" ? "rtl" : "ltr");
  const lang = supportedLocales.has(localeHeader) ? localeHeader : "en";

  return (
    <html dir={dirHeader} lang={lang} className={`${plusJakartaSans.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/images/Favicon.svg?v=3" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="apple-touch-icon" href="/images/Favicon.svg?v=3" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} type="application/ld+json" />
      </head>
      <body className="min-h-full">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
