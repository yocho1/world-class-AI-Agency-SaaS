import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceClient = any;

export interface WorkspaceInviteRecord {
  id: string;
  tenant_id: string;
  email: string;
  role: "owner" | "admin" | "member";
  token: string;
  invited_by_user_id: string;
  accepted_by_user_id: string | null;
  accepted_at: string | null;
  expires_at: string;
  created_at: string;
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

export function createInviteToken(): string {
  return randomUUID().replace(/-/g, "");
}

export async function createWorkspaceInvite(input: {
  tenantId: string;
  email: string;
  role: "owner" | "admin" | "member";
  invitedByUserId: string;
}) {
  const client = getServiceClient();
  const token = createInviteToken();

  const { data, error } = await client
    .from("workspace_invites")
    .insert({
      tenant_id: input.tenantId,
      email: input.email.toLowerCase(),
      role: input.role,
      token,
      invited_by_user_id: input.invitedByUserId,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select("id, tenant_id, email, role, token, invited_by_user_id, accepted_by_user_id, accepted_at, expires_at, created_at")
    .single();

  if (error) {
    throw error;
  }

  return data as WorkspaceInviteRecord;
}

export async function listWorkspaceInvites(tenantId: string) {
  const client = getServiceClient();
  const { data, error } = await client
    .from("workspace_invites")
    .select("id, tenant_id, email, role, token, invited_by_user_id, accepted_by_user_id, accepted_at, expires_at, created_at")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data || []) as WorkspaceInviteRecord[];
}

export async function getWorkspaceInviteByToken(token: string) {
  const client = getServiceClient();
  const { data, error } = await client
    .from("workspace_invites")
    .select("id, tenant_id, email, role, token, invited_by_user_id, accepted_by_user_id, accepted_at, expires_at, created_at")
    .eq("token", token)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as WorkspaceInviteRecord | null;
}

export async function acceptWorkspaceInvite(input: {
  token: string;
  userId: string;
  email: string;
}) {
  const client = getServiceClient();
  const invite = await getWorkspaceInviteByToken(input.token);

  if (!invite) {
    throw new Error("Invite not found");
  }

  if (invite.accepted_at) {
    throw new Error("Invite already accepted");
  }

  if (new Date(invite.expires_at).getTime() < Date.now()) {
    throw new Error("Invite expired");
  }

  if (invite.email.toLowerCase() !== input.email.toLowerCase()) {
    throw new Error("This invite was sent to a different email address");
  }

  const { error: memberError } = await client.from("tenant_members").upsert(
    {
      tenant_id: invite.tenant_id,
      user_id: input.userId,
      role: invite.role,
    },
    {
      onConflict: "tenant_id,user_id",
    }
  );

  if (memberError) {
    throw memberError;
  }

  const { error: inviteError } = await client
    .from("workspace_invites")
    .update({
      accepted_at: new Date().toISOString(),
      accepted_by_user_id: input.userId,
    })
    .eq("token", input.token);

  if (inviteError) {
    throw inviteError;
  }

  return invite;
}

export async function revokeWorkspaceInvite(input: {
  token: string;
  tenantId: string;
  userId: string;
}) {
  const client = getServiceClient();
  
  // First verify the user has permission to revoke (must be owner/admin)
  const { data: membership, error: memberError } = await client
    .from("tenant_members")
    .select("role")
    .eq("tenant_id", input.tenantId)
    .eq("user_id", input.userId)
    .maybeSingle();

  if (memberError || !membership || (membership.role !== "owner" && membership.role !== "admin")) {
    throw new Error("Only workspace owners and admins can revoke invites");
  }

  // Delete the invite
  const { error: deleteError } = await client
    .from("workspace_invites")
    .delete()
    .eq("token", input.token)
    .eq("tenant_id", input.tenantId);

  if (deleteError) {
    throw deleteError;
  }
}

export async function updateInviteRole(input: {
  token: string;
  tenantId: string;
  userId: string;
  newRole: "owner" | "admin" | "member";
}) {
  const client = getServiceClient();
  
  // Verify user has permission (must be owner/admin)
  const { data: membership, error: memberError } = await client
    .from("tenant_members")
    .select("role")
    .eq("tenant_id", input.tenantId)
    .eq("user_id", input.userId)
    .maybeSingle();

  if (memberError || !membership || (membership.role !== "owner" && membership.role !== "admin")) {
    throw new Error("Only workspace owners and admins can change invite roles");
  }

  // Check invite hasn't been accepted
  const { data: invite, error: fetchError } = await client
    .from("workspace_invites")
    .select("id, accepted_at")
    .eq("token", input.token)
    .eq("tenant_id", input.tenantId)
    .maybeSingle();

  if (fetchError || !invite) {
    throw new Error("Invite not found");
  }

  if (invite.accepted_at) {
    throw new Error("Cannot change role of an accepted invite");
  }

  // Update the role
  const { error: updateError } = await client
    .from("workspace_invites")
    .update({ role: input.newRole })
    .eq("token", input.token)
    .eq("tenant_id", input.tenantId);

  if (updateError) {
    throw updateError;
  }
}
