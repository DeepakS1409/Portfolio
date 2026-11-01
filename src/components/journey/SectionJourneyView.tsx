import { useState, useEffect, useRef, useCallback } from 'react';
import { SectionJourneyConfig, SectionId } from '../../types';
import { SectionRoadCanvas } from '../canvas/SectionRoadCanvas';
import { LargeContentPanel } from './LargeContentPanel';
import { JourneyCompletionScreen } from './JourneyCompletionScreen';
import { soundFx } from '../../audio/soundEffects';
import { 
  RotateCcw, Compass, Bell, Volume2, VolumeX 
} from 'lucide-react';

interface SectionJourneyViewProps {
  journeyConfig: SectionJourneyConfig;
  onReturnToLaunch: () => void;
  onSelectAnotherJourney: (sectionId: SectionId) => void;
  isEcoMode: boolean;
  onToggleEco: () => void;
}

export const SectionJourneyView = ({
  journeyConfig,
  onReturnToLaunch,
  onSelectAnotherJourney,
  isEcoMode
}: SectionJourneyViewProps) => {
  const [progress, setProgress] = useState<number>(0.08); // start at beginning of road
  const [speed, setSpeed] = useState<number>(0.0);
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isSoundActive, setIsSoundActive] = useState<boolean>(soundFx.getIsSoundActive());

  const progressRef = useRef<number>(0.08);
  const speedRef = useRef<number>(0.0);
  const targetProgressRef = useRef<number | null>(null);
  const isAcceleratingRef = useRef<boolean>(false);
  const accelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync continuous sports bike engine audio lifecycle
  useEffect(() => {
    if (soundFx.getIsSoundActive()) {
      soundFx.startContinuousAudio();
    }
    return () => {
      soundFx.stopContinuousAudio();
    };
  }, []);

  useEffect(() => {
    progressRef.current = progress;
    speedRef.current = speed;

    // Determine nearest station based on motorcycle progress
    let nearestIdx = 0;
    let minDiff = 999;
    journeyConfig.stations.forEach((st, idx) => {
      const diff = Math.abs(st.progress - progress);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIdx = idx;
      }
    });

    setActiveStationIndex(nearestIdx);

    // Check if journey reached completion
    if (progress >= 0.96) {
      setIsCompleted(true);
    }
  }, [progress, speed, journeyConfig.stations]);

  const triggerThrottle = useCallback(() => {
    isAcceleratingRef.current = true;
    if (accelTimerRef.current) clearTimeout(accelTimerRef.current);
    accelTimerRef.current = setTimeout(() => {
      isAcceleratingRef.current = false;
    }, 280);
  }, []);

  // Handle Wheel Scroll Navigation
  useEffect(() => {
    if (isCompleted) return;

    let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const step = 0.007;

      targetProgressRef.current = null; // manual override
      triggerThrottle();

      setProgress((prev) => {
        const next = Math.max(0.04, Math.min(1.0, prev + dir * step));
        progressRef.current = next;
        return next;
      });

      setSpeed((prev) => {
        const nSpeed = Math.min(prev + 0.16, 1.8);
        speedRef.current = nSpeed;
        return nSpeed;
      });

      if (!throttleTimeout) {
        soundFx.playThrottleRev(0.85);
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
        }, 220);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [isCompleted, triggerThrottle]);

  // Handle Keyboard Navigation (Arrow Keys / WASD)
  useEffect(() => {
    if (isCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'KeyS', 'KeyD'].includes(e.code)) {
        targetProgressRef.current = null;
        triggerThrottle();
        setProgress((prev) => Math.min(1.0, prev + 0.015));
        setSpeed((prev) => {
          const nSpeed = Math.min(prev + 0.2, 1.8);
          speedRef.current = nSpeed;
          return nSpeed;
        });
        soundFx.playThrottleRev(0.95);
      } else if (['ArrowUp', 'ArrowLeft', 'KeyW', 'KeyA'].includes(e.code)) {
        targetProgressRef.current = null;
        triggerThrottle();
        setProgress((prev) => Math.max(0.04, prev - 0.015));
        setSpeed((prev) => {
          const nSpeed = Math.min(prev + 0.2, 1.8);
          speedRef.current = nSpeed;
          return nSpeed;
        });
        soundFx.playThrottleRev(0.95);
      } else if (e.code === 'Space' || e.code === 'KeyH') {
        soundFx.playHorn();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCompleted, triggerThrottle]);

  // Target progress animation loop, speed decay & continuous engine audio sync
  useEffect(() => {
    let animId: number;

    const updateLoop = () => {
      if (targetProgressRef.current !== null) {
        const diff = targetProgressRef.current - progressRef.current;
        if (Math.abs(diff) > 0.002) {
          const moveStep = Math.sign(diff) * Math.min(Math.abs(diff) * 0.09, 0.014);
          progressRef.current += moveStep;
          setProgress(progressRef.current);
          setSpeed(1.2);
          speedRef.current = 1.2;
          isAcceleratingRef.current = true;
        } else {
          progressRef.current = targetProgressRef.current;
          setProgress(targetProgressRef.current);
          targetProgressRef.current = null;
          setSpeed(0);
          speedRef.current = 0;
          isAcceleratingRef.current = false;
        }
      } else {
        setSpeed((prev) => {
          const decayed = prev * 0.91;
          const current = decayed < 0.02 ? 0 : decayed;
          speedRef.current = current;
          return current;
        });
      }

      // Update authentic procedural engine audio, revs, and wind rush dynamically
      soundFx.updateMotorcycleEngine(speedRef.current, isAcceleratingRef.current, 0.016);

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Jump smoothly to a specific station
  const jumpToStation = useCallback((index: number) => {
    const station = journeyConfig.stations[index];
    if (station) {
      targetProgressRef.current = station.progress;
      triggerThrottle();
      soundFx.playThrottleRev(1.15);
    }
  }, [journeyConfig.stations, triggerThrottle]);

  const handleNextStation = () => {
    if (activeStationIndex < journeyConfig.stations.length - 1) {
      jumpToStation(activeStationIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevStation = () => {
    if (activeStationIndex > 0) {
      jumpToStation(activeStationIndex - 1);
    }
  };

  const handleToggleSound = () => {
    const active = soundFx.toggleMute();
    setIsSoundActive(active);
  };

  const activeStation = journeyConfig.stations[activeStationIndex] || journeyConfig.stations[0];
  const displaySpeed = Math.round(speed * 36);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#070d19] text-white select-none">
      
      {/* 3D Road Scene */}
      <div className="absolute inset-0 z-0">
        <SectionRoadCanvas
          journeyConfig={journeyConfig}
          progress={progress}
          speed={speed}
          onSelectStation={jumpToStation}
          isEcoMode={isEcoMode}
        />
      </div>

      {/* Top Journey Navigation HUD */}
      <header className="fixed top-3 left-4 right-4 z-40 pointer-events-none flex items-center justify-between">
        
        {/* Road & Section Info */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 rounded-2xl px-4 py-2 shadow-lg">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-black shadow-md"
            style={{ backgroundColor: journeyConfig.themeColor }}
          >
            <Compass size={18} className="animate-spin" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-tech text-xs sm:text-sm font-black text-white tracking-wider uppercase">
                {journeyConfig.roadTitle}
              </h1>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                STATION {activeStationIndex + 1}/{journeyConfig.stations.length}
              </span>
            </div>
            <p className="text-[10px] font-mono-tech text-slate-400">
              {journeyConfig.roadSubtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons: Return to Launchpad, Horn, Sound Toggle */}
        <div className="pointer-events-auto flex items-center space-x-2">
          
          {/* Prominent Return to Navigation Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              soundFx.stopContinuousAudio();
              onReturnToLaunch();
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-tech font-bold text-xs tracking-wider uppercase transition shadow-[0_0_15px_rgba(16,185,129,0.4)] backdrop-blur-md"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">RETURN TO NAVIGATION</span>
            <span className="sm:hidden">EXIT</span>
          </button>

          {/* Horn */}
          <button
            onClick={() => soundFx.playHorn()}
            title="Honk Motorcycle Horn"
            className="p-2 rounded-2xl bg-slate-950/85 border border-slate-700 text-amber-400 hover:border-amber-400 transition backdrop-blur-md"
          >
            <Bell size={16} />
          </button>

          {/* Authentic Motorcycle Engine & Environment Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            title={
              isSoundActive
                ? 'Sound ON (Click to Mute)'
                : 'Sound OFF (Click to Enable Authentic Motorcycle Engine & Ambient Audio)'
            }
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-2xl border transition backdrop-blur-md shadow-md ${
              isSoundActive
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.4)]'
                : 'bg-slate-950/85 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {isSoundActive ? (
              <Volume2 size={16} className="text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX size={16} />
            )}
            <span className="font-mono-tech text-[10px] font-bold tracking-wider">
              {isSoundActive ? 'AUDIO: ON' : 'AUDIO: OFF'}
            </span>
          </button>
        </div>
      </header>

      {/* Speedometer & Gear HUD (Bottom Left) */}
      <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-3 bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-2.5 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-col items-center justify-center">
            <span className="font-tech text-xs sm:text-sm font-black text-emerald-400 leading-none">
              {displaySpeed}
            </span>
            <span className="text-[7px] font-mono-tech text-slate-400 leading-none mt-0.5">
              KM/H
            </span>
          </div>

          <div className="font-mono-tech text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="text-white font-tech font-bold">STATION:</span>
              <span className="text-emerald-400 font-bold">{activeStation.kmMarker}</span>
            </div>
            <div className="text-[10px] text-slate-400">
              GEAR: {displaySpeed > 25 ? '3RD' : displaySpeed > 8 ? '2ND' : '1ST'}
            </div>
          </div>
        </div>
      </div>

      {/* Large Content Showcase Panel Automatically Displaying the Current Station */}
      <LargeContentPanel
        station={activeStation}
        sectionId={journeyConfig.id}
        totalStations={journeyConfig.stations.length}
        onNextStation={handleNextStation}
        onPrevStation={handlePrevStation}
        hasNext={activeStationIndex < journeyConfig.stations.length - 1}
        hasPrev={activeStationIndex > 0}
      />

      {/* Journey Completion Screen when Reaching the End of Road */}
      {isCompleted && (
        <JourneyCompletionScreen
          journeyConfig={journeyConfig}
          onReturnToNavigation={() => {
            soundFx.stopContinuousAudio();
            onReturnToLaunch();
          }}
          onSelectAnotherJourney={onSelectAnotherJourney}
        />
      )}

    </div>
  );
};
