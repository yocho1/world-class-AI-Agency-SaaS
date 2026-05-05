import * as Sentry from "@sentry/nextjs";

const DEFAULT_TRACES_SAMPLE_RATE = 0.1;

const parseSampleRate = (value: string | undefined, fallback: number) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export function initializeEdgeSentry() {
  const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!dsn || process.env.NODE_ENV !== "production") {
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENV ?? process.env.NODE_ENV,
    tracesSampleRate: parseSampleRate(process.env.SENTRY_TRACES_SAMPLE_RATE, DEFAULT_TRACES_SAMPLE_RATE),
  });
}
