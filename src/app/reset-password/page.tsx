"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ChevronRight, AlertTriangle, KeyRound } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setMessage("Password changed successfully. Redirecting to login page...");
      setTimeout(() => {
        router.push("/login?reset=true");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel-glass px-8 py-8">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-start gap-2.5">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg">
            {message}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Mail size={16} />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="code" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Confirmation Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <KeyRound size={16} />
            </div>
            <input
              id="code"
              name="code"
              type="text"
              required
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-field pl-10 font-mono tracking-widest"
              maxLength={6}
            />
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Lock size={16} />
            </div>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2.5 flex items-center justify-center gap-2"
          >
            {loading ? "Changing..." : "Establish New Password"}
            <ChevronRight size={16} />
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-xs">
        <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium">
          Return to sign in
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#020512] bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(30,58,138,0.2),rgba(255,255,255,0))] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/20 items-center justify-center text-blue-400 mb-4">
          <Lock size={24} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Establish new password
        </h2>
        <p className="mt-1.5 text-xs text-slate-400 mb-8">
          Enter confirmation code and configure your new login key.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={
          <div className="panel-glass p-8 text-center text-slate-500 text-xs">
            Loading password forms...
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
