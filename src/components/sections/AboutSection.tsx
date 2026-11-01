import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { soundFx } from '../../audio/soundEffects';
import { GraduationCap, Sparkles, BookOpen, Compass, Cpu, Target, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'education' | 'aspirations'>('bio');

  return (
    <section id="about" className="relative py-24 bg-lab-dark overflow-hidden">
      {/* Background Circuit Overlay */}
      <div className="absolute inset-0 bg-circuit-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="DIGITAL IDENTITY"
          title="ABOUT ME // THE ENGINEER"
          subtitle="Passionate first-year B.Tech IT engineer fusing modern software applications with physical computing."
          terminalCode="ID // DEEPAK_S"
          accentColor="blue"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive 3D Holographic ID Badge */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm cyber-glass rounded-3xl p-6 border border-cyan-500/40 relative shadow-[0_0_40px_rgba(0,242,254,0.15)] group hover:border-cyan-400 transition-all duration-300">
              
              {/* Corner Sci-Fi accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* ID Header */}
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
                <span className="text-[10px] font-mono-tech text-cyan-400">LAB ACCESS BADGE // #001</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Holographic Avatar Core */}
              <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 animate-pulse" />
                <div className="w-24 h-24 rounded-xl bg-slate-900 flex flex-col items-center justify-center border border-cyan-500/30 text-center p-2 shadow-[0_0_25px_rgba(0,242,254,0.4)]">
                  <Cpu className="text-cyan-400 mb-1" size={28} />
                  <span className="text-[10px] font-tech text-white font-bold">DEEPAK S</span>
                  <span className="text-[8px] font-mono-tech text-cyan-300">B.TECH IT</span>
                </div>
              </div>

              {/* Identity Specifications */}
              <div className="space-y-3 font-mono-tech text-xs text-slate-300 mb-6">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-500">FULL NAME:</span>
                  <span className="text-white font-bold">Deepak S</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-500">INSTITUTION:</span>
                  <span className="text-cyan-300 text-right">Sri Eshwar College of Engineering</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-500">PROGRAM:</span>
                  <span className="text-white font-medium">B.Tech IT</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-500">ACADEMIC BATCH:</span>
                  <span className="text-emerald-400 font-bold">2026–2030</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">SPECIALIZATION:</span>
                  <span className="text-purple-300">Software & HW Systems</span>
                </div>
              </div>

              {/* Verified Actual Statistics HUD */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-cyan-500/20 text-center font-mono-tech">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-cyan-500/20">
                  <span className="block font-tech text-xl font-bold text-cyan-400">6</span>
                  <span className="text-[10px] text-slate-400">Portfolio Projects</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-purple-500/20">
                  <span className="block font-tech text-xl font-bold text-purple-400">5</span>
                  <span className="text-[10px] text-slate-400">Tech Categories</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Bio, Education Timeline, and Aspirations */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Tab Navigation */}
            <div className="flex items-center space-x-2 p-1.5 bg-slate-900/80 border border-cyan-500/30 rounded-2xl mb-6 backdrop-blur-md">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('bio');
                }}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-tech tracking-wider uppercase transition ${
                  activeTab === 'bio'
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen size={14} />
                <span>BIOGRAPHY</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('education');
                }}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-tech tracking-wider uppercase transition ${
                  activeTab === 'education'
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap size={14} />
                <span>EDUCATION</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('aspirations');
                }}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-tech tracking-wider uppercase transition ${
                  activeTab === 'aspirations'
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Target size={14} />
                <span>ASPIRATIONS</span>
              </button>
            </div>

            {/* Tab 1: Biography */}
            {activeTab === 'bio' && (
              <div className="cyber-glass-card rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center space-x-2 text-cyan-400 font-tech text-sm font-bold tracking-wider">
                  <Sparkles size={16} />
                  <span>CORE INTRO & PHILOSOPHY</span>
                </div>

                {/* Primary Prompt Statement */}
                <blockquote className="text-slate-200 text-base sm:text-lg leading-relaxed font-light border-l-4 border-cyan-400 pl-4 py-1 italic bg-cyan-950/20 rounded-r-lg">
                  "I am a first-year Information Technology student passionate about exploring technology and building innovative digital solutions. I enjoy developing software applications, experimenting with AI-powered ideas, and understanding how technology can solve real-world problems. I am also interested in hardware, embedded systems, robotics, and the connection between software and physical devices."
                </blockquote>

                <p className="text-slate-300 text-sm leading-relaxed">
                  As a freshman in engineering at <strong className="text-white">Sri Eshwar College of Engineering</strong>, my daily focus revolves around writing clean C, C++, and Python code while mastering modern web architectures like React and TypeScript. Rather than viewing software and hardware as separate silos, I explore how intelligent software logic can command sensors, microcontrollers, and actuators in the physical world.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cyan-500/20">
                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                    <Compass className="text-cyan-400 mt-0.5 shrink-0" size={18} />
                    <div>
                      <h4 className="font-tech text-xs text-white font-bold">EXPLORER MINDSET</h4>
                      <p className="text-[11px] font-mono-tech text-slate-400 mt-1">
                        Constantly experimenting with modern frameworks, developer agents, and AI tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-purple-500/20">
                    <Cpu className="text-purple-400 mt-0.5 shrink-0" size={18} />
                    <div>
                      <h4 className="font-tech text-xs text-white font-bold">PHYSICAL-DIGITAL BRIDGE</h4>
                      <p className="text-[11px] font-mono-tech text-slate-400 mt-1">
                        Driven by the fusion of web user interfaces with embedded IoT devices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Education */}
            {activeTab === 'education' && (
              <div className="cyber-glass-card rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center space-x-2 text-cyan-400 font-tech text-sm font-bold tracking-wider">
                  <GraduationCap size={16} />
                  <span>ACADEMIC FOUNDATION</span>
                </div>

                <div className="relative pl-6 border-l-2 border-cyan-500/50 space-y-8">
                  {/* Current Program */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2fe]" />
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <h4 className="font-tech text-base text-white font-bold">
                        B.Tech Information Technology | 2026–2030
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono-tech text-[10px]">
                        2026–2030
                      </span>
                    </div>
                    <p className="text-cyan-400 font-mono-tech text-xs mb-2">
                      Sri Eshwar College of Engineering
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                      Coursework covers Programming in C/C++, Data Structures, Digital Principles & Computer Architecture, Object-Oriented Paradigms, and Engineering Mathematics. Actively participating in peer programming, tech symposiums, and departmental hackathon tracks.
                    </p>
                    <div className="flex flex-wrap gap-1.5 font-mono-tech text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">C / C++</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">Data Structures</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">Digital Logic</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">Algorithm Foundations</span>
                    </div>
                  </div>

                  {/* High School Foundation */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-purple-400" />
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <h4 className="font-tech text-base text-white font-bold">
                        Higher Secondary Certificate (HSC)
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-400 text-purple-300 font-mono-tech text-[10px]">
                        COMPLETED 2024
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Completed Higher Secondary education with focus on Physics, Chemistry, Mathematics, and Computer Science, establishing strong analytical thinking and algorithmic curiosity.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Aspirations */}
            {activeTab === 'aspirations' && (
              <div className="cyber-glass-card rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center space-x-2 text-purple-400 font-tech text-sm font-bold tracking-wider">
                  <Target size={16} />
                  <span>CAREER & LEARNING ASPIRATIONS</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex items-start space-x-3">
                    <ArrowRight className="text-cyan-400 mt-1 shrink-0" size={16} />
                    <div>
                      <strong className="text-white font-tech block text-sm">Full-Stack Software Engineering</strong>
                      <span className="text-slate-400 leading-relaxed">
                        Design and deploy scalable, fault-tolerant web applications that combine high-performance frontend interfaces with reliable backend microservices.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-purple-500/20 flex items-start space-x-3">
                    <ArrowRight className="text-purple-400 mt-1 shrink-0" size={16} />
                    <div>
                      <strong className="text-white font-tech block text-sm">Applied AI System Integration</strong>
                      <span className="text-slate-400 leading-relaxed">
                        Integrate autonomous LLM reasoning agents, prompt engineering, and computer vision pipelines to solve high-friction industrial and educational challenges.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/20 flex items-start space-x-3">
                    <ArrowRight className="text-emerald-400 mt-1 shrink-0" size={16} />
                    <div>
                      <strong className="text-white font-tech block text-sm">Hardware-Software Fusion & Robotics</strong>
                      <span className="text-slate-400 leading-relaxed">
                        Expand my knowledge of ESP32/Arduino microcontrollers and sensor integration to create autonomous physical computing solutions and smart infrastructure networks.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
