import React from "react";
import Link from "next/link";
import { Shield, Zap, RefreshCw, BarChart3, ChevronRight, Server, Terminal, Lock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020512] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.25),rgba(255,255,255,0))] flex flex-col justify-between overflow-x-hidden">
      {/* Navbar */}
      <header className="max-w-7xl mx-auto w-full px-6 h-20 flex items-center justify-between border-b border-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
            BP
          </div>
          <span className="font-semibold text-lg text-slate-100 tracking-tight">
            Backup<span className="text-blue-500">Pilot</span>
          </span>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition">
            Sign In
          </Link>
          <Link href="/register" className="btn-primary text-xs py-2 px-4 shadow-lg shadow-blue-500/10">
            Deploy Free Console
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-20 text-center max-w-5xl mx-auto">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 bg-blue-950/40 border border-blue-900/60 rounded-full px-3 py-1 text-xs text-blue-400 font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          <span>Version 1.0 Release Available</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl">
          Automated EBS Backups & <br />
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Instant volume restores
          </span>{" "}
          for AWS.
        </h1>

        {/* Subhead */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          Manage backup targets, customize EventBridge retention schedules, monitor job state histories, and execute single-click block storage restorations.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20 justify-center w-full max-w-md">
          <Link href="/register" className="btn-primary py-3 px-6 text-sm flex items-center justify-center gap-2">
            Get Started <ChevronRight size={16} />
          </Link>
          <Link href="/login" className="btn-secondary py-3 px-6 text-sm flex items-center justify-center gap-2">
            Access Dashboard
          </Link>
        </div>

        {/* Dashboard Preview mockup */}
        <div className="w-full border border-slate-800 bg-slate-900/40 p-2 rounded-2xl shadow-2xl shadow-blue-950/20 backdrop-blur-sm max-w-4xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#020512] via-transparent to-transparent z-10 rounded-2xl pointer-events-none"></div>
          
          {/* Mock Window Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border border-slate-900/80 rounded-t-xl text-[10px] text-slate-500 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600/60"></span>
              <span className="ml-2 font-semibold">backup-pilot-console:~</span>
            </div>
            <span>AWS_CONNECTION::ACTIVE ([YOUR-REGION])</span>
          </div>

          {/* Mock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-950/80 border-x border-b border-slate-900/80 rounded-b-xl text-left">
            <div className="p-3 border border-slate-900 bg-slate-900/30 rounded-lg">
              <div className="text-[10px] uppercase font-mono text-slate-500">Active Policies</div>
              <div className="text-2xl font-bold font-mono mt-1 text-slate-100">08</div>
              <div className="text-[9px] font-mono text-emerald-400 mt-0.5">✔ EventBridge Synced</div>
            </div>
            <div className="p-3 border border-slate-900 bg-slate-900/30 rounded-lg">
              <div className="text-[10px] uppercase font-mono text-slate-500">Total Storage Managed</div>
              <div className="text-2xl font-bold font-mono mt-1 text-slate-100">1.48 TB</div>
              <div className="text-[9px] font-mono text-blue-400 mt-0.5">▲ +120 GB (this month)</div>
            </div>
            <div className="p-3 border border-slate-900 bg-slate-900/30 rounded-lg">
              <div className="text-[10px] uppercase font-mono text-slate-500">Restore Jobs (Status)</div>
              <div className="text-2xl font-bold font-mono mt-1 text-emerald-400">SUCCESS</div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">Last Restore: vol-0e786b...</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left mt-24">
          <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <Server size={18} />
            </div>
            <h3 className="font-semibold text-slate-100 text-sm mb-2">Target Management</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verify and register target EBS volumes and EC2 instances directly from specified AWS regions.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <Terminal size={18} />
            </div>
            <h3 className="font-semibold text-slate-100 text-sm mb-2">EventBridge Scheduling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Set schedules via AWS EventBridge Scheduler. Toggle policies between active and paused instantly.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <RefreshCw size={18} />
            </div>
            <h3 className="font-semibold text-slate-100 text-sm mb-2">EBS Volume Restore</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Execute restoration workers to create new EBS volumes from snap-points and attach them to target instances.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-900 bg-slate-900/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <BarChart3 size={18} />
            </div>
            <h3 className="font-semibold text-slate-100 text-sm mb-2">Analytics & Reports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download detailed PDF reports and CSV log audits.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-8 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <div>© 2026 BackupPilot. Under Least-Privilege IAM Guidelines.</div>
        <div className="flex gap-4">
          <span className="text-slate-600 hover:text-slate-400 transition cursor-pointer">AWS Partner Node</span>
          <span className="text-slate-600 hover:text-slate-400 transition cursor-pointer font-bold text-blue-500">Secure AES-256</span>
        </div>
      </footer>
    </div>
  );
}
