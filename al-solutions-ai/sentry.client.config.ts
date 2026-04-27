export function initializeClientSentry() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Sprint 1 scaffold hook for wiring Sentry in production environments.
  console.info("Client error tracking bootstrap initialized.");
}
