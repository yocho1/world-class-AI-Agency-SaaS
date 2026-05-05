"use client";

import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";
import type { ReactNode } from "react";

const posthogProjectToken =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const posthogDebug = process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "true";

function initializePosthog() {
  if (!posthogProjectToken) {
    return;
  }

  posthog.init(posthogProjectToken, {
    api_host: posthogHost,
    defaults: "2026-01-30",
    capture_pageview: false,
    persistence: "localStorage+cookie",
    loaded: (instance) => {
      if (posthogDebug) {
        instance.debug(true);
      }
    },
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "complete") {
    window.setTimeout(initializePosthog, 5000);
  } else {
    window.addEventListener(
      "load",
      () => {
        window.setTimeout(initializePosthog, 5000);
      },
      { once: true },
    );
  }
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  return <Provider client={posthog}>{children}</Provider>;
}