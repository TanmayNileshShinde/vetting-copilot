import React, { useState } from "react";
import type { RiskEvidence } from "../types";
import { ShieldAlert, AlertTriangle, CheckCircle2, Globe, ExternalLink } from "lucide-react";

interface EvidenceFeedProps {
  evidence: RiskEvidence[];
}

export const EvidenceFeed: React.FC<EvidenceFeedProps> = ({ evidence }) => {
  const [filter, setFilter] = useState<"all" | "high" | "low">("all");

  const filtered = evidence.filter((item) => {
    if (filter === "high") return item.severity === "high" || item.severity === "critical";
    if (filter === "low") return item.severity === "low" || item.severity === "medium";
    return true;
  });

  const getSeverityBadge = (severity: RiskEvidence["severity"]) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-rose-500/20 text-rose-400 border-rose-500/30",
          icon: ShieldAlert,
          label: "Critical Flag",
        };
      case "high":
        return {
          bg: "bg-orange-500/20 text-orange-400 border-orange-500/30",
          icon: AlertTriangle,
          label: "High Risk",
        };
      case "medium":
        return {
          bg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
          icon: AlertTriangle,
          label: "Notice",
        };
      case "low":
      default:
        return {
          bg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
          icon: CheckCircle2,
          label: "Verified Safe",
        };
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 mb-4 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Live Regulatory & Web Evidence Anchors
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Olostep Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time public records, disclosures, and docket citations
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 rounded-md transition font-medium ${
              filter === "all" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            All ({evidence.length})
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`px-2.5 py-1 rounded-md transition font-medium ${
              filter === "high" ? "bg-rose-950/80 text-rose-400" : "text-slate-400 hover:text-rose-400"
            }`}
          >
            Risk Flags
          </button>
          <button
            onClick={() => setFilter("low")}
            className={`px-2.5 py-1 rounded-md transition font-medium ${
              filter === "low" ? "bg-emerald-950/80 text-emerald-400" : "text-slate-400 hover:text-emerald-400"
            }`}
          >
            Passed Checks
          </button>
        </div>
      </div>

      {/* Evidence Cards */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {filtered.map((item, index) => {
          const badge = getSeverityBadge(item.severity);
          const Icon = badge.icon;

          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.bg}`}
                  >
                    <Icon className="h-3 w-3 mr-0.5" />
                    <span>{badge.label}</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {item.category}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  ANCHOR #{index + 1}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                {item.finding}
              </p>

              {/* Quoted Citation Stat */}
              <div className="p-2.5 rounded-lg bg-slate-900 border-l-2 border-blue-500 text-xs font-mono text-slate-300 mb-2.5">
                "{item.quoteOrStat}"
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                <span className="flex items-center">
                  <Globe className="h-3 w-3 mr-1 text-cyan-400" />
                  {item.source}
                </span>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-300 transition"
                  >
                    <span>View Filing</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
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
