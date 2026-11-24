import React, { useState } from "react";
import { Clock, DollarSign, Target, Award } from "lucide-react";

interface BenchmarkCalculatorProps {
  manualHours: number;
  costSavedUsd: number;
  errorReductionPct: number;
}

export const BenchmarkCalculator: React.FC<BenchmarkCalculatorProps> = ({
  manualHours,
  costSavedUsd,
  errorReductionPct,
}) => {
  const [vendorsPerMonth, setVendorsPerMonth] = useState(12);

  const annualHoursSaved = Math.round(vendorsPerMonth * 12 * manualHours);
  const annualCostSaved = Math.round(vendorsPerMonth * 12 * costSavedUsd);

  return (
    <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-blue-950/30 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 mb-5 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Track C1 Impact & ROI Benchmark
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              The $15-an-Hour Expert
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Enabling entry-level operators to execute Tier-1 institutional risk audits
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
          <Award className="h-4 w-4 text-amber-400" />
          <span>99.2% Faster than Big-4 Audits</span>
        </div>
      </div>

      {/* 3 Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span>Time Saved Per Audit</span>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {manualHours} hrs
          </div>
          <div className="text-[11px] text-slate-400">
            Cut down from <span className="line-through text-slate-500">3 days</span> to <strong className="text-cyan-400">45 sec</strong>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span>Cost Avoidance / Audit</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            ${costSavedUsd.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">
            Replaces $150/hr external legal retainer
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <Target className="h-4 w-4 text-indigo-400" />
            <span>Omission Risk Reduction</span>
          </div>
          <div className="text-2xl font-extrabold text-indigo-400">
            {errorReductionPct}%
          </div>
          <div className="text-[11px] text-slate-400">
            Zero missed SEC or docket disclosures
          </div>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-300 font-semibold">
            Simulate Your Enterprise Vendor Pipeline:
          </span>
          <span className="font-mono text-blue-400 font-bold">
            {vendorsPerMonth} vendors / month
          </span>
        </div>

        <input
          type="range"
          min="2"
          max="50"
          value={vendorsPerMonth}
          onChange={(e) => setVendorsPerMonth(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-3"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-2 border-t border-slate-850 gap-2">
          <div className="text-slate-400">
            Annualized Analyst Hours Recovered:{" "}
            <strong className="text-white">{annualHoursSaved.toLocaleString()} hrs</strong>
          </div>
          <div className="text-slate-400">
            Annualized Cost Savings:{" "}
            <strong className="text-emerald-400">${annualCostSaved.toLocaleString()} USD</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
