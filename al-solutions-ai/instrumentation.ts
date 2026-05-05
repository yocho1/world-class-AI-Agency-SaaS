export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initializeServerSentry } = await import("./sentry.server.config");
    initializeServerSentry();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const { initializeEdgeSentry } = await import("./sentry.edge.config");
    initializeEdgeSentry();
  }
}
