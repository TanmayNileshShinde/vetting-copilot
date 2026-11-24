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
              <div className="flex items-center space-x-2 text-xs text-slate-400 no-print">
                <History className="h-3.5 w-3.5 text-slate-500" />
                <span className="font-medium text-slate-500">Recent Inquiries:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {recentAudits.map((domain) => (
                    <button
                      key={domain}
                      onClick={() => handleSearch(domain)}
                      disabled={isLoading}
                      className={`px-2.5 py-0.5 rounded-md border text-[11px] font-mono transition ${
                        activeQuery === domain
                          ? "bg-blue-600/20 text-blue-300 border-blue-500/40"
                          : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Entity Header Banner */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3.5">
                <div className="h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-extrabold text-xl shadow-inner">
                  {report.companyName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-extrabold text-white">
                      {report.companyName}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {report.targetDomain}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                    <span className="font-mono">AUDIT: {report.auditId}</span>
                    <span>•</span>
                    <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Live Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Dossier Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsShowdownOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold text-xs transition border border-indigo-500/30 flex items-center space-x-2 shadow-sm"
                >
                  <Swords className="h-4 w-4 text-indigo-400" />
                  <span>Compare Vendors</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/30 flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Institutional Dossier</span>
                </button>
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

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <span className="text-slate-400 font-semibold">VettingCopilot</span>
            <span>— Built for Homingo Hackathon (Edition 01)</span>
          </div>
          <div>
            Built by{" "}
            <strong className="text-slate-300">Team Tacticals</strong> (Tanmay Shinde & Antara Parab)
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://docs.olostep.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition"
            >
              Olostep Docs
            </a>
            <a
              href="https://crustdata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition"
            >
              Crustdata API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
