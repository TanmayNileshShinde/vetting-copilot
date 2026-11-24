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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="skeuo-panel max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/40">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-950 border border-blue-700/60 text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">
                INSTITUTIONAL DUE DILIGENCE DOSSIER
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                REF: {report.auditId} • {report.companyName} ({report.targetDomain})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="skeuo-btn p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
          {/* Quick Header Summary Card */}
          <div className="skeuo-inset p-4 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">ENTITY EVALUATION</span>
              <div className="text-lg font-black text-white font-mono">{report.companyName}</div>
              <div className="text-xs text-slate-400 font-mono">{report.targetDomain}</div>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase">COMPOSITE RISK</span>
              <div className="text-lg font-black text-white font-mono">
                {report.compositeRiskScore} / 100 ({report.riskLevel})
              </div>
              <div className="text-xs font-bold text-emerald-400">{report.recommendation}</div>
            </div>
          </div>

          {/* Section 1 */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              1. EXECUTIVE SUMMARY & VERDICT
            </h4>
            <p className="skeuo-inset p-3.5 text-xs text-slate-200 font-sans leading-relaxed">
              {report.executiveSummary}
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              2. VERIFIED FIRMOGRAPHICS (CRUSTDATA BUS)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="skeuo-inset p-2.5">
                <span className="text-slate-500 text-[10px] block">EMPLOYEES</span>
                <span className="font-black text-white">{report.firmographics.headcountEstimate}</span>
              </div>
              <div className="skeuo-inset p-2.5">
                <span className="text-slate-500 text-[10px] block">12-MO VELOCITY</span>
                <span className="font-black text-emerald-400">{report.firmographics.headcountGrowthRate}</span>
              </div>
              <div className="skeuo-inset p-2.5">
                <span className="text-slate-500 text-[10px] block">LEADERSHIP POOL</span>
                <span className="font-black text-white">{report.firmographics.executiveCount} EXECS</span>
              </div>
              <div className="skeuo-inset p-2.5">
                <span className="text-slate-500 text-[10px] block">RECENT CHURN</span>
                <span className="font-black text-slate-200">{report.firmographics.recentExecutiveTurnover}</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              3. ANCHOR EVIDENCE DOCKETS (OLOSTEP BUS)
            </h4>
            <div className="space-y-2">
              {report.evidenceItems.map((ev, idx) => (
                <div key={idx} className="skeuo-inset p-3 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{ev.title}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-black/80 border border-white/10 text-slate-300 uppercase">
                      {ev.severity}
                    </span>
                  </div>
                  <p className="text-slate-300 font-sans mb-1.5">{ev.finding}</p>
                  <div className="text-[11px] font-mono text-blue-300 bg-black/90 border-l-2 border-blue-500 p-2 rounded">
                    "{ev.quoteOrStat}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4 */}
          <div className="text-[10px] text-slate-500 pt-3 border-t border-white/5 flex flex-wrap gap-2 justify-between">
            <span>HOURS SAVED: {report.benchmarkComparison.manualHoursSaved} HRS</span>
            <span>EST. SAVINGS: ${report.benchmarkComparison.costSavedUsd} USD</span>
            <span>ENGINE: VETTINGCOPILOT MK-1</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-white/5 bg-black/40 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[10px] font-mono text-slate-400">
            BOARDROOM READY • INSTITUTIONAL RISK DOSSIER
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="skeuo-btn px-3 py-1.5 rounded-lg text-slate-200 text-xs font-mono font-bold flex items-center space-x-1.5"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <button
              onClick={handleCopy}
              className="skeuo-btn px-3 py-1.5 rounded-lg text-slate-200 text-xs font-mono font-bold flex items-center space-x-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>COPY MD</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="skeuo-btn-primary px-4 py-1.5 rounded-lg text-white text-xs font-mono font-black tracking-wider uppercase flex items-center space-x-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>DOWNLOAD .MD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
