import React, { useState } from "react";
import type { RiskEvidence } from "../types";
import { ShieldAlert, AlertTriangle, CheckCircle2, Globe, ExternalLink } from "lucide-react";

interface EvidenceFeedProps {
  evidence: RiskEvidence[];
}

export const EvidenceFeed: React.FC<EvidenceFeedProps> = ({ evidence }) => {
  const [filter, setFilter] = useState<"all" | "high" | "regulatory" | "leadership">("all");

  const filtered = evidence.filter((item) => {
    if (filter === "high") return item.severity === "high" || item.severity === "critical";
    if (filter === "regulatory") return item.category === "Regulatory & Legal";
    if (filter === "leadership") return item.category === "Leadership Stability";
    return true;
  });

  const getSeverityBadge = (severity: RiskEvidence["severity"]) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-rose-950/80 text-rose-400 border-rose-700/60",
          icon: ShieldAlert,
          label: "CRITICAL",
        };
      case "high":
        return {
          bg: "bg-orange-950/80 text-orange-400 border-orange-700/60",
          icon: AlertTriangle,
          label: "HIGH RISK",
        };
      case "medium":
        return {
          bg: "bg-amber-950/80 text-amber-400 border-amber-700/60",
          icon: AlertTriangle,
          label: "NOTICE",
        };
      case "low":
      default:
        return {
          bg: "bg-emerald-950/80 text-emerald-400 border-emerald-700/60",
          icon: CheckCircle2,
          label: "VERIFIED",
        };
    }
  };

  return (
    <div className="skeuo-panel p-6 flex flex-col justify-between">
      {/* 4 Corner Screws */}
      <div className="absolute top-2.5 left-2.5 skeuo-screw" />
      <div className="absolute top-2.5 right-2.5 skeuo-screw" />
      <div className="absolute bottom-2.5 left-2.5 skeuo-screw" />
      <div className="absolute bottom-2.5 right-2.5 skeuo-screw" />

      {/* Header Plate */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/5 mb-3 gap-2">
        <div className="flex items-center space-x-2">
          <div className="skeuo-led-green" />
          <h3 className="text-xs font-mono font-black tracking-widest text-slate-200 uppercase">
            REGULATORY & DISCLOSURE DOCKETS
          </h3>
        </div>

        {/* Tactile Filter Switches */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setFilter("all")}
            className={`skeuo-btn px-2 py-0.5 rounded text-[10px] font-mono ${
              filter === "all" ? "text-white border-blue-500" : "text-slate-400"
            }`}
          >
            ALL ({evidence.length})
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`skeuo-btn px-2 py-0.5 rounded text-[10px] font-mono ${
              filter === "high" ? "text-rose-400 border-rose-500" : "text-slate-400"
            }`}
          >
            FLAGS
          </button>
          <button
            onClick={() => setFilter("regulatory")}
            className={`skeuo-btn px-2 py-0.5 rounded text-[10px] font-mono ${
              filter === "regulatory" ? "text-cyan-400 border-cyan-500" : "text-slate-400"
            }`}
          >
            DOCKETS
          </button>
        </div>
      </div>

      {/* Docket Feed Container */}
      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {filtered.map((item, index) => {
          const badge = getSeverityBadge(item.severity);
          const Icon = badge.icon;

          return (
            <div
              key={index}
              className="skeuo-inset p-3"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[9px] font-mono font-black border ${badge.bg}`}
                >
                  <Icon className="h-2.5 w-2.5 mr-0.5" />
                  <span>{badge.label}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  DOCKET #{index + 1} • {item.category.toUpperCase()}
                </span>
              </div>

              <h4 className="text-xs font-black text-slate-100 font-mono mb-1">{item.title}</h4>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed mb-2">
                {item.finding}
              </p>

              {/* Inset Quote Tape */}
              <div className="p-2 rounded bg-black/90 border-l-2 border-blue-500 text-[10px] font-mono text-slate-300 mb-1.5">
                "{item.quoteOrStat}"
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-1 border-t border-white/5">
                <span className="flex items-center">
                  <Globe className="h-2.5 w-2.5 mr-1 text-cyan-400" />
                  {item.source}
                </span>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    <span>SOURCE</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
