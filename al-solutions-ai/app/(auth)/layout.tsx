import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(108,99,255,0.2),transparent_28%),linear-gradient(180deg,#09090e_0%,#111119_100%)] px-4 py-6 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col rounded-[28px] border border-border-subtle bg-bg-surface/80 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur">
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-5 text-sm text-text-secondary sm:px-8">
          <Link className="font-medium tracking-wide text-text-primary" href="/">
            AL Solutions AI
          </Link>
          <Link className="hover:text-text-primary" href="/">
            Back to site
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8 lg:py-14">
          <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">{children}</div>
        </div>
      </div>
    </main>
  );
}