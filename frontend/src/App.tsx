import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { SearchBanner } from "./components/SearchBanner";
import { RiskGauge } from "./components/RiskGauge";
import { PillarBreakdown } from "./components/PillarBreakdown";
import { HeadcountChart } from "./components/HeadcountChart";
import { EvidenceFeed } from "./components/EvidenceFeed";
import { BenchmarkCalculator } from "./components/BenchmarkCalculator";
import { DossierModal } from "./components/DossierModal";
import { VendorShowdownModal } from "./components/VendorShowdownModal";
import type { DueDiligenceReport, PresetCompany } from "./types";
import { fetchPresets, runCompanyAudit } from "./services/api";
import { FileText, Shield, Sparkles, History, Swords } from "lucide-react";

export const App: React.FC = () => {
  const [report, setReport] = useState<DueDiligenceReport | null>(null);
  const [presets, setPresets] = useState<PresetCompany[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState("retool.com");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowdownOpen, setIsShowdownOpen] = useState(false);
  const [recentAudits, setRecentAudits] = useState<string[]>(["retool.com", "stripe.com"]);

  // Initialize presets and load baseline audit on mount
  useEffect(() => {
    async function init() {
      const p = await fetchPresets();
      setPresets(p);
      handleSearch("retool.com");
    }
    init();
  }, []);

  const handleSearch = async (query: string) => {
    setActiveQuery(query);
    setRecentAudits((prev) => Array.from(new Set([query, ...prev])).slice(0, 5));
    setIsLoading(true);
    try {
      const data = await runCompanyAudit(query);
      setReport(data);
    } catch (err) {
      console.error("Audit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        <SearchBanner
          onSearch={handleSearch}
          isLoading={isLoading}
          presets={presets}
          activeQuery={activeQuery}
        />

        {report && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Recent Session Inquiries Breadcrumb */}
            {recentAudits.length > 1 && (
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 no-print">
                <History className="h-3.5 w-3.5 text-slate-500" />
                <span className="font-bold text-slate-500 uppercase">RECENT AUDITS:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {recentAudits.map((domain) => (
                    <button
                      key={domain}
                      onClick={() => handleSearch(domain)}
                      disabled={isLoading}
                      className={`skeuo-btn px-2.5 py-1 rounded text-[10px] font-mono transition ${
                        activeQuery === domain
                          ? "text-blue-300 border-blue-500"
                          : "text-slate-400"
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Entity Header Banner */}
            <div className="skeuo-panel p-5 space-y-4">
              <div className="absolute top-2.5 left-2.5 skeuo-screw" />
              <div className="absolute top-2.5 right-2.5 skeuo-screw" />
              <div className="absolute bottom-2.5 left-2.5 skeuo-screw" />
              <div className="absolute bottom-2.5 right-2.5 skeuo-screw" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="h-12 w-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-blue-400 font-mono font-black text-xl shadow-inner overflow-hidden">
                    {report.firmographics.logoUrl ? (
                      <img
                        key={report.auditId}
                        src={report.firmographics.logoUrl}
                        alt={report.companyName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span>{report.companyName.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-mono font-black text-white tracking-wide">
                        {report.companyName}
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-300 font-mono">
                        {report.targetDomain}
                      </span>
                      {report.firmographics.companyType && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/60 border border-blue-700/40 text-blue-300 font-mono uppercase">
                          {report.firmographics.companyType}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                      <span>AUDIT-REF: {report.auditId}</span>
                      <span>•</span>
                      {report.auditId.endsWith("-DEMO") ? (
                        <span className="text-amber-400 font-bold flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {window.location.hostname === "localhost"
                            ? "DEMO FALLBACK (BACKEND PORT 5000 OFFLINE)"
                            : "DEMO FALLBACK (CHECK VERCEL ENV KEYS OR /API SERVICE)"}
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          LIVE OLOSTEP + CRUSTDATA VERIFIED
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dossier Action Buttons */}
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => setIsShowdownOpen(true)}
                    className="skeuo-btn px-4 py-2.5 rounded-lg text-indigo-300 font-mono font-bold text-xs flex items-center space-x-2"
                  >
                    <Swords className="h-3.5 w-3.5 text-indigo-400" />
                    <span>SHOWDOWN</span>
                  </button>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="skeuo-btn-primary px-4 py-2.5 rounded-lg font-mono font-bold text-xs flex items-center space-x-2"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>DOSSIER</span>
                  </button>
                </div>
              </div>

              {/* Recessed Executive Readout Strip */}
              <div className="skeuo-inset p-3.5 border-l-2 border-blue-500">
                <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                  SYSTEM BRIEF // EXECUTIVE RISK READOUT
                </div>
                <p className="text-xs font-sans text-slate-200 leading-relaxed">
                  {report.executiveSummary}
                </p>
              </div>
            </div>

            {/* Row 1: Risk Gauge + Pillar Diagnostics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <RiskGauge
                  score={report.compositeRiskScore}
                  riskLevel={report.riskLevel}
                  recommendation={report.recommendation}
                />
              </div>
              <div className="lg:col-span-8">
                <PillarBreakdown pillars={report.pillars} />
              </div>
            </div>

            {/* Row 2: Headcount Velocity (Crustdata) + Evidence Anchors (Olostep) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <HeadcountChart firmographics={report.firmographics} />
              </div>
              <div className="lg:col-span-5">
                <EvidenceFeed
                  evidence={report.evidenceItems}
                />
              </div>
            </div>

            {/* Row 3: Track C1 ROI & Benchmark Calculator */}
            <div>
              <BenchmarkCalculator
                manualHours={report.benchmarkComparison.manualHoursSaved}
                costSavedUsd={report.benchmarkComparison.costSavedUsd}
                errorReductionPct={report.benchmarkComparison.analystErrorRateReductionPct}
              />
            </div>
          </div>
        )}
      </main>

      {/* Institutional Dossier Modal */}
      {report && (
        <DossierModal
          report={report}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Vendor Showdown Modal */}
      <VendorShowdownModal
        isOpen={isShowdownOpen}
        onClose={() => setIsShowdownOpen(false)}
        initialVendorA={report?.targetDomain || "retool.com"}
      />

      {/* Machined Serial Plate Footer */}
      <footer className="border-t border-white/10 bg-[#0b0e14] py-6 px-4 text-xs font-mono text-slate-500 mt-10 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-400" />
            <span className="text-slate-300 font-black tracking-wider">VETTINGCOPILOT</span>
            <span className="text-slate-600">//</span>
            <span>TRACK C1: THE $15-AN-HOUR EXPERT</span>
          </div>
          <div className="text-[11px]">
            TEAM TACTICALS •{" "}
            <strong className="text-slate-300">TANMAY SHINDE & ANTARA PARAB</strong>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="https://docs.olostep.com"
              target="_blank"
              rel="noopener noreferrer"
              className="skeuo-btn px-2.5 py-1 rounded text-[10px] text-slate-300 hover:text-white"
            >
              OLOSTEP DOCS
            </a>
            <a
              href="https://crustdata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="skeuo-btn px-2.5 py-1 rounded text-[10px] text-slate-300 hover:text-white"
            >
              CRUSTDATA API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
