import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";

export default async function OnboardingPage() {
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

  return (
    <div className="min-h-screen bg-bg-base px-4 py-10 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl justify-center">
        <OnboardingCard
          userName={user.user_metadata?.full_name || user.email || "User"}
          workspaceName={tenant.tenantName}
        />
      </div>
    </div>
  );
}
