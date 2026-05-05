import ConversationsView from "@/components/conversations/ConversationsView";

export default function ConversationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Conversations</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">Review every chat with context.</h1>
      </div>
      <ConversationsView />
    </div>
  );
}