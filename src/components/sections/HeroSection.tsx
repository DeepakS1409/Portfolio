import React, { useState, useEffect } from 'react';
import { RoboticAssistant3D } from '../canvas/RoboticAssistant3D';
import { soundFx } from '../../audio/soundEffects';
import { ArrowDown, Code2, Sparkles, Terminal, FileDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreJourney?: () => void;
  onExploreLab?: () => void;
  onViewProjects: () => void;
}

const ROLES = [
  'Software Developer',
  'AI Enthusiast',
  'Full-Stack Developer',
  'Technology Explorer',
  'Future Innovator'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreJourney,
  onExploreLab,
  onViewProjects
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Smooth typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const handleDownloadResume = () => {
    soundFx.playSuccess();
    // Creates a realistic formatted developer profile document for Deepak S
    const resumeText = `DEEPAK S
B.Tech Information Technology | 2026–2030
Sri Eshwar College of Engineering
Aspiring Software Developer | Technology Enthusiast

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
1. DeepKart — Full-stack E-Commerce Web Application (React, REST APIs)
2. FactoryMind AI — AI Digital Twin & Autonomous Production Scheduler
3. WhatsApp AI Intelligence Center — Messaging Classification & Routing
4. Padika AI — Multilingual Educational Assistant for College Students
5. Smart Parking System — QR-based Mobile Sensor Concept
6. Smart Street Light Monitoring System — Infrastructure IoT Concept

ACADEMIC JOURNEY:
- B.Tech Information Technology | 2026–2030 • Sri Eshwar College of Engineering
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
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Cyber Glow & Coordinates */}
      <div className="absolute top-24 left-8 text-[11px] font-mono-tech text-cyan-500/40 hidden md:block select-none pointer-events-none">
        LAT_COORDS: 11.0168° N, 76.9558° E<br />
        LAB_SYS: SEC_CORE_v1.0.4<br />
        STATION: IT_INNOVATION_HUB
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-300 font-mono-tech text-xs mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>INNOVATION LAB // SYSTEM ONLINE</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">SECE IT '30</span>
            </div>

            {/* Name Heading with 3D Hologram Glow */}
            <h1 className="font-tech text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight uppercase leading-none mb-4">
              I AM <span className="text-cyan-400 holo-glow-cyan">DEEPAK S</span>
            </h1>

            {/* Official Primary Role */}
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-4 max-w-2xl">
              <span className="text-cyan-300 font-medium">B.Tech Information Technology | 2026–2030</span> • Sri Eshwar College of Engineering |{' '}
              <span className="text-white font-medium">Aspiring Software Developer</span> |{' '}
              <span className="text-purple-300 font-medium">Technology Enthusiast</span>
            </p>

            {/* Dynamic Typing Subtitle */}
            <div className="flex items-center space-x-2 h-10 px-4 py-2 bg-slate-950/80 border border-cyan-500/30 rounded-xl mb-8 font-mono-tech text-sm sm:text-base text-cyan-400 shadow-[inset_0_0_12px_rgba(0,242,254,0.15)]">
              <Terminal size={16} className="text-cyan-400 shrink-0" />
              <span className="text-slate-400">role:</span>
              <span className="text-white font-bold">{displayText}</span>
              <span className="w-2 h-5 bg-cyan-400 animate-pulse inline-block" />
            </div>

            {/* Core Vision Quote */}
            <div className="border-l-2 border-cyan-500 pl-4 py-1 mb-8 max-w-xl text-xs sm:text-sm text-slate-400 italic">
              "Where software architecture meets physical hardware engineering. Building applications today while exploring the embedded robotics of tomorrow."
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  soundFx.playThrottleRev(1.0);
                  if (onExploreJourney) onExploreJourney();
                  else if (onExploreLab) onExploreLab();
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-tech font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-105"
              >
                <Sparkles size={16} />
                <span>EXPLORE MY JOURNEY</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onViewProjects();
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-tech font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 hover:border-cyan-400 hover:scale-105"
              >
                <Code2 size={16} />
                <span>VIEW MY PROJECTS</span>
              </button>

              <button
                onClick={handleDownloadResume}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/40 text-purple-300 font-tech font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 hover:border-purple-400 hover:scale-105"
                title="Download Deepak's Verified Profile Summary"
              >
                <FileDown size={16} />
                <span>RESUME</span>
              </button>
            </div>

            {/* Quick Metrics HUD */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-cyan-500/20 w-full max-w-md">
              <div>
                <span className="block font-tech text-xl sm:text-2xl font-bold text-white">6</span>
                <span className="text-[11px] font-mono-tech text-slate-400 uppercase">Core Projects</span>
              </div>
              <div>
                <span className="block font-tech text-xl sm:text-2xl font-bold text-cyan-400">1st Year</span>
                <span className="text-[11px] font-mono-tech text-slate-400 uppercase">B.Tech IT</span>
              </div>
              <div>
                <span className="block font-tech text-xl sm:text-2xl font-bold text-purple-400">7+</span>
                <span className="text-[11px] font-mono-tech text-slate-400 uppercase">Active Goals</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Robotic Assistant Drone */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full relative">
              {/* Floating Holographic Ring HUD around Drone */}
              <div className="absolute top-2 right-4 z-10 px-3 py-1 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-[10px] font-mono-tech text-cyan-400 pointer-events-none backdrop-blur-md">
                ROBOTIC ASSISTANT // LIVE KINEMATICS
              </div>

              {/* 3D Drone Assistant Canvas */}
              <RoboticAssistant3D />

              {/* Floating Technology Badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-4 pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-[10px] font-mono-tech text-cyan-300">
                  ⚡ React & TypeScript
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-purple-500/30 text-[10px] font-mono-tech text-purple-300">
                  🤖 Generative AI
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 text-[10px] font-mono-tech text-emerald-300">
                  🔌 Embedded HW Interests
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center justify-center mt-12">
          <button
            onClick={() => {
              soundFx.playThrottleRev(1.0);
              if (onExploreJourney) onExploreJourney();
              else if (onExploreLab) onExploreLab();
            }}
            className="flex flex-col items-center text-slate-500 hover:text-emerald-400 transition group"
          >
            <span className="text-[10px] font-mono-tech tracking-widest mb-1 group-hover:text-emerald-400">
              RIDE DOWN NH-47 HIGHWAY
            </span>
            <ArrowDown size={16} className="animate-bounce text-emerald-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
