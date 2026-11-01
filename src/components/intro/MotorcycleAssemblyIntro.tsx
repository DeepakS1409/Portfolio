import { useState, useEffect } from 'react';
import { Sparkles, FastForward, Navigation as CompassIcon, Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../../audio/soundEffects';

interface MotorcycleAssemblyIntroProps {
  onComplete: () => void;
}

export const MotorcycleAssemblyIntro = ({ onComplete }: MotorcycleAssemblyIntroProps) => {
  const [step, setStep] = useState(0);
  const [isSoundActive, setIsSoundActive] = useState(soundFx.getIsSoundActive());

  const assemblyStages = [
    { name: 'CHASSIS & ENGINE COUPLING', label: 'Mounting twin-cylinder block to tubular frame' },
    { name: 'FRONT & REAR SUSPENSION', label: 'Aligning telescopic chrome forks and mono-shock' },
    { name: 'FUEL TANK & BODYWORK', label: 'Locking metallic teal tank and aerodynamic fairings' },
    { name: 'ELECTRICS & HEADLIGHT', label: 'Calibrating digital HUD and LED projection beam' },
    { name: 'IGNITION READY', label: 'Engine fired up • Ready to ride NH-47' }
  ];

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(1);
      soundFx.playGearShift();
    }, 800);

    const t2 = setTimeout(() => {
      setStep(2);
      soundFx.playGearShift();
    }, 1600);

    const t3 = setTimeout(() => {
      setStep(3);
      soundFx.playGearShift();
    }, 2400);

    const t4 = setTimeout(() => {
      setStep(4);
      soundFx.playEngineStart();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleStart = () => {
    soundFx.playThrottleRev(1.2);
    onComplete();
  };

  const handleSkip = () => {
    soundFx.playClick();
    onComplete();
  };

  const handleToggleSound = () => {
    const active = soundFx.toggleMute();
    setIsSoundActive(active);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070d19] flex flex-col items-center justify-center p-6 text-white select-none overflow-hidden">
      {/* Background Indian Road Map Vignette */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs font-mono-tech text-emerald-400">
          <CompassIcon size={14} className="animate-spin" />
          <span>NH-47 • TAMIL NADU ROAD TRIP</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Sound Toggle (OFF by default) */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-full border transition ${
              isSoundActive
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                : 'bg-slate-900/80 border-slate-700 text-slate-400'
            }`}
            title={isSoundActive ? 'Audio ON' : 'Audio OFF (Default)'}
          >
            {isSoundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Skip Intro */}
          <button
            onClick={handleSkip}
            className="flex items-center space-x-1 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 hover:bg-slate-800 transition"
          >
            <span>SKIP INTRO</span>
            <FastForward size={14} />
          </button>
        </div>
      </div>

      {/* Central Visual Assembly Stage */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        {/* Animated Motorcycle Emblem */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/50 animate-spin" />
          {/* Inner pulsating ring */}
          <div className="absolute inset-2 rounded-full border border-cyan-400/40 animate-pulse" />
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.5)]">
            <span className="font-tech text-2xl font-black text-black">🏍️</span>
          </div>
        </div>

        {/* Welcome Tagline */}
        <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono-tech text-xs uppercase tracking-wider mb-2">
          3D EXPLORATION EXPERIENCE
        </span>

        <h1 className="font-tech text-3xl sm:text-5xl font-black text-white tracking-wide uppercase mb-2">
          WELCOME TO MY WORLD
        </h1>

        <p className="font-mono-tech text-cyan-400 text-sm mb-4">
          DEEPAK S // B.TECH INFORMATION TECHNOLOGY
        </p>

        <p className="text-slate-300 text-base font-light italic mb-8 max-w-md">
          "Ready to Explore? Embark on an interactive motorcycle journey across my projects, skills, and engineering milestones."
        </p>

        {/* Assembly Step Indicators */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-8 text-left">
          <div className="flex items-center justify-between text-[11px] font-mono-tech text-slate-400 mb-2">
            <span>MOTORCYCLE ASSEMBLY TELEMETRY</span>
            <span className="text-emerald-400 font-bold">{((step + 1) / 5) * 100}%</span>
          </div>

          {/* Stepper bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 rounded-full"
              style={{ width: `${((step + 1) / 5) * 100}%` }}
            />
          </div>

          <div className="text-xs font-mono-tech text-emerald-300 font-semibold">
            &gt; {assemblyStages[step].name}
          </div>
          <div className="text-[11px] font-mono-tech text-slate-400">
            {assemblyStages[step].label}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStart}
          className="flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-tech font-bold text-sm tracking-wider uppercase transition shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105"
        >
          <Sparkles size={16} />
          <span>START JOURNEY</span>
        </button>
      </div>
    </div>
  );
};
