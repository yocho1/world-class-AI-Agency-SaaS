export default function GlobalLoading() {
  return (
    <div className="container py-24">
      <div className="h-10 w-64 animate-pulse rounded bg-bg-elevated" />
      <div className="mt-4 h-6 w-full animate-pulse rounded bg-bg-elevated" />
      <div className="mt-2 h-6 w-4/5 animate-pulse rounded bg-bg-elevated" />
    </div>
  );
}