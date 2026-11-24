import React, { useState } from "react";
import type { DueDiligenceReport } from "../types";
import { X, Download, Copy, Check, FileText, Printer } from "lucide-react";
import { exportMarkdownReport } from "../services/api";

interface DossierModalProps {
  report: DueDiligenceReport;
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ report, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const res = await exportMarkdownReport(report);
    navigator.clipboard.writeText(res.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setDownloading(true);
    const res = await exportMarkdownReport(report);
    const blob = new Blob([res.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = res.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Institutional Due Diligence Dossier
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                REF: {report.auditId} • {report.companyName} ({report.targetDomain})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300 font-sans leading-relaxed">
          {/* Quick Header Summary Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-850 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase">Entity Evaluation</span>
              <div className="text-lg font-extrabold text-white">{report.companyName}</div>
              <div className="text-xs text-slate-400">{report.targetDomain}</div>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-slate-500 font-semibold uppercase">Risk Score</span>
              <div className="text-lg font-extrabold text-white">
                {report.compositeRiskScore} / 100 ({report.riskLevel})
              </div>
              <div className="text-xs font-semibold text-emerald-400">{report.recommendation}</div>
            </div>
          </div>

          {/* Section 1 */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              1. Executive Summary & Verdict
            </h4>
            <p className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-850 text-xs text-slate-300 leading-relaxed">
              {report.executiveSummary}
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              2. Verified Firmographics (Crustdata API)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                <span className="text-slate-500 block">Employees</span>
                <span className="font-bold text-white">{report.firmographics.headcountEstimate}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                <span className="text-slate-500 block">12-Mo Velocity</span>
                <span className="font-bold text-emerald-400">{report.firmographics.headcountGrowthRate}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                <span className="text-slate-500 block">Leadership Pool</span>
                <span className="font-bold text-white">{report.firmographics.executiveCount} Execs</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-850">
                <span className="text-slate-500 block">Recent Churn</span>
                <span className="font-bold text-slate-200">{report.firmographics.recentExecutiveTurnover}</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              3. Anchor Evidence Dockets (Olostep API)
            </h4>
            <div className="space-y-2">
              {report.evidenceItems.map((ev, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-850 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{ev.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 uppercase">
                      {ev.severity}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-1">{ev.finding}</p>
                  <div className="text-[11px] font-mono text-blue-400 bg-slate-900/80 p-2 rounded">
                    "{ev.quoteOrStat}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4 */}
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-850 flex justify-between">
            <span>Hours Saved: {report.benchmarkComparison.manualHoursSaved} hrs</span>
            <span>Estimated Savings: ${report.benchmarkComparison.costSavedUsd} USD</span>
            <span>Engine: VettingCopilot Enterprise</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Export formatted institutional dossier for risk committees
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition flex items-center space-x-1.5 border border-slate-700"
            >
              <Printer className="h-4 w-4" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition flex items-center space-x-1.5 border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-lg shadow-blue-600/30"
            >
              <Download className="h-4 w-4" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
