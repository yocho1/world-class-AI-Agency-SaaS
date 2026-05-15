"use client";

import { useState } from "react";
import { Card } from "@/components/ui";

type TeamMember = {
  user_id: string;
  role: "owner" | "admin" | "member";
  created_at: string;
  email: string | null;
};

export function TeamMembersCard({
  canManage,
  currentUserId,
  members: initialMembers,
}: {
  canManage: boolean;
  currentUserId: string;
  members: TeamMember[];
}) {
  const [members, setMembers] = useState(initialMembers);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  function setMemberUpdating(userId: string, isUpdating: boolean) {
    setUpdatingIds((previous) => {
      const next = new Set(previous);
      if (isUpdating) {
        next.add(userId);
      } else {
        next.delete(userId);
      }
      return next;
    });
  }

  async function updateMemberRole(userId: string, role: "owner" | "admin" | "member") {
    setMemberUpdating(userId, true);
    try {
      const response = await fetch(`/api/members/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to update member role");
      }

      setMembers((previous) =>
        previous.map((member) => (member.user_id === userId ? { ...member, role } : member))
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to update member role");
    } finally {
      setMemberUpdating(userId, false);
    }
  }

  async function removeMember(userId: string) {
    setMemberUpdating(userId, true);
    try {
      const response = await fetch(`/api/members/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to remove member");
      }

      setMembers((previous) => previous.filter((member) => member.user_id !== userId));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to remove member");
    } finally {
      setMemberUpdating(userId, false);
    }
  }

  return (
    <Card className="space-y-5 p-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-medium text-text-primary">Team members</h2>
        <p className="mt-1 text-sm text-text-secondary">View and manage members who already joined this workspace.</p>
        <div className="mt-3 grid gap-2 text-xs text-text-tertiary sm:grid-cols-3">
          <div className="rounded-lg border border-border-subtle bg-bg-elevated p-2">
            <span className="font-medium text-text-primary">Owner</span>
            <p className="mt-0.5">Full access, billing, deletion</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-bg-elevated p-2">
            <span className="font-medium text-text-primary">Admin</span>
            <p className="mt-0.5">Manage members, leads, settings</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-bg-elevated p-2">
            <span className="font-medium text-text-primary">Member</span>
            <p className="mt-0.5">View leads, conversations, analytics</p>
          </div>
        </div>
      </div>

      {members.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-xs uppercase tracking-[0.12em] text-text-tertiary">
                <th className="px-4 py-3 text-left font-medium">Member</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Joined</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => {
                const isUpdating = updatingIds.has(member.user_id);
                const isOwner = member.role === "owner";
                const isSelf = member.user_id === currentUserId;
                const canEditThisMember = canManage && !isOwner && !isSelf;

                return (
                  <tr
                    key={member.user_id}
                    className={`border-b border-border-subtle hover:bg-bg-overlay/50 transition-colors ${
                      index === members.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-text-primary break-all">
                        {member.email ?? `User ${member.user_id.slice(0, 8)}`}
                      </p>
                      {isSelf ? <p className="text-xs text-text-tertiary">You</p> : null}
                    </td>
                    <td className="px-4 py-3">
                      {canEditThisMember ? (
                        <select
                          className="h-11 rounded bg-bg-elevated border border-border-subtle px-3 text-sm text-text-primary font-medium hover:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30 transition-colors disabled:opacity-50 cursor-pointer"
                          value={member.role}
                          onChange={(event) =>
                            updateMemberRole(member.user_id, event.target.value as "owner" | "admin" | "member")
                          }
                          disabled={isUpdating}
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className="text-sm font-medium text-text-primary capitalize">{member.role}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-text-secondary">{new Date(member.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {canEditThisMember ? (
                        <button
                          type="button"
                          onClick={() => removeMember(member.user_id)}
                          disabled={isUpdating}
                          className="inline-flex h-11 items-center rounded border border-red-500/30 bg-red-500/5 px-3 text-xs font-medium text-red-600 hover:bg-red-500/10 hover:border-red-500/50 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {isUpdating ? "..." : "Remove"}
                        </button>
                      ) : (
                        <span className="text-xs text-text-tertiary">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
          No members found for this workspace.
        </p>
      )}
    </Card>
  );
}