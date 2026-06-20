import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
// GA4 manual tag added below
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import "./globals.css";

const siteUrl = "https://www.alsolutionsai.online";
const supportedLocales = new Set(["en", "ar", "fr"]);
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AL Solutions AI",
  legalName: "AL Solutions AI Ltd",
  url: siteUrl,
  logo: `${siteUrl}/images/al-solutions-ai-logo.svg`,
  description:
    "UK-based AI chatbot and automation agency serving MENA and Europe. Multilingual (Arabic, English, French) production-ready AI in 30 days.",
  foundingDate: "2018",
  founder: {
    "@type": "Person",
    name: "Asim Jan",
    jobTitle: "Founder & Director",
    sameAs: "https://www.linkedin.com/in/asimjan",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
    addressRegion: "England & Wales",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "UK Companies House Registration Number",
    value: "11521309",
  },
  knowsLanguage: ["en", "ar", "fr"],
  areaServed: ["MENA", "Europe", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "France"],
  serviceType: [
    "AI Chatbot Development",
    "Business Process Automation",
    "Lead Conversion Systems",
    "WhatsApp Business Automation",
    "Multilingual NLP",
  ],
  sameAs: ["https://www.linkedin.com/company/alsolutionsai"],
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
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NFRRH2N9');`}
        </Script>
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-WKK96E0Q1J" strategy="afterInteractive" />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WKK96E0Q1J');`}
        </Script>
        {/* End Google tag */}
        <link rel="icon" href="/images/Favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/Favicon.svg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-full">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NFRRH2N9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script
          id="org-schema"
          strategy="afterInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <PostHogProvider>
          <Suspense fallback={null}>
            <PageViewTracker />
            <ScrollDepthTracker />
          </Suspense>
          <WhatsAppButton />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
