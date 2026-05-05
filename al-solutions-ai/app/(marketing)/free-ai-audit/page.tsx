"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Card, Input } from "@/components/ui";

export default function FreeAIAuditPage() {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspace_id");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    goal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("audit-", "")]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const payload: Record<string, unknown> = { ...formData };
      if (workspaceId) payload.workspace_id = workspaceId;

      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(error.error || "Failed to submit audit request");
      }

      await res.json();
      setMessage({
        type: "success",
        text: "Thanks! We've received your request. Check your email for next steps.",
      });
      setFormData({ name: "", company: "", email: "", goal: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Free AI audit</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Get a practical roadmap for your first AI launch.</h1>
        <p className="mt-4 text-text-secondary">Tell us what you are trying to automate or convert, and we will return a concrete implementation plan with priorities and risks.</p>
      </div>

      <Card className="mt-10 max-w-2xl bg-bg-overlay/70 p-8">
        {message && (
          <div
            className={`mb-6 rounded-lg p-4 text-sm ${
              message.type === "success"
                ? "bg-accent-400/10 text-accent-400"
                : "bg-error/10 text-error"
            }`}
          >
            {message.text}
          </div>
        )}

        <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-name">Name</label>
            <Input
              id="audit-name"
              placeholder="Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-company">Company</label>
            <Input
              id="audit-company"
              placeholder="Northwind"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-email">Work email</label>
            <Input
              id="audit-email"
              placeholder="you@company.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-goal">What do you want to improve?</label>
            <Input
              id="audit-goal"
              placeholder="Lead response speed, conversion, support, internal ops..."
              value={formData.goal}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            className="sm:col-span-2 w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Request audit"}
          </Button>
        </form>
      </Card>
    </main>
  );
}