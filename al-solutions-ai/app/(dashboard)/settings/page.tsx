import { Card, Input } from "@/components/ui";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import { InviteTeamCard } from "@/components/settings/InviteTeamCard";
import { TeamMembersCard } from "@/components/settings/TeamMembersCard";
import { listTenantMembers } from "@/lib/members";

type TenantRow = {
  name: string;
  slug: string;
  plan: string;
};

type ChatbotConfigRow = {
  name: string;
  welcome_message: string;
};

type InviteRow = {
  id: string;
  email: string;
  role: "owner" | "admin" | "member";
  token: string;
  accepted_at: string | null;
  expires_at: string;
  created_at: string;
};

type MemberRow = {
  user_id: string;
  role: "owner" | "admin" | "member";
  created_at: string;
  email: string | null;
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const tenant = await getTenantForUser(user.id);
  if (!tenant) {
    redirect("/login");
  }

  const { data: tenantDataRaw } = await supabase
    .from("tenants")
    .select("id, name, slug, plan, settings")
    .eq("id", tenant.tenantId)
    .single();

  const { data: chatbotConfigRaw } = await supabase
    .from("chatbot_configs")
    .select("id, name, welcome_message, system_prompt")
    .eq("tenant_id", tenant.tenantId)
    .single();

  const inviteRows = tenant.userRole === "owner" || tenant.userRole === "admin"
    ? (
        await supabase
          .from("workspace_invites")
          .select("id, email, role, token, accepted_at, expires_at, created_at")
          .eq("tenant_id", tenant.tenantId)
          .order("created_at", { ascending: false })
      ).data
    : [];

  const memberRows = await listTenantMembers(tenant.tenantId);

  const tenantData = tenantDataRaw as TenantRow | null;
  const chatbotConfig = chatbotConfigRaw as ChatbotConfigRow | null;
  const invites = (inviteRows ?? []) as InviteRow[];
  const members = (memberRows ?? []) as MemberRow[];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Settings</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">Update the workspace and chatbot defaults.</h1>
      </div>

      <Card className="space-y-5 p-6 max-w-2xl">
        <h2 className="text-lg font-medium text-text-primary">Workspace</h2>
        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="workspace-name">Workspace name</label>
          <Input id="workspace-name" defaultValue={tenantData?.name || "Untitled"} disabled />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="workspace-slug">Workspace slug</label>
          <Input id="workspace-slug" defaultValue={tenantData?.slug || ""} disabled />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="workspace-plan">Plan</label>
          <Input id="workspace-plan" defaultValue={tenantData?.plan || "launch"} disabled />
        </div>
      </Card>

      <Card className="space-y-5 p-6 max-w-2xl">
        <h2 className="text-lg font-medium text-text-primary">Chatbot</h2>
        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="chatbot-name">Chatbot name</label>
          <Input id="chatbot-name" defaultValue={chatbotConfig?.name || "AL Assistant"} disabled />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="welcome-msg">Welcome message</label>
          <textarea className="w-full rounded-lg border border-bg-overlay/50 bg-bg-primary px-4 py-2 text-sm text-text-primary placeholder:text-text-tertiary" id="welcome-msg" defaultValue={chatbotConfig?.welcome_message || ""} disabled rows={3} />
        </div>
        <p className="text-xs text-text-tertiary">Settings are read-only in this view. Full editing coming soon.</p>
      </Card>

      <Card className="space-y-4 p-6 max-w-2xl">
        <div>
          <h2 className="text-lg font-medium text-text-primary">Billing</h2>
          <p className="mt-1 text-sm text-text-secondary">Manage plan, invoices, and payment methods.</p>
        </div>
        {tenant.userRole === "owner" || tenant.userRole === "admin" ? (
          <div className="rounded-lg border border-border-subtle bg-bg-elevated p-4 text-sm text-text-secondary">
            Billing is coming soon. We will notify workspace owners when upgrades and invoices are available.
          </div>
        ) : (
          <div className="rounded-lg border border-border-subtle bg-bg-elevated p-4 text-sm text-text-secondary">
            Billing is available to workspace owners and admins only.
          </div>
        )}
      </Card>

      <InviteTeamCard
        canInvite={tenant.userRole === "owner" || tenant.userRole === "admin"}
        invites={invites}
      />

      <TeamMembersCard
        canManage={tenant.userRole === "owner" || tenant.userRole === "admin"}
        currentUserId={user.id}
        members={members}
      />
    </div>
  );
}