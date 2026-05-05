import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWorkspaceInviteByToken } from "@/lib/invites";
import { AcceptInviteCard } from "@/components/invites/AcceptInviteCard";

export default async function InvitePage({ params }: { params: { token: string } }) {
  const { token } = params;
  const invite = await getWorkspaceInviteByToken(token);

  if (!invite) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentEmail = user?.email?.toLowerCase() ?? "";
  const inviteEmail = invite.email.toLowerCase();
  const isExpired = new Date(invite.expires_at).getTime() < Date.now();
  const isAccepted = Boolean(invite.accepted_at);
  const emailMatches = currentEmail === inviteEmail;
  const canAccept = Boolean(user && emailMatches && !isAccepted && !isExpired);

  return (
    <div className="min-h-screen bg-bg-base px-4 py-10 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl justify-center">
        <AcceptInviteCard 
          token={token} 
          canAccept={canAccept} 
          inviteEmail={invite.email}
          isExpired={isExpired}
          isAccepted={isAccepted}
          emailMatches={emailMatches}
          isLoggedIn={Boolean(user)}
        />
      </div>
    </div>
  );
}