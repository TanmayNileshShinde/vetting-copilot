import React from "react";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

interface RiskGaugeProps {
  score: number;
  riskLevel: string;
  recommendation: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, riskLevel, recommendation }) => {
  // Map score (0 to 100) to needle angle (-110 deg to +110 deg)
  const angle = -110 + (score / 100) * 220;

  const isElevated = score >= 50 && score < 70;
  const isCritical = score >= 70;

  return (
    <div className="skeuo-panel p-6 flex flex-col justify-between">
      {/* 4 Corner Screws */}
      <div className="absolute top-2.5 left-2.5 skeuo-screw" />
      <div className="absolute top-2.5 right-2.5 skeuo-screw" />
      <div className="absolute bottom-2.5 left-2.5 skeuo-screw" />
      <div className="absolute bottom-2.5 right-2.5 skeuo-screw" />

      {/* Header plate */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
        <div className="flex items-center space-x-2">
          <div className={isCritical ? "skeuo-led-red" : isElevated ? "skeuo-led-amber" : "skeuo-led-green"} />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 font-mono">
            RISK GAUGE • MANOMETER
          </span>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono font-bold text-slate-300">
          CALIB. 2026-v1
        </div>
      </div>

      {/* Physical Analog Dial Gauge */}
      <div className="relative flex flex-col items-center justify-center my-2">
        {/* Recessed Circular Dial Frame */}
        <div className="w-56 h-36 relative overflow-hidden flex items-end justify-center">
          <svg className="w-56 h-56 -top-20 absolute" viewBox="0 0 200 200">
            {/* Outer metallic bezel ring */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#1e293b"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Gauge Background Face */}
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="#06090e"
            />

            {/* Arc: Safe Zone (Green: 0 - 30) */}
            <path
              d="M 35 155 A 82 82 0 0 1 65 37"
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeOpacity="0.8"
            />
            {/* Arc: Caution Zone (Amber: 30 - 70) */}
            <path
              d="M 65 37 A 82 82 0 0 1 135 37"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="6"
              strokeOpacity="0.8"
            />
            {/* Arc: Danger Zone (Red: 70 - 100) */}
            <path
              d="M 135 37 A 82 82 0 0 1 165 155"
              fill="none"
              stroke="#ef4444"
              strokeWidth="6"
              strokeOpacity="0.8"
            />

            {/* Dial Tick marks */}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => {
              const tickAngle = -110 + (tick / 100) * 220;
              const rad = (tickAngle * Math.PI) / 180;
              const x1 = 100 + 72 * Math.sin(rad);
              const y1 = 100 - 72 * Math.cos(rad);
              const x2 = 100 + 80 * Math.sin(rad);
              const y2 = 100 - 80 * Math.cos(rad);
              return (
                <line
                  key={tick}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={tick >= 70 ? "#ef4444" : tick >= 40 ? "#f59e0b" : "#64748b"}
                  strokeWidth={tick % 20 === 0 ? "2.5" : "1.2"}
                />
              );
            })}

            {/* Physical Needle with Needle Shadow */}
            <g
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "100px 100px",
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Needle Shadow */}
              <line
                x1="102"
                y1="102"
                x2="102"
                y2="28"
                stroke="rgba(0,0,0,0.6)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Physical Red Needle */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="26"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Counter-weight tail */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="114"
                stroke="#e11d48"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>

            {/* Center Metallic Pivot Cap */}
            <circle
              cx="100"
              cy="100"
              r="10"
              fill="url(#pivotGradient)"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="100"
              r="4"
              fill="#cbd5e1"
            />

            <defs>
              <linearGradient id="pivotGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Inset Digital LCD Readout */}
        <div className="skeuo-inset px-4 py-2 mt-2 flex items-center justify-between w-full max-w-[220px]">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            INDEX
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-black text-white font-mono tracking-tight">
              {score}
            </span>
            <span className="text-[10px] font-mono text-slate-500">/ 100</span>
          </div>
          <span
            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              isCritical
                ? "bg-rose-950 text-rose-400 border border-rose-800"
                : isElevated
                ? "bg-amber-950 text-amber-400 border border-amber-800"
                : "bg-emerald-950 text-emerald-400 border border-emerald-800"
            }`}
          >
            {riskLevel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Recessed Verdict Tray */}
      <div className="skeuo-inset p-3 mt-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            OPERATIONAL VERDICT
          </span>
          {isCritical ? (
            <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
          ) : isElevated ? (
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
          ) : (
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          )}
        </div>
        <p className="text-xs font-bold text-slate-200 leading-snug">
          {recommendation}
        </p>
      </div>
    </div>
  );
};
