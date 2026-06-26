"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Cloud, CheckCircle, MapPin, Key, Hash, Server, ArrowRight, DownloadCloud, AlertCircle, ShieldCheck } from "lucide-react";
import { SUPPORTED_REGIONS } from "@/lib/regions";

export default function ConnectAWSPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    roleArn: "",
    secretArn: "",
    auroraEndpoint: "",
    region: "",
    accountId: "",
    stackName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/aws/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        window.location.href = "/dashboard"; // hard reload to update AppShell context
      } else {
        setError(data.error || "Failed to save connection.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/CloudFormation.yaml";
    link.download = "BackupPilot-Stack.yaml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2 font-mono flex items-center gap-3">
          <Cloud className="text-blue-500" size={32} />
          CONNECT_AWS_ACCOUNT
        </h1>
        <p className="text-slate-400">
          Deploy the BackupPilot infrastructure stack in your own AWS account to maintain full ownership of your data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Step 1: Deploy */}
        <div className="bg-[#0c112b] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <h2 className="text-xl font-bold text-slate-100 mb-4 font-mono">1. Deploy Infrastructure</h2>
          <p className="text-slate-400 text-sm mb-6">
            Download the CloudFormation template and deploy it in your AWS account. This will provision your private Aurora database, IAM roles, and backup workers.
          </p>

          <button
            onClick={handleDownloadTemplate}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition"
          >
            <DownloadCloud size={18} />
            Download CloudFormation Template
          </button>

          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-sm text-slate-300">
            <h3 className="font-semibold text-slate-200 mb-2">Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-400">
              <li>Log in to your AWS Console</li>
              <li>Navigate to CloudFormation</li>
              <li>Click &quot;Create Stack&quot; (With new resources)</li>
              <li>Upload the downloaded template</li>
              <li>Acknowledge IAM capabilities and create</li>
              <li>Wait for status to be <span className="text-emerald-400 font-mono">CREATE_COMPLETE</span></li>
              <li>Go to the &quot;Outputs&quot; tab</li>
            </ol>
          </div>
        </div>

        {/* Step 2: Configure */}
        <div className="bg-[#0c112b] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <h2 className="text-xl font-bold text-slate-100 mb-4 font-mono">2. Link Account</h2>
          <p className="text-slate-400 text-sm mb-6">
            Paste the values from the CloudFormation &quot;Outputs&quot; tab to connect BackupPilot to your infrastructure.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-2 text-rose-400 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">StackName</label>
              <div className="relative">
                <Hash className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input
                  type="text"
                  required
                  placeholder="e.g. BackupPilot-Production"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={form.stackName}
                  onChange={(e) => setForm({ ...form, stackName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">RoleArn</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input
                  type="text"
                  required
                  placeholder="arn:aws:iam::123456789:role/BackupPilotRole"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={form.roleArn}
                  onChange={(e) => setForm({ ...form, roleArn: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">SecretArn</label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input
                  type="text"
                  required
                  placeholder="arn:aws:secretsmanager:..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={form.secretArn}
                  onChange={(e) => setForm({ ...form, secretArn: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">AuroraEndpoint</label>
              <div className="relative">
                <Server className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input
                  type="text"
                  required
                  placeholder="database-1.cluster-xxx.region.rds.amazonaws.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={form.auroraEndpoint}
                  onChange={(e) => setForm({ ...form, auroraEndpoint: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Region</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-slate-500" size={16} />
                  <select
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer appearance-none"
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                  >
                    <option value="" disabled>Select a Region</option>
                    {SUPPORTED_REGIONS.map((r) => (
                      <option key={r.code} value={r.code}>
                        {r.name} ({r.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">AccountId</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 text-slate-500" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="123456789012"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    value={form.accountId}
                    onChange={(e) => setForm({ ...form, accountId: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                "Complete Setup"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
