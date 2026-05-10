"use client";

import { LogoStrip } from "@/components/LogoStrip";

interface SocialProofBarProps {
  readonly clients?: string[];
}

const DEFAULT_CLIENTS = ["Nexora Hotels", "MediCore", "Atlas Retail", "Zain Mobility", "EduBridge", "FinEdge", "Sahara Foods"];

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function createPlaceholderLogoSrc(name: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" role="img" aria-label="${escapeXml(name)} logo">
      <rect width="120" height="40" rx="10" fill="#F3F4F6" />
      <rect x="0.75" y="0.75" width="118.5" height="38.5" rx="9.25" fill="none" stroke="#E5E7EB" />
      <text x="60" y="21" text-anchor="middle" dominant-baseline="middle" fill="#6B7280" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="600">${escapeXml(name)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

export function SocialProofBar({ clients = DEFAULT_CLIENTS }: SocialProofBarProps) {
  const items = clients.map((client) => ({
    name: client,
    logoSrc: createPlaceholderLogoSrc(client),
  }));

  return (
    <section className="section-padding-sm border-y border-border-subtle bg-bg-surface">
      <div className="container">
        <LogoStrip items={items} />
      </div>
    </section>
  );
}