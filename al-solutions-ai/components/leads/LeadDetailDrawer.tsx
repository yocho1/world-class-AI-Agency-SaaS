"use client";
import React, { useEffect, useMemo, useState } from "react";

type LeadDetailProps = {
  id: string | null;
  onCloseAction: () => void;
};

type Lead = {
  id: string;
  name?: string | null;
  email?: string | null;
  company?: string | null;
  industry?: string | null;
  status?: string | null;
  budget_range?: string | null;
  timeline?: string | null;
  messages_sent?: number | null;
  chat_initiated?: boolean | null;
  source?: string | null;
  lead_captured_at?: string | null;
  qualification_data?: Record<string, unknown> | null;
  created_at?: string | null;
  updated_at?: string | null;
};

const PIPELINE_STAGES = [
  { key: "new", label: "New", color: "bg-blue-500" },
  { key: "contacted", label: "Contacted", color: "bg-amber-500" },
  { key: "qualified", label: "Qualified", color: "bg-emerald-500" },
  { key: "proposal", label: "Proposal", color: "bg-violet-500" },
  { key: "closed", label: "Closed", color: "bg-slate-500" },
] as const;

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return String(value);
  }
}

export default function LeadDetailDrawer({ id, onCloseAction }: LeadDetailProps) {
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    setSaveMsg("");
    fetch(`/api/leads/${id}`)
      .then((r) => r.json())
      .then((j) => {
        if (!mounted) return;
        if (!j.ok) {
          setError(j.error || "Failed to load lead");
        } else {
          const data = j.data as Lead;
          setLead(data);
          const qd = (data.qualification_data ?? {}) as Record<string, unknown>;
          setNotes(typeof qd.notes === "string" ? qd.notes : "");
          setFollowUpDate(typeof qd.followUpDate === "string" ? qd.followUpDate : "");
        }
      })
      .catch((e) => setError(e.message || String(e)))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  const timeline = useMemo(() => {
    const items: { label: string; date: string; highlight?: boolean }[] = [];
    if (!lead) return items;
    if (lead.created_at) items.push({ label: "Lead created", date: formatDate(lead.created_at) });
    if (lead.lead_captured_at) items.push({ label: "Lead captured", date: formatDate(lead.lead_captured_at) });
    if (lead.chat_initiated) items.push({ label: "Chat initiated", date: formatDate(lead.created_at) });
    if (lead.updated_at && lead.updated_at !== lead.created_at) items.push({ label: "Last updated", date: formatDate(lead.updated_at) });
    if (followUpDate) items.push({ label: "Follow-up scheduled", date: formatDate(followUpDate), highlight: true });
    return items;
  }, [lead, followUpDate]);

  async function updateLead(updates: Partial<Lead> & { notes?: string; followUpDate?: string }) {
    if (!id) return;
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Failed to save");
      setLead(j.data as Lead);
      setSaveMsg("Saved");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch (e: unknown) {
      setSaveMsg(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(newStatus: string) {
    await updateLead({ status: newStatus });
  }

  async function handleSaveNotes() {
    await updateLead({ notes, followUpDate });
  }

  if (!id) return null;

  const stageIndex = PIPELINE_STAGES.findIndex((s) => s.key === (lead?.status || "new"));

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onCloseAction} aria-hidden="true" />
      <aside className="flex w-full max-w-lg flex-col bg-bg-surface border-l border-border-subtle">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
          <div>
            <h3 className="text-lg font-medium text-text-primary">{lead?.name || lead?.email || "Lead details"}</h3>
            <p className="text-xs text-text-tertiary">{lead?.company || lead?.email || ""}</p>
          </div>
          <button
            type="button"
            onClick={onCloseAction}
            aria-label="Close"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-tertiary hover:bg-bg-elevated"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {loading ? (
            <div className="text-text-secondary">Loading…</div>
          ) : error ? (
            <div className="text-error">{error}</div>
          ) : lead ? (
            <>
              {/* Pipeline */}
              <section>
                <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-tertiary">Pipeline</h4>
                <div className="flex items-center gap-1">
                  {PIPELINE_STAGES.map((stage, idx) => {
                    const isCurrent = idx === stageIndex;
                    const isPast = idx < stageIndex;
                    return (
                      <button
                        key={stage.key}
                        type="button"
                        onClick={() => handleStatusChange(stage.key)}
                        className={`flex-1 rounded-md px-2 py-2 text-center text-xs font-medium transition-colors ${
                          isCurrent
                            ? `${stage.color} text-white`
                            : isPast
                            ? "bg-bg-elevated text-text-secondary"
                            : "bg-bg-elevated text-text-tertiary hover:text-text-secondary"
                        }`}
                        title={`Move to ${stage.label}`}
                      >
                        {stage.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Details grid */}
              <section>
                <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-tertiary">Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-text-tertiary">Email</div>
                    <div className="text-text-primary">{lead.email || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Company</div>
                    <div className="text-text-primary">{lead.company || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Industry</div>
                    <div className="text-text-primary">{lead.industry || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Budget</div>
                    <div className="text-text-primary">{lead.budget_range || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Timeline</div>
                    <div className="text-text-primary">{lead.timeline || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Source</div>
                    <div className="text-text-primary">{lead.source || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Messages sent</div>
                    <div className="text-text-primary">{lead.messages_sent ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Chat initiated</div>
                    <div className="text-text-primary">{lead.chat_initiated ? "Yes" : "No"}</div>
                  </div>
                </div>
              </section>

              {/* Notes & Follow-up */}
              <section>
                <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-tertiary">Notes & Follow-up</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="lead-notes" className="block text-xs text-text-tertiary mb-1">Notes</label>
                    <textarea
                      id="lead-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary"
                      placeholder="Add notes about this lead..."
                    />
                  </div>
                  <div>
                    <label htmlFor="follow-up" className="block text-xs text-text-tertiary mb-1">Follow-up date</label>
                    <input
                      id="follow-up"
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="h-11 w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 text-sm text-text-primary"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={saving}
                      className="inline-flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm text-white disabled:opacity-60"
                    >
                      {saving ? "Saving…" : "Save notes"}
                    </button>
                    {saveMsg ? (
                      <span className={`text-xs ${saveMsg === "Saved" ? "text-emerald-500" : "text-error"}`}>{saveMsg}</span>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* Activity Timeline */}
              <section>
                <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-tertiary">Activity</h4>
                {timeline.length === 0 ? (
                  <p className="text-sm text-text-tertiary">No activity recorded.</p>
                ) : (
                  <ul className="space-y-3">
                    {timeline.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`mt-1.5 inline-block h-2 w-2 rounded-full shrink-0 ${item.highlight ? "bg-accent-400" : "bg-border-default"}`} />
                        <div>
                          <p className="text-sm text-text-primary">{item.label}</p>
                          <p className="text-xs text-text-tertiary">{item.date}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Qualification data */}
              {lead.qualification_data && Object.keys(lead.qualification_data).length > 0 ? (
                <section>
                  <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-tertiary">Qualification data</h4>
                  <pre className="max-h-48 overflow-auto rounded-lg bg-bg-elevated p-3 text-xs text-text-secondary">
                    {JSON.stringify(lead.qualification_data, null, 2)}
                  </pre>
                </section>
              ) : null}

              {/* Actions */}
              <section className="flex flex-wrap gap-3">
                <a
                  href={`/conversations?lead=${lead.id}`}
                  className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-4 text-sm text-white"
                >
                  View Conversations
                </a>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(lead.email ?? "")}
                  className="inline-flex h-11 items-center rounded-lg border border-border-default bg-bg-surface px-4 text-sm text-text-primary"
                >
                  Copy email
                </button>
              </section>
            </>
          ) : (
            <div className="text-text-secondary">No details available.</div>
          )}
        </div>
      </aside>
    </div>
  );
}
