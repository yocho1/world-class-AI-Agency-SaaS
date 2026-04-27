import { Button, Card, Input } from "@/components/ui";

export default function FreeAIAuditPage() {
  return (
    <main className="container py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Free AI audit</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Get a practical roadmap for your first AI launch.</h1>
        <p className="mt-4 text-text-secondary">Tell us what you are trying to automate or convert, and we will return a concrete implementation plan with priorities and risks.</p>
      </div>

      <Card className="mt-10 max-w-2xl bg-bg-overlay/70 p-8">
        <form className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-name">Name</label>
            <Input id="audit-name" placeholder="Alex Morgan" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-company">Company</label>
            <Input id="audit-company" placeholder="Northwind" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-email">Work email</label>
            <Input id="audit-email" placeholder="you@company.com" type="email" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-goal">What do you want to improve?</label>
            <Input id="audit-goal" placeholder="Lead response speed, conversion, support, internal ops..." />
          </div>
          <Button className="sm:col-span-2 w-full" type="submit">Request audit</Button>
        </form>
      </Card>
    </main>
  );
}