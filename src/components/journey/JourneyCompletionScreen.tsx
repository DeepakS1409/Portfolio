import React from 'react';
import { SectionJourneyConfig, SectionId } from '../../types';
import { SECTION_JOURNEYS } from '../../data/journeysData';
import { 
  Trophy, RotateCcw, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { soundFx } from '../../audio/soundEffects';

interface JourneyCompletionScreenProps {
  journeyConfig: SectionJourneyConfig;
  onReturnToNavigation: () => void;
  onSelectAnotherJourney: (sectionId: SectionId) => void;
}

export const JourneyCompletionScreen: React.FC<JourneyCompletionScreenProps> = ({
  journeyConfig,
  onReturnToNavigation,
  onSelectAnotherJourney
}) => {
  const otherSections = (Object.keys(SECTION_JOURNEYS) as SectionId[]).filter(
    (id) => id !== journeyConfig.id
  );

  return (
    <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="relative max-w-xl w-full bg-slate-950 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(16,185,129,0.3)]">
        
        {/* Trophy Animation */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-ping" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)]">
            <Trophy className="text-black" size={32} />
          </div>
        </div>

        {/* Milestone Completed Banner */}
        <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-mono-tech text-xs uppercase tracking-wider mb-2 inline-block">
          ROAD TRIP COMPLETED
        </span>

        <h2 className="font-tech text-2xl sm:text-4xl font-black text-white tracking-wide uppercase mb-2">
          {journeyConfig.name} Journey Finished!
        </h2>

        <p className="font-mono-tech text-slate-300 text-xs sm:text-sm mb-6 max-w-md mx-auto">
          You have successfully ridden along the <strong className="text-emerald-400">{journeyConfig.roadTitle}</strong> and explored all {journeyConfig.stations.length} destinations.
        </p>

        {/* Stations checklist */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-8 text-left space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest block mb-2">
            // COMPLETED ROAD STATIONS ({journeyConfig.stations.length}/{journeyConfig.stations.length})
          </span>
          {journeyConfig.stations.map((st) => (
            <div key={st.id} className="flex items-center space-x-2 text-xs font-mono-tech text-slate-300">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span className="font-tech text-white font-semibold">{st.title}</span>
              <span className="text-slate-500 text-[10px]">({st.kmMarker})</span>
            </div>
          ))}
        </div>

        {/* Prominent Return to Navigation Button */}
        <button
          onClick={() => {
            soundFx.playThrottleRev(1.2);
            onReturnToNavigation();
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-tech font-bold text-sm tracking-wider uppercase transition shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center space-x-2 hover:scale-[1.02] mb-5"
        >
          <RotateCcw size={18} />
          <span>RETURN TO NAVIGATION LAUNCHPAD</span>
        </button>

        {/* Select Another Journey shortcut */}
        <div className="pt-4 border-t border-slate-800 text-left">
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block mb-2">
            OR RIDE ANOTHER SECTION DIRECTLY:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {otherSections.map((secId) => {
              const sec = SECTION_JOURNEYS[secId];
              return (
                <button
                  key={secId}
                  onClick={() => {
                    soundFx.playThrottleRev(1.0);
                    onSelectAnotherJourney(secId);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white font-tech text-xs tracking-wider uppercase transition flex items-center space-x-1"
                >
                  <span>{sec.name}</span>
                  <ArrowRight size={11} className="text-emerald-400" />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
