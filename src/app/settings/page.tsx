"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { Save, RotateCcw, Shield, Bell, HardDrive, Clock } from "lucide-react";
import { SUPPORTED_REGIONS } from "@/lib/regions";

interface SettingsState {
  defaultRegion: string;
  defaultRetentionDays: number;
  defaultFrequency: string;
  emailOnSuccess: boolean;
  emailOnFailure: boolean;
  autoDeleteExpired: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  defaultRegion: SUPPORTED_REGIONS[0].code,
  defaultRetentionDays: 7,
  defaultFrequency: "rate(1 day)",
  emailOnSuccess: true,
  emailOnFailure: true,
  autoDeleteExpired: false,
};


const FREQUENCIES = [
  { label: "Every 1 Hour", value: "rate(1 hour)" },
  { label: "Every 6 Hours", value: "rate(6 hours)" },
  { label: "Every 12 Hours", value: "rate(12 hours)" },
  { label: "Daily", value: "rate(1 day)" },
  { label: "Weekly", value: "rate(7 days)" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load settings from localStorage (client-side preferences)
    const stored = localStorage.getItem("bp_settings");
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }
    setLoading(false);
  }, []);

  const handleSave = () => {
    localStorage.setItem("bp_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem("bp_settings");
    setSaved(false);
  };

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex justify-center p-12">
          <img src="/coffecat.gif" alt="Loading..." className="w-40 h-40 object-contain mb-2" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Default Settings</h1>
            <p className="text-slate-400 text-sm mt-1">
              Configure default behavior for new backup policies and notifications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Save size={14} />
              {saved ? "Saved ✓" : "Save Settings"}
            </button>
          </div>
        </div>

        {saved && (
          <div className="p-3 rounded-lg bg-emerald-900/30 border border-emerald-500/30 text-emerald-200 text-sm font-medium">
            Settings saved successfully.
          </div>
        )}

        {/* Backup Defaults */}
        <div className="panel-glass overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
              <HardDrive size={16} className="text-blue-400" />
            </div>
            <h2 className="text-lg font-medium text-slate-200">Backup Defaults</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Default AWS Region
              </label>
              <select
                value={settings.defaultRegion}
                onChange={(e) => updateSetting("defaultRegion", e.target.value)}
                className="input-field"
              >
                {SUPPORTED_REGIONS.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name} ({r.code})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-500">
                Region pre-selected when creating new backup targets.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Default Backup Frequency
              </label>
              <select
                value={settings.defaultFrequency}
                onChange={(e) =>
                  updateSetting("defaultFrequency", e.target.value)
                }
                className="input-field"
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-500">
                Frequency pre-selected when creating new backup policies.
              </p>
            </div>
          </div>
        </div>

        {/* Retention Settings */}
        <div className="panel-glass overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <Clock size={16} className="text-amber-400" />
            </div>
            <h2 className="text-lg font-medium text-slate-200">
              Retention & Cleanup
            </h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Default Retention Period (days)
              </label>
              <input
                type="number"
                min={1}
                max={365}
                value={settings.defaultRetentionDays}
                onChange={(e) =>
                  updateSetting(
                    "defaultRetentionDays",
                    parseInt(e.target.value) || 7
                  )
                }
                className="input-field max-w-xs"
              />
              <p className="mt-1 text-xs text-slate-500">
                Snapshots older than this will be flagged for expiry.
              </p>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-slate-800/50">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Auto-delete Expired Snapshots
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automatically delete snapshots past the retention period.
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting("autoDeleteExpired", !settings.autoDeleteExpired)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  settings.autoDeleteExpired ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoDeleteExpired
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="panel-glass overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
              <Bell size={16} className="text-purple-400" />
            </div>
            <h2 className="text-lg font-medium text-slate-200">
              Notification Preferences
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Email on Backup Success
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Receive an email notification after every successful backup.
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting("emailOnSuccess", !settings.emailOnSuccess)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  settings.emailOnSuccess ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailOnSuccess
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-slate-800/50">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Email on Backup Failure
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Receive an email notification when a backup job fails.
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting("emailOnFailure", !settings.emailOnFailure)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  settings.emailOnFailure ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailOnFailure
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Environment Info (read-only) */}
        <div className="panel-glass overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-600/10 border border-slate-500/20 flex items-center justify-center">
              <Shield size={16} className="text-slate-400" />
            </div>
            <h2 className="text-lg font-medium text-slate-200">
              Environment Info
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "App Version", value: "v1.0.0" },
                { label: "AWS Region", value: process.env.NEXT_PUBLIC_AWS_REGION || "ap-south-1" },
                { label: "Mode", value: "MOCK (Development)" },
                { label: "API Endpoint", value: "/api/*" },
              ].map((item) => (
                <div key={item.label} className="bg-slate-950/50 rounded-lg border border-slate-800/60 p-3">
                  <p className="text-[10px] uppercase font-mono text-slate-500 tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-mono text-slate-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
