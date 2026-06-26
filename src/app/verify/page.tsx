"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, ArrowRight, AlertTriangle, RefreshCw } from "lucide-react";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

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
      const res = await fetch("/api/auth/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to confirm verification code.");
      }

      setMessage("Email address verified successfully. Redirecting to login...");
      setTimeout(() => {
        router.push("/login?verified=true");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please specify email address before resending.");
      return;
    }
    setError("");
    setMessage("");
    setResending(true);

    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend confirmation code.");
      }

      setMessage("A new confirmation code has been dispatched to your email.");
    } catch (err: any) {
      setError(err.message || "Failed to resend code.");
    } finally {
      setResending(false);
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
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Verification Code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            required
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input-field text-center font-mono tracking-widest text-lg"
            maxLength={6}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2.5 flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "Confirm Verification Code"}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      <div className="mt-5 flex items-center justify-between text-xs pt-4 border-t border-slate-900">
        <button
          onClick={handleResend}
          disabled={resending}
          className="text-slate-400 hover:text-slate-100 font-medium flex items-center gap-1.5 transition disabled:opacity-50"
        >
          <RefreshCw size={12} className={resending ? "animate-spin" : ""} />
          Resend code
        </button>
        <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium">
          Return to sign in
        </Link>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#020512] bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(30,58,138,0.2),rgba(255,255,255,0))] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/20 items-center justify-center text-blue-400 mb-4">
          <ShieldCheck size={24} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Verify email address
        </h2>
        <p className="mt-1.5 text-xs text-slate-400 mb-8">
          Enter the verification code sent by Cognito.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={
          <div className="panel-glass p-8 text-center text-slate-500 text-xs">
            Loading verification forms...
          </div>
        }>
          <VerifyForm />
        </Suspense>
      </div>
    </div>
  );
}
