export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initializeServerSentry } = await import("./sentry.server.config");
    initializeServerSentry();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const { initializeClientSentry } = await import("./sentry.client.config");
    initializeClientSentry();
  }
}
