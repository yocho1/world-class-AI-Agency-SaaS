"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-base text-text-primary">
        <main className="container flex min-h-screen flex-col items-center justify-center py-24 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-accent-400">System error</p>
          <h1 className="mt-4 text-3xl font-medium text-text-primary">Something went wrong</h1>
          <p className="mt-3 max-w-lg text-text-secondary">
            We logged the failure and will recover the application state as soon as possible.
          </p>
          <button
            className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}