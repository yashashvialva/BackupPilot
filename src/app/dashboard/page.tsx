"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  AlertTriangle,
  HardDrive,
  RotateCcw,
  Server,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Camera,
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DashboardSummary {
  activePolicies: number;
  failedJobs: number;
  storageUsedGB: number;
  activeRestores: number;
  totalTargets: number;
  latestSnapshot: {
    snapshot_id: string;
    size: number;
    created_at: string;
    policy_name: string;
    target_name: string;
  } | null;
}

interface JobStat {
  date: string;
  success: number;
  failed: number;
  running: number;
  total: number;
}

interface StorageStat {
  date: string;
  added: number;
  total: number;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [jobStats, setJobStats] = useState<JobStat[]>([]);
  const [storageStats, setStorageStats] = useState<StorageStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [sumRes, chartRes] = await Promise.all([
        fetch("/api/dashboard/summary"),
        fetch("/api/dashboard/charts"),
      ]);

      if (sumRes.ok && chartRes.ok) {
        const sumData = await sumRes.json();
        const chartData = await chartRes.json();

        setSummary(sumData.summary);
        setJobStats(chartData.jobStats);
        setStorageStats(chartData.storageGrowth);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 font-mono text-xs gap-3">
        <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
        <span>CONNECTING TO AWS TELEMETRY NODE...</span>
      </div>
    );
  }

  const kpis = [
    {
      name: "Active Policies",
      value: summary?.activePolicies ?? 0,
      icon: CalendarDays,
      color: "text-blue-400",
      bg: "bg-blue-500/5 border-blue-500/10",
      desc: "EventBridge cron bindings",
      link: "/policies",
    },
    {
      name: "Backup Targets",
      value: summary?.totalTargets ?? 0,
      icon: Server,
      color: "text-cyan-400",
      bg: "bg-cyan-500/5 border-cyan-500/10",
      desc: "Validated EBS resources",
      link: "/targets",
    },
    {
      name: "Total Storage Managed",
      value: `${summary?.storageUsedGB ?? 0} GB`,
      icon: HardDrive,
      color: "text-emerald-400",
      bg: "bg-emerald-500/5 border-emerald-500/10",
      desc: "Aggregated snapshot sizes",
      link: "/snapshots",
    },
    {
      name: "Failed Jobs (All Time)",
      value: summary?.failedJobs ?? 0,
      icon: AlertTriangle,
      color: summary?.failedJobs && summary.failedJobs > 0 ? "text-rose-400" : "text-slate-400",
      bg: summary?.failedJobs && summary.failedJobs > 0 ? "bg-rose-500/5 border-rose-500/10" : "bg-slate-900/40 border-slate-800",
      desc: "Needs developer review",
      link: "/history",
    },
    {
      name: "Active Restores",
      value: summary?.activeRestores ?? 0,
      icon: RotateCcw,
      color: summary?.activeRestores && summary.activeRestores > 0 ? "text-amber-400" : "text-slate-400",
      bg: summary?.activeRestores && summary.activeRestores > 0 ? "bg-amber-500/5 border-amber-500/10" : "bg-slate-900/40 border-slate-800",
      desc: "Ongoing volume deployments",
      link: "/restore",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">System Telemetry Overview</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time status of EBS targets, scheduler cron tasks, and volume state controllers.</p>
        </div>
        <button
          onClick={fetchData}
          disabled={refreshing}
          className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3"
        >
          <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Syncing..." : "Sync AWS Metrics"}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.name}
              href={kpi.link}
              className={`p-4 rounded-xl border ${kpi.bg} transition hover:border-slate-700/80 hover:-translate-y-0.5 duration-200 block`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">{kpi.name}</span>
                <Icon size={16} className={kpi.color} />
              </div>
              <div className="text-2xl font-bold font-mono text-slate-100 mt-2">{kpi.value}</div>
              <div className="text-[9px] text-slate-400 mt-1 font-mono flex items-center gap-1">
                {kpi.desc} <ArrowUpRight size={10} className="opacity-40" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Latest Snapshot Banner */}
      {summary?.latestSnapshot && (
        <div className="panel-glass p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-900/30 bg-gradient-to-r from-blue-950/10 via-slate-900/40 to-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Camera size={18} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span>Latest Snapshot Recorded</span>
                <span className="badge-mono text-[8px] bg-slate-950 text-slate-400 border-slate-800 font-mono">
                  {summary.latestSnapshot.snapshot_id}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Policy: <span className="text-slate-300 font-medium">{summary.latestSnapshot.policy_name}</span> | Target:{" "}
                <span className="text-slate-300 font-medium">{summary.latestSnapshot.target_name}</span> | Size:{" "}
                <span className="font-mono text-blue-400 font-medium">{summary.latestSnapshot.size} GB</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-mono">
              Created: {new Date(summary.latestSnapshot.created_at).toLocaleString()}
            </span>
            <Link
              href={`/snapshots`}
              className="text-xs btn-primary py-1 px-3 flex items-center gap-1"
            >
              Restore Volume <RotateCcw size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Success Rate Chart */}
        <div className="panel-glass p-5">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-sm text-slate-200">Backup Execution History</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Daily job outcome telemetry in the past 7 days.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-900 rounded-md px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Success
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 ml-1.5"></span> Failed
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobStats} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", borderRadius: "8px" }}
                  labelStyle={{ color: "#94a3b8", fontSize: "10px", fontFamily: "monospace" }}
                  itemStyle={{ color: "#f8fafc", fontSize: "11px" }}
                />
                <Bar dataKey="success" name="Success" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" name="Failed" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Storage Growth Area Chart */}
        <div className="panel-glass p-5">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-sm text-slate-200">Snapshot Storage Growth</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Cumulative footprint in managed AWS accounts.</p>
            </div>
            <div className="text-[10px] font-mono text-blue-400 bg-blue-500/5 border border-blue-500/10 rounded-md px-2.5 py-1 flex items-center gap-1.5">
              <TrendingUp size={12} />
              <span>CUMULATIVE_GB</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={storageStats} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} unit=" GB" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", borderRadius: "8px" }}
                  labelStyle={{ color: "#94a3b8", fontSize: "10px", fontFamily: "monospace" }}
                  itemStyle={{ color: "#3b82f6", fontSize: "11px" }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total Storage"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorStorage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
