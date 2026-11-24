import React from "react";
import { ShieldCheck, Database, Globe, GitBranch } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                VettingCopilot
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                Track C1
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Enterprise Due Diligence & Risk Intelligence Cockpit
            </p>
          </div>
        </div>

        {/* Live Partner Integrations Status */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <span>Olostep Web Crawler:</span>
            <span className="flex items-center text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
              Live
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
            <Database className="h-3.5 w-3.5 text-indigo-400" />
            <span>Crustdata B2B:</span>
            <span className="flex items-center text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
              Live
            </span>
          </div>

          <a
            href="https://github.com/TanmayNileshShinde/vetting-copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition border border-slate-700"
          >
            <GitBranch className="h-4 w-4 text-blue-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
