import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import "./globals.css";

const siteUrl = "https://www.alsolutionsai.online";
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX";
const supportedLocales = new Set(["en", "ar", "fr"]);
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AL Solutions AI",
  url: siteUrl,
  logo: `${siteUrl}/images/al-solutions-ai-logo.svg`,
  description: "AI chatbot and automation agency serving MENA and Europe. Production-ready in 30 days.",
  foundingDate: "2024",
  areaServed: ["MENA", "Europe"],
  serviceType: ["AI Chatbot Development", "Business Process Automation", "Lead Conversion Systems"],
  sameAs: [
    "https://www.linkedin.com/company/al-solutions-ai",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Arabic", "French"],
  },
};

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const geistMono = GeistMono;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AL Solutions AI",
  description: "Production-grade AI chatbots and automation systems delivered in 30 days.",
  icons: {
    icon: [{ url: "/images/Favicon.svg", type: "image/svg+xml" }],
    apple: "/images/Favicon.svg",
    shortcut: "/images/Favicon.svg",
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
    <html dir={dirHeader} lang={lang} className={`${jakartaSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/images/Favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/Favicon.svg" />
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} type="application/ld+json" />
      </head>
      <body className="min-h-full">
        <GoogleAnalytics gaId={googleAnalyticsId} />
        <PostHogProvider>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          <WhatsAppButton />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
