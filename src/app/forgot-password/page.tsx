"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HelpCircle, Mail, ChevronRight, AlertTriangle } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to trigger password reset.");
      }

      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020512] bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(30,58,138,0.2),rgba(255,255,255,0))] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/20 items-center justify-center text-blue-400 mb-4">
          <HelpCircle size={24} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Reset password
        </h2>
        <p className="mt-1.5 text-xs text-slate-400 mb-8">
          Enter email address to receive verification code.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="panel-glass px-8 py-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-start gap-2.5">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
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
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-2.5 flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Request Reset Code"}
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
      </div>
    </div>
  );
}
