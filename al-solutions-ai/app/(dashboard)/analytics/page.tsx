import { Card } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { getTenantForUser } from "@/lib/tenants";
import { redirect } from "next/navigation";

type AnalyticsRow = {
  event_name: string;
  page: string | null;
  created_at: string;
};

type EventBarTone = "primary" | "accent" | "neutral";

type EventBar = {
  label: string;
  value: number;
  tone: EventBarTone;
};

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

function getLeadQuality(leads: number, conversations: number, auditRequests: number): number {
  if (leads === 0 && conversations === 0 && auditRequests === 0) {
    return 0;
  }

  const weightedScore = (auditRequests * 42) + (conversations * 12) + (leads * 8);
  return Math.min(100, Math.round(weightedScore / 3));
}

function getToneClass(tone: EventBarTone): string {
  if (tone === "primary") {
    return "bg-primary-600";
  }

  if (tone === "accent") {
    return "bg-accent-400";
  }

  return "bg-border-default";
}

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const tenant = await getTenantForUser(user.id);
  if (!tenant) {
    redirect("/login");
  }

  const analyticsClient = createSupabaseServiceClient();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: eventRows } = await analyticsClient
    .from("analytics_events")
    .select("event_name, page, created_at")
    .or(`tenant_id.eq.${tenant.tenantId},tenant_id.is.null`)
    .gte("created_at", thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: false });

  const events = (eventRows ?? []) as AnalyticsRow[];
  const pageViews = events.filter((event) => event.event_name === "page_viewed");
  const chatOpens = events.filter((event) => event.event_name === "chatbot_opened");
  const auditRequests = events.filter((event) => event.event_name === "audit_requested");
  const heroClicks = events.filter((event) => event.event_name === "hero_cta_clicked");
  const serviceClicks = events.filter((event) => event.event_name === "service_card_clicked");

  const uniquePages = new Set(pageViews.map((event) => event.page || "unknown")).size;
  const totalTrackedEvents = events.length;
  const openRate = pageViews.length > 0 ? (chatOpens.length / pageViews.length) * 100 : 0;
  const requestRate = pageViews.length > 0 ? (auditRequests.length / pageViews.length) * 100 : 0;
  const leadQuality = getLeadQuality(chatOpens.length, pageViews.length, auditRequests.length);

  const bars: EventBar[] = [
    { label: "Page views", value: pageViews.length, tone: "neutral" },
    { label: "Chat opens", value: chatOpens.length, tone: "primary" },
    { label: "Hero clicks", value: heroClicks.length, tone: "accent" },
    { label: "Service clicks", value: serviceClicks.length, tone: "primary" },
    { label: "Audit requests", value: auditRequests.length, tone: "accent" },
  ];

  const maxBarValue = bars.reduce((currentMax, bar) => Math.max(currentMax, bar.value), 1);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Analytics</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">See how visitors move from attention to action.</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
          These metrics are scoped to your tenant and pull from the same event stream that powers the marketing site and lead capture flow.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-text-tertiary">Tracked events</p>
          <p className="mt-2 text-3xl font-medium text-text-primary">{totalTrackedEvents}</p>
          <p className="mt-2 text-sm text-accent-400">Last 30 days</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-text-tertiary">Chat open rate</p>
          <p className="mt-2 text-3xl font-medium text-text-primary">{formatPercent(openRate)}</p>
          <p className="mt-2 text-sm text-accent-400">{chatOpens.length} opens</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-text-tertiary">Audit request rate</p>
          <p className="mt-2 text-3xl font-medium text-text-primary">{formatPercent(requestRate)}</p>
          <p className="mt-2 text-sm text-accent-400">{auditRequests.length} requests</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-text-tertiary">Lead quality score</p>
          <p className="mt-2 text-3xl font-medium text-text-primary">{leadQuality}</p>
          <p className="mt-2 text-sm text-accent-400">Derived from engagement depth</p>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-medium text-text-primary">Event mix</h2>
              <p className="mt-1 text-sm text-text-tertiary">Comparing the main conversion signals in your workspace.</p>
            </div>
            <div className="text-right text-sm text-text-tertiary">
              <div>{uniquePages} tracked pages</div>
              <div>{pageViews.length} page views</div>
            </div>
          </div>

          <div className="space-y-4">
            {bars.map((bar) => {
              const barWidth = `${Math.max(8, Math.round((bar.value / maxBarValue) * 100))}%`;
              const toneClass = getToneClass(bar.tone);

              return (
                <div key={bar.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{bar.label}</span>
                    <span className="text-text-primary">{bar.value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-bg-elevated">
                    <div className={`h-3 rounded-full ${toneClass}`} style={{ width: barWidth }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="space-y-5 p-6">
          <div>
            <h2 className="text-xl font-medium text-text-primary">Top signals</h2>
            <p className="mt-1 text-sm text-text-tertiary">The events most likely to lead to a qualified conversation.</p>
          </div>

          <div className="space-y-3 text-sm text-text-secondary">
            <div className="flex items-center justify-between rounded-lg bg-bg-elevated px-4 py-3">
              <span>Hero CTA clicks</span>
              <span className="text-text-primary">{heroClicks.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-bg-elevated px-4 py-3">
              <span>Service card clicks</span>
              <span className="text-text-primary">{serviceClicks.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-bg-elevated px-4 py-3">
              <span>Chatbot opens</span>
              <span className="text-text-primary">{chatOpens.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-bg-elevated px-4 py-3">
              <span>Audit requests</span>
              <span className="text-text-primary">{auditRequests.length}</span>
            </div>
          </div>

          <p className="text-xs text-text-tertiary">
            If PostHog is configured, these numbers should trend in the same direction as your product analytics events. This view is intentionally lightweight so it stays fast inside the dashboard.
          </p>
        </Card>
      </section>
    </div>
  );
}