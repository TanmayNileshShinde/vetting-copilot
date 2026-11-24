import React from "react";
import { Users, FileCheck2, TrendingUp, ShieldAlert, Check } from "lucide-react";

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
      title: "Leadership Stability",
      subtitle: "C-suite churn & executive retention",
      score: pillars.leadershipScore,
      icon: Users,
      source: "Crustdata Executive Tracker",
    },
    {
      title: "Regulatory Compliance",
      subtitle: "Court dockets, SEC & fraud notices",
      score: pillars.regulatoryScore,
      icon: FileCheck2,
      source: "Olostep Legal Crawler",
    },
    {
      title: "Headcount Health",
      subtitle: "Workforce growth trajectory & scale",
      score: pillars.headcountScore,
      icon: TrendingUp,
      source: "Crustdata Verified B2B",
    },
    {
      title: "Operational Footprint",
      subtitle: "TLS verification, SLA & public Terms",
      score: pillars.operationalScore,
      icon: ShieldAlert,
      source: "Olostep Web Depth Analyzer",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-500";
    if (score >= 60) return "text-amber-400 bg-amber-500";
    return "text-rose-400 bg-rose-500";
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">
            Intelligence Pillar Diagnostics
          </h3>
          <p className="text-xs text-slate-400">
            Multi-source cross-verification scores (0-100 Health)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          const colorClass = getScoreColor(item.score);
          const textColor = colorClass.split(" ")[0];
          const bgBar = colorClass.split(" ")[1];

          return (
            <div
              key={item.title}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{item.title}</h4>
                    <p className="text-[10px] text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
                <span className={`text-sm font-extrabold ${textColor}`}>
                  {item.score}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
                <div
                  className={`h-full ${bgBar} rounded-full transition-all duration-700`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>{item.source}</span>
                <span className="flex items-center text-slate-400">
                  <Check className="h-3 w-3 mr-0.5 text-blue-400" />
                  Verified
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
