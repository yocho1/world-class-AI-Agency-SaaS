import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container py-24 text-center">
      <h1 className="text-3xl font-medium text-text-primary">Page not found</h1>
      <p className="mt-3 text-text-secondary">The page you requested does not exist.</p>
      <Link className="mt-8 inline-flex rounded-md bg-primary-600 px-5 py-3 text-sm font-medium text-white" href="/">
        Return home
      </Link>
    </main>
  );
}