"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Server,
  CalendarDays,
  History,
  Camera,
  RotateCcw,
  BarChart3,
  FileClock,
  Bell,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  RefreshCw,
  Check,
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  hasAwsConnection?: boolean;
}

interface NotificationItem {
  id: string;
  type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  const bellRef = useRef<HTMLDivElement>(null);

  const isAuthPage =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Notifications fetch error:", err);
    }
  };

  const markAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setIsSigningOut(false);
    }
  };

  useEffect(() => {
    if (!isAuthPage) {
      fetchProfile();
      fetchNotifications();
      
      // Poll notifications every 30s
      const timer = setInterval(fetchNotifications, 30000);
      return () => clearInterval(timer);
    }
  }, [pathname, isAuthPage]);

  // Reset signing out state if pathname changes
  useEffect(() => {
    setIsSigningOut(false);
  }, [pathname]);

  // Enforce AWS Connection for logged in users
  useEffect(() => {
    if (!loadingProfile && profile && !isAuthPage && !profile.hasAwsConnection && pathname !== "/dashboard/connect") {
      router.push("/dashboard/connect");
    }
  }, [profile, loadingProfile, isAuthPage, pathname, router]);

  // Click outside listener for notifications dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setShowBellDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isAuthPage) {
    return <>{children}</>;
  }

  const unreadCount = notifications.filter((n) => n.status === "Sent").length;

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Backup Targets", href: "/targets", icon: Server },
    { name: "Backup Policies", href: "/policies", icon: CalendarDays },
    { name: "Backup History", href: "/history", icon: History },
    { name: "EBS Snapshots", href: "/snapshots", icon: Camera },
    { name: "Restore Jobs", href: "/restore", icon: RotateCcw },
    { name: "Reports & Metrics", href: "/reports", icon: BarChart3 },
  ];

  const adminLinks = [
    { name: "System Audit Logs", href: "/audit-logs", icon: ShieldCheck },
  ];

  const footerLinks = [
    { name: "My Profile", href: "/profile", icon: User },
    { name: "Default Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070b19] flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0c112b]/80 backdrop-blur-md border-r border-slate-900/60 p-4 shrink-0 text-slate-300">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 py-3 border-b border-slate-900/80 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            BP
          </div>
          <span className="font-semibold text-lg text-slate-100 tracking-tight">
            Backup<span className="text-blue-500">Pilot</span>
          </span>
          <span className="text-[9px] font-mono bg-blue-900/30 text-blue-400 border border-blue-800/40 rounded px-1.5 py-0.5 ml-auto">
            v1.0
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 px-3 mb-2">
            Operations
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition duration-150 ${
                  active
                    ? "bg-blue-600/10 border border-blue-500/20 text-blue-400 font-medium"
                    : "border border-transparent hover:bg-slate-900/40 hover:text-slate-100"
                }`}
              >
                <Icon size={16} />
                {link.name}
              </Link>
            );
          })}

          {/* Admin Section */}
          {profile?.role === "Admin" && (
            <div className="pt-6">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 px-3 mb-2">
                Administration
              </div>
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition duration-150 ${
                      active
                        ? "bg-purple-600/10 border border-purple-500/20 text-purple-400 font-medium"
                        : "border border-transparent hover:bg-slate-900/40 hover:text-slate-100"
                    }`}
                  >
                    <Icon size={16} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-900/80 pt-4 space-y-1">
          {footerLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition duration-150 ${
                  active
                    ? "bg-slate-800 text-slate-100"
                    : "hover:bg-slate-900/40 hover:text-slate-100"
                }`}
              >
                <Icon size={16} />
                {link.name}
              </Link>
            );
          })}

          {/* Profile Quick Info */}
          <div className="flex items-center gap-3 px-3 py-3 border-t border-slate-900/50 mt-3 rounded-lg bg-slate-950/40">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
              {profile?.name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate leading-tight">
                {profile?.name || "Loading..."}
              </p>
              <span className="badge-mono text-[8px] bg-slate-900 border-slate-800 text-slate-400 mt-0.5 inline-block">
                {profile?.role || "User"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-rose-400 transition"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-900/60 bg-[#0c112b]/60 backdrop-blur-md flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-slate-400 hover:text-slate-100"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-slate-200 font-semibold text-md font-mono hidden md:block">
              {pathname === "/dashboard"
                ? "DASHBOARD::STATUS"
                : `CLI::${pathname.replace("/", "").toUpperCase()}`}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Server connection indicator */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/60 border border-slate-900 px-3 py-1.5 rounded-lg text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 glow-active"></span>
              AWS_REGION: <span className="text-slate-200">{process.env.NEXT_PUBLIC_AWS_REGION || "ap-south-1"}</span>
            </div>

            {/* Notification bell dropdown */}
            <div className="relative" ref={bellRef}>
              <button
                onClick={() => {
                  setShowBellDropdown(!showBellDropdown);
                  fetchNotifications();
                }}
                className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-100 transition relative"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-[#030712]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showBellDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-3 border-b border-slate-900 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-200">
                      Notifications ({unreadCount} unread)
                    </span>
                    <Link
                      href="/notifications"
                      className="text-[10px] text-blue-500 hover:text-blue-400 font-medium"
                      onClick={() => setShowBellDropdown(false)}
                    >
                      View all
                    </Link>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-900">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-xs">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((noti) => (
                        <div
                          key={noti.id}
                          className={`p-3 text-xs transition ${
                            noti.status === "Sent"
                              ? "bg-blue-600/5 hover:bg-blue-600/10"
                              : "hover:bg-slate-900/30"
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span
                              className={`badge-mono text-[8px] ${
                                noti.type.includes("FAILED")
                                  ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              }`}
                            >
                              {noti.type}
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono">
                              {new Date(noti.created_at).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-slate-300 mb-1.5">{noti.message}</p>
                          {noti.status === "Sent" && (
                            <button
                              onClick={(e) => markAsRead(noti.id, e)}
                              className="text-[10px] text-blue-500 hover:text-blue-400 font-mono flex items-center gap-1.5 transition"
                            >
                              <Check size={10} /> Mark as read
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden">
          <div className="w-64 bg-[#0c112b] border-r border-slate-900 h-full p-4 flex flex-col text-slate-300">
            <div className="flex items-center justify-between px-2 py-3 border-b border-slate-900 mb-6">
              <span className="font-semibold text-lg text-slate-100">
                Backup<span className="text-blue-500">Pilot</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      active
                        ? "bg-blue-600/10 border border-blue-500/20 text-blue-400 font-medium"
                        : "hover:bg-slate-900/40 hover:text-slate-100"
                    }`}
                  >
                    <Icon size={16} />
                    {link.name}
                  </Link>
                );
              })}

              {profile?.role === "Admin" && (
                <div className="pt-6">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 px-3 mb-2">
                    Admin
                  </div>
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                    const active = pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                          active
                            ? "bg-purple-600/10 border border-purple-500/20 text-purple-400"
                            : "hover:bg-slate-900/40 hover:text-slate-100"
                        }`}
                      >
                        <Icon size={16} />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </nav>

            <div className="border-t border-slate-900/80 pt-4 space-y-1">
              {footerLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-slate-900/40"
                  >
                    <Icon size={16} />
                    {link.name}
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-slate-900/40 text-rose-400 w-full mt-3 border-t border-slate-900/50 pt-3"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {isSigningOut && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-4 animate-in fade-in">
          <img src="/coffecat.gif" alt="Signing out..." className="w-40 h-40 object-contain mb-2" />
          <span className="tracking-widest">TERMINATING SESSION...</span>
        </div>
      )}
    </div>
  );
}
