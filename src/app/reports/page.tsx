"use client";

import React, { useState } from "react";
import { BarChart3, Download, FileSpreadsheet, FileText, AlertCircle } from "lucide-react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("success-rate");
  const [format, setFormat] = useState("pdf");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = () => {
    setError("");
    const url = `/api/reports?type=${reportType}&format=${format}`;
    window.open(url, "_blank");
  };


  const reportsList = [
    {
      id: "success-rate",
      title: "Success Rates Histogram",
      desc: "Chronological list of all EBS automated backup runs, success indicators, and failure exception logs.",
    },
    {
      id: "storage",
      title: "Storage Utilization Summary",
      desc: "Snapshot count totals, individual sizes, and aggregated storage capacity occupied in AWS accounts.",
    },
    {
      id: "restore",
      title: "Restore History Logs",
      desc: "Comprehensive log of volume restore executions, original snapshots, and newly provisioned EBS IDs.",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-900 pb-5">
        <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Reports & Analytics</h2>
        <p className="text-xs text-slate-400 mt-1">
          Compile and export technical PDF and CSV telemetry logs for cloud backup compliance audits.
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-start gap-2.5">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Report Select */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select Report Type
          </h3>
          <div className="space-y-3">
            {reportsList.map((rep) => (
              <label
                key={rep.id}
                className={`panel-glass p-4 flex items-start gap-4 cursor-pointer border transition select-none ${
                  reportType === rep.id
                    ? "border-blue-600 bg-blue-950/5"
                    : "border-slate-800 hover:border-slate-700/80"
                }`}
              >
                <input
                  type="radio"
                  name="reportType"
                  value={rep.id}
                  checked={reportType === rep.id}
                  onChange={() => setReportType(rep.id)}
                  className="mt-1 w-4 h-4 accent-blue-600"
                />
                <div>
                  <span className="block text-xs font-semibold text-slate-200">{rep.title}</span>
                  <span className="block text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {rep.desc}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Right Column: Settings and Export Trigger */}
        <div className="space-y-6">
          {/* Format Selection */}
          <div className="panel-glass p-5 space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Compilation Specs
            </h3>

            <div className="space-y-2">
              <label className="block text-[10px] text-slate-400">File Format</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setFormat("pdf")}
                  className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition ${
                    format === "pdf"
                      ? "bg-blue-600/10 border-blue-500/20 text-blue-400 font-medium"
                      : "bg-slate-950 border-slate-900 text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  <FileText size={14} /> PDF Report
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("csv")}
                  className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition ${
                    format === "csv"
                      ? "bg-blue-600/10 border-blue-500/20 text-blue-400 font-medium"
                      : "bg-slate-950 border-slate-900 text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  <FileSpreadsheet size={14} /> CSV Spreadsheet
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleDownload}
                disabled={generating}
                className="w-full btn-primary py-2.5 flex items-center justify-center gap-1.5 text-xs"
              >
                <Download size={14} /> Download Report
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
