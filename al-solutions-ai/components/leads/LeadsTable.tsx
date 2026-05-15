"use client";
import React, { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";
import type {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";

const LeadDetailDrawer = dynamic(() => import("./LeadDetailDrawer"), { ssr: false });

type Lead = {
  id: string;
  name?: string | null;
  email?: string | null;
  company?: string | null;
  industry?: string | null;
  status?: string | null;
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

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [pipelineCounts, setPipelineCounts] = useState<Record<string, number>>({});

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (search) params.set("search", search);
      if (status) params.set("status", status);

      const res = await fetch(`/api/leads?${params.toString()}`);
      const json = await res.json();
      if (!json.ok) throw new Error((json && (json.error as string)) || "Failed to fetch");
      setLeads(json.data || []);
      setTotal(json.count || 0);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status]);

  const fetchPipelineCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/leads?limit=1");
      const json = await res.json();
      if (!json.ok) return;
      // Fetch counts per status via separate queries
      const counts: Record<string, number> = {};
      await Promise.all(
        PIPELINE_STAGES.map(async (stage) => {
          const r = await fetch(`/api/leads?status=${stage.key}&limit=1`);
          const j = await r.json();
          counts[stage.key] = j.count ?? 0;
        })
      );
      setPipelineCounts(counts);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    void fetchLeads();
    void fetchPipelineCounts();

    const supabase = createSupabaseBrowserClient();

    const leadChannel = supabase
      .channel("public:leads")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload: RealtimePostgresInsertPayload<Lead>) => {
          setLeads((prev) => [payload.new, ...prev]);
          setTotal((t) => t + 1);
          void fetchPipelineCounts();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "leads" },
        (payload: RealtimePostgresUpdatePayload<Lead>) => {
          setLeads((prev) => prev.map((l) => (l.id === payload.new.id ? payload.new : l)));
          void fetchPipelineCounts();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "leads" },
        (payload: RealtimePostgresDeletePayload<Lead>) => {
          setLeads((prev) => prev.filter((l) => l.id !== payload.old.id));
          setTotal((t) => Math.max(0, t - 1));
        }
      )
      .subscribe();

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      supabase.removeChannel(leadChannel);
    };
  }, [fetchLeads, fetchPipelineCounts]);

  async function changeStatus(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to update");
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || "Failed to update lead status");
    }
  }

  async function downloadCSV() {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      params.set("format", "csv");

      const res = await fetch(`/api/leads?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to generate CSV");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || "Failed to download CSV");
    }
  }

  return (
    <div className="space-y-4">
      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {PIPELINE_STAGES.map((stage) => {
          const count = pipelineCounts[stage.key] ?? 0;
          const isActive = status === stage.key;
          return (
            <button
              key={stage.key}
              type="button"
              onClick={() => setStatus(isActive ? "" : stage.key)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                isActive
                  ? "border-accent-400 bg-accent-400/10"
                  : "border-border-subtle bg-bg-surface hover:border-border-default"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${stage.color}`} />
                <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                  {stage.label}
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-text-primary">{count}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          aria-label="Search leads"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, company"
          className="h-11 w-full bg-bg-elevated border border-border-subtle rounded-2xl px-4 text-sm text-text-primary sm:max-w-md"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 w-full bg-bg-elevated border border-border-subtle rounded-2xl px-3 text-sm text-text-primary sm:w-auto"
        >
          <option value="">All statuses</option>
          {PIPELINE_STAGES.map((s) => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>

        <select
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
          className="h-11 w-full bg-bg-elevated border border-border-subtle rounded-2xl px-3 text-sm text-text-primary sm:w-auto"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>

        <button
          type="button"
          onClick={() => { setPage(1); fetchLeads(); }}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary-600 px-4 text-sm text-white sm:w-auto"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={downloadCSV}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-border-default bg-bg-surface px-3 text-sm text-text-primary sm:ml-auto sm:w-auto"
        >
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto bg-bg-surface border border-border-subtle rounded-lg">
        <table className="w-full min-w-[720px] table-auto">
          <thead>
            <tr className="text-left text-sm text-text-tertiary">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Industry</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-text-secondary">Loading…</td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-text-secondary">No leads found.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-t border-border-subtle">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-text-primary">{lead.name || lead.email || "—"}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{lead.email}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{lead.company || "—"}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{lead.industry || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status || "new"}
                      onChange={(e) => changeStatus(lead.id, e.target.value)}
                      className="h-11 min-w-[132px] bg-bg-elevated border border-border-subtle rounded px-3 text-sm"
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s.key} value={s.key}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-tertiary">{lead.created_at ? new Date(lead.created_at).toLocaleString() : "—"}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedLeadId(lead.id)}
                        className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-primary-400 hover:text-primary-600"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(`${lead.email ?? ""}`)}
                        className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-primary-400 hover:text-primary-600"
                      >
                        Copy
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 text-sm text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
        <div>
          Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="inline-flex h-11 items-center rounded bg-bg-elevated px-4"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={page * limit >= total}
            className="inline-flex h-11 items-center rounded bg-bg-elevated px-4"
          >
            Next
          </button>
        </div>
      </div>

      {error ? <div className="text-sm text-error">{error}</div> : null}
      {selectedLeadId ? (
        <LeadDetailDrawer id={selectedLeadId} onCloseAction={() => setSelectedLeadId(null)} />
      ) : null}
    </div>
  );
}
