import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Audit | AL Solutions AI",
  description:
    "Get a free AI strategy audit from AL Solutions AI. We analyze your operations and identify 3 specific automation opportunities with ROI estimates.",
  alternates: {
    canonical: "https://www.alsolutionsai.online/free-ai-audit",
  },
  openGraph: {
    url: "https://www.alsolutionsai.online/free-ai-audit",
    title: "Free AI Audit | AL Solutions AI",
    description:
      "Get a free AI strategy audit from AL Solutions AI. We analyze your operations and identify 3 specific automation opportunities with ROI estimates.",
  },
};

export default function FreeAIAuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
