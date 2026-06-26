"use client";

import React, { useEffect, useState } from "react";
import { Server, Plus, Trash2, ShieldCheck, AlertCircle, RefreshCw, X } from "lucide-react";
import { SUPPORTED_REGIONS } from "@/lib/regions";
import toast from "react-hot-toast";

interface Target {
  id: string;
  name: string;
  instance_id: string;
  volume_id: string;
  region: string;
  created_at: string;
}

export default function TargetsPage() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [instanceId, setInstanceId] = useState("");
  const [volumeId, setVolumeId] = useState("");
  const [region, setRegion] = useState(SUPPORTED_REGIONS[0].code);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Action feedback
  const [actionError, setActionError] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);



  const fetchTargets = async () => {
    try {
      const res = await fetch("/api/targets");
      if (res.ok) {
        const data = await res.json();
        setTargets(data.targets);
      }
    } catch (err) {
      console.error("Failed to load targets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/targets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          instance_id: instanceId,
          volume_id: volumeId,
          region,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register target.");
      }

      setFormSuccess("Target resource successfully validated & registered!");
      setName("");
      setInstanceId("");
      setVolumeId("");
      
      // Refresh list
      fetchTargets();
      
      // Close modal after 1.5s
      setTimeout(() => {
        setModalOpen(false);
        setFormSuccess("");
      }, 1500);

    } catch (err: any) {
      setFormError(err.message || "An error occurred during target registration.");
    } finally {
      setSubmitting(false);
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
      const res = await fetch(`/api/targets/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete target.");
      }

      setTargets((prev) => prev.filter((t) => t.id !== id));
      toast.success("Backup target deleted successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete target.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 font-mono text-xs gap-3">
        <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
        <span>FETCHING AWS TARGETS REGISTRY...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">EBS Backup Targets</h2>
          <p className="text-xs text-slate-400 mt-1">Register AWS EC2 instances and EBS volumes for automated scheduling snapshots.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary text-xs flex items-center gap-1.5 py-2 px-4 shadow-lg shadow-blue-500/10"
        >
          <Plus size={14} /> Add Backup Target
        </button>
      </div>

      {actionError && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-start gap-2.5">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Action Refused:</span> {actionError}
          </div>
        </div>
      )}

      {/* Targets Table */}
      {targets.length === 0 ? (
        <div className="panel-glass p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
          <Server size={32} className="opacity-40" />
          <span>No backup targets found. Click &quot;Add Backup Target&quot; to register your first volume.</span>
        </div>
      ) : (
        <div className="panel-glass overflow-x-auto">
          <table className="min-w-full text-left text-xs divide-y divide-slate-800/80">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-mono font-semibold">
              <tr>
                <th className="px-6 py-3.5">Target Name</th>
                <th className="px-6 py-3.5">Instance ID</th>
                <th className="px-6 py-3.5">Volume ID</th>
                <th className="px-6 py-3.5">AWS Region</th>
                <th className="px-6 py-3.5">Created At</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 bg-slate-900/10">
              {targets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/30 transition">
                  <td className="px-6 py-4 font-medium text-slate-200">{t.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-400">{t.instance_id}</td>
                  <td className="px-6 py-4 font-mono text-blue-400 font-medium">{t.volume_id}</td>
                  <td className="px-6 py-4 font-mono text-slate-400 uppercase">{t.region}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(t.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => triggerDelete(t.id)}
                      className="text-slate-500 hover:text-rose-400 transition p-1.5 hover:bg-slate-900 rounded-lg"
                      title="Delete Target"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Target Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0c112b] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-900 flex justify-between items-center">
              <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
                <Server size={16} className="text-blue-500" />
                Register Backup Target
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

              {formSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-start gap-2">
                  <ShieldCheck size={14} className="shrink-0 mt-0.5" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  Target Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Production Web Server Volume"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  AWS Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="input-field cursor-pointer"
                  disabled={submitting}
                >
                  {SUPPORTED_REGIONS.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.name} ({r.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  EC2 Instance ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="i-0abcd1234efgh5678"
                  value={instanceId}
                  onChange={(e) => setInstanceId(e.target.value)}
                  className="input-field font-mono"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  EBS Volume ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="vol-0987654321fedcba0"
                  value={volumeId}
                  onChange={(e) => setVolumeId(e.target.value)}
                  className="input-field font-mono"
                  disabled={submitting}
                />
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
                  {submitting ? "Validating EC2..." : "Verify & Register"}
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
                <h3 className="text-sm font-semibold text-slate-100">Delete Backup Target</h3>
                <p className="text-xs text-slate-400 mt-1">This action is irreversible. Are you sure you want to delete this target?</p>
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
