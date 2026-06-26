"use client";

import React, { useEffect, useState } from "react";
import { Camera, RotateCcw, ShieldCheck, AlertCircle, RefreshCw, X, HardDrive, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";

interface Target {
  id: string;
  name: string;
  instance_id: string;
  volume_id: string;
  region: string;
}

interface Policy {
  id: string;
  name: string;
  target: Target;
}

interface Job {
  id: string;
  policy: Policy;
}

interface Snapshot {
  snapshot_id: string;
  size: number;
  state: string;
  created_at: string;
  job: Job;
}

export default function SnapshotsPage() {
  const router = useRouter();
  
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);

  // Restore Form State
  const [attachToInstance, setAttachToInstance] = useState(true);
  const [submittingRestore, setSubmittingRestore] = useState(false);
  const [restoreError, setRestoreError] = useState("");

  const fetchSnapshots = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/snapshots");
      if (res.ok) {
        const data = await res.json();
        setSnapshots(data.snapshots);
      }
    } catch (err) {
      console.error("Failed to fetch snapshots list:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSnapshots();
  }, []);

  const openRestoreModal = (snap: Snapshot) => {
    setSelectedSnapshot(snap);
    setRestoreError("");
    setAttachToInstance(true);
    setRestoreModalOpen(true);
  };

  const handleRestoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSnapshot) return;

    setRestoreError("");
    setSubmittingRestore(true);

    try {
      const res = await fetch("/api/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          snapshot_id: selectedSnapshot.snapshot_id,
          attach_to_instance: attachToInstance,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to trigger volume restoration.");
      }

      setRestoreModalOpen(false);
      // Redirect to restore jobs page to poll results
      router.push("/restore");
    } catch (err: any) {
      setRestoreError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmittingRestore(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 font-mono text-xs gap-3">
        <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
        <span>INSPECTING AWS EBS SNAPSHOTS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">EBS Snapshots</h2>
          <p className="text-xs text-slate-400 mt-1">Review active, completed snapshots in your cloud accounts and trigger volume restorations.</p>
        </div>
        <button
          onClick={fetchSnapshots}
          disabled={refreshing}
          className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3"
        >
          <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Snapshots Table */}
      {snapshots.length === 0 ? (
        <div className="panel-glass p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
          <Camera size={32} className="opacity-40" />
          <span>No EBS snapshots found. Run active backup schedules to record snap-points.</span>
        </div>
      ) : (
        <div className="panel-glass overflow-x-auto">
          <table className="min-w-full text-left text-xs divide-y divide-slate-800/80">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-mono font-semibold">
              <tr>
                <th className="px-6 py-3.5">Snapshot ID</th>
                <th className="px-6 py-3.5">Source Policy</th>
                <th className="px-6 py-3.5">Original Volume</th>
                <th className="px-6 py-3.5">Size (GB)</th>
                <th className="px-6 py-3.5">Created At</th>
                <th className="px-6 py-3.5">AWS Region</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 bg-slate-900/10">
              {snapshots.map((s) => (
                <tr key={s.snapshot_id} className="hover:bg-slate-900/30 transition">
                  <td className="px-6 py-4 font-mono font-semibold text-blue-400">
                    {s.snapshot_id}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">{s.job.policy.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-400">
                    {s.job.policy.target.volume_id}
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-slate-300">{s.size} GB</td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(s.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400 uppercase">
                    {s.job.policy.target.region}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openRestoreModal(s)}
                      className="btn-secondary text-[11px] py-1.5 px-3 flex items-center gap-1 bg-slate-950 hover:bg-slate-900 border-slate-800 inline-flex"
                    >
                      <RotateCcw size={12} className="text-blue-400" />
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Restore Volume Confirmation Modal */}
      {restoreModalOpen && selectedSnapshot && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0c112b] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-900 flex justify-between items-center">
              <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
                <RotateCcw size={16} className="text-blue-500" />
                Initialize EBS Volume Restore
              </h3>
              <button
                onClick={() => setRestoreModalOpen(false)}
                className="text-slate-500 hover:text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleRestoreSubmit} className="p-6 space-y-4">
              {restoreError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-start gap-2">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{restoreError}</span>
                </div>
              )}

              {/* Warning Alert */}
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 text-amber-400 text-xs rounded-xl flex items-start gap-2.5">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">AWS Restorations Alert:</span> This triggers the Restore Lambda Worker to provision a new EBS Volume from snapshot <span className="font-mono text-slate-200">{selectedSnapshot.snapshot_id}</span> inside AWS.
                </div>
              </div>

              {/* Specs card */}
              <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">SOURCE SNAPSHOT:</span>
                  <span className="font-mono text-blue-400 font-bold">{selectedSnapshot.snapshot_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">PROVISION SIZE:</span>
                  <span className="font-mono text-slate-300">{selectedSnapshot.size} GB (gp3)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">AWS REGION:</span>
                  <span className="font-mono uppercase text-slate-300">{selectedSnapshot.job.policy.target.region}</span>
                </div>
              </div>

              {/* Attach Toggle checkbox */}
              <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={attachToInstance}
                    onChange={(e) => setAttachToInstance(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-blue-600 rounded bg-slate-950 border-slate-800"
                    disabled={submittingRestore}
                  />
                  <div>
                    <span className="block text-xs font-semibold text-slate-200">
                      Auto-Attach to Host Instance
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5 leading-tight">
                      When completed, attach this new volume to instance{" "}
                      <span className="font-mono text-slate-300">
                        {selectedSnapshot.job.policy.target.instance_id}
                      </span>{" "}
                      at <span className="font-mono text-slate-300">/dev/sdf</span>.
                    </span>
                  </div>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-900 flex justify-end gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setRestoreModalOpen(false)}
                  className="btn-secondary py-2"
                  disabled={submittingRestore}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 flex items-center gap-1.5"
                  disabled={submittingRestore}
                >
                  {submittingRestore && <RefreshCw size={12} className="animate-spin" />}
                  {submittingRestore ? "Deploying Volume..." : "Deploy Volume Restore"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
