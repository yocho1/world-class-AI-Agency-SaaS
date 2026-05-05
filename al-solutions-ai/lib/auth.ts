import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureTenantForUser, getTenantForUser, type TenantContext } from "@/lib/tenants";

export interface AuthenticatedWorkspace {
  userId: string;
  email: string;
  fullName: string | null;
  company: string | null;
  tenant: TenantContext;
}

export async function requireAuthenticatedWorkspace(): Promise<AuthenticatedWorkspace> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const email = user.email ?? "";
  const fullName = (user.user_metadata?.full_name as string | undefined) ?? null;
  const company = (user.user_metadata?.company as string | undefined) ?? null;

  const tenant = (await getTenantForUser(user.id)) ??
    (await ensureTenantForUser({
      userId: user.id,
      email,
      fullName,
      company,
    }));

  return {
    userId: user.id,
    email,
    fullName,
    company,
    tenant,
  };
}