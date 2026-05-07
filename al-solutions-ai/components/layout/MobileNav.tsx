"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  readonly navItems: readonly NavItem[];
  readonly activeLocale: "en" | "ar" | "fr";
  readonly onSwitchLocale: (locale: "en" | "ar") => void;
}

export function MobileNav(props: Readonly<MobileNavProps>) {
  const { navItems, activeLocale, onSwitchLocale } = props;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative md:hidden">
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Toggle menu"
        className={cn(
          "inline-flex h-11 items-center rounded-md border px-4 text-sm text-text-primary transition-colors",
          open ? "border-primary-600 bg-primary-600/10" : "border-border-default",
        )}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <div className="absolute right-0 top-14 w-[min(88vw,320px)] rounded-xl border border-border-subtle bg-bg-overlay p-4 shadow-[0_18px_40px_rgba(0,0,0,0.34)]">
          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <div className="inline-flex items-center self-start rounded-md border border-border-subtle bg-bg-surface p-1 text-xs">
              <button
                type="button"
                onClick={() => onSwitchLocale("en")}
                className={cn(
                  "rounded px-2 py-1 font-medium transition-colors",
                  activeLocale === "en" ? "bg-bg-elevated text-text-primary" : "text-text-secondary hover:text-text-primary",
                )}
                aria-label="Switch language to English"
              >
                EN
              </button>
              <span className="px-1 text-text-tertiary">/</span>
              <button
                type="button"
                onClick={() => onSwitchLocale("ar")}
                className={cn(
                  "rounded px-2 py-1 font-medium transition-colors",
                  activeLocale === "ar" ? "bg-bg-elevated text-text-primary" : "text-text-secondary hover:text-text-primary",
                )}
                aria-label="Switch language to Arabic"
              >
                عربي
              </button>
            </div>
            {navItems.map((item) => (
              <Link className="inline-flex min-h-11 items-center rounded-md px-2 hover:bg-bg-elevated hover:text-text-primary" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
              Get Free AI Audit
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}