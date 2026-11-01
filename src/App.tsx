import { useState } from 'react';
import { MotorcycleAssemblyIntro } from './components/intro/MotorcycleAssemblyIntro';
import { CircularLaunchPage } from './components/launch/CircularLaunchPage';
import { SectionJourneyView } from './components/journey/SectionJourneyView';
import { CustomCursor } from './components/common/CustomCursor';
import { SectionId } from './types';
import { SECTION_JOURNEYS } from './data/journeysData';

export const App = () => {
  const [hasCompletedIntro, setHasCompletedIntro] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<SectionId | null>(null);
  const [isEcoMode, setIsEcoMode] = useState<boolean>(false);

  const handleSelectJourney = (sectionId: SectionId) => {
    setActiveSectionId(sectionId);
  };

  const handleReturnToLaunch = () => {
    setActiveSectionId(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#070d19] text-white select-none">
      {/* 1. Opening Motorcycle Assembly Intro */}
      {!hasCompletedIntro && (
        <MotorcycleAssemblyIntro onComplete={() => setHasCompletedIntro(true)} />
      )}

      {/* 2. Desktop Custom Reticle Cursor */}
      <CustomCursor />

      {/* 3. Main Modes: Circular Launch Page vs Section Journey */}
      {hasCompletedIntro && !activeSectionId && (
        <CircularLaunchPage
          onSelectJourney={handleSelectJourney}
          isEcoMode={isEcoMode}
          onToggleEco={() => setIsEcoMode(!isEcoMode)}
        />
      )}

      {hasCompletedIntro && activeSectionId && (
        <SectionJourneyView
          journeyConfig={SECTION_JOURNEYS[activeSectionId]}
          onReturnToLaunch={handleReturnToLaunch}
          onSelectAnotherJourney={handleSelectJourney}
          isEcoMode={isEcoMode}
          onToggleEco={() => setIsEcoMode(!isEcoMode)}
        />
      )}
    </div>
  );
};

export default App;
