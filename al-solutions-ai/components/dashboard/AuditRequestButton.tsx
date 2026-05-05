"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

interface AuditRequestButtonProps {
  tenantId: string;
}

export default function AuditRequestButton({ tenantId }: AuditRequestButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleCreateAudit = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Redirect to audit form with workspace_id
      window.location.href = `/free-ai-audit?workspace_id=${tenantId}`;
    } catch {
      setMessage({
        type: "error",
        text: "Failed to open audit form",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "bg-accent-400/10 text-accent-400"
              : "bg-error/10 text-error"
          }`}
        >
          {message.text}
        </div>
      )}
      <Button
        className="w-full"
        onClick={handleCreateAudit}
        disabled={isLoading}
      >
        {isLoading ? "Opening..." : "➕ New audit"}
      </Button>
    </div>
  );
}
