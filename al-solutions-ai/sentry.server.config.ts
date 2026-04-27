export function initializeServerSentry() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Sprint 1 scaffold hook for wiring Sentry in production environments.
  console.info("Server error tracking bootstrap initialized.");
}
