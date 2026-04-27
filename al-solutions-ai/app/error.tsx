"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Surface runtime failures to the browser console in development.
    console.error(error);
  }, [error]);

  return (
    <main className="container py-24 text-center">
      <h1 className="text-3xl font-medium text-text-primary">Unexpected error</h1>
      <p className="mt-3 text-text-secondary">We logged this issue and will investigate.</p>
      <button className="mt-8 inline-flex rounded-md bg-primary-600 px-5 py-3 text-sm font-medium text-white" onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}