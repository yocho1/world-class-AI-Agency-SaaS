import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceClient = any;

export type TenantMemberRecord = {
  user_id: string;
  role: "owner" | "admin" | "member";
  created_at: string;
  email: string | null;
};

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

async function getMembershipOrThrow(input: {
  client: ServiceClient;
  tenantId: string;
  userId: string;
}) {
  const { data, error } = await input.client
    .from("tenant_members")
    .select("tenant_id, user_id, role")
    .eq("tenant_id", input.tenantId)
    .eq("user_id", input.userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Membership not found");
  }

  return data as { tenant_id: string; user_id: string; role: "owner" | "admin" | "member" };
}

export async function listTenantMembers(tenantId: string): Promise<TenantMemberRecord[]> {
  const client = getServiceClient();
  const { data, error } = await client
    .from("tenant_members")
    .select("user_id, role, created_at")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as Array<{
    user_id: string;
    role: "owner" | "admin" | "member";
    created_at: string;
  }>;

  const membersWithEmail = await Promise.all(
    rows.map(async (member) => {
      try {
        const { data: authUserData, error: authUserError } = await client.auth.admin.getUserById(member.user_id);
        if (authUserError) {
          return {
            ...member,
            email: null,
          };
        }

        return {
          ...member,
          email: authUserData.user?.email ?? null,
        };
      } catch {
        return {
          ...member,
          email: null,
        };
      }
    })
  );

  return membersWithEmail;
}

export async function updateTenantMemberRole(input: {
  tenantId: string;
  actorUserId: string;
  targetUserId: string;
  newRole: "owner" | "admin" | "member";
}) {
  const client = getServiceClient();
  const actorMembership = await getMembershipOrThrow({
    client,
    tenantId: input.tenantId,
    userId: input.actorUserId,
  });

  if (actorMembership.role !== "owner" && actorMembership.role !== "admin") {
    throw new Error("Only workspace owners and admins can manage members");
  }

  const targetMembership = await getMembershipOrThrow({
    client,
    tenantId: input.tenantId,
    userId: input.targetUserId,
  });

  if (targetMembership.role === "owner") {
    throw new Error("Owner role cannot be changed");
  }

  if (input.actorUserId === input.targetUserId) {
    throw new Error("You cannot change your own role");
  }

  const { error } = await client
    .from("tenant_members")
    .update({ role: input.newRole })
    .eq("tenant_id", input.tenantId)
    .eq("user_id", input.targetUserId);

  if (error) {
    throw error;
  }
}

export async function removeTenantMember(input: {
  tenantId: string;
  actorUserId: string;
  targetUserId: string;
}) {
  const client = getServiceClient();
  const actorMembership = await getMembershipOrThrow({
    client,
    tenantId: input.tenantId,
    userId: input.actorUserId,
  });

  if (actorMembership.role !== "owner" && actorMembership.role !== "admin") {
    throw new Error("Only workspace owners and admins can remove members");
  }

  const targetMembership = await getMembershipOrThrow({
    client,
    tenantId: input.tenantId,
    userId: input.targetUserId,
  });

  if (targetMembership.role === "owner") {
    throw new Error("Owner cannot be removed");
  }

  if (input.actorUserId === input.targetUserId) {
    throw new Error("You cannot remove yourself");
  }

  const { error } = await client
    .from("tenant_members")
    .delete()
    .eq("tenant_id", input.tenantId)
    .eq("user_id", input.targetUserId);

  if (error) {
    throw error;
  }
}