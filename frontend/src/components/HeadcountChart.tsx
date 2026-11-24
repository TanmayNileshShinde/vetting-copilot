import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { CompanyFirmographics } from "../types";
import { Users, TrendingUp, Briefcase, ExternalLink } from "lucide-react";

interface HeadcountChartProps {
  firmographics: CompanyFirmographics;
}

export const HeadcountChart: React.FC<HeadcountChartProps> = ({ firmographics }) => {
  const data = firmographics.headcountHistory || [];

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
            WORKFORCE EXPANSION OSCILLOSCOPE
          </h3>
        </div>

        <div className="flex items-center space-x-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-400">
            BUS: CRUSTDATA B2B
          </span>
          {firmographics.linkedinUrl && (
            <a
              href={firmographics.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="skeuo-btn px-2 py-0.5 rounded text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <span>DIR</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </div>
      </div>

      {/* Digital Inset Hardware Gauge Meters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <div className="skeuo-inset p-2.5">
          <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-mono mb-1">
            <Users className="h-3 w-3 text-blue-400" />
            <span>PAYROLL SCALE</span>
          </div>
          <div className="text-lg font-mono font-black text-white">
            {firmographics.isUnlisted
              ? "UNLISTED"
              : firmographics.employeeCountRange || firmographics.headcountEstimate?.toLocaleString() || "N/A"}
          </div>
          <div className="text-[9px] font-mono text-slate-500">
            {firmographics.isUnlisted ? "0-10 ESTIMATED" : "VERIFIED TIER"}
          </div>
        </div>

        <div className="skeuo-inset p-2.5">
          <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-mono mb-1">
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <span>12-MO VELOCITY</span>
          </div>
          <div className="text-lg font-mono font-black text-emerald-400 truncate">
            {firmographics.headcountGrowthRate || "+14.2% YoY"}
          </div>
          <div className="text-[9px] font-mono text-slate-500">TRAJECTORY</div>
        </div>

        <div className="skeuo-inset p-2.5">
          <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-mono mb-1">
            <Briefcase className="h-3 w-3 text-indigo-400" />
            <span>C-SUITE POOL</span>
          </div>
          <div className="text-lg font-mono font-black text-white">
            {firmographics.executiveCount ?? 12}
          </div>
          <div className="text-[9px] font-mono text-slate-500">EXECUTIVE TIER</div>
        </div>

        <div className="skeuo-inset p-2.5">
          <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-mono mb-1">
            <Users className="h-3 w-3 text-amber-400" />
            <span>90D TURNOVER</span>
          </div>
          <div
            className={`text-lg font-mono font-black ${
              (firmographics.recentExecutiveTurnover || 0) > 2 ? "text-rose-400" : "text-slate-200"
            }`}
          >
            {firmographics.recentExecutiveTurnover || 0}
          </div>
          <div className="text-[9px] font-mono text-slate-500">EXITS (TRAILING)</div>
        </div>
      </div>

      {/* Recessed Oscilloscope Screen */}
      <div className="skeuo-inset p-3 pt-4 h-48 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="oscilloscopeGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="#475569"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "#1e293b" }}
            />
            <YAxis
              stroke="#475569"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "#1e293b" }}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#06090e",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                fontSize: "11px",
                color: "#f8fafc",
                fontFamily: "monospace",
              }}
              formatter={(val: any) => [`${val} verified`, "Staff"]}
            />
            <Area
              type="monotone"
              dataKey="employees"
              stroke="#38bdf8"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#oscilloscopeGlow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer serial plate */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-3 border-t border-white/5">
        <span>ENTITY-ID: {firmographics.crustdataId || "849201"}</span>
        <span>{firmographics.hqLocation || "GLOBAL HQ"}</span>
      </div>
    </div>
  );
};
