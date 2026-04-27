"use client";

import { usePostHog as usePosthogClient } from "posthog-js/react";

export function usePostHog() {
  return usePosthogClient();
}