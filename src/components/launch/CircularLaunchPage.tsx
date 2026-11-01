import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SectionId } from '../../types';
import { SECTION_JOURNEYS } from '../../data/journeysData';
import { soundFx } from '../../audio/soundEffects';
import { 
  FileDown, Volume2, VolumeX, Sparkles, 
  Layers, Cpu, User, GraduationCap, Trophy, Radio, Mail,
  Play, Pause, ChevronLeft, ChevronRight, ArrowRight, CircleDot, Award
} from 'lucide-react';

interface CircularLaunchPageProps {
  onSelectJourney: (sectionId: SectionId) => void;
  isEcoMode: boolean;
  onToggleEco: () => void;
}

const SECTION_KEYS: SectionId[] = [
  'projects',
  'skills',
  'about',
  'education',
  'achievements',
  'certificates',
  'hardware',
  'contact'
];

const renderSectionIcon = (iconName: string, className = 'text-white') => {
  const props = { size: 20, className };
  switch (iconName) {
    case 'Layers': return <Layers {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'User': return <User {...props} />;
    case 'GraduationCap': return <GraduationCap {...props} />;
    case 'Trophy': return <Trophy {...props} />;
    case 'Award': return <Award {...props} />;
    case 'Radio': return <Radio {...props} />;
    case 'Mail': return <Mail {...props} />;
    default: return <CircleDot {...props} />;
  }
};

export const CircularLaunchPage = ({
  onSelectJourney,
  isEcoMode,
  onToggleEco
}: CircularLaunchPageProps) => {
  const totalCards = SECTION_KEYS.length;

  // Single 3D Ring Rotation Angle (degrees: 0 to 360)
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const targetAngleRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startDragXRef = useRef<number>(0);
  const lastDragAngleRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);

  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const [isSoundActive, setIsSoundActive] = useState<boolean>(soundFx.getIsSoundActive());

  // Window resize listener for responsive 3D ring radius
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute ring radius based on screen dimensions
  const ringRadius = useMemo(() => {
    if (windowWidth < 640) return 290;
    if (windowWidth < 1024) return 380;
    return 460;
  }, [windowWidth]);

  // Downward vertical offset to center the front-facing card and keep all cards comfortably in-frame
  const ringOffsetY = useMemo(() => {
    if (windowWidth < 640) return 32;
    if (windowWidth < 1024) return 44;
    return 54;
  }, [windowWidth]);

  // Main 60FPS animation loop for continuous 360-degree rotation and smooth inertia
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isDragging) {
        if (isAutoRotating) {
          // Continuous 360-degree rotation (approx. 9 deg/sec)
          targetAngleRef.current += 9 * delta;
        }

        // Apply remaining drag momentum velocity
        if (Math.abs(velocityRef.current) > 0.05) {
          targetAngleRef.current += velocityRef.current;
          velocityRef.current *= 0.92; // smooth decay
        }
      }

      // Smooth dampening towards target angle
      setRotationAngle((prev) => {
        const diff = targetAngleRef.current - prev;
        return prev + diff * 0.12;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating, isDragging]);

  // Mouse drag & touch swipe event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startDragXRef.current = e.clientX;
    lastDragAngleRef.current = targetAngleRef.current;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startDragXRef.current;
    const now = performance.now();
    const timeElapsed = (now - lastDragTimeRef.current) || 16;
    
    // Convert horizontal pixels to degrees (drag left -> rotate right, drag right -> rotate left)
    const newAngle = lastDragAngleRef.current + deltaX * 0.28;
    const instantaneousVel = (newAngle - targetAngleRef.current) * (16 / timeElapsed);
    velocityRef.current = instantaneousVel * 0.4;

    targetAngleRef.current = newAngle;
    lastDragTimeRef.current = now;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Determine which card is currently closest to the front/center viewing position
  // Front viewing position is at angle = 0 degrees (Z = +R)
  const activeFrontIndex = useMemo(() => {
    let bestIdx = 0;
    let maxCos = -Infinity;

    for (let i = 0; i < totalCards; i++) {
      const cardBaseAngle = (i * 360) / totalCards;
      const currentCardAngle = (rotationAngle + cardBaseAngle) % 360;
      const rad = (currentCardAngle * Math.PI) / 180;
      const cosVal = Math.cos(rad);
      if (cosVal > maxCos) {
        maxCos = cosVal;
        bestIdx = i;
      }
    }
    return bestIdx;
  }, [rotationAngle, totalCards]);


  // Rotate ring smoothly to bring a specific card to the front/center position
  const handleSelectCard = useCallback((index: number) => {
    soundFx.playClick();
    const cardBaseAngle = (index * 360) / totalCards;
    
    // We want (targetAngle + cardBaseAngle) ≡ 0 (mod 360)
    // => targetAngle ≡ -cardBaseAngle (mod 360)
    const current = targetAngleRef.current;
    const desired = -cardBaseAngle;
    
    // Find shortest rotational path
    const diff = ((desired - current + 180) % 360 + 360) % 360 - 180;
    targetAngleRef.current = current + diff;
    velocityRef.current = 0;
  }, [totalCards]);

  const handlePrevCard = () => {
    soundFx.playHover();
    const step = 360 / totalCards;
    targetAngleRef.current -= step;
    velocityRef.current = 0;
  };

  const handleNextCard = () => {
    soundFx.playHover();
    const step = 360 / totalCards;
    targetAngleRef.current += step;
    velocityRef.current = 0;
  };

  const handleLaunchJourney = (id: SectionId) => {
    soundFx.playThrottleRev(1.4);
    onSelectJourney(id);
  };

  const handleToggleSound = () => {
    const active = soundFx.toggleMute();
    setIsSoundActive(active);
  };

  const handleDownloadResume = () => {
    soundFx.playSuccess();
    const resumeText = `DEEPAK S
B.Tech Information Technology | 2026–2030
Sri Eshwar College of Engineering
Aspiring Software Developer | AI Enthusiast | Technology Explorer

CONTACT & LINKS:
- Location: Tamil Nadu, India
- College: Sri Eshwar College of Engineering (B.Tech Information Technology | 2026–2030)
- GitHub: [Editable: https://github.com/placeholder-deepak]
- LinkedIn: [Editable: https://linkedin.com/in/placeholder-deepak]
- Email: [Editable: deepak.placeholder@sece.ac.in]

SUMMARY:
Passionate first-year Information Technology student dedicated to building innovative software solutions, exploring AI integration, and bridging the physical-digital divide through embedded hardware and robotics.

TECHNICAL ARSENAL:
- Languages: C, C++, Python, JavaScript (ES6+)
- Frontend: HTML5, CSS3, React, Vite, Tailwind CSS, Responsive UI
- AI & ML: Generative AI, Prompt Engineering, API Integration, ML Concepts
- Tools: Git, GitHub, VS Code, Streamlit, Vercel, Antigravity IDE
- Hardware Interests: Arduino, ESP32, IoT Sensors, Embedded Systems, Robotics

KEY PROJECTS:
1. DeepKart — Full-Stack E-Commerce Web Application (React, REST APIs)
2. FactoryMind AI — AI Digital Twin & Autonomous Production Scheduler
3. WhatsApp AI Intelligence Center — Messaging Classification & Routing
4. Padika AI — Multilingual Educational Assistant for College Students
5. Smart Parking System — QR-Based Mobile Sensor Concept
6. Hybrid Smart Street Light Fault Monitoring System — Municipal IoT Infrastructure
`;
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Deepak_S_Developer_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-[#030712] text-white flex flex-col justify-between select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Clean, Plain Minimal Dark Background */}
      <div className="absolute inset-0 bg-[#030712] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

      {/* Top Header Status Ribbon */}
      <header className="relative z-40 p-4 sm:p-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-3 bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-2 backdrop-blur-md shadow-md">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="font-tech text-xs sm:text-sm font-bold text-white tracking-wider">
              TECH RIDE // 3D CAROUSEL RING
            </h2>
            <span className="text-[10px] font-mono-tech text-slate-400 block">
              360° CONTINUOUS ROTATION • COIMBATORE NH-47
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Play/Pause Auto-Rotation */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsAutoRotating(!isAutoRotating);
            }}
            title={isAutoRotating ? 'Pause Continuous Rotation' : 'Resume Continuous Rotation'}
            className={`p-2 rounded-2xl border transition backdrop-blur-md ${
              isAutoRotating
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isAutoRotating ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isSoundActive ? 'Sound ON' : 'Sound OFF (Default)'}
            className={`p-2 rounded-2xl border transition backdrop-blur-md ${
              isSoundActive
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isSoundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Eco Mode Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              onToggleEco();
            }}
            title={isEcoMode ? 'Eco Mode: ON' : 'Hi-Fi'}
            className={`px-3 py-1.5 rounded-2xl border text-[10px] font-mono-tech transition backdrop-blur-md ${
              isEcoMode
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isEcoMode ? 'ECO' : 'HI-FI'}
          </button>

          {/* Download Resume */}
          <button
            onClick={handleDownloadResume}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 text-cyan-300 font-tech text-xs tracking-wider uppercase transition backdrop-blur-md"
            title="Download Deepak's Resume"
          >
            <FileDown size={14} />
            <span>RESUME</span>
          </button>
        </div>
      </header>

      {/* Main Center Area: THE SINGLE 3D CIRCULAR RING WITH ATTACHED DESTINATION CARDS */}
      <div 
        className="relative flex-1 flex items-center justify-center overflow-visible"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 32%' }}
      >
        {/* The 3D Rotating Assembly Container */}
        <div 
          className="relative w-0 h-0 flex items-center justify-center pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            // Shifted up by 5% from previous (+19vh) for perfectly balanced vertical framing
            transform: `translateY(calc(${ringOffsetY}px + 19vh)) rotateX(12deg)`
          }}
        >
          
          {/* 1. THE SINGLE CONTINUOUS 360-DEGREE 3D CIRCULAR RING */}
          <div 
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${ringRadius * 2}px`,
              height: `${ringRadius * 2}px`,
              transform: 'translate(-50%, -50%) rotateX(90deg)',
              transformStyle: 'preserve-3d',
              border: '2px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.2), inset 0 0 30px rgba(56, 189, 248, 0.15)'
            }}
          >
            {/* Inner Concentric Track Guide */}
            <div 
              className="absolute inset-[18px] rounded-full border border-dashed border-cyan-500/25 pointer-events-none"
            />
            {/* Outer Subtle Rail */}
            <div 
              className="absolute -inset-[14px] rounded-full border border-slate-800/80 pointer-events-none"
            />
          </div>

          {/* 2. THE 7 DESTINATION CARDS ATTACHED TO THE SINGLE RING */}
          {SECTION_KEYS.map((secId, index) => {
            const journey = SECTION_JOURNEYS[secId];
            const isHovered = hoveredSection === secId;
            const isFront = index === activeFrontIndex;

            // Angle of this specific card on the 360-degree ring
            const baseAngle = (index * 360) / totalCards;
            const currentAngle = (rotationAngle + baseAngle) % 360;
            const rad = (currentAngle * Math.PI) / 180;

            // True 3D coordinates on the continuous circular ring:
            // X: left (-R) to right (+R)
            // Z: back (-R) to front (+R)
            const x = ringRadius * Math.sin(rad);
            const z = ringRadius * Math.cos(rad);
            // Y: follows the ring's horizontal plane
            const y = 0;

            // Depth calculation: 1.0 at front (closest to viewer), 0.0 at back (farthest)
            const depthFactor = (z + ringRadius) / (2 * ringRadius); // [0.0, 1.0]

            // Visual properties based on genuine 3D spatial depth:
            // Front cards: larger, sharper, brighter, high opacity
            // Back cards: smaller, darker, more transparent
            const scale = 0.68 + depthFactor * 0.42; // 0.68 to 1.10
            const opacity = 0.28 + depthFactor * 0.70; // 0.28 to 0.98
            const brightness = 0.45 + depthFactor * 0.55; // 0.45 to 1.0
            const zIndex = Math.round(depthFactor * 100);

            return (
              <div
                key={secId}
                style={{
                  position: 'absolute',
                  // Position card in 3D space on the single circular ring
                  transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%) scale(${scale})`,
                  transformStyle: 'preserve-3d',
                  zIndex: zIndex,
                  opacity: opacity,
                  filter: `brightness(${brightness})`,
                  transition: isDragging ? 'none' : 'filter 0.2s ease, opacity 0.2s ease',
                  pointerEvents: depthFactor > 0.35 ? 'auto' : 'none'
                }}
                className="cursor-pointer"
                onClick={() => handleSelectCard(index)}
                onMouseEnter={() => {
                  soundFx.playHover();
                  setHoveredSection(secId);
                }}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Physical Mounting Bracket Clamped to the Ring */}
                <div 
                  className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                >
                  {/* Vertical Mounting Rod */}
                  <div 
                    className="w-[2px] h-[18px]" 
                    style={{ backgroundColor: `${journey.themeColor}88` }} 
                  />
                  {/* Circular Node clamped onto the 3D ring */}
                  <div 
                    className="w-3 h-3 rounded-full border shadow-md"
                    style={{
                      backgroundColor: isFront ? journey.themeColor : '#0f172a',
                      borderColor: journey.themeColor,
                      boxShadow: isFront ? `0 0 10px ${journey.themeColor}` : 'none'
                    }}
                  />
                </div>

                {/* The Translucent Glass Destination Card (60-75% transparency) */}
                <div 
                  className={`relative w-[240px] sm:w-[270px] rounded-2xl p-4 sm:p-5 backdrop-blur-xl border transition-all duration-300 ${
                    isFront
                      ? 'shadow-[0_0_35px_rgba(56,189,248,0.3)] ring-1 ring-cyan-400/40'
                      : isHovered
                      ? 'shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'shadow-lg'
                  }`}
                  style={{
                    // Dark translucent glass (65-75% transparency)
                    backgroundColor: isFront 
                      ? 'rgba(10, 16, 30, 0.72)' 
                      : 'rgba(8, 12, 22, 0.65)',
                    borderColor: isFront 
                      ? journey.themeColor 
                      : isHovered 
                      ? 'rgba(255, 255, 255, 0.4)' 
                      : 'rgba(51, 65, 85, 0.6)',
                    boxShadow: isFront ? `0 0 25px ${journey.themeColor}44` : undefined
                  }}
                >
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md"
                      style={{ 
                        backgroundColor: `${journey.themeColor}22`, 
                        borderColor: journey.themeColor 
                      }}
                    >
                      {renderSectionIcon(journey.icon, 'text-white')}
                    </div>

                    <div className="text-right">
                      <span 
                        className="text-[9px] font-mono-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: `${journey.themeColor}20`, 
                          color: journey.themeColor 
                        }}
                      >
                        {journey.stations.length} STATIONS
                      </span>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-wide uppercase">
                    {journey.name}
                  </h3>

                  {/* Road Subtitle */}
                  <p className="text-[11px] font-mono-tech text-slate-300 mt-1 line-clamp-1">
                    {journey.roadTitle}
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {journey.roadSubtitle}
                  </p>

                  {/* Interactive Button when card is in front position */}
                  {isFront && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono-tech text-cyan-400 font-semibold flex items-center space-x-1">
                        <span>READY TO RIDE</span>
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchJourney(secId);
                        }}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-tech text-xs font-bold uppercase tracking-wider text-slate-950 transition transform hover:scale-105 active:scale-95 shadow-md"
                        style={{ 
                          backgroundColor: journey.themeColor,
                          boxShadow: `0 0 15px ${journey.themeColor}88`
                        }}
                      >
                        <span>START JOURNEY</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  )}

                  {!isFront && (
                    <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[9px] font-mono-tech text-slate-500">
                      <span>CLICK TO FOCUS</span>
                      <span>NH-47</span>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>

        {/* Left & Right Step Buttons to rotate the ring */}
        <div className="absolute inset-x-4 sm:inset-x-8 flex items-center justify-between pointer-events-none z-30">
          <button
            onClick={handlePrevCard}
            className="pointer-events-auto p-3 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition backdrop-blur-md shadow-lg"
            title="Rotate Left"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={handleNextCard}
            className="pointer-events-auto p-3 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition backdrop-blur-md shadow-lg"
            title="Rotate Right"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Clean Center Bottom Drag Hint */}
        <div className="absolute bottom-2 sm:bottom-3 z-20 pointer-events-none flex items-center justify-center">
          <div className="bg-slate-950/70 border border-slate-800/80 px-4 py-1.5 rounded-full backdrop-blur-md flex items-center space-x-2 text-[11px] font-mono-tech text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>DRAG OR SWIPE TO ROTATE RING • CLICK ANY CARD TO FOCUS</span>
          </div>
        </div>

      </div>

      {/* Bottom Profile Bar & Quick Section Navigation */}
      <footer className="relative z-40 p-3 sm:p-5 bg-slate-950/85 border-t border-slate-800/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center space-x-2">
          <h1 className="font-tech text-sm font-bold text-white tracking-wide">
            DEEPAK S
          </h1>
          <span className="text-[10px] font-mono-tech text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
            SRI ESHWAR IT '30
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 font-light ml-2">
            | Aspiring Software Developer • AI Enthusiast
          </span>
        </div>

        {/* Direct Destination Selector Pills along the bottom */}
        <div className="flex flex-wrap items-center gap-1.5 justify-center">
          {SECTION_KEYS.map((secId, idx) => {
            const journey = SECTION_JOURNEYS[secId];
            const isSelected = idx === activeFrontIndex;

            return (
              <button
                key={secId}
                onClick={() => handleSelectCard(idx)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-tech uppercase tracking-wider transition ${
                  isSelected
                    ? 'scale-105 z-10 shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: `${journey.themeColor}25`,
                        borderColor: journey.themeColor,
                        color: '#ffffff',
                        boxShadow: `0 0 15px ${journey.themeColor}55`
                      }
                    : {}
                }
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: journey.themeColor }} 
                />
                <span>{journey.name}</span>
              </button>
            );
          })}
        </div>
      </footer>

    </div>
  );
};
