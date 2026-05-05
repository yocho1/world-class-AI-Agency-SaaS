import Link from "next/link";
import { Card } from "@/components/ui";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import AuditRequestButton from "@/components/dashboard/AuditRequestButton";

type DashboardSupabase = Awaited<ReturnType<typeof createClient>>;

type LeadSummaryRow = {
  status: string;
  created_at: string;
  tenant_id: string | null;
};

type ConversationSummaryRow = {
  id: string;
  channel: string;
  created_at: string;
  tenant_id: string | null;
};

type AnalyticsEventRow = {
  session_id: string | null;
};

async function getMetrics(tenantId: string, supabase: DashboardSupabase) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoISO = sevenDaysAgo.toISOString();

  // Get leads: tenant's leads + unclaimed recent leads
  const { data: leadRows } = await supabase
    .from("leads")
    .select("id, status, created_at, tenant_id")
    .or(`tenant_id.eq.${tenantId},and(tenant_id.is.null,created_at.gte.${sevenDaysAgoISO})`);

  // Get conversations: tenant's conversations + unclaimed recent conversations
  const { data: conversationRows } = await supabase
    .from("conversations")
    .select("id, created_at, tenant_id")
    .or(`tenant_id.eq.${tenantId},and(tenant_id.is.null,created_at.gte.${sevenDaysAgoISO})`);

  const leads = (leadRows ?? []) as LeadSummaryRow[];
  const conversations = (conversationRows ?? []) as ConversationSummaryRow[];
  const totalLeads = leads.length;
  const claimedLeads = leads.filter((lead) => lead.tenant_id === tenantId).length;

  const leadWindowCount = leads.filter((lead) => new Date(lead.created_at).getTime() >= new Date(sevenDaysAgoISO).getTime()).length;

  const { data: analyticsRows } = await supabase
    .from("analytics_events")
    .select("session_id")
    .eq("event_name", "page_viewed")
    .gte("created_at", sevenDaysAgoISO);

  const visitors = (() => {
    const rows = (analyticsRows ?? []) as AnalyticsEventRow[];
    const uniqueSessions = new Set(rows.map((row) => row.session_id).filter((sessionId): sessionId is string => Boolean(sessionId)));
    return uniqueSessions.size > 0 ? uniqueSessions.size : rows.length;
  })();

  const conversationIds = conversations.map((conv) => conv.id);
  let totalMessages = 0;

  if (conversationIds.length > 0) {
    const { data: messageRows } = await supabase
      .from("messages")
      .select("id, conversation_id")
      .in("conversation_id", conversationIds);

    totalMessages = messageRows?.length ?? 0;
  }

  const avgMessages = conversationIds.length > 0 ? totalMessages / conversationIds.length : 0;
  const conversionRate = visitors > 0 ? Math.round((leadWindowCount / visitors) * 100) : 0;

  return [
    { label: "Total leads", value: String(totalLeads), delta: claimedLeads > 0 ? `${claimedLeads} claimed` : "unclaimed visible" },
    { label: "Conversations", value: String(conversations?.length || 0), delta: "recent" },
    { label: "Avg messages", value: avgMessages > 0 ? avgMessages.toFixed(1) : "0", delta: "per conversation" },
    { label: "Conversion rate", value: `${conversionRate}%`, delta: visitors > 0 ? "visitors" : "no visitors" },
  ];
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const tenant = await getTenantForUser(user.id);
  if (!tenant) {
    redirect("/login");
  }

  const metrics = await getMetrics(tenant.tenantId, supabase);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoISO = sevenDaysAgo.toISOString();

  const { data: recentConversationRows } = await supabase
    .from("conversations")
    .select("id, channel, created_at, tenant_id")
    .or(`tenant_id.eq.${tenant.tenantId},and(tenant_id.is.null,created_at.gte.${sevenDaysAgoISO})`)
    .order("created_at", { ascending: false })
    .limit(3);

  const recentConversations = (recentConversationRows ?? []) as ConversationSummaryRow[];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Operations snapshot</p>
          <h1 className="mt-2 text-3xl font-medium text-text-primary md:text-4xl">Your workspace: {tenant.tenantName}</h1>
        </div>
        <Link className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
          New audit
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="space-y-2 p-6">
            <p className="text-sm text-text-tertiary">{metric.label}</p>
            <p className="text-3xl font-medium text-text-primary">{metric.value}</p>
            <p className="text-sm text-accent-400">{metric.delta}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-text-primary">Recent conversations</h2>
            <Link className="inline-flex h-11 items-center text-sm text-accent-400 hover:text-accent-300" href="/conversations">
              View all
            </Link>
          </div>
          <div className="space-y-3 text-sm text-text-secondary">
            {recentConversations.length > 0 ? (
              recentConversations.map((conv) => (
                <p key={conv.id}>• {conv.channel} conversation - {new Date(conv.created_at).toLocaleDateString()}</p>
              ))
            ) : (
              <div className="space-y-3">
                <p>No conversations yet. Share your chatbot to start collecting leads!</p>
                <div className="flex items-center gap-2">
                  <a href="/settings" className="inline-flex h-11 items-center rounded-lg border border-border-default px-3 text-sm text-text-primary hover:border-border-strong">Configure & Share</a>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="space-y-5 p-6">
          <h2 className="text-xl font-medium text-text-primary">Quick links</h2>
          <AuditRequestButton tenantId={tenant.tenantId} />
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><Link href="/leads" className="inline-flex min-h-11 items-center text-accent-400 hover:text-accent-300">→ View all leads</Link></li>
            <li><Link href="/conversations" className="inline-flex min-h-11 items-center text-accent-400 hover:text-accent-300">→ View conversations</Link></li>
            <li><Link href="/settings" className="inline-flex min-h-11 items-center text-accent-400 hover:text-accent-300">→ Workspace settings</Link></li>
            <li><Link href="/" className="inline-flex min-h-11 items-center text-accent-400 hover:text-accent-300">→ Back to site</Link></li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
