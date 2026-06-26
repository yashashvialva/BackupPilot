"use client";

import React, { useEffect, useState } from "react";
import { History, Download, RefreshCw, AlertCircle, PlayCircle, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Target {
  id: string;
  name: string;
  volume_id: string;
}

interface Policy {
  id: string;
  name: string;
  target: Target;
}

interface Job {
  id: string;
  started_at: string;
  completed_at: string | null;
  status: "Running" | "Success" | "Failed";
  error_message: string | null;
  policy: Policy;
}

export default function HistoryPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingJobs, setDeletingJobs] = useState<Set<string>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filters & Pagination State
  const [policyId, setPolicyId] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchFilters = async () => {
    try {
      const res = await fetch("/api/policies");
      if (res.ok) {
        const data = await res.json();
        setPolicies(data.policies);
      }
    } catch (err) {
      console.error("Failed to load policies for filtering:", err);
    }
  };

  const fetchJobs = async () => {
    try {
      setRefreshing(true);
      let url = `/api/jobs?page=${page}&pageSize=${pageSize}`;
      if (policyId) url += `&policyId=${policyId}`;
      if (status) url += `&status=${status}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs);
        setTotalPages(data.pagination.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to load jobs list:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [page, policyId, status]);

  const handleExport = () => {
    window.open(`/api/reports?type=success-rate&format=csv`, "_blank");
  };

  const triggerDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);

    setDeletingJobs((prev) => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
        toast.success("Job record deleted.");
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to delete job.");
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
      toast.error("An error occurred while deleting the job.");
    } finally {
      setDeletingJobs((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const resetFilters = () => {
    setPolicyId("");
    setStatus("");
    setPage(1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 font-mono text-xs gap-3">
        <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
        <span>PARSING JOBS HISTOGRAM...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Execution History</h2>
          <p className="text-xs text-slate-400 mt-1">Audit execution records for all background EBS snapshot worker actions.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-4"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={fetchJobs}
            disabled={refreshing}
            className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3"
          >
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="panel-glass p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-xs">
        <div>
          <label className="block text-[9px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
            Filter Policy
          </label>
          <select
            value={policyId}
            onChange={(e) => {
              setPolicyId(e.target.value);
              setPage(1);
            }}
            className="input-field cursor-pointer text-xs"
          >
            <option value="">All Policies</option>
            {policies.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[9px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
            Filter Status
          </label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="input-field cursor-pointer text-xs"
          >
            <option value="">All Statuses</option>
            <option value="Running">Running</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div>
          <button
            onClick={resetFilters}
            className="w-full btn-secondary text-xs py-2 bg-slate-950 hover:bg-slate-900 border-slate-900"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      {jobs.length === 0 ? (
        <div className="panel-glass p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
          <History size={32} className="opacity-40" />
          <span>No backup job history matched. Execute active policies to populate logs.</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="panel-glass overflow-x-auto">
            <table className="min-w-full text-left text-xs divide-y divide-slate-800/80">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-mono font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Job ID</th>
                  <th className="px-6 py-3.5">Backup Policy</th>
                  <th className="px-6 py-3.5">Target Resource</th>
                  <th className="px-6 py-3.5">Started At</th>
                  <th className="px-6 py-3.5">Completed At</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Details</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 bg-slate-900/10">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-900/30 transition">
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                      {j.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-200">{j.policy.name}</td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="font-mono text-blue-400">{j.policy.target.volume_id}</span>
                      <span className="text-[10px] text-slate-500 ml-1.5">({j.policy.target.name})</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(j.started_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      {j.completed_at ? new Date(j.completed_at).toLocaleString() : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
                          j.status === "Success"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : j.status === "Failed"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {j.status === "Success" && <CheckCircle2 size={10} />}
                        {j.status === "Failed" && <XCircle size={10} />}
                        {j.status === "Running" && <RefreshCw size={10} className="animate-spin" />}
                        {j.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-500 text-[11px]">
                      {j.error_message ? (
                        <span className="text-rose-400/90 font-mono text-[10px]" title={j.error_message}>
                          ERR: {j.error_message}
                        </span>
                      ) : j.status === "Success" ? (
                        <span className="text-slate-400 font-mono">Snapshot Created</span>
                      ) : (
                        <span className="text-slate-600 italic">Executing AWS action...</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => triggerDelete(j.id)}
                        disabled={deletingJobs.has(j.id)}
                        className="text-slate-500 hover:text-rose-400 disabled:opacity-50 transition p-1 rounded hover:bg-rose-500/10"
                        title="Delete Job Record"
                      >
                        {deletingJobs.has(j.id) ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-2">
              <span>
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-secondary py-1 px-3 flex items-center gap-1 disabled:opacity-30"
                >
                  <ChevronLeft size={14} /> Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-secondary py-1 px-3 flex items-center gap-1 disabled:opacity-30"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-xl w-full max-w-sm p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">Delete Job Record</h3>
                <p className="text-xs text-slate-400 mt-1">This action cannot be undone. Are you sure you want to delete this log?</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setConfirmDeleteId(null)} className="btn-secondary px-4 py-2 text-xs">
                Cancel
              </button>
              <button onClick={executeDelete} className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-4 py-2 text-xs rounded transition shadow shadow-rose-500/20 border border-rose-600/50">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
