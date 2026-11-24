import React from "react";
import { ShieldCheck, GitBranch } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-white/10 bg-[#0d1118]/90 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Hardware Brand Plaque */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-600 shadow-md flex items-center justify-center p-0.5 relative">
            <div className="h-full w-full bg-[#080b11] rounded-[10px] flex items-center justify-center border border-black shadow-inner">
              <ShieldCheck className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-black text-lg tracking-wider text-slate-100">
                VETTING<span className="text-blue-400">COPILOT</span>
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-extrabold bg-blue-950 text-blue-300 border border-blue-700/60 rounded shadow-inner">
                TRACK C1 • MK-1
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              INSTITUTIONAL DUE DILIGENCE CONSOLE
            </p>
          </div>
        </div>

        {/* Live Hardware Bus Status */}
        <div className="flex items-center space-x-3">
          {/* Olostep Bus */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
            <div className="skeuo-led-green" />
            <span className="text-slate-400 text-[11px]">OLOSTEP BUS:</span>
            <span className="text-emerald-400 font-bold text-[11px]">ACTIVE</span>
          </div>

          {/* Crustdata Bus */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
            <div className="skeuo-led-green" />
            <span className="text-slate-400 text-[11px]">CRUSTDATA BUS:</span>
            <span className="text-emerald-400 font-bold text-[11px]">ACTIVE</span>
          </div>

          {/* GitHub Tactile Button */}
          <a
            href="https://github.com/TanmayNileshShinde/vetting-copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="skeuo-btn px-3 py-1.5 rounded-lg text-slate-200 text-xs font-mono font-bold flex items-center space-x-1.5"
          >
            <GitBranch className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline">GITHUB REPO</span>
          </a>
        </div>
      </div>
    </header>
  );
};
