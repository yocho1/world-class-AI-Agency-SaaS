import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { CookieOptions } from "@supabase/ssr";
import type { Database } from "@/types/database";

const SUPPORTED_LOCALES = ["en", "ar", "fr"] as const;
const DEFAULT_LOCALE = "en";
const LOCALE_COOKIE = "NEXT_LOCALE";
const PROTECTED_PATHS = ["/dashboard"];
const PASSTHROUGH_PATHS = ["/api", "/_next", "/favicon.ico", "/robots.txt", "/sitemap.xml", "/og"];
const AUTH_PATHS = ["/login", "/signup"];

function getLocaleConfig(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const candidate = segments[0] as (typeof SUPPORTED_LOCALES)[number] | undefined;

  if (candidate && SUPPORTED_LOCALES.includes(candidate)) {
    return {
      locale: candidate,
      dir: candidate === "ar" ? "rtl" : "ltr",
      pathname: `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/",
    };
  }

  return null;
}

function isPassthroughPath(pathname: string) {
  return PASSTHROUGH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`)) || pathname.includes(".");
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function isAuthPath(pathname: string) {
  return AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function buildPrefixedPath(locale: string, pathname: string) {
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

function resolvePreferredLocale(request: NextRequest) {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (fromCookie && SUPPORTED_LOCALES.includes(fromCookie as (typeof SUPPORTED_LOCALES)[number])) {
    return fromCookie as (typeof SUPPORTED_LOCALES)[number];
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  const normalized = acceptLanguage.toLowerCase();
  if (normalized.includes("ar")) return "ar";
  if (normalized.includes("fr")) return "fr";
  return DEFAULT_LOCALE;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isPassthroughPath(pathname)) {
    return NextResponse.next();
  }

  const localized = getLocaleConfig(pathname);
  const preferredLocale = resolvePreferredLocale(request);
  const locale = localized?.locale ?? preferredLocale;
  const dir = localized?.dir ?? "ltr";
  const effectivePathname = localized?.pathname ?? pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-dir", dir);
  requestHeaders.set("x-internal-path", effectivePathname);

  const needsAuthCheck = isProtectedPath(effectivePathname) || isAuthPath(effectivePathname);

  if (!localized && !needsAuthCheck) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = buildPrefixedPath(locale, pathname);
    return NextResponse.redirect(redirectUrl);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const fallbackResponse = localized
      ? NextResponse.rewrite(new URL(effectivePathname, request.url), { request: { headers: requestHeaders } })
      : NextResponse.next({ request: { headers: requestHeaders } });

    fallbackResponse.headers.set("x-locale", locale);
    fallbackResponse.headers.set("x-dir", dir);
    fallbackResponse.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return fallbackResponse;
  }

  const response = localized
    ? NextResponse.rewrite(new URL(effectivePathname, request.url), { request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });

  if (!needsAuthCheck) {
    response.headers.set("x-locale", locale);
    response.headers.set("x-dir", dir);
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set(name, value, options);
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set(name, "", options);
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = isProtectedPath(effectivePathname);

  if (isProtected && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = buildPrefixedPath(locale, "/login");
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthPath(effectivePathname) && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = buildPrefixedPath(locale, "/dashboard");
    return NextResponse.redirect(redirectUrl);
  }

  response.headers.set("x-locale", locale);
  response.headers.set("x-dir", dir);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
