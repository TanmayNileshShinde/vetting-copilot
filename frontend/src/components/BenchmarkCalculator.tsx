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
    <div className="skeuo-panel p-6 flex flex-col justify-between">
      {/* 4 Corner Screws */}
      <div className="absolute top-2.5 left-2.5 skeuo-screw" />
      <div className="absolute top-2.5 right-2.5 skeuo-screw" />
      <div className="absolute bottom-2.5 left-2.5 skeuo-screw" />
      <div className="absolute bottom-2.5 right-2.5 skeuo-screw" />

      {/* Header Plate */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/5 mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <div className="skeuo-led-green" />
          <h3 className="text-xs font-mono font-black tracking-widest text-slate-200 uppercase">
            TRACK C1 EFFICIENCY BENCHMARK & ROI POTENTIOMETER
          </h3>
        </div>
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-emerald-400">
          <Award className="h-3 w-3 text-amber-400" />
          <span>$15-AN-HOUR EXPERT • TRACK C1</span>
        </div>
      </div>

      {/* 3 Inset Digital Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="skeuo-inset p-3">
          <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] font-mono mb-1">
            <Clock className="h-3 w-3 text-cyan-400" />
            <span>TIME RECOVERED / AUDIT</span>
          </div>
          <div className="text-xl font-mono font-black text-white">
            {manualHours} HOURS
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Cut down from 3 days to <strong>45 sec</strong>
          </div>
        </div>

        <div className="skeuo-inset p-3">
          <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] font-mono mb-1">
            <DollarSign className="h-3 w-3 text-emerald-400" />
            <span>COST AVOIDANCE / AUDIT</span>
          </div>
          <div className="text-xl font-mono font-black text-emerald-400">
            ${costSavedUsd.toLocaleString()} USD
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Replaces legal retainer fees
          </div>
        </div>

        <div className="skeuo-inset p-3">
          <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] font-mono mb-1">
            <Target className="h-3 w-3 text-indigo-400" />
            <span>OMISSION RISK REDUCTION</span>
          </div>
          <div className="text-xl font-mono font-black text-indigo-400">
            {errorReductionPct}%
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Zero missed SEC or court dockets
          </div>
        </div>
      </div>

      {/* Mechanical Slide Potentiometer */}
      <div className="skeuo-inset p-3.5">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-slate-400 font-bold uppercase">
            CALIBRATE MONTHLY VENDOR VOLUME (SLIDER):
          </span>
          <span className="text-blue-400 font-bold font-mono">
            {vendorsPerMonth} VENDORS / MO
          </span>
        </div>

        <input
          type="range"
          min="2"
          max="50"
          value={vendorsPerMonth}
          onChange={(e) => setVendorsPerMonth(Number(e.target.value))}
          className="skeuo-slider w-full mb-3"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono pt-2 border-t border-white/5 gap-2">
          <div className="text-slate-400">
            ANNUAL HOURS RECOVERED:{" "}
            <strong className="text-white">{annualHoursSaved.toLocaleString()} HRS</strong>
          </div>
          <div className="text-slate-400">
            ANNUAL COST SAVINGS:{" "}
            <strong className="text-emerald-400">${annualCostSaved.toLocaleString()} USD</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
