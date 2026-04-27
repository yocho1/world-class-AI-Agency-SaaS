"use client";

import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";
import type { ReactNode } from "react";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (typeof window !== "undefined" && posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: false,
    persistence: "localStorage+cookie",
  });
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  return <Provider client={posthog}>{children}</Provider>;
}