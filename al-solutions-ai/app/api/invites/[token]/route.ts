import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import { revokeWorkspaceInvite, updateInviteRole } from "@/lib/invites";

const UpdateRoleSchema = z.object({
  role: z.enum(["owner", "admin", "member"]),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = UpdateRoleSchema.parse(await request.json());
    const tenant = await getTenantForUser(user.id);

    if (!tenant) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    if (tenant.userRole !== "owner" && tenant.userRole !== "admin") {
      return NextResponse.json(
        { error: "Only workspace owners and admins can change invite roles" },
        { status: 403 }
      );
    }

    await updateInviteRole({
      token,
      tenantId: tenant.tenantId,
      userId: user.id,
      newRole: parsed.role,
    });

    return NextResponse.json({
      ok: true,
      message: "Invite role updated successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to update invite role",
        details: message,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenant = await getTenantForUser(user.id);

    if (!tenant) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    if (tenant.userRole !== "owner" && tenant.userRole !== "admin") {
      return NextResponse.json(
        { error: "Only workspace owners and admins can revoke invites" },
        { status: 403 }
      );
    }

    await revokeWorkspaceInvite({
      token,
      tenantId: tenant.tenantId,
      userId: user.id,
    });

    return NextResponse.json({
      ok: true,
      message: "Invite revoked successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to revoke invite",
        details: message,
      },
      { status: 400 }
    );
  }
}
