import { Card } from "@/components/ui";

export default function ConversationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Conversations</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">Review every chat with context.</h1>
      </div>
      <Card className="space-y-3 p-6 text-sm text-text-secondary">
        <p>• Hospitality lead asked for WhatsApp integration</p>
        <p>• Retail lead shared budget and timeline in the first session</p>
        <p>• Fintech lead triggered human handoff after qualification</p>
      </Card>
    </div>
  );
}