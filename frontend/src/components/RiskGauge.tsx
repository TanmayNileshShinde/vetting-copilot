import React from "react";
import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";

interface RiskGaugeProps {
  score: number;
  riskLevel: string;
  recommendation: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, riskLevel, recommendation }) => {
  // Determine color and status based on score
  const getColorScheme = (val: number) => {
    if (val < 30) {
      return {
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        ring: "#10b981",
        label: "Low Risk",
        icon: ShieldCheck,
      };
    }
    if (val < 50) {
      return {
        text: "text-amber-400",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        ring: "#f59e0b",
        label: "Moderate Risk",
        icon: AlertTriangle,
      };
    }
    if (val < 70) {
      return {
        text: "text-orange-400",
        border: "border-orange-500/30",
        bg: "bg-orange-500/10",
        ring: "#f97316",
        label: "Elevated Risk",
        icon: AlertTriangle,
      };
    }
    return {
      text: "text-rose-400",
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
      ring: "#f43f5e",
      label: "Critical Risk",
      icon: ShieldAlert,
    };
  };

  const scheme = getColorScheme(score);
  const Icon = scheme.icon;

  // SVG Circular Gauge calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Background glow */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: scheme.ring }}
      />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Composite Risk Index
        </span>
        <span
          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${scheme.bg} ${scheme.text} border ${scheme.border}`}
        >
          <Icon className="h-3.5 w-3.5 mr-1" />
          {riskLevel}
        </span>
      </div>

      {/* SVG Radial Gauge */}
      <div className="flex items-center justify-center py-2 relative">
        <svg className="w-36 h-36 -rotate-90 transform">
          {/* Background circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="#1e293b"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Animated score circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke={scheme.ring}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-white tracking-tight">{score}</span>
          <span className="text-[10px] text-slate-400 font-mono">/ 100 RISK</span>
        </div>
      </div>

      {/* Recommendation footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="text-[11px] text-slate-400 mb-1">Audit Verdict</div>
        <div className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
          <span className={`h-2 w-2 rounded-full ${score < 50 ? "bg-emerald-400" : "bg-rose-400"}`} />
          <span>{recommendation}</span>
        </div>
      </div>
    </div>
  );
};
