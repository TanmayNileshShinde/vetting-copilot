import React, { useState } from "react";
import { Search, Loader2, Sparkles, Building2 } from "lucide-react";
import type { PresetCompany } from "../types";

interface SearchBannerProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  presets: PresetCompany[];
  activeQuery: string;
}

export const SearchBanner: React.FC<SearchBannerProps> = ({
  onSearch,
  isLoading,
  presets,
  activeQuery,
}) => {
  const [inputVal, setInputVal] = useState(activeQuery);
  const [loadingStep, setLoadingStep] = useState(0);

  // Cycle loading steps for visual feedback
  React.useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < 2 ? prev + 1 : prev));
    }, 1100);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const stepsText = [
    "Querying Crustdata API for verified firmographics & headcount trajectory...",
    "Crawling live regulatory filings, TOS, and public dockets with Olostep...",
    "Synthesizing cross-signal risk scoring & computing institutional dossier...",
  ];

  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The $15-an-Hour Expert — Replacing $150/hr Due Diligence Consulting</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
          Institutional Risk Intelligence in{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
            45 Seconds
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
          Verify vendor reliability, C-suite churn, regulatory red flags, and digital footprint before signing contracts or approving business loans.
        </p>

        {/* Search Input Omnibar */}
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter enterprise domain or company name (e.g. retool.com, stripe.com, ftx.com)..."
              disabled={isLoading}
              className="w-full pl-12 pr-36 py-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm sm:text-base shadow-2xl transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Building2 className="h-4 w-4" />
                  <span>Audit Entity</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading Telemetry Steps */}
        {isLoading && (
          <div className="max-w-xl mx-auto mb-6 p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-left animate-fadeIn">
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 mb-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
              <span>LIVE PIPELINE EXECUTION (Step {loadingStep + 1} of 3)</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              {stepsText[loadingStep]}
            </p>
          </div>
        )}

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400 mr-1 font-medium">Quick Presets:</span>
          {presets.map((preset) => {
            const isCritical = preset.expectedRisk === "Critical Risk";
            const isElevated = preset.expectedRisk === "Elevated Risk";
            return (
              <button
                key={preset.domain}
                onClick={() => {
                  setInputVal(preset.domain);
                  onSearch(preset.domain);
                }}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 text-xs font-medium text-slate-300 transition flex items-center space-x-1.5 shadow-sm"
              >
                <span>{preset.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isCritical
                      ? "bg-red-500/20 text-red-400"
                      : isElevated
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {preset.expectedRisk}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
