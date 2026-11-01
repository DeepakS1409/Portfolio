import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFx } from '../../audio/soundEffects';

export const AudioToggle: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(soundFx.getIsSoundActive());
  const [ambientActive, setAmbientActive] = useState<boolean>(false);

  const handleToggleFX = () => {
    const newState = soundFx.toggleMute();
    setIsActive(newState);
    if (!newState) {
      setAmbientActive(false);
    }
  };

  const handleToggleAmbient = () => {
    if (!isActive) {
      soundFx.toggleMute();
      setIsActive(true);
    }
    if (!ambientActive) {
      soundFx.startAmbientHum();
      setAmbientActive(true);
    } else {
      soundFx.stopAmbientHum();
      setAmbientActive(false);
    }
  };

  return (
    <div className="flex items-center space-x-1.5 bg-slate-900/80 border border-cyan-500/30 rounded-full px-2.5 py-1 backdrop-blur-md">
      {/* Sound FX Toggle (OFF by default) */}
      <button
        onClick={handleToggleFX}
        title={isActive ? 'Sound Effects: ON (Click to mute)' : 'Sound Effects: OFF (Click to unmute)'}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          isActive 
            ? 'text-cyan-400 bg-cyan-950/80 shadow-[0_0_10px_rgba(0,242,254,0.5)]' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {isActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>

      {/* Lab Ambient Hum Toggle (OFF by default) */}
      <button
        onClick={handleToggleAmbient}
        title={ambientActive ? 'Ambient Lab Hum: Active' : 'Ambient Lab Hum: Off (Click to activate)'}
        className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tech flex items-center space-x-1 transition-all ${
          ambientActive 
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Sparkles size={11} className={ambientActive ? 'animate-spin' : ''} />
        <span className="hidden sm:inline">AMBIENT HUM</span>
      </button>
    </div>
  );
};
