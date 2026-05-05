import { createClient } from "@supabase/supabase-js";
import type { Database, JsonValue } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceClient = SupabaseClient<Database> | any;

export interface TenantProvisionInput {
  userId: string;
  email: string;
  fullName?: string | null;
  company?: string | null;
}

export interface TenantContext {
  tenantId: string;
  tenantName: string;
  tenantSlug: string;
  userRole: "owner" | "admin" | "member";
}

function getServiceClient(): ServiceClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase service role configuration is missing.");
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }) as ServiceClient;
}

function toSlug(source: string): string {
  return source
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "workspace";
}

async function findTenantMembership(client: ServiceClient, userId: string) {
  const { data, error } = await client
    .from("tenant_members")
    .select("tenant_id, role, tenants(id, name, slug)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const prioritized = data.find(
    (membership: { role: string }) => membership.role === "owner" || membership.role === "admin"
  );

  return prioritized ?? data[0];
}

export async function ensureTenantForUser(input: TenantProvisionInput): Promise<TenantContext> {
  const client = getServiceClient();
  const existingMembership = await findTenantMembership(client, input.userId);

  if (existingMembership?.tenant_id) {
    const tenant = Array.isArray(existingMembership.tenants)
      ? existingMembership.tenants[0]
      : existingMembership.tenants;

    return {
      tenantId: existingMembership.tenant_id,
      tenantName: tenant?.name ?? "Workspace",
      tenantSlug: tenant?.slug ?? "workspace",
      userRole: existingMembership.role,
    };
  }

  const displayName = input.company?.trim() || input.fullName?.trim() || input.email.split("@")[0] || "Workspace";
  const baseSlug = toSlug(input.company?.trim() || input.fullName?.trim() || input.email.split("@")[0] || "workspace");
  const tenantSlug = `${baseSlug}-${input.userId.slice(0, 8)}`;

  const tenantPayload = {
    name: displayName,
    slug: tenantSlug,
    plan: "launch",
    settings: {
      owner_email: input.email,
      created_from: "auth_signup",
    } as unknown as JsonValue,
  };

  const { data: tenant, error: tenantError } = await client
    .from("tenants")
    .insert(tenantPayload)
    .select("id, name, slug")
    .single();

  if (tenantError) {
    throw tenantError;
  }

  const { error: memberError } = await client.from("tenant_members").insert({
    tenant_id: tenant.id,
    user_id: input.userId,
    role: "owner",
  });

  if (memberError) {
    throw memberError;
  }

  const { error: configError } = await client.from("chatbot_configs").insert({
    tenant_id: tenant.id,
    name: "AL Assistant",
    avatar: null,
    colors: {
      primary: "#6C63FF",
      accent: "#00E5C4",
      background: "#111119",
    } as unknown as JsonValue,
    system_prompt: "You are AL Assistant, a concise expert AI guide for AL Solutions AI.",
    welcome_message: "Hello! Ask me anything about AI chatbots, automation, pricing, or getting started.",
    quick_replies: [
      "Tell me about AI chatbots",
      "How does automation work?",
      "What's your pricing?",
      "I'd like a free audit",
    ] as unknown as JsonValue,
    enabled: true,
  });

  if (configError) {
    throw configError;
  }

  return {
    tenantId: tenant.id,
    tenantName: tenant.name,
    tenantSlug: tenant.slug,
    userRole: "owner",
  };
}

export async function getTenantForUser(userId: string): Promise<TenantContext | null> {
  const client = getServiceClient();
  const membership = await findTenantMembership(client, userId);

  if (!membership?.tenant_id) {
    return null;
  }

  const tenant = Array.isArray(membership.tenants)
    ? membership.tenants[0]
    : membership.tenants;

  return {
    tenantId: membership.tenant_id,
    tenantName: tenant?.name ?? "Workspace",
    tenantSlug: tenant?.slug ?? "workspace",
    userRole: membership.role,
  };
}