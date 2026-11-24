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

  React.useEffect(() => {
    setInputVal(activeQuery);
  }, [activeQuery]);

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
    "BUS-01: Interrogating Crustdata B2B for workforce headcount velocity & executive retention...",
    "BUS-02: Crawling live court dockets, SEC disclosures, and terms via Olostep crawler...",
    "BUS-03: Synthesizing cross-signal anomalies & compiling institutional audit memo...",
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative">
      <div className="max-w-4xl mx-auto">
        {/* Hardware Console Chassis Panel */}
        <div className="skeuo-panel p-6 sm:p-8">
          {/* 4 Corner Screws */}
          <div className="absolute top-3 left-3 skeuo-screw" />
          <div className="absolute top-3 right-3 skeuo-screw" />
          <div className="absolute bottom-3 left-3 skeuo-screw" />
          <div className="absolute bottom-3 right-3 skeuo-screw" />

          {/* Console Top Bezel / Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 mb-6 gap-2">
            <div className="flex items-center space-x-2">
              <div className="skeuo-led-amber" />
              <span className="text-[11px] font-mono font-black tracking-widest text-slate-300 uppercase">
                TARGET INTERROGATION TERMINAL
              </span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono font-bold text-blue-400">
              <Sparkles className="h-3 w-3 text-blue-400" />
              <span>THE $15-AN-HOUR EXPERT • TRACK C1</span>
            </div>
          </div>

          {/* Recessed Input Well with Mechanical Switch */}
          <form onSubmit={handleSubmit} className="mb-5">
            <div className="skeuo-inset p-2 flex items-center space-x-2">
              <div className="pl-3 text-slate-500">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="ENTER ENTERPRISE DOMAIN OR VENDOR NAME (e.g. retool.com, stripe.com, ftx.com)..."
                disabled={isLoading}
                className="w-full bg-transparent py-3 px-2 text-white font-mono text-xs sm:text-sm placeholder-slate-600 focus:outline-none tracking-wide"
              />
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="skeuo-btn-primary px-6 py-3 rounded-lg text-xs font-mono font-black tracking-wider uppercase flex items-center space-x-2 whitespace-nowrap disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>AUDITING...</span>
                  </>
                ) : (
                  <>
                    <Building2 className="h-4 w-4" />
                    <span>AUDIT ENTITY</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Real-time Oscilloscope Telemetry Terminal when auditing */}
          {isLoading && (
            <div className="skeuo-inset p-4 mb-5 border-l-2 border-amber-500">
              <div className="flex items-center space-x-2 text-[11px] font-mono font-bold text-amber-400 mb-1">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>INTERROGATION ACTIVE • STEP {loadingStep + 1} / 3</span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                {stepsText[loadingStep]}
              </p>
            </div>
          )}

          {/* Tactile Preset Switch Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mr-1">
              TARGET PRESETS:
            </span>
            {presets.map((preset) => {
              const isCritical = preset.expectedRisk === "Critical Risk";
              const isElevated = preset.expectedRisk === "Elevated Risk";
              return (
                <button
                  key={preset.domain}
                  type="button"
                  onClick={() => {
                    setInputVal(preset.domain);
                    onSearch(preset.domain);
                  }}
                  disabled={isLoading}
                  className="skeuo-btn px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-2"
                >
                  <div
                    className={
                      isCritical
                        ? "skeuo-led-red"
                        : isElevated
                        ? "skeuo-led-amber"
                        : "skeuo-led-green"
                    }
                  />
                  <span className="text-slate-200 font-bold">{preset.name}</span>
                  <span className="text-[10px] text-slate-500">({preset.expectedRisk.split(" ")[0]})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
