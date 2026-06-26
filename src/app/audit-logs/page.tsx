"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  Server,
  CalendarDays,
  RotateCcw,
  Key,
  AlertTriangle,
} from "lucide-react";

interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  created_at: string;
}

const ACTION_COLORS: Record<string, string> = {
  CREATE: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  UPDATE: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  DELETE: "bg-rose-500/10 border-rose-500/20 text-rose-400",
  CHANGE: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  RESTORE: "bg-purple-500/10 border-purple-500/20 text-purple-400",
};

function getActionColor(action: string): string {
  for (const [key, val] of Object.entries(ACTION_COLORS)) {
    if (action.toUpperCase().includes(key)) return val;
  }
  return "bg-slate-500/10 border-slate-500/20 text-slate-400";
}

function getEntityIcon(entityType: string) {
  switch (entityType) {
    case "BackupTarget":
      return Server;
    case "BackupPolicy":
      return CalendarDays;
    case "RestoreJob":
      return RotateCcw;
    case "User":
      return User;
    default:
      return Key;
  }
}

export default function AuditLogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/audit-logs");
      if (res.status === 403) {
        setError("Access denied. Admin privileges required.");
        return;
      }
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch audit logs.");

      const data = await res.json();
      setLogs(data.auditLogs || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uniqueActions = Array.from(new Set(logs.map((l) => l.action)));

  const filteredLogs = logs.filter((log) => {
    const matchSearch =
      !searchTerm ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.entity_id && log.entity_id.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchAction = !filterAction || log.action === filterAction;

    return matchSearch && matchAction;
  });

  const totalPages = Math.ceil(filteredLogs.length / PAGE_SIZE);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
              <ShieldCheck size={20} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                System Audit Logs
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">
                Track all administrative actions across the platform.
              </p>
            </div>
          </div>
          <div className="badge-mono text-[10px] bg-purple-900/20 border-purple-800/30 text-purple-300 px-3 py-1">
            ADMIN ONLY
          </div>
        </div>

        {error && (
          <div className="panel-glass p-6 flex items-center gap-4">
            <AlertTriangle size={20} className="text-rose-400 shrink-0" />
            <div>
              <p className="text-rose-300 font-medium">{error}</p>
              <p className="text-slate-500 text-sm mt-1">
                Contact your administrator if you believe this is an error.
              </p>
            </div>
          </div>
        )}

        {!error && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  placeholder="Search by actor, action, entity..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="input-field pl-10"
                />
              </div>
              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <select
                  value={filterAction}
                  onChange={(e) => {
                    setFilterAction(e.target.value);
                    setPage(1);
                  }}
                  className="input-field pl-10 pr-8 min-w-[200px]"
                >
                  <option value="">All Actions</option>
                  {uniqueActions.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex justify-center p-12">
                <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="panel-glass p-12 text-center">
                <ShieldCheck size={32} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm">
                  No audit log entries found.
                </p>
              </div>
            ) : (
              <div className="panel-glass overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800/80 text-slate-400">
                        <th className="text-left px-4 py-3 font-medium text-[11px] uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-[11px] uppercase tracking-wider">
                          Actor
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-[11px] uppercase tracking-wider">
                          Action
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-[11px] uppercase tracking-wider">
                          Entity
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-[11px] uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {paginatedLogs.map((log) => {
                        const Icon = getEntityIcon(log.entity_type);
                        return (
                          <tr
                            key={log.id}
                            className="hover:bg-slate-900/30 transition-colors"
                          >
                            <td className="px-4 py-3 text-slate-400 font-mono text-xs whitespace-nowrap">
                              {new Date(log.created_at).toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-mono text-xs text-slate-300 truncate block max-w-[120px]" title={log.actor}>
                                {log.actor === "system"
                                  ? "SYSTEM"
                                  : `${log.actor.substring(0, 8)}...`}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`badge-mono text-[9px] ${getActionColor(
                                  log.action
                                )}`}
                              >
                                {log.action}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Icon
                                  size={14}
                                  className="text-slate-500 shrink-0"
                                />
                                <div>
                                  <p className="text-xs text-slate-300">
                                    {log.entity_type}
                                  </p>
                                  {log.entity_id && (
                                    <p className="text-[10px] font-mono text-slate-500 truncate max-w-[100px]" title={log.entity_id}>
                                      {log.entity_id.substring(0, 8)}...
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 max-w-[200px]">
                              <pre className="text-[10px] text-slate-500 font-mono truncate" title={JSON.stringify(log.details)}>
                                {JSON.stringify(log.details)}
                              </pre>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800/80">
                    <p className="text-xs text-slate-500 font-mono">
                      Showing {(page - 1) * PAGE_SIZE + 1}–
                      {Math.min(page * PAGE_SIZE, filteredLogs.length)} of{" "}
                      {filteredLogs.length}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="btn-secondary p-1.5 disabled:opacity-30"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <span className="text-xs font-mono text-slate-300 px-2">
                        {page} / {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages}
                        className="btn-secondary p-1.5 disabled:opacity-30"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
