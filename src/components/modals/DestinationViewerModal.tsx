import { X, Navigation, ArrowRight } from 'lucide-react';
import { JourneyDestinationId } from '../../types';
import { JOURNEY_DESTINATIONS } from '../../data/destinations';
import { AboutSection } from '../sections/AboutSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';
import { HardwareLabSection } from '../sections/HardwareLabSection';
import { JourneyTimeline } from '../sections/JourneyTimeline';
import { ContactSection } from '../sections/ContactSection';
import { soundFx } from '../../audio/soundEffects';

interface DestinationViewerModalProps {
  destinationId: JourneyDestinationId | null;
  onClose: () => void;
  onContinueToNext?: () => void;
}

export const DestinationViewerModal = ({
  destinationId,
  onClose,
  onContinueToNext
}: DestinationViewerModalProps) => {
  if (!destinationId || destinationId === 'HERO') return null;

  const currentDest = JOURNEY_DESTINATIONS.find((d) => d.id === destinationId);
  const currentIndex = JOURNEY_DESTINATIONS.findIndex((d) => d.id === destinationId);
  const nextDest = currentIndex < JOURNEY_DESTINATIONS.length - 1 ? JOURNEY_DESTINATIONS[currentIndex + 1] : null;

  const handleClose = () => {
    soundFx.playClick();
    onClose();
  };

  const handleContinue = () => {
    soundFx.playThrottleRev(0.9);
    onClose();
    if (onContinueToNext) {
      onContinueToNext();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      
      {/* Main Exhibition Card */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-950 border border-emerald-500/40 rounded-3xl flex flex-col shadow-[0_0_60px_rgba(16,185,129,0.25)] overflow-hidden">
        
        {/* Top Destination Header Ribbon */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-400">
              <Navigation size={18} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-tech text-base sm:text-lg text-white font-bold tracking-wide">
                  {currentDest?.signTitle || 'DESTINATION EXHIBITION'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-mono-tech text-[10px]">
                  {currentDest?.kmMarker}
                </span>
              </div>
              <span className="text-[11px] font-mono-tech text-slate-400">
                {currentDest?.landmark} • {currentDest?.signSubtitle}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Section Content Container */}
        <div className="overflow-y-auto flex-1 p-2 sm:p-6 custom-scrollbar">
          {destinationId === 'ABOUT' && <AboutSection />}
          {destinationId === 'PROJECTS' && <ProjectsSection />}
          {destinationId === 'SKILLS' && <SkillsSection />}
          {destinationId === 'EDUCATION' && <AboutSection />}
          {destinationId === 'ACHIEVEMENTS' && <JourneyTimeline />}
          {destinationId === 'HARDWARE' && <HardwareLabSection />}
          {destinationId === 'CONTACT' && <ContactSection />}
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] font-mono-tech text-slate-400">
            ROAD TRIP: NH-47 COIMBATORE • SECE IT '28
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-tech text-xs tracking-wider uppercase transition"
            >
              STAY HERE
            </button>

            <button
              onClick={handleContinue}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-tech font-bold text-xs tracking-wider uppercase transition flex items-center space-x-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              <span>CONTINUE JOURNEY</span>
              {nextDest && <ArrowRight size={14} />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
