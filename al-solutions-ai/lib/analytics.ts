export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;

  gtag("event", name, params);
}
