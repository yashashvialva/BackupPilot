"use client";

import React, { useEffect, useState, useRef } from "react";
import { RotateCcw, RefreshCw, CheckCircle2, XCircle, AlertCircle, HardDrive, Cpu, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Target {
  name: string;
  instance_id: string;
  volume_id: string;
  region: string;
}

interface Policy {
  name: string;
  target: Target;
}

interface Job {
  policy: Policy;
}

interface Snapshot {
  snapshot_id: string;
  size: number;
  job: Job;
}

interface RestoreJob {
  id: string;
  snapshot_id: string;
  status: "Pending" | "Running" | "Completed" | "Failed";
  started_at: string;
  completed_at: string | null;
  new_volume_id: string | null;
  snapshot: Snapshot;
}

export default function RestorePage() {
  const [restores, setRestores] = useState<RestoreJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRestores = async (isPoll = false) => {
    if (!isPoll) setRefreshing(true);
    try {
      const res = await fetch("/api/restore");
      if (res.ok) {
        const data = await res.json();
        setRestores(data.restoreJobs);

        // Check if there are active (non-terminal) jobs
        const hasActiveJobs = data.restoreJobs.some(
          (job: RestoreJob) => job.status === "Pending" || job.status === "Running"
        );

        if (hasActiveJobs) {
          // Trigger polling if not already active
          if (!pollingRef.current) {
            console.log("Active restore jobs detected. Initializing real-time polling...");
            pollingRef.current = setInterval(() => fetchRestores(true), 3000);
          }
        } else {
          // Clear polling if all jobs resolved
          if (pollingRef.current) {
            console.log("All restore operations finalized. Stopping polling.");
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }
      }
    } catch (err) {
      console.error("Failed to load restores list:", err);
    } finally {
      if (!isPoll) setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRestores();

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 font-mono text-xs gap-3">
        <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
        <span>CONNECTING TO RESTORE WORKERS...</span>
      </div>
    );
  }

  const isAnyJobActive = restores.some((r) => r.status === "Pending" || r.status === "Running");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Restore Operations</h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitor EBS Volume restoration logs. Newly created volumes are provisioned from selected snapshots.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAnyJobActive && (
            <span className="text-[10px] font-mono text-blue-400 animate-pulse bg-blue-900/10 border border-blue-900/30 px-2.5 py-1 rounded-md">
              POLLING WORKERS (3s)
            </span>
          )}
          <button
            onClick={() => fetchRestores(false)}
            disabled={refreshing}
            className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3"
          >
            <RefreshCw size={12} className={refreshing || isAnyJobActive ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Restore List */}
      {restores.length === 0 ? (
        <div className="panel-glass p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
          <RotateCcw size={32} className="opacity-40" />
          <span>No volume restores triggered yet. Navigate to the Snapshots page to start a restore.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {restores.map((r) => (
            <div
              key={r.id}
              className={`panel-glass p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 ${
                r.status === "Completed"
                  ? "border-l-emerald-500 bg-slate-900/40"
                  : r.status === "Failed"
                  ? "border-l-rose-500 bg-slate-900/10"
                  : "border-l-amber-500 bg-slate-900/20"
              }`}
            >
              {/* Left Column: Job Info */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-200 text-sm">
                    Restore Job: {r.id.substring(0, 8)}...
                  </span>
                  
                  <span className="badge-mono text-[9px] bg-slate-950 border-slate-900 text-slate-400">
                    Source: {r.snapshot_id}
                  </span>

                  <span
                    className={`badge-mono text-[9px] ${
                      r.status === "Completed"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : r.status === "Failed"
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-slate-500" />
                    <span>Target VM: {r.snapshot.job.policy.target.instance_id}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HardDrive size={12} className="text-slate-500" />
                    <span>Size: {r.snapshot.size} GB ({r.snapshot.job.policy.target.region})</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:col-span-2 md:col-span-1">
                    <span className="text-slate-500">POLICY:</span>
                    <span className="text-slate-300 truncate">{r.snapshot.job.policy.name}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Execution Output */}
              <div className="flex flex-col items-end gap-2 shrink-0 w-full md:w-auto text-xs">
                {r.new_volume_id ? (
                  <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-lg p-2 flex items-center gap-2 text-emerald-400 w-full md:w-auto font-mono text-[11px]">
                    <CheckCircle2 size={14} className="shrink-0" />
                    <span>New Volume: {r.new_volume_id}</span>
                  </div>
                ) : r.status === "Failed" ? (
                  <div className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-2 flex items-center gap-2 text-rose-400 w-full md:w-auto font-mono text-[11px]">
                    <XCircle size={14} className="shrink-0" />
                    <span>Restoration Aborted</span>
                  </div>
                ) : (
                  <div className="bg-slate-950/60 border border-slate-900 rounded-lg p-2 flex items-center gap-2 text-slate-400 w-full md:w-auto font-mono text-[11px]">
                    <RefreshCw size={12} className="animate-spin text-amber-500" />
                    <span>{r.status === "Pending" ? "Awaiting Worker..." : "EC2 Volume Creating..."}</span>
                  </div>
                )}

                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-4 mt-1">
                  <span>Start: {new Date(r.started_at).toLocaleTimeString()}</span>
                  {r.completed_at && <span>End: {new Date(r.completed_at).toLocaleTimeString()}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
