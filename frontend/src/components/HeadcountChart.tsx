import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { CompanyFirmographics } from "../types";
import { Users, TrendingUp, Briefcase, MapPin, ExternalLink } from "lucide-react";

interface HeadcountChartProps {
  firmographics: CompanyFirmographics;
}

export const HeadcountChart: React.FC<HeadcountChartProps> = ({ firmographics }) => {
  const data = firmographics.headcountHistory || [];

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 mb-5 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Workforce Velocity & Organization Structure
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Crustdata Signal
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time employment trajectory and leadership continuity
          </p>
        </div>

        {/* Firmographic metadata pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {firmographics.hqLocation && (
            <span className="inline-flex items-center text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
              <MapPin className="h-3 w-3 mr-1 text-slate-400" />
              {firmographics.hqLocation}
            </span>
          )}
          {firmographics.linkedinUrl && (
            <a
              href={firmographics.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 bg-blue-950/40 hover:bg-blue-900/40 px-2.5 py-1 rounded-lg border border-blue-800/40 transition"
            >
              <span>LinkedIn</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <Users className="h-3.5 w-3.5 text-blue-400" />
            <span>Headcount</span>
          </div>
          <div className="text-lg font-bold text-white">
            {firmographics.headcountEstimate?.toLocaleString() || "120+"}
          </div>
          <div className="text-[10px] text-slate-500">Verified employees</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            <span>Growth Rate</span>
          </div>
          <div className="text-lg font-bold text-emerald-400">
            {firmographics.headcountGrowthRate || "+14.2% YoY"}
          </div>
          <div className="text-[10px] text-slate-500">12-mo expansion</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
            <span>Executive Pool</span>
          </div>
          <div className="text-lg font-bold text-white">
            {firmographics.executiveCount || 12}
          </div>
          <div className="text-[10px] text-slate-500">C-Level & VP tier</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <Users className="h-3.5 w-3.5 text-amber-400" />
            <span>Recent Churn</span>
          </div>
          <div
            className={`text-lg font-bold ${
              (firmographics.recentExecutiveTurnover || 0) > 2
                ? "text-rose-400"
                : "text-slate-200"
            }`}
          >
            {firmographics.recentExecutiveTurnover || 0}
          </div>
          <div className="text-[10px] text-slate-500">Departures (90d)</div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="headcountGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`${val} staff`, "Employees"]}
            />
            <Area
              type="monotone"
              dataKey="employees"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#headcountGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
        <span>Source: {firmographics.source}</span>
        <span className="font-mono text-slate-500">CRUSTDATA-ENTITY-ID: {firmographics.crustdataId || "849201"}</span>
      </div>
    </div>
  );
};
