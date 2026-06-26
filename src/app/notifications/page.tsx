"use client";

import React, { useEffect, useState } from "react";
import { Bell, Check, CheckSquare, RefreshCw, AlertCircle, Calendar } from "lucide-react";

interface NotificationItem {
  id: string;
  type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Failed to load notifications list:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: "POST",
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, status: "Read" } : n))
        );
      }
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter((n) => n.status === "Sent");
    if (unread.length === 0) return;

    try {
      await Promise.all(
        unread.map((n) =>
          fetch(`/api/notifications/${n.id}/read`, {
            method: "POST",
          })
        )
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, status: "Read" })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 font-mono text-xs gap-3">
        <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
        <span>PULLING NOTIFICATIONS LOGS...</span>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => n.status === "Sent").length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">System Alerts & Notifications</h2>
          <p className="text-xs text-slate-400 mt-1">Review triggered SNS events, worker backup outcomes, and volume restoration confirmations.</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-4 bg-slate-950 hover:bg-slate-900 border-slate-800"
            >
              <CheckSquare size={14} className="text-blue-400" />
              Mark all read
            </button>
          )}
          <button
            onClick={() => fetchNotifications()}
            disabled={refreshing}
            className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3"
          >
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="panel-glass p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
          <Bell size={32} className="opacity-40" />
          <span>No alert messages logged in your profile.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((noti) => (
            <div
              key={noti.id}
              className={`panel-glass p-4 flex justify-between items-start gap-4 transition border ${
                noti.status === "Sent"
                  ? "border-blue-900/40 bg-blue-950/5"
                  : "border-slate-800 bg-slate-900/10"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`badge-mono text-[9px] ${
                      noti.type.includes("FAILED")
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {noti.type}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(noti.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed">{noti.message}</p>
              </div>

              {noti.status === "Sent" && (
                <button
                  onClick={() => handleMarkAsRead(noti.id)}
                  className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1 bg-slate-950 border border-slate-900 text-blue-400 hover:border-blue-500 shrink-0"
                  title="Mark as Read"
                >
                  <Check size={12} /> Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
