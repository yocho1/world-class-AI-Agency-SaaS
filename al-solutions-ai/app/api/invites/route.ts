import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import { createWorkspaceInvite } from "@/lib/invites";
import { sendInviteEmail } from "@/lib/email";

const InviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["owner", "admin", "member"]).default("member"),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = InviteSchema.parse(await request.json());
    const tenant = await getTenantForUser(user.id);

    if (!tenant) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    if (tenant.userRole !== "owner" && tenant.userRole !== "admin") {
      return NextResponse.json({ error: "Only workspace owners and admins can invite members" }, { status: 403 });
    }

    const invite = await createWorkspaceInvite({
      tenantId: tenant.tenantId,
      email: parsed.email,
      role: parsed.role,
      invitedByUserId: user.id,
    });

    const inviteUrl = `${request.nextUrl.origin}/invite/${invite.token}`;

    // Send invite email asynchronously (don't block on success/failure)
    sendInviteEmail({
      recipientEmail: parsed.email,
      inviteUrl,
      invitedByName: user.email || "A team member",
      workspaceName: tenant.tenantName || "Workspace",
      role: parsed.role,
    }).catch((error) => {
      console.error("Email send error:", error);
    });

    return NextResponse.json({
      ok: true,
      invite: {
        ...invite,
        inviteUrl,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid invite payload", details: error.errors }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    const missingTable = /workspace_invites|tenant_members|relation .* does not exist/i.test(message);

    if (missingTable) {
      return NextResponse.json(
        {
          error: "Invite storage is not deployed yet",
          details: message,
          hint: "Run the 004_workspace_invites.sql migration in your Supabase SQL editor, then try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create invite",
        details: message,
      },
      { status: 500 }
    );
  }
}