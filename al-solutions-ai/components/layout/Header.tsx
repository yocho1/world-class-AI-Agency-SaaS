"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Solutions", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border-subtle transition-all duration-200",
        isScrolled ? "bg-bg-base/95 shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link className="text-sm font-medium tracking-wide text-text-primary" href="/">
          AL Solutions AI
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-text-secondary md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              className={cn(
                "transition-colors duration-150 hover:text-text-primary",
                pathname.startsWith(item.href) ? "text-text-primary" : "text-text-secondary",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            className="hidden h-11 items-center rounded-lg bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700 md:inline-flex"
            href="/free-ai-audit"
          >
            Get Free AI Audit
          </Link>
          <MobileNav navItems={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}