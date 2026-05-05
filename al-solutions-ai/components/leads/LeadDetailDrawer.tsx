"use client";
import React, { useEffect, useState } from "react";

type LeadDetailProps = {
  id: string | null;
  onClose: () => void;
};

export default function LeadDetailDrawer({ id, onClose }: LeadDetailProps) {
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    fetch(`/api/leads/${id}`)
      .then((r) => r.json())
      .then((j) => {
        if (!mounted) return;
        if (!j.ok) {
          setError(j.error || "Failed to load lead");
        } else {
          setLead(j.data);
        }
      })
      .catch((e) => setError(e.message || String(e)))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!id) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} aria-hidden="true" />
      <aside className="w-full max-w-md bg-bg-surface border-l border-border-subtle p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-text-primary">Lead details</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-text-tertiary hover:bg-bg-elevated"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="mt-6 text-text-secondary">Loading…</div>
        ) : error ? (
          <div className="mt-6 text-error">{error}</div>
        ) : lead ? (
          <div className="mt-4 space-y-4 text-sm text-text-secondary">
            <div>
              <div className="text-xs text-text-tertiary">Name</div>
              <div className="text-text-primary">{String(lead["name"] ?? "—")}</div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary">Email</div>
              <div className="text-text-primary">{String(lead["email"] ?? "—")}</div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary">Company</div>
              <div className="text-text-primary">{String(lead["company"] ?? "—")}</div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary">Industry</div>
              <div className="text-text-primary">{String(lead["industry"] ?? "—")}</div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary">Status</div>
              <div className="text-text-primary">{String(lead["status"] ?? "—")}</div>
            </div>

            {lead.qualification_data ? (
              <div>
                <div className="text-xs text-text-tertiary">Qualification</div>
                <pre className="mt-2 max-h-40 overflow-auto bg-bg-elevated p-3 rounded text-xs text-text-secondary">{JSON.stringify(lead.qualification_data, null, 2)}</pre>
              </div>
            ) : null}

            <div className="pt-4">
              {(() => {
                const leadId = lead && (lead["id"] ? String(lead["id"]) : "");
                return (
                  <a
                    href={`/conversations?lead=${leadId}`}
                    className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-4 text-sm text-white"
                  >
                    View Conversations
                  </a>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="mt-6 text-text-secondary">No details available.</div>
        )}
      </aside>
    </div>
  );
}
