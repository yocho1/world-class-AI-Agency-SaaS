import { Card } from "@/components/ui";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import dynamic from "next/dynamic";

const NurtureDashboard = dynamic(() => import("@/components/nurture/NurtureDashboard"), { ssr: false });

export default async function NurturePage() {
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
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Nurture</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">Email nurture sequences.</h1>
        <p className="mt-1 text-sm text-text-secondary">View sequence templates, track sent emails per lead, and trigger manual sends.</p>
      </div>

      <Card className="p-6">
        <NurtureDashboard />
      </Card>
    </div>
  );
}
