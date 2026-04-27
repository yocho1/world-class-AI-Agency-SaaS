import type { ReactNode } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Leads", href: "/leads" },
  { label: "Conversations", href: "/conversations" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-border-subtle bg-bg-surface px-6 py-6 lg:border-b-0 lg:border-r">
          <Link className="text-sm font-medium tracking-wide text-text-primary" href="/dashboard">
            AL Solutions AI
          </Link>
          <p className="mt-2 text-sm text-text-secondary">Operations console for leads, conversations, and performance.</p>
          <nav className="mt-8 flex flex-col gap-2 text-sm text-text-secondary">
            {NAV_ITEMS.map((item) => (
              <Link className="rounded-lg px-3 py-2 transition-colors hover:bg-bg-elevated hover:text-text-primary" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</section>
      </div>
    </main>
  );
}