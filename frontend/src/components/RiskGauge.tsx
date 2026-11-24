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

  const isCritical = score >= 70 || riskLevel.toLowerCase().includes("high") || riskLevel.toLowerCase().includes("critical");
  const isElevated = !isCritical && (score >= 30 || riskLevel.toLowerCase().includes("moderate") || riskLevel.toLowerCase().includes("elevated"));

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

      {/* Full Circular Physical Analog Manometer Gauge */}
      <div className="relative flex flex-col items-center justify-center my-1">
        <div className="w-48 h-44 relative flex items-center justify-center">
          <svg className="w-48 h-48" viewBox="0 0 200 185">
            <defs>
              <linearGradient id="bezelRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="pivotGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <radialGradient id="glassGlare" cx="35%" cy="25%" r="65%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.02)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            {/* Outer metallic bezel ring */}
            <circle
              cx="100"
              cy="98"
              r="86"
              fill="#06090e"
              stroke="url(#bezelRing)"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="98"
              r="82"
              fill="none"
              stroke="rgba(0,0,0,0.85)"
              strokeWidth="2"
            />

            {/* Arc: Safe Zone (Green: 0 - 30 -> -110 deg to -44 deg) */}
            <path
              d="M 28.6 124.0 A 76 76 0 0 1 47.2 43.3"
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />
            {/* Arc: Caution Zone (Amber: 30 - 70 -> -44 deg to +44 deg) */}
            <path
              d="M 47.2 43.3 A 76 76 0 0 1 152.8 43.3"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="6"
              strokeOpacity="0.85"
            />
            {/* Arc: Danger Zone (Red: 70 - 100 -> +44 deg to +110 deg) */}
            <path
              d="M 152.8 43.3 A 76 76 0 0 1 171.4 124.0"
              fill="none"
              stroke="#ef4444"
              strokeWidth="6"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />

            {/* Dial Tick marks */}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => {
              const tickAngle = -110 + (tick / 100) * 220;
              const rad = (tickAngle * Math.PI) / 180;
              const innerR = tick % 20 === 0 ? 64 : 68;
              const outerR = 74;
              const x1 = 100 + innerR * Math.sin(rad);
              const y1 = 98 - innerR * Math.cos(rad);
              const x2 = 100 + outerR * Math.sin(rad);
              const y2 = 98 - outerR * Math.cos(rad);
              return (
                <line
                  key={tick}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={tick >= 70 ? "#ef4444" : tick >= 30 ? "#f59e0b" : "#10b981"}
                  strokeWidth={tick % 20 === 0 ? "2.2" : "1.2"}
                />
              );
            })}

            {/* Dial Scale Labels */}
            <text x="38" y="138" fill="#64748b" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">0</text>
            <text x="100" y="37" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">50</text>
            <text x="162" y="138" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">100</text>
            <text x="100" y="148" fill="#475569" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">RISK PSI</text>

            {/* Physical Needle with Needle Shadow */}
            <g
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "100px 98px",
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Needle Shadow */}
              <line
                x1="102"
                y1="100"
                x2="102"
                y2="32"
                stroke="rgba(0,0,0,0.65)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Physical Red Needle */}
              <line
                x1="100"
                y1="98"
                x2="100"
                y2="30"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Counter-weight tail */}
              <line
                x1="100"
                y1="98"
                x2="100"
                y2="112"
                stroke="#e11d48"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>

            {/* Center Metallic Pivot Cap */}
            <circle
              cx="100"
              cy="98"
              r="9.5"
              fill="url(#pivotGradient)"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="98"
              r="3.5"
              fill="#fef3c7"
            />

            {/* Subtle Glass Lens Glare */}
            <circle
              cx="100"
              cy="98"
              r="82"
              fill="url(#glassGlare)"
              pointerEvents="none"
            />
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
