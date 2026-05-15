"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePostHog } from "@/hooks/usePostHog";
import { trackScrollDepth } from "@/lib/analytics/events";

const MILESTONES = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
  const pathname = usePathname();
  const posthog = usePostHog();
  const reachedRef = useRef<Set<number>>(new Set());
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    if (!posthog || !pathname) return;

    // Reset milestones when pathname changes
    if (lastPathRef.current !== pathname) {
      reachedRef.current.clear();
      lastPathRef.current = pathname;
    }

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      for (const milestone of MILESTONES) {
        if (depth >= milestone && !reachedRef.current.has(milestone)) {
          reachedRef.current.add(milestone);
          trackScrollDepth(posthog, {
            page: pathname,
            depth,
            milestone,
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Check immediately in case page is short
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, posthog]);

  return null;
}
