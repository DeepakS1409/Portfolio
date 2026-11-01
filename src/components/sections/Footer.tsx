import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundFx } from '../../audio/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#02050e] border-t border-cyan-500/20 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-slate-800/80 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-tech font-black text-lg shadow-[0_0_15px_rgba(0,242,254,0.4)]">
              D
            </div>
            <div>
              <span className="font-tech text-base font-bold text-white block">
                DEEPAK S // INNOVATION LAB
              </span>
              <span className="text-[10px] font-mono-tech text-cyan-400">
                SRI ESHWAR COLLEGE OF ENGINEERING • DEPARTMENT OF IT
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 transition text-xs font-mono-tech group"
          >
            <span>ELEVATE TO SURFACE</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Middle Tier: System Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-b border-slate-800/80 font-mono-tech text-xs">
          <div>
            <span className="text-slate-500 text-[10px] block">CORE ARCHITECTURE</span>
            <span className="text-white">React 18 + TypeScript</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">3D ACCELERATION</span>
            <span className="text-cyan-400">Three.js + R3F + Drei</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">AUDIO SUBSYSTEM</span>
            <span className="text-purple-400">Web Audio API Synth</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">ENGINEERING COHORT</span>
            <span className="text-emerald-400">B.Tech Information Technology | 2026–2030</span>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Mission statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tech text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} Deepak S. Designed and engineered for high-performance 3D web experience.
          </p>

          <div className="flex items-center space-x-1 text-slate-400">
            <span>Built with precision & curiosity at</span>
            <span className="text-cyan-400 font-tech">SECE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
