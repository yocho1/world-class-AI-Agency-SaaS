"use client";

import { useState } from "react";
import { Card, Input, Button } from "@/components/ui";

type InviteRecord = {
  id: string;
  email: string;
  role: "owner" | "admin" | "member";
  token: string;
  accepted_at: string | null;
  expires_at: string;
  created_at: string;
  inviteUrl?: string;
};

export function InviteTeamCard({
  canInvite,
  invites: initialInvites,
}: {
  canInvite: boolean;
  invites: InviteRecord[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [invites, setInvites] = useState(initialInvites);
  const [updatingTokens, setUpdatingTokens] = useState<Set<string>>(new Set());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);
    setError(null);
    setInviteUrl(null);

    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") || "").trim(),
      role: String(formData.get("role") || "member") as InviteRecord["role"],
    };

    try {
      const response = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to create invite");
      }

      setInviteUrl(data.invite?.inviteUrl || null);
      form.reset();
      // Refresh invites list
      setInvites([data.invite, ...invites]);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Failed to create invite");
    } finally {
      setLoading(false);
    }
  }

  async function copyInviteLink(url: string) {
    await navigator.clipboard.writeText(url);
  }

  async function revokeInvite(token: string) {
    const newUpdating = new Set(updatingTokens);
    newUpdating.add(token);
    setUpdatingTokens(newUpdating);

    try {
      const response = await fetch(`/api/invites/${token}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to revoke invite");
      }

      setInvites(invites.filter((inv) => inv.token !== token));
    } catch (revokeError) {
      alert(revokeError instanceof Error ? revokeError.message : "Failed to revoke invite");
    } finally {
      newUpdating.delete(token);
      setUpdatingTokens(newUpdating);
    }
  }

  async function changeInviteRole(token: string, newRole: "owner" | "admin" | "member") {
    const newUpdating = new Set(updatingTokens);
    newUpdating.add(token);
    setUpdatingTokens(newUpdating);

    try {
      const response = await fetch(`/api/invites/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to update invite role");
      }

      setInvites(invites.map((inv) => (inv.token === token ? { ...inv, role: newRole } : inv)));
    } catch (updateError) {
      alert(updateError instanceof Error ? updateError.message : "Failed to update invite role");
    } finally {
      newUpdating.delete(token);
      setUpdatingTokens(newUpdating);
    }
  }

  return (
    <Card className="space-y-5 p-6 max-w-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-text-primary">Team invites</h2>
          <p className="mt-1 text-sm text-text-secondary">Invite teammates by email. They will join the workspace after accepting the link.</p>
        </div>
      </div>

      {canInvite ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="invite-email">Email address</label>
              <Input id="invite-email" name="email" type="email" placeholder="teammate@company.com" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="invite-role">Role</label>
              <select
                className="h-11 w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 text-sm text-text-primary font-medium hover:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30 transition-colors cursor-pointer"
                id="invite-role"
                name="role"
                defaultValue="member"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating invite..." : "Create invite link"}
            </Button>
            {inviteUrl ? (
              <Button type="button" variant="secondary" onClick={() => copyInviteLink(inviteUrl)}>
                Copy link
              </Button>
            ) : null}
          </div>

          {inviteUrl ? (
            <p className="break-all rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
              Invite link: {inviteUrl}
            </p>
          ) : null}

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </form>
      ) : (
        <p className="rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
          Only workspace owners and admins can invite new members.
        </p>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-text-tertiary">Recent invites</h3>
        {invites.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle text-xs uppercase tracking-[0.12em] text-text-tertiary">
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Role</th>
                  <th className="px-4 py-3 text-left font-medium">Expires</th>
                  <th className="px-4 py-3 text-center font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invites.map((invite, index) => {
                  const isPending = !invite.accepted_at;
                  const isExpired = new Date(invite.expires_at).getTime() < Date.now();
                  const isUpdating = updatingTokens.has(invite.token);

                  return (
                    <tr
                      key={invite.id}
                      className={`border-b border-border-subtle hover:bg-bg-overlay/50 transition-colors ${
                        index === invites.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-text-primary break-all">{invite.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        {isPending && !isExpired && canInvite ? (
                          <select
                            className="h-11 rounded bg-bg-elevated border border-border-subtle px-3 text-sm text-text-primary font-medium hover:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30 transition-colors disabled:opacity-50 cursor-pointer"
                            value={invite.role}
                            onChange={(e) =>
                              changeInviteRole(invite.token, e.target.value as "owner" | "admin" | "member")
                            }
                            disabled={isUpdating}
                          >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className="text-sm font-medium text-text-primary capitalize">{invite.role}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-text-secondary">{new Date(invite.expires_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            isExpired
                              ? "bg-red-500/10 text-red-600"
                              : isPending
                                ? "bg-yellow-500/10 text-yellow-600"
                                : "bg-green-500/10 text-green-600"
                          }`}
                        >
                          {isExpired ? "Expired" : isPending ? "Pending" : "Accepted"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isPending && !isExpired && canInvite ? (
                          <button
                            type="button"
                            onClick={() => revokeInvite(invite.token)}
                            disabled={isUpdating}
                            className="inline-flex h-11 items-center rounded border border-red-500/30 bg-red-500/5 px-3 text-xs font-medium text-red-600 hover:bg-red-500/10 hover:border-red-500/50 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            {isUpdating ? "…" : "Revoke"}
                          </button>
                        ) : (
                          <span className="text-xs text-text-tertiary">—</span>
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
            No invites have been created yet.
          </p>
        )}
      </div>
    </Card>
  );
}