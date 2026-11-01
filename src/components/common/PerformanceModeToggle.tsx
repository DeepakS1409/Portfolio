import React from 'react';
import { Gauge } from 'lucide-react';
import { soundFx } from '../../audio/soundEffects';

interface PerformanceModeToggleProps {
  isEcoMode: boolean;
  onToggle: () => void;
}

export const PerformanceModeToggle: React.FC<PerformanceModeToggleProps> = ({
  isEcoMode,
  onToggle
}) => {
  return (
    <button
      onClick={() => {
        soundFx.playClick();
        onToggle();
      }}
      title={isEcoMode ? 'Eco Mode Active (Optimized for 8GB RAM & Battery)' : 'High Fidelity 3D Mode Active'}
      className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono-tech border transition-all duration-200 backdrop-blur-md ${
        isEcoMode
          ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
          : 'bg-slate-900/80 border-cyan-500/30 text-cyan-400 hover:border-cyan-400'
      }`}
    >
      <Gauge size={13} className={isEcoMode ? 'text-emerald-400' : 'text-cyan-400'} />
      <span className="hidden md:inline">{isEcoMode ? 'ECO 8GB' : 'HI-FI 3D'}</span>
    </button>
  );
};
