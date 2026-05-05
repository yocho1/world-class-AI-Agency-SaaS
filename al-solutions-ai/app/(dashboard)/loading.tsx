export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="h-3 w-40 rounded bg-bg-elevated" />
          <div className="h-8 w-80 rounded bg-bg-elevated" />
          <div className="h-4 w-96 max-w-full rounded bg-bg-elevated" />
        </div>
        <div className="h-11 w-36 rounded-lg bg-bg-elevated" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-bg-elevated" />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-2xl bg-bg-surface p-6">
          <div className="h-6 w-56 rounded bg-bg-elevated" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-bg-elevated" />
            <div className="h-4 w-11/12 rounded bg-bg-elevated" />
            <div className="h-4 w-10/12 rounded bg-bg-elevated" />
            <div className="h-4 w-9/12 rounded bg-bg-elevated" />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl bg-bg-surface p-6">
          <div className="h-6 w-44 rounded bg-bg-elevated" />
          <div className="space-y-3">
            <div className="h-12 rounded-lg bg-bg-elevated" />
            <div className="h-12 rounded-lg bg-bg-elevated" />
            <div className="h-12 rounded-lg bg-bg-elevated" />
          </div>
        </div>
      </div>
    </div>
  );
}