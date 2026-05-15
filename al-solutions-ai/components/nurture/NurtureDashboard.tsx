"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type SequenceEmail = {
  id: number;
  sendAfterDays: number;
  subject: string;
};

type Lead = {
  id: string;
  name?: string | null;
  email?: string | null;
  company?: string | null;
  status?: string | null;
  lead_captured_at?: string | null;
  created_at?: string | null;
  qualification_data?: Record<string, unknown> | null;
};

type SentEmail = { emailId: number; sentAt: string };

function daysSince(start: string | null | undefined): number {
  if (!start) return 0;
  const ms = Date.now() - new Date(start).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return String(value);
  }
}

export default function NurtureDashboard() {
  const [sequence, setSequence] = useState<SequenceEmail[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const [sendMsg, setSendMsg] = useState<Record<string, string>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [seqRes, leadsRes] = await Promise.all([
        fetch("/api/nurture"),
        fetch("/api/leads?limit=200&page=1"),
      ]);
      const seqJson = await seqRes.json();
      const leadsJson = await leadsRes.json();
      if (!seqJson.ok) throw new Error(seqJson.error || "Failed to fetch sequence");
      if (!leadsJson.ok) throw new Error(leadsJson.error || "Failed to fetch leads");
      setSequence(seqJson.sequence || []);
      setLeads(leadsJson.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const leadsWithEmail = useMemo(() => leads.filter((l) => l.email), [leads]);

  function getSentEmails(lead: Lead): SentEmail[] {
    const qd = lead.qualification_data || {};
    const arr = qd.sentNurtureEmails;
    return Array.isArray(arr) ? (arr as SentEmail[]) : [];
  }

  async function sendEmail(leadId: string, emailId: number) {
    const key = `${leadId}-${emailId}`;
    setSending((prev) => ({ ...prev, [key]: true }));
    setSendMsg((prev) => ({ ...prev, [key]: "" }));
    try {
      const res = await fetch("/api/nurture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, emailId }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Failed to send");
      setSendMsg((prev) => ({ ...prev, [key]: "Sent" }));
      void fetchData();
    } catch (err: unknown) {
      setSendMsg((prev) => ({ ...prev, [key]: err instanceof Error ? err.message : "Failed" }));
    } finally {
      setSending((prev) => ({ ...prev, [key]: false }));
    }
  }

  return (
    <div className="space-y-6">
      {/* Sequence overview */}
      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-tertiary">Sequence</h2>
        {sequence.length === 0 ? (
          <p className="text-sm text-text-secondary">No sequence configured.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sequence.map((email) => (
              <div key={email.id} className="rounded-xl border border-border-subtle bg-bg-surface p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {email.id}
                  </span>
                  <span className="text-xs font-medium uppercase text-text-tertiary">Day {email.sendAfterDays}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-text-primary">{email.subject}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Leads nurture status */}
      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-tertiary">Leads in nurture</h2>
        {loading ? (
          <p className="text-sm text-text-secondary">Loading…</p>
        ) : error ? (
          <p className="text-sm text-error">{error}</p>
        ) : leadsWithEmail.length === 0 ? (
          <p className="text-sm text-text-secondary">No leads with email addresses.</p>
        ) : (
          <div className="overflow-x-auto border border-border-subtle rounded-lg">
            <table className="w-full min-w-[720px] table-auto text-sm">
              <thead>
                <tr className="text-left text-text-tertiary">
                  <th className="px-4 py-3">Lead</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Days in nurture</th>
                  <th className="px-4 py-3">Emails sent</th>
                  <th className="px-4 py-3">Pending</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leadsWithEmail.map((lead) => {
                  const sent = getSentEmails(lead);
                  const sentIds = new Set(sent.map((s) => s.emailId));
                  const age = daysSince(lead.lead_captured_at || lead.created_at);
                  const pending = sequence.filter((e) => !sentIds.has(e.id) && age >= e.sendAfterDays);
                  return (
                    <tr key={lead.id} className="border-t border-border-subtle">
                      <td className="px-4 py-3">
                        <div className="font-medium text-text-primary">{lead.name || lead.email}</div>
                        <div className="text-xs text-text-tertiary">{lead.company || lead.email}</div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{lead.status || "new"}</td>
                      <td className="px-4 py-3 text-text-secondary">{age}</td>
                      <td className="px-4 py-3">
                        {sent.length === 0 ? (
                          <span className="text-text-tertiary">None</span>
                        ) : (
                          <ul className="space-y-1">
                            {sent.map((s, i) => (
                              <li key={i} className="text-xs text-text-secondary">
                                Email {s.emailId} · {formatDate(s.sentAt)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {pending.length === 0 ? (
                          <span className="text-xs text-emerald-500">Up to date</span>
                        ) : (
                          <ul className="space-y-1">
                            {pending.map((p) => (
                              <li key={p.id} className="text-xs text-amber-500">
                                Day {p.sendAfterDays}: {p.subject}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {sequence.map((email) => {
                            const key = `${lead.id}-${email.id}`;
                            const alreadySent = sentIds.has(email.id);
                            return (
                              <button
                                key={email.id}
                                type="button"
                                onClick={() => sendEmail(lead.id, email.id)}
                                disabled={sending[key] || alreadySent}
                                className={`inline-flex h-8 items-center rounded-md px-2 text-xs ${
                                  alreadySent
                                    ? "bg-bg-elevated text-text-tertiary"
                                    : "bg-primary-600 text-white hover:bg-primary-700"
                                } disabled:opacity-60`}
                                title={alreadySent ? "Already sent" : `Send email ${email.id}`}
                              >
                                {sending[key] ? "…" : alreadySent ? `Sent ${email.id}` : `Send ${email.id}`}
                              </button>
                            );
                          })}
                          {sendMsg[`${lead.id}`] ? (
                            <span className="text-xs text-text-tertiary">{sendMsg[`${lead.id}`]}</span>
                          ) : null}
                        </div>
                        {/* Inline status messages */}
                        <div className="mt-1 space-y-0.5">
                          {sequence.map((email) => {
                            const key = `${lead.id}-${email.id}`;
                            const msg = sendMsg[key];
                            if (!msg) return null;
                            return (
                              <p key={email.id} className={`text-xs ${msg === "Sent" ? "text-emerald-500" : "text-error"}`}>
                                Email {email.id}: {msg}
                              </p>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
