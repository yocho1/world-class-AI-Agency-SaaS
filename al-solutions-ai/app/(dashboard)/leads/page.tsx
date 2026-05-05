import { Card } from "@/components/ui";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import dynamic from "next/dynamic";

const LeadsTable = dynamic(() => import("@/components/leads/LeadsTable"), { ssr: false });

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const tenant = await getTenantForUser(user.id);
  if (!tenant) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Leads</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">Track and prioritize every inbound opportunity.</h1>
        <p className="mt-1 text-sm text-text-secondary">Manage and filter captured leads from your chatbot and forms.</p>
      </div>

      <Card className="p-6">
        <LeadsTable />
      </Card>
    </div>
  );
}