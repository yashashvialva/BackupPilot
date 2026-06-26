"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, Plus, Trash2, Edit2, Play, Pause, AlertCircle, RefreshCw, X, Server, Mail, ToggleLeft, ToggleRight } from "lucide-react";
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
  frequency: string;
  retention_days: number;
  email_alerts: boolean;
  status: "Active" | "Paused" | "Deleted";
  eventbridge_schedule_name: string;
  created_at: string;
  target: Target;
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [targetId, setTargetId] = useState("");
  const [frequency, setFrequency] = useState("rate(1 day)");
  const [customFrequency, setCustomFrequency] = useState("");
  const [isCustomFreq, setIsCustomFreq] = useState(false);
  const [retentionDays, setRetentionDays] = useState(7);
  const [emailAlerts, setEmailAlerts] = useState(true);
  
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const presetFrequencies = [
    { label: "Every 12 Hours", value: "rate(12 hours)" },
    { label: "Daily (Once a day)", value: "rate(1 day)" },
    { label: "Weekly (Every Sunday)", value: "cron(0 0 ? * 1 *)" },
    { label: "Custom Rate / Cron", value: "custom" },
  ];

  const fetchPoliciesAndTargets = async () => {
    try {
      const [polRes, tarRes] = await Promise.all([
        fetch("/api/policies"),
        fetch("/api/targets"),
      ]);

      if (polRes.ok && tarRes.ok) {
        const polData = await polRes.json();
        const tarData = await tarRes.json();

        // Filter out Deleted policies
        setPolicies(polData.policies.filter((p: Policy) => p.status !== "Deleted"));
        setTargets(tarData.targets);
        
        // Auto select first target if available
        if (tarData.targets.length > 0) {
          setTargetId(tarData.targets[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load policy resources:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoliciesAndTargets();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const finalFrequency = isCustomFreq ? customFrequency : frequency;

    if (!finalFrequency) {
      setFormError("Scheduling frequency expression is required.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_id: targetId,
          name,
          frequency: finalFrequency,
          retention_days: retentionDays,
          email_alerts: emailAlerts,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create policy.");
      }

      setName("");
      setCustomFrequency("");
      setIsCustomFreq(false);
      setRetentionDays(7);
      setEmailAlerts(true);
      setModalOpen(false);

      fetchPoliciesAndTargets();
    } catch (err: any) {
      setFormError(err.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setActionError("");
    const newStatus = currentStatus === "Active" ? "Paused" : "Active";

    try {
      const res = await fetch(`/api/policies/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to toggle policy status.");
      }

      setPolicies(
        policies.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
      toast.success(`Policy ${newStatus === "Active" ? "resumed" : "paused"} successfully.`);
    } catch (err: any) {
      toast.error(err.message || "Failed to change schedule state.");
    }
  };

  const triggerDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    setActionError("");

    try {
      const res = await fetch(`/api/policies/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete policy.");
      }

      setPolicies((prev) => prev.filter((p) => p.id !== id));
      toast.success("Backup policy deleted successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete policy.");
    }
  };

  const handleExecute = async (id: string) => {
    setActionError("");
    setExecutingId(id);
    try {
      const res = await fetch(`/api/policies/${id}/execute`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to execute backup.");
      toast.success("Backup job triggered successfully! Check Backup History in a few moments.");
    } catch (err: any) {
      toast.error(err.message || "Failed to execute backup.");
    } finally {
      setExecutingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 font-mono text-xs gap-3">
        <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
        <span>CONVERGING EVENTBRIDGE CRONS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Backup Policies</h2>
          <p className="text-xs text-slate-400 mt-1">Configure automated backup execution frequencies, email alerts, and volume retention targets.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          disabled={targets.length === 0}
          className="btn-primary text-xs flex items-center gap-1.5 py-2 px-4 shadow-lg shadow-blue-500/10 disabled:opacity-50"
        >
          <Plus size={14} /> Create Backup Policy
        </button>
      </div>

      {actionError && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-start gap-2.5">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Schedule State Error:</span> {actionError}
          </div>
        </div>
      )}

      {targets.length === 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-xl">
          <span className="font-semibold">No backup targets registered.</span> Please register at least one backup target volume under the{" "}
          <Link href="/targets" className="underline font-medium hover:text-amber-300">
            Backup Targets
          </Link>{" "}
          page before constructing policies.
        </div>
      )}

      {/* Policies Grid Layout */}
      {policies.length === 0 ? (
        <div className="panel-glass p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
          <CalendarDays size={32} className="opacity-40" />
          <span>No backup policies active. Click &quot;Create Backup Policy&quot; to establish an EventBridge schedule.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((p) => (
            <div
              key={p.id}
              className={`panel-glass p-5 flex flex-col justify-between border-t-2 relative ${
                p.status === "Active"
                  ? "border-t-emerald-500/80 bg-slate-900/40"
                  : "border-t-slate-700/80 bg-slate-900/10"
              }`}
            >
              {/* Top Row: Name and Status Toggle */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-slate-200 text-sm leading-snug">{p.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 font-mono text-[9px] text-slate-500">
                    <Server size={10} />
                    <span>Target: {p.target.name} ({p.target.volume_id})</span>
                  </div>
                </div>

                {/* Status Toggle Badge */}
                <button
                  onClick={() => handleToggleStatus(p.id, p.status)}
                  className="flex items-center gap-1 bg-slate-950/60 border border-slate-900 rounded px-1.5 py-0.5 font-mono text-[9px] hover:border-slate-800 transition shrink-0"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      p.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-500"
                    }`}
                  ></span>
                  <span className="text-slate-400 font-bold uppercase">{p.status}</span>
                </button>
              </div>

              {/* Specs Section */}
              <div className="my-6 grid grid-cols-2 gap-4 border-y border-slate-900/60 py-3.5 text-slate-400">
                <div>
                  <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-500">Frequency</span>
                  <span className="text-[11px] font-mono text-slate-300 font-medium truncate block mt-0.5">
                    {p.frequency}
                  </span>
                </div>
                <div>
                  <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-500">Retention</span>
                  <span className="text-[11px] text-slate-300 font-medium block mt-0.5">
                    {p.retention_days} Days
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5">
                  <Mail size={12} className={p.email_alerts ? "text-blue-400" : "text-slate-600"} />
                  <span className="text-[10px]">
                    {p.email_alerts ? "Email alerts enabled (SNS)" : "Email alerts disabled"}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Actions */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-[9px] text-slate-500 font-mono uppercase">
                  Schedule: {p.eventbridge_schedule_name}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExecute(p.id)}
                    disabled={executingId === p.id}
                    className="text-slate-400 hover:text-blue-400 transition"
                    title="Run Backup Now"
                  >
                    {executingId === p.id ? <RefreshCw size={15} className="animate-spin" /> : <Play size={15} />}
                  </button>

                  {/* Status Toggle Switch Icon */}
                  <button
                    onClick={() => handleToggleStatus(p.id, p.status)}
                    className="text-slate-400 hover:text-slate-100 transition"
                    title={p.status === "Active" ? "Pause Schedule" : "Resume Schedule"}
                  >
                    {p.status === "Active" ? <ToggleRight size={22} className="text-blue-500" /> : <ToggleLeft size={22} />}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => triggerDelete(p.id)}
                    className="text-slate-500 hover:text-rose-400 transition p-1 rounded hover:bg-slate-900"
                    title="Delete Policy"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Policy Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0c112b] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-900 flex justify-between items-center">
              <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
                <CalendarDays size={16} className="text-blue-500" />
                Create Backup Policy
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-start gap-2">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  Policy Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Daily Production Volume Backup"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  Linked Backup Target
                </label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  className="input-field cursor-pointer"
                  disabled={submitting}
                >
                  {targets.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.volume_id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                    Retention Days
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={365}
                    value={retentionDays}
                    onChange={(e) => setRetentionDays(parseInt(e.target.value))}
                    className="input-field font-mono"
                    disabled={submitting}
                  />
                </div>

                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded bg-slate-950 border-slate-800"
                      disabled={submitting}
                    />
                    <span>SNS Email Alerts</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  Scheduling Frequency
                </label>
                {!isCustomFreq ? (
                  <select
                    value={frequency}
                    onChange={(e) => {
                      if (e.target.value === "custom") {
                        setIsCustomFreq(true);
                      } else {
                        setFrequency(e.target.value);
                      }
                    }}
                    className="input-field cursor-pointer"
                    disabled={submitting}
                  >
                    {presetFrequencies.map((f) => (
                      <option key={f.label} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="rate(6 hours) or cron(0 12 * * ? *)"
                        value={customFrequency}
                        onChange={(e) => setCustomFrequency(e.target.value)}
                        className="input-field font-mono"
                        disabled={submitting}
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomFreq(false)}
                        className="absolute right-2 top-2 text-[10px] text-slate-500 hover:text-slate-300 font-mono underline"
                      >
                        Presets
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-500 font-mono leading-tight">
                      Use AWS ScheduleExpressions: rate(value unit) or cron(fields).
                    </p>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-900 flex justify-end gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary py-2"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 flex items-center gap-1.5"
                  disabled={submitting}
                >
                  {submitting && <RefreshCw size={12} className="animate-spin" />}
                  {submitting ? "Syncing AWS..." : "Create Schedule"}
                </button>
              </div>
            </form>
          </div>
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
                <h3 className="text-sm font-semibold text-slate-100">Delete Backup Policy</h3>
                <p className="text-xs text-slate-400 mt-1">This action cannot be undone. The EventBridge Scheduler will also be removed.</p>
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
