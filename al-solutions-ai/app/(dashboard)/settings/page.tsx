import { Card, Input } from "@/components/ui";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Settings</p>
        <h1 className="mt-2 text-3xl font-medium text-text-primary">Update the workspace and chatbot defaults.</h1>
      </div>
      <Card className="space-y-5 p-6 max-w-2xl">
        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="workspace-name">Workspace name</label>
          <Input id="workspace-name" defaultValue="AL Solutions AI" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="chatbot-name">Chatbot name</label>
          <Input id="chatbot-name" defaultValue="AL Assistant" />
        </div>
      </Card>
    </div>
  );
}