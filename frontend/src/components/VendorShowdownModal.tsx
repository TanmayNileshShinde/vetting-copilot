import React, { useState } from "react";
import type { ComparisonResult } from "../types";
import { runVendorComparison } from "../services/api";
import {
  X,
  Swords,
  Crown,
  Loader2,
} from "lucide-react";

interface VendorShowdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVendorA?: string;
}

export const VendorShowdownModal: React.FC<VendorShowdownModalProps> = ({
  isOpen,
  onClose,
  initialVendorA = "retool.com",
}) => {
  const [vendorA, setVendorA] = useState(initialVendorA);
  const [vendorB, setVendorB] = useState("wework.com");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  if (!isOpen) return null;

  const handleCompare = async () => {
    if (!vendorA.trim() || !vendorB.trim()) return;
    setIsLoading(true);
    try {
      const data = await runVendorComparison(vendorA.trim(), vendorB.trim());
      setResult(data);
    } catch (err) {
      console.error("Comparison error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="skeuo-panel max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/40">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-950 border border-indigo-700/60 text-indigo-400">
              <Swords className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">
                  VENDOR SHOWDOWN // PROCUREMENT BATTLE CARD
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-mono font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                  DECISION BUS
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                HEAD-TO-HEAD INSTITUTIONAL RISK & VOLATILITY COMPARISON
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

        {/* Input Selectors */}
        <div className="p-6 bg-black/30 border-b border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Vendor A */}
            <div className="sm:col-span-5">
              <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                PRIMARY CANDIDATE (VENDOR A)
              </label>
              <div className="skeuo-inset p-1">
                <input
                  type="text"
                  value={vendorA}
                  onChange={(e) => setVendorA(e.target.value)}
                  placeholder="e.g. retool.com, stripe.com"
                  className="w-full bg-transparent px-3 py-2 text-white font-mono text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* VS Badge */}
            <div className="sm:col-span-2 text-center flex items-center justify-center pt-2 sm:pt-0">
              <span className="h-9 w-9 rounded-full bg-black/90 border border-white/20 text-xs font-mono font-black text-slate-200 flex items-center justify-center shadow-inner">
                VS
              </span>
            </div>

            {/* Vendor B */}
            <div className="sm:col-span-5">
              <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                ALTERNATIVE CANDIDATE (VENDOR B)
              </label>
              <div className="skeuo-inset p-1">
                <input
                  type="text"
                  value={vendorB}
                  onChange={(e) => setVendorB(e.target.value)}
                  placeholder="e.g. wework.com, ftx.com"
                  className="w-full bg-transparent px-3 py-2 text-white font-mono text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-500 text-[10px]">PRESET MATCHUPS:</span>
              <button
                onClick={() => {
                  setVendorA("retool.com");
                  setVendorB("wework.com");
                }}
                className="skeuo-btn px-2.5 py-1 rounded text-slate-300 text-[10px]"
              >
                Retool vs WeWork
              </button>
              <button
                onClick={() => {
                  setVendorA("stripe.com");
                  setVendorB("ftx.com");
                }}
                className="skeuo-btn px-2.5 py-1 rounded text-slate-300 text-[10px]"
              >
                Stripe vs FTX
              </button>
            </div>

            <button
              onClick={handleCompare}
              disabled={isLoading || !vendorA || !vendorB}
              className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>EVALUATING HEAD-TO-HEAD...</span>
                </>
              ) : (
                <>
                  <Swords className="h-3.5 w-3.5" />
                  <span>EXECUTE SHOWDOWN</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Comparison Results */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          {!result && !isLoading && (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select two vendor domains above and click "Execute Showdown" to generate live head-to-head decision metrics.
            </div>
          )}

          {result && (
            <>
              {/* Winner Verdict Banner */}
              <div className="skeuo-inset p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-l-4 border-emerald-500">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-black/80 text-emerald-400 border border-emerald-500/30">
                    <Crown className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      PROCUREMENT VERDICT & BATTLE WINNER
                    </div>
                    <div className="text-base font-mono font-black text-white">
                      RECOMMENDED: {result.verdict.saferVendor} ({result.verdict.saferDomain})
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5 font-mono">
                      {result.verdict.recommendation}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-400 block font-mono">RISK ADVANTAGE</span>
                  <span className="text-xl font-black text-emerald-400">
                    +{result.verdict.riskDelta} PTS SAFER
                  </span>
                </div>
              </div>

              {/* Side-by-Side Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vendor A Card */}
                <div className={`skeuo-inset p-5 ${result.verdict.saferVendor === result.vendorA.companyName ? "border-emerald-500/60" : ""}`}>
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <div>
                      <h4 className="text-base font-mono font-black text-white">{result.vendorA.companyName}</h4>
                      <span className="text-xs text-slate-400 font-mono">{result.vendorA.targetDomain}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-mono font-black text-white">{result.vendorA.compositeRiskScore}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">/ 100 RISK</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono mb-2">
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">VERDICT</span>
                      <span className="font-bold text-slate-200">{result.vendorA.recommendation}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">HEADCOUNT</span>
                      <span className="font-bold text-white">{result.vendorA.firmographics.headcountEstimate} ({result.vendorA.firmographics.headcountGrowthRate})</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">EXECUTIVE CHURN (90D)</span>
                      <span className={`font-bold ${(result.vendorA.firmographics.recentExecutiveTurnover || 0) > 2 ? "text-rose-400" : "text-emerald-400"}`}>
                        {result.vendorA.firmographics.recentExecutiveTurnover || 0} EXITS
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">LEADERSHIP HEALTH</span>
                      <span className="font-bold text-white">{result.vendorA.pillars.leadershipScore}%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">REGULATORY STANDING</span>
                      <span className="font-bold text-white">{result.vendorA.pillars.regulatoryScore}%</span>
                    </div>
                  </div>
                </div>

                {/* Vendor B Card */}
                <div className={`skeuo-inset p-5 ${result.verdict.saferVendor === result.vendorB.companyName ? "border-emerald-500/60" : ""}`}>
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <div>
                      <h4 className="text-base font-mono font-black text-white">{result.vendorB.companyName}</h4>
                      <span className="text-xs text-slate-400 font-mono">{result.vendorB.targetDomain}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-mono font-black text-white">{result.vendorB.compositeRiskScore}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">/ 100 RISK</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono mb-2">
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">VERDICT</span>
                      <span className="font-bold text-slate-200">{result.vendorB.recommendation}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">HEADCOUNT</span>
                      <span className="font-bold text-white">{result.vendorB.firmographics.headcountEstimate} ({result.vendorB.firmographics.headcountGrowthRate})</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">EXECUTIVE CHURN (90D)</span>
                      <span className={`font-bold ${(result.vendorB.firmographics.recentExecutiveTurnover || 0) > 2 ? "text-rose-400" : "text-emerald-400"}`}>
                        {result.vendorB.firmographics.recentExecutiveTurnover || 0} EXITS
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">LEADERSHIP HEALTH</span>
                      <span className="font-bold text-white">{result.vendorB.pillars.leadershipScore}%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/60">
                      <span className="text-slate-400">REGULATORY STANDING</span>
                      <span className="font-bold text-white">{result.vendorB.pillars.regulatoryScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
