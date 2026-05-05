import type { ReactNode } from "react";
import Link from "next/link";
import { requireAuthenticatedWorkspace } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/SignOutButton";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Leads", href: "/leads" },
  { label: "Conversations", href: "/conversations" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const workspace = await requireAuthenticatedWorkspace();

  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-border-subtle bg-bg-surface px-6 py-6 lg:border-b-0 lg:border-r">
          <Link className="text-sm font-medium tracking-wide text-text-primary" href="/dashboard">
            AL Solutions AI
          </Link>
          <p className="mt-2 text-sm text-text-secondary">{workspace.tenant.tenantName} workspace</p>
          <p className="mt-1 text-xs text-text-tertiary">Role: {workspace.tenant.userRole} · {workspace.email}</p>
          <nav className="mt-8 flex flex-col gap-2 text-sm text-text-secondary">
            {NAV_ITEMS.map((item) => (
              <Link className="inline-flex h-11 items-center rounded-lg px-3 transition-colors hover:bg-bg-elevated hover:text-text-primary" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <SignOutButton />
          </div>
        </aside>
        <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</section>
      </div>
    </main>
  );
}