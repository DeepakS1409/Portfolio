import React, { useState, useEffect } from 'react';
import { FastForward, Shield, Cpu, Activity } from 'lucide-react';
import { soundFx } from '../../audio/soundEffects';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Progressive boot sequence steps:
  // 0: Black screen, initializing core
  // 1: Circuit traces and power grid online
  // 2: Robotic actuators calibrating
  // 3: Holographic UI initialization
  // 4: System ready -> trigger entry
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(1);
      soundFx.playModeSwitch();
    }, 600);

    const timer2 = setTimeout(() => {
      setStage(2);
      soundFx.playLaserWeld();
    }, 1500);

    const timer3 = setTimeout(() => {
      setStage(3);
      soundFx.playHover();
    }, 2500);

    const timer4 = setTimeout(() => {
      setStage(4);
      soundFx.playSuccess();
    }, 3600);

    const timerEnd = setTimeout(() => {
      onComplete();
    }, 4500);

    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 80);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timerEnd);
      clearInterval(interval);
    };
  }, [onComplete]);

  const handleSkip = () => {
    soundFx.playClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Cyber Grid & Vignette */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25" />
      <div className="scanline-overlay" />

      {/* Top Right Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-300 font-mono-tech text-xs hover:bg-cyan-950/80 hover:border-cyan-400 transition shadow-[0_0_15px_rgba(0,242,254,0.3)]"
      >
        <span>SKIP INTRO</span>
        <FastForward size={14} />
      </button>

      {/* Central Sequence Card */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        {/* Animated Cyber Reactor Core */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400 animate-spin" />
          <div className="absolute inset-4 rounded-full border border-purple-500/50 animate-pulse" />
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_30px_#00f2fe]">
            <Cpu className="text-black" size={26} />
          </div>
        </div>

        {/* System Boot Status Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 font-mono-tech text-[11px]">
          <span className={`px-2.5 py-1 rounded border transition-all duration-300 ${stage >= 1 ? 'border-cyan-500 text-cyan-300 bg-cyan-950/60' : 'border-slate-800 text-slate-600'}`}>
            <Activity size={12} className="inline mr-1" />
            POWER GRID: OK
          </span>
          <span className={`px-2.5 py-1 rounded border transition-all duration-300 ${stage >= 2 ? 'border-cyan-500 text-cyan-300 bg-cyan-950/60' : 'border-slate-800 text-slate-600'}`}>
            <Cpu size={12} className="inline mr-1" />
            3D ROBOTICS: ENGAGED
          </span>
          <span className={`px-2.5 py-1 rounded border transition-all duration-300 ${stage >= 3 ? 'border-purple-500 text-purple-300 bg-purple-950/60' : 'border-slate-800 text-slate-600'}`}>
            <Shield size={12} className="inline mr-1" />
            HOLOGRAM MATRIX: ONLINE
          </span>
        </div>

        {/* Portfolio Owner Identity */}
        <h1 className="font-tech text-3xl sm:text-5xl font-black text-white tracking-wider holo-glow-cyan uppercase mb-2">
          DEEPAK S
        </h1>

        <p className="font-mono-tech text-xs sm:text-sm text-cyan-400 mb-6 tracking-wide">
          B.TECH IT • SRI ESHWAR COLLEGE OF ENGINEERING
        </p>

        {/* Tagline */}
        <div className="p-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl mb-8 max-w-lg">
          <p className="text-slate-200 text-xs sm:text-sm font-light italic">
            "Exploring Technology. Engineering Possibilities. Building the Future."
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-sm mb-2">
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-100 shadow-[0_0_10px_#00f2fe]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono-tech text-slate-400 mt-2">
            <span>LAB ENGINE INITIALIZING</span>
            <span className="text-cyan-400">{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
