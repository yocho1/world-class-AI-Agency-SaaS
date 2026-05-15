"use client";

import { useEffect, useMemo, useState } from "react";
import { usePostHog } from "@/hooks/usePostHog";

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getBucket(distinctId: string, experimentKey: string, variants: number): number {
  const combined = `${distinctId}:${experimentKey}`;
  return hashString(combined) % variants;
}

export interface ExperimentVariant<T> {
  id: string;
  payload: T;
}

export function useExperiment<T>(
  experimentKey: string,
  variants: readonly ExperimentVariant<T>[]
): T | undefined {
  const posthog = usePostHog();
  const [assigned, setAssigned] = useState<T | undefined>(undefined);

  const distinctId = useMemo(() => {
    if (!posthog) return undefined;
    try {
      return (posthog as unknown as { get_distinct_id?: () => string }).get_distinct_id?.();
    } catch {
      return undefined;
    }
  }, [posthog]);

  useEffect(() => {
    if (!distinctId || !posthog || variants.length === 0) return;

    const bucket = getBucket(distinctId, experimentKey, variants.length);
    const variant = variants[bucket];
    setAssigned(variant.payload);

    posthog.capture("$experiment_viewed", {
      experiment_id: experimentKey,
      variant: variant.id,
    });
  }, [distinctId, experimentKey, posthog, variants]);

  return assigned;
}
