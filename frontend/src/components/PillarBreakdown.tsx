import React from "react";
import { Users, FileCheck2, TrendingUp, ShieldAlert, Cpu } from "lucide-react";

interface PillarBreakdownProps {
  pillars: {
    leadershipScore: number;
    regulatoryScore: number;
    headcountScore: number;
    operationalScore: number;
  };
}

export const PillarBreakdown: React.FC<PillarBreakdownProps> = ({ pillars }) => {
  const items = [
    {
      title: "LEADERSHIP INTEGRITY",
      subtitle: "C-Suite Churn & Retention",
      score: pillars.leadershipScore,
      icon: Users,
      channel: "CH-01",
      source: "CRUSTDATA",
    },
    {
      title: "REGULATORY COMPLIANCE",
      subtitle: "Court Dockets & SEC Filings",
      score: pillars.regulatoryScore,
      icon: FileCheck2,
      channel: "CH-02",
      source: "OLOSTEP",
    },
    {
      title: "HEADCOUNT TRAJECTORY",
      subtitle: "Workforce Expansion Health",
      score: pillars.headcountScore,
      icon: TrendingUp,
      channel: "CH-03",
      source: "CRUSTDATA",
    },
    {
      title: "OPERATIONAL INTEGRITY",
      subtitle: "Public SLA & Discrepancies",
      score: pillars.operationalScore,
      icon: ShieldAlert,
      channel: "CH-04",
      source: "CROSS-SIGNAL",
    },
  ];

  return (
    <div className="skeuo-panel p-6 flex flex-col justify-between">
      {/* 4 Corner Screws */}
      <div className="absolute top-2.5 left-2.5 skeuo-screw" />
      <div className="absolute top-2.5 right-2.5 skeuo-screw" />
      <div className="absolute bottom-2.5 left-2.5 skeuo-screw" />
      <div className="absolute bottom-2.5 right-2.5 skeuo-screw" />

      {/* Rack Mount Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
        <div className="flex items-center space-x-2">
          <div className="skeuo-led-green" />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-300 font-mono flex items-center space-x-2">
            <span>QUAD-PILLAR TELEMETRY CONSOLE</span>
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
          <Cpu className="h-3 w-3 text-slate-400" />
          <span>REAL-TIME MULTI-SOURCE BUS</span>
        </div>
      </div>

      {/* 4 Channel VU Meter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isHigh = item.score >= 80;
          const isMid = item.score >= 50 && item.score < 80;

          // Compute number of illuminated LED segments out of 10
          const activeSegments = Math.round((item.score / 100) * 10);

          return (
            <div
              key={item.channel}
              className="skeuo-inset p-3.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-black/80 border border-white/10 text-slate-400">
                    <Icon className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-500">{item.channel}</span>
                      <span className="text-xs font-black text-slate-200 tracking-wide font-mono">{item.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500">{item.subtitle}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-mono font-black ${
                      isHigh ? "text-emerald-400" : isMid ? "text-amber-400" : "text-rose-400"
                    }`}
                  >
                    {item.score}%
                  </span>
                </div>
              </div>

              {/* Segmented Physical VU-Meter LED Bar */}
              <div className="my-2 p-1.5 rounded-lg bg-black/90 border border-black shadow-inner">
                <div className="grid grid-cols-10 gap-1 h-3">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const isLit = idx < activeSegments;
                    let segmentColor = "bg-emerald-500 shadow-[0_0_6px_#10b981]";
                    if (idx >= 7) segmentColor = "bg-rose-500 shadow-[0_0_6px_#ef4444]";
                    else if (idx >= 5) segmentColor = "bg-amber-500 shadow-[0_0_6px_#f59e0b]";

                    return (
                      <div
                        key={idx}
                        className={`rounded-sm transition-all duration-300 ${
                          isLit
                            ? segmentColor
                            : "bg-slate-900 border border-slate-800/60"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span>SRC: {item.source}</span>
                <span className="text-slate-400">SIG • LOCKED</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
