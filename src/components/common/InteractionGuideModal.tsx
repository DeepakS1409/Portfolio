import React from 'react';
import { X, MousePointer, RotateCcw, Volume2, Cpu, ShieldCheck } from 'lucide-react';
import { soundFx } from '../../audio/soundEffects';

interface InteractionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractionGuideModal: React.FC<InteractionGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-950 border border-cyan-500/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,242,254,0.3)] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4">
          <div className="flex items-center space-x-2">
            <Cpu className="text-cyan-400" size={20} />
            <h3 className="font-tech text-base text-white tracking-wide">
              INNOVATION LAB // PROTOCOL GUIDE
            </h3>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content list */}
        <div className="space-y-4 text-xs font-mono-tech text-slate-300">
          <div className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-900/60 border border-cyan-500/10">
            <MousePointer className="text-cyan-400 shrink-0 mt-0.5" size={16} />
            <div>
              <span className="text-cyan-300 font-semibold font-tech block text-sm">3D VIRTUAL SCENE EXPLORATION</span>
              <span>Click & drag inside 3D views to rotate perspective. Hover over components in the Lab and Hardware Inspector to scan telemetry data.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-900/60 border border-cyan-500/10">
            <RotateCcw className="text-purple-400 shrink-0 mt-0.5" size={16} />
            <div>
              <span className="text-purple-300 font-semibold font-tech block text-sm">ZONE TELEPORTATION</span>
              <span>Use the Lab HUD buttons to switch camera focus between Central Lab, Hardware Bench, AI Matrix, and Project Holograms.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-900/60 border border-cyan-500/10">
            <Volume2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
            <div>
              <span className="text-emerald-300 font-semibold font-tech block text-sm">SYNTHETIC AUDIO SYSTEM</span>
              <span>Audio is completely muted by default. Toggle the top-bar speaker icon to enable futuristic synthesized interaction chimes & ambient lab hum.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-900/60 border border-cyan-500/10">
            <ShieldCheck className="text-cyan-400 shrink-0 mt-0.5" size={16} />
            <div>
              <span className="text-cyan-300 font-semibold font-tech block text-sm">HONEST METRICS & EDITABLE PLACEHOLDERS</span>
              <span>Hardware technologies are presented strictly as explored interests. Academic milestones at Sri Eshwar College of Engineering and project statuses reflect actual first-year progress.</span>
            </div>
          </div>
        </div>

        {/* Dismiss button */}
        <div className="mt-6 pt-3 border-t border-cyan-500/20 flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-bold text-xs tracking-wider transition shadow-[0_0_15px_rgba(0,242,254,0.4)]"
          >
            ENTER LAB SYSTEM
          </button>
        </div>
      </div>
    </div>
  );
};
