import React, { useState } from 'react';
import { 
  Navigation, MapPin, Volume2, VolumeX, Compass, Bell 
} from 'lucide-react';
import { JOURNEY_DESTINATIONS } from '../../data/destinations';
import { JourneyDestination, JourneyDestinationId } from '../../types';
import { soundFx } from '../../audio/soundEffects';

interface GPSNavigationHUDProps {
  currentProgress: number; // 0.0 to 1.0
  speed: number;           // km/h
  onSelectDestination: (dest: JourneyDestination, instantOpen?: boolean) => void;
  isEcoMode: boolean;
  onToggleEco: () => void;
  activeDestinationModal: JourneyDestinationId | null;
}

export const GPSNavigationHUD: React.FC<GPSNavigationHUDProps> = ({
  currentProgress,
  speed,
  onSelectDestination,
  isEcoMode,
  onToggleEco,
  activeDestinationModal
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(soundFx.getIsSoundActive());

  const currentKm = (currentProgress * 6.2).toFixed(1);
  const displaySpeed = Math.round(speed * 35); // 0 to 60 km/h

  // Find nearest upcoming destination
  const upcomingDest = JOURNEY_DESTINATIONS.find((d) => d.progress >= currentProgress) || JOURNEY_DESTINATIONS[JOURNEY_DESTINATIONS.length - 1];

  const handleToggleSound = () => {
    const active = soundFx.toggleMute();
    setIsSoundActive(active);
  };

  const handleHonk = () => {
    soundFx.playHorn();
  };

  return (
    <>
      {/* Top GPS Header HUD Bar */}
      <div className="fixed top-3 left-4 right-4 z-40 pointer-events-none flex items-center justify-between">
        
        {/* Brand & Live GPS Position */}
        <div className="pointer-events-auto flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 rounded-2xl px-3.5 py-2 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
            <Navigation size={18} className="animate-spin" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-tech text-xs text-white font-bold tracking-wider">
                DEEPAK S // TECH RIDE
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono-tech">
                LIVE
              </span>
            </div>
            <div className="text-[10px] font-mono-tech text-slate-400 flex items-center space-x-1">
              <span>{upcomingDest.landmark}</span>
              <span>•</span>
              <span className="text-emerald-400">KM {currentKm}</span>
            </div>
          </div>
        </div>

        {/* Action Controls: GPS Menu, Horn, Sound, Eco */}
        <div className="pointer-events-auto flex items-center space-x-2">
          
          {/* Destination Navigation Dropdown Trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-2xl border text-xs font-tech font-bold tracking-wide transition shadow-lg backdrop-blur-md ${
              isMenuOpen
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-slate-950/85 border-emerald-500/30 text-emerald-300 hover:border-emerald-400'
            }`}
          >
            <MapPin size={15} />
            <span className="hidden sm:inline">WHERE TO?</span>
          </button>

          {/* Bike Horn */}
          <button
            onClick={handleHonk}
            title="Honk Bike Horn"
            className="p-2 rounded-2xl bg-slate-950/85 border border-slate-700 hover:border-amber-400 text-amber-400 transition"
          >
            <Bell size={16} />
          </button>

          {/* Audio Toggle (OFF by default) */}
          <button
            onClick={handleToggleSound}
            title={isSoundActive ? 'Audio ON (Click to mute)' : 'Audio OFF (Click to unmute)'}
            className={`p-2 rounded-2xl border transition ${
              isSoundActive
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                : 'bg-slate-950/85 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isSoundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Eco / 8GB RAM Switch */}
          <button
            onClick={() => {
              soundFx.playClick();
              onToggleEco();
            }}
            title={isEcoMode ? 'Eco Mode: ON (Optimized for 8GB RAM)' : 'Hi-Fi Mode Active'}
            className={`px-2.5 py-1.5 rounded-2xl border text-[10px] font-mono-tech transition ${
              isEcoMode
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                : 'bg-slate-950/85 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isEcoMode ? 'ECO 8GB' : 'HI-FI'}
          </button>
        </div>
      </div>

      {/* Floating GPS Destination Drawer */}
      {isMenuOpen && (
        <div className="fixed top-16 right-4 z-40 w-80 sm:w-96 bg-slate-950/95 border border-emerald-500/40 rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center space-x-2">
              <Compass className="text-emerald-400" size={18} />
              <h3 className="font-tech text-xs text-white font-bold tracking-wider uppercase">
                GPS ROUTE PLANNER // NH-47
              </h3>
            </div>
            <span className="text-[10px] font-mono-tech text-emerald-400">
              {JOURNEY_DESTINATIONS.length} MILESTONES
            </span>
          </div>

          <p className="text-[11px] font-mono-tech text-slate-400 mb-3">
            Where would you like to travel? Select a destination to ride toward it or skip directly:
          </p>

          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {JOURNEY_DESTINATIONS.filter((d) => d.id !== 'HERO').map((dest, idx) => {
              const isPassed = currentProgress >= dest.progress;
              const isActive = activeDestinationModal === dest.id;

              return (
                <div
                  key={dest.id}
                  className={`p-2.5 rounded-2xl border transition flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : isPassed
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-900/90 border-slate-800/80 text-white hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-700 text-slate-300 flex items-center justify-center font-mono-tech text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-tech text-xs font-bold leading-tight">
                        {dest.label}
                      </h4>
                      <span className="text-[10px] font-mono-tech text-slate-400 block">
                        {dest.kmMarker} • {dest.landmark}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {/* Ride to Destination */}
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setIsMenuOpen(false);
                        onSelectDestination(dest, false);
                      }}
                      className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-tech text-emerald-300 transition"
                      title="Ride motorcycle to this station"
                    >
                      RIDE
                    </button>
                    {/* Instant Open */}
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setIsMenuOpen(false);
                        onSelectDestination(dest, true);
                      }}
                      className="px-2 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[10px] font-tech font-bold text-black transition"
                      title="Open destination modal directly"
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-xs font-mono-tech text-slate-400 hover:text-white"
            >
              CLOSE GPS
            </button>
          </div>
        </div>
      )}

      {/* Bottom Dashboard Speedometer & Trip Computer HUD */}
      <div className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Speedometer & Gear telemetry */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          <div className="w-11 h-11 rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-col items-center justify-center">
            <span className="font-tech text-sm font-black text-emerald-400 leading-none">
              {displaySpeed}
            </span>
            <span className="text-[8px] font-mono-tech text-slate-400 leading-none mt-0.5">
              KM/H
            </span>
          </div>

          <div className="font-mono-tech text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="text-white font-tech font-bold">GEAR:</span>
              <span className="text-emerald-400 font-bold">{displaySpeed > 30 ? '4TH' : displaySpeed > 10 ? '2ND' : 'NEUTRAL'}</span>
            </div>
            <div className="text-[10px] text-slate-400">
              TRIP: {currentKm} / 6.2 KM
            </div>
          </div>
        </div>

        {/* Continuous Road Trip Progress Tracker */}
        <div className="pointer-events-auto w-full sm:max-w-md bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between items-center text-[10px] font-mono-tech text-slate-300 mb-1.5">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>ROAD TRIP PROGRESS</span>
            </span>
            <span className="text-emerald-400 font-bold">
              {Math.round(currentProgress * 100)}%
            </span>
          </div>

          {/* Progress Route Bar */}
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              style={{ width: `${Math.min(currentProgress * 100, 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono-tech text-slate-500 mt-1">
            <span>START</span>
            <span>ABOUT</span>
            <span>PROJECTS</span>
            <span>SKILLS</span>
            <span>SECE IT</span>
            <span>CONTACT</span>
          </div>
        </div>

        {/* Driving Controls Hint */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-2xl px-3 py-2 text-[10px] font-mono-tech text-slate-400">
          <span className="text-emerald-400 font-bold">SCROLL WHEEL</span>
          <span>OR</span>
          <span className="text-emerald-400 font-bold">ARROW KEYS / W S</span>
          <span>TO RIDE</span>
        </div>

      </div>
    </>
  );
};
