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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Swords className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">
                  Vendor Showdown: Side-by-Side Procurement Battle Card
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  Decision Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Cross-evaluate two enterprise vendors before committing budget or signing contracts
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

        {/* Input Selectors */}
        <div className="p-6 bg-slate-950/40 border-b border-slate-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Vendor A */}
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Primary Candidate (Vendor A)
              </label>
              <input
                type="text"
                value={vendorA}
                onChange={(e) => setVendorA(e.target.value)}
                placeholder="e.g. retool.com or Stripe"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* VS Badge */}
            <div className="sm:col-span-2 text-center flex items-center justify-center pt-4 sm:pt-0">
              <span className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 text-xs font-black text-slate-300 flex items-center justify-center shadow-inner">
                VS
              </span>
            </div>

            {/* Vendor B */}
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Alternative Candidate (Vendor B)
              </label>
              <input
                type="text"
                value={vendorB}
                onChange={(e) => setVendorB(e.target.value)}
                placeholder="e.g. wework.com, ftx.com"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500">Quick Matchups:</span>
              <button
                onClick={() => {
                  setVendorA("retool.com");
                  setVendorB("wework.com");
                }}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                Retool vs WeWork
              </button>
              <button
                onClick={() => {
                  setVendorA("stripe.com");
                  setVendorB("ftx.com");
                }}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                Stripe vs FTX
              </button>
            </div>

            <button
              onClick={handleCompare}
              disabled={isLoading || !vendorA || !vendorB}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/30 flex items-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Evaluating Head-to-Head...</span>
                </>
              ) : (
                <>
                  <Swords className="h-4 w-4" />
                  <span>Execute Showdown</span>
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Crown className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Procurement Verdict & Winner
                    </div>
                    <div className="text-base font-extrabold text-white">
                      Recommended: {result.verdict.saferVendor} ({result.verdict.saferDomain})
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      {result.verdict.recommendation}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">Risk Advantage</span>
                  <span className="text-xl font-extrabold text-emerald-400">
                    +{result.verdict.riskDelta} pts Safer
                  </span>
                </div>
              </div>

              {/* Side-by-Side Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vendor A Card */}
                <div className={`p-5 rounded-xl border ${result.verdict.saferVendor === result.vendorA.companyName ? "bg-slate-950/80 border-emerald-500/40" : "bg-slate-950/60 border-slate-800"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-base font-extrabold text-white">{result.vendorA.companyName}</h4>
                      <span className="text-xs text-slate-400 font-mono">{result.vendorA.targetDomain}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">{result.vendorA.compositeRiskScore}</span>
                      <span className="text-[10px] text-slate-400 block">/ 100 RISK</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Verdict</span>
                      <span className="font-semibold text-slate-200">{result.vendorA.recommendation}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Headcount</span>
                      <span className="font-semibold text-white">{result.vendorA.firmographics.headcountEstimate} ({result.vendorA.firmographics.headcountGrowthRate})</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Executive Churn (90d)</span>
                      <span className={`font-semibold ${(result.vendorA.firmographics.recentExecutiveTurnover || 0) > 2 ? "text-rose-400" : "text-emerald-400"}`}>
                        {result.vendorA.firmographics.recentExecutiveTurnover || 0} exits
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Leadership Health</span>
                      <span className="font-semibold text-white">{result.vendorA.pillars.leadershipScore}%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Regulatory Standing</span>
                      <span className="font-semibold text-white">{result.vendorA.pillars.regulatoryScore}%</span>
                    </div>
                  </div>
                </div>

                {/* Vendor B Card */}
                <div className={`p-5 rounded-xl border ${result.verdict.saferVendor === result.vendorB.companyName ? "bg-slate-950/80 border-emerald-500/40" : "bg-slate-950/60 border-slate-800"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-base font-extrabold text-white">{result.vendorB.companyName}</h4>
                      <span className="text-xs text-slate-400 font-mono">{result.vendorB.targetDomain}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">{result.vendorB.compositeRiskScore}</span>
                      <span className="text-[10px] text-slate-400 block">/ 100 RISK</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Verdict</span>
                      <span className="font-semibold text-slate-200">{result.vendorB.recommendation}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Headcount</span>
                      <span className="font-semibold text-white">{result.vendorB.firmographics.headcountEstimate} ({result.vendorB.firmographics.headcountGrowthRate})</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Executive Churn (90d)</span>
                      <span className={`font-semibold ${(result.vendorB.firmographics.recentExecutiveTurnover || 0) > 2 ? "text-rose-400" : "text-emerald-400"}`}>
                        {result.vendorB.firmographics.recentExecutiveTurnover || 0} exits
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Leadership Health</span>
                      <span className="font-semibold text-white">{result.vendorB.pillars.leadershipScore}%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900/60">
                      <span className="text-slate-400">Regulatory Standing</span>
                      <span className="font-semibold text-white">{result.vendorB.pillars.regulatoryScore}%</span>
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
