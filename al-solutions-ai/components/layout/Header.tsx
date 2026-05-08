"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

const LOCALE_STORAGE_KEY = "preferredLocale";
const LOCALE_COOKIE_KEY = "NEXT_LOCALE";
const LOCALES = ["en", "ar", "fr"] as const;

const ARABIC_READY = false;

const NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLocale, setActiveLocale] = useState<"en" | "ar" | "fr">("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromStorage = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (fromStorage === "en" || fromStorage === "ar" || fromStorage === "fr") {
      setActiveLocale(fromStorage);
      return;
    }

    const pathLocale = window.location.pathname.split("/").filter(Boolean)[0];
    if (pathLocale === "en" || pathLocale === "ar" || pathLocale === "fr") {
      setActiveLocale(pathLocale);
    }
  }, []);

  const switchLocale = (nextLocale: "en" | "ar") => {
    if (typeof window === "undefined") return;

    const { pathname: rawPath, search, hash } = window.location;
    const segments = rawPath.split("/").filter(Boolean);
    const first = segments[0] as (typeof LOCALES)[number] | undefined;
    const hasLocalePrefix = !!first && LOCALES.includes(first);
    const basePath = hasLocalePrefix ? `/${segments.slice(1).join("/")}` : rawPath;
    const normalizedPath = basePath === "" ? "/" : basePath;
    const nextPath = normalizedPath === "/" ? `/${nextLocale}` : `/${nextLocale}${normalizedPath}`;

    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.cookie = `${LOCALE_COOKIE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    setActiveLocale(nextLocale);
    window.location.assign(`${nextPath}${search}${hash}`);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
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
      <div className="container flex h-24 items-center justify-between md:h-28">
        <Link className="relative flex h-16 w-72 items-center overflow-hidden text-sm font-medium tracking-wide text-text-primary md:h-20 md:w-96 lg:h-24 lg:w-[28rem]" href="/" aria-label="AL Solutions AI home">
          <Image
            alt="AL Solutions AI logo"
            fill
            priority
            sizes="(min-width: 1024px) 448px, (min-width: 768px) 384px, 288px"
            src="/images/al-solutions-ai-logo.svg"
            className="object-cover object-center"
          />
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
          <div className="hidden items-center rounded-md border border-border-subtle bg-bg-surface p-1 text-xs md:inline-flex">
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={cn(
                "rounded px-2 py-1 font-medium transition-colors",
                activeLocale === "en" ? "bg-bg-elevated text-text-primary" : "text-text-secondary hover:text-text-primary",
              )}
              aria-label="Switch language to English"
            >
              EN
            </button>
            {ARABIC_READY && (
              <>
                <span className="px-1 text-text-tertiary">/</span>
                <button
                  type="button"
                  onClick={() => switchLocale("ar")}
                  className={cn(
                    "rounded px-2 py-1 font-medium transition-colors",
                    activeLocale === "ar" ? "bg-bg-elevated text-text-primary" : "text-text-secondary hover:text-text-primary",
                  )}
                  aria-label="Switch language to Arabic"
                >
                  عربي
                </button>
              </>
            )}
          </div>
          <Link
            className={cn(
              "hidden h-11 items-center rounded-lg px-6 text-sm font-medium transition-all duration-200 md:inline-flex",
              isScrolled
                ? "bg-accent-400 text-bg-default hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
                : "bg-primary-600 text-white hover:bg-primary-700"
            )}
            href="/free-ai-audit"
          >
            Get Free AI Audit
          </Link>
          <MobileNav navItems={NAV_ITEMS} activeLocale={activeLocale} onSwitchLocale={switchLocale} />
        </div>
      </div>
    </header>
  );
}

