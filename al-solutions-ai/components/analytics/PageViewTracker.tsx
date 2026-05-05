"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageViewed } from "@/lib/analytics/events";
import { usePostHog } from "@/hooks/usePostHog";

const IGNORED_PATH_PREFIXES = ["/dashboard", "/login", "/signup", "/invite"];

function buildPageName(pathname: string, searchParams: URLSearchParams | null): string {
  const query = searchParams?.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  const lastTrackedPageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!posthog || !pathname) {
      return;
    }

    if (IGNORED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
      return;
    }

    const pageName = buildPageName(pathname, searchParams);
    if (lastTrackedPageRef.current === pageName) {
      return;
    }

    lastTrackedPageRef.current = pageName;

    // Prefer PostHog distinct id when available, otherwise use a persistent fallback stored in localStorage.
    function uuidv4() {
      // quick RFC4122 v4 UUID
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    function getFallbackSessionId() {
      try {
        const key = 'al_session_id_v1';
        const existing = localStorage.getItem(key);
        if (existing) return existing;
        const newId = uuidv4();
        localStorage.setItem(key, newId);
        return newId;
      } catch {
        return undefined;
      }
    }

    const phGet = typeof (posthog as { get_distinct_id?: () => string }).get_distinct_id === 'function'
      ? (posthog as { get_distinct_id: () => string }).get_distinct_id()
      : undefined;

    const sessionId = phGet ?? getFallbackSessionId();

    trackPageViewed(posthog, {
      page: pageName,
      referrer: document.referrer || 'direct',
      session_id: sessionId,
    });
  }, [pathname, searchParams, posthog]);

  return null;
}