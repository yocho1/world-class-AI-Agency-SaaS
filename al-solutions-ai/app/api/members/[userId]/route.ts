import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import { removeTenantMember, updateTenantMemberRole } from "@/lib/members";

const UpdateMemberSchema = z.object({
  role: z.enum(["owner", "admin", "member"]),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = UpdateMemberSchema.parse(await request.json());
    const tenant = await getTenantForUser(user.id);

    if (!tenant) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    await updateTenantMemberRole({
      tenantId: tenant.tenantId,
      actorUserId: user.id,
      targetUserId: params.userId,
      newRole: parsed.role,
    });

    return NextResponse.json({ ok: true, message: "Member role updated" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: message,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
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

    await removeTenantMember({
      tenantId: tenant.tenantId,
      actorUserId: user.id,
      targetUserId: params.userId,
    });

    return NextResponse.json({ ok: true, message: "Member removed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: message,
      },
      { status: 400 }
    );
  }
}