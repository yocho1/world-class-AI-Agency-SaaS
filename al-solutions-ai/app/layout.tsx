import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Layout } from "@/components/layout/Layout";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AL Solutions AI",
  description: "Production-grade AI chatbots and automation systems delivered in 30 days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <PostHogProvider>
          <Layout>{children}</Layout>
        </PostHogProvider>
      </body>
    </html>
  );
}
