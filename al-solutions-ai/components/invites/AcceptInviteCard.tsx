"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui";

export function AcceptInviteCard({
  token,
  canAccept,
  inviteEmail,
  isExpired,
  isAccepted,
  emailMatches,
  isLoggedIn,
}: {
  token: string;
  canAccept: boolean;
  inviteEmail: string;
  isExpired: boolean;
  isAccepted: boolean;
  emailMatches: boolean;
  isLoggedIn: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAccept() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/invites/${token}/accept`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error || "Failed to accept invite";
        throw new Error(errorMessage);
      }

      window.location.href = data.redirectTo || "/dashboard";
    } catch (acceptError) {
      const errorMessage = acceptError instanceof Error ? acceptError.message : "Failed to accept invite";
      setError(errorMessage);
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4 p-6 max-w-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Workspace invite</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">You&apos;ve been invited to join this workspace.</h1>
        <p className="mt-2 text-sm text-text-secondary">Invite sent to {inviteEmail}</p>
      </div>

      {canAccept ? (
        <>
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
              <p className="text-sm font-medium text-red-600">Error accepting invite</p>
              <p className="mt-1 text-xs text-red-500">{error}</p>
            </div>
          )}
          <Button type="button" disabled={loading} onClick={handleAccept}>
            {loading ? "Joining workspace..." : "Accept invite"}
          </Button>
        </>
      ) : isExpired ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
          <p className="text-sm font-medium text-red-600">Invitation expired</p>
          <p className="mt-1 text-xs text-red-500">This invitation has expired. Please ask the workspace owner to send a new one.</p>
        </div>
      ) : isAccepted ? (
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3">
          <p className="text-sm font-medium text-green-600">Already accepted</p>
          <p className="mt-1 text-xs text-green-500">You have already accepted this invitation. Redirecting you to the workspace...</p>
        </div>
      ) : !isLoggedIn ? (
        <div className="rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3">
          <p className="text-sm text-text-secondary">
            Sign in with <strong>{inviteEmail}</strong> to accept this invite.
          </p>
        </div>
      ) : !emailMatches ? (
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
          <p className="text-sm font-medium text-yellow-600">Email mismatch</p>
          <p className="mt-1 text-xs text-yellow-600">
            This invitation was sent to <strong>{inviteEmail}</strong>. Sign in with that email to accept.
          </p>
        </div>
      ) : (
        <p className="rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
          Sign in with the invited email address to accept this invite.
        </p>
      )}

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </Card>
  );
}