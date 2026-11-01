import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { SKILL_CATEGORIES, SKILLS_DATA } from '../../data/skills';
import { SkillCategory, SkillItem } from '../../types';
import { soundFx } from '../../audio/soundEffects';
import { 
  Terminal, Cpu, FileCode, Braces, Globe, Palette, Layers, Zap, 
  Smartphone, Monitor, Server, Sparkles, Bot, MessageSquareCode, 
  TrendingUp, Eye, BrainCircuit, GitBranch, Github, Code2, 
  Orbit, LayoutGrid, Cloud, CircuitBoard, Wifi, Radio, 
  Activity, Info, X 
} from 'lucide-react';

// Icon resolver for skill items
const renderSkillIcon = (iconName: string, className = 'text-cyan-400') => {
  const iconProps = { size: 22, className };
  switch (iconName) {
    case 'Terminal': return <Terminal {...iconProps} />;
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'FileCode': return <FileCode {...iconProps} />;
    case 'Braces': return <Braces {...iconProps} />;
    case 'Globe': return <Globe {...iconProps} />;
    case 'Palette': return <Palette {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'Zap': return <Zap {...iconProps} />;
    case 'Smartphone': return <Smartphone {...iconProps} />;
    case 'Monitor': return <Monitor {...iconProps} />;
    case 'Server': return <Server {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Bot': return <Bot {...iconProps} />;
    case 'MessageSquareCode': return <MessageSquareCode {...iconProps} />;
    case 'TrendingUp': return <TrendingUp {...iconProps} />;
    case 'Eye': return <Eye {...iconProps} />;
    case 'BrainCircuit': return <BrainCircuit {...iconProps} />;
    case 'GitBranch': return <GitBranch {...iconProps} />;
    case 'Github': return <Github {...iconProps} />;
    case 'Code2': return <Code2 {...iconProps} />;
    case 'Orbit': return <Orbit {...iconProps} />;
    case 'LayoutGrid': return <LayoutGrid {...iconProps} />;
    case 'Cloud': return <Cloud {...iconProps} />;
    case 'CircuitBoard': return <CircuitBoard {...iconProps} />;
    case 'Wifi': return <Wifi {...iconProps} />;
    case 'Radio': return <Radio {...iconProps} />;
    case 'Microchip': return <Cpu {...iconProps} />;
    case 'Activity': return <Activity {...iconProps} />;
    default: return <Cpu {...iconProps} />;
  }
};

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('Programming Languages');
  const [activeSkillModal, setActiveSkillModal] = useState<SkillItem | null>(null);

  const filteredSkills = SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const handleCategorySelect = (cat: SkillCategory) => {
    soundFx.playModeSwitch();
    setSelectedCategory(cat);
  };

  const handleSkillClick = (skill: SkillItem) => {
    soundFx.playClick();
    setActiveSkillModal(skill);
  };

  return (
    <section id="skills" className="relative py-24 bg-lab-dark border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="TECHNICAL CAPABILITY"
          title="INTERACTIVE TECHNOLOGY ARSENAL"
          subtitle="Categorized engineering skills, modern developer frameworks, and physical hardware interests."
          terminalCode="ARSENAL // v2.4"
          accentColor="cyan"
        />

        {/* Category Navigation Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const isHardware = cat.includes('Hardware');

            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-2.5 rounded-xl font-mono-tech text-xs tracking-wider transition-all duration-200 flex items-center space-x-2 ${
                  isSelected
                    ? isHardware
                      ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105'
                      : 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.5)] scale-105'
                    : 'bg-slate-900/80 border border-cyan-500/20 text-slate-300 hover:text-white hover:border-cyan-400'
                }`}
              >
                <span>{cat}</span>
                {isHardware && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-black/20 text-black' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'}`}>
                    INTERESTS
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Hardware Category Important Notification Banner */}
        {selectedCategory.includes('Hardware') && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-start space-x-3 text-xs font-mono-tech text-emerald-300 backdrop-blur-md animate-in fade-in duration-200">
            <Info size={18} className="shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <strong className="font-tech text-white block text-sm mb-0.5">ACADEMIC INTEGRITY NOTICE:</strong>
              <span>
                The hardware and embedded systems listed below represent Deepak's <strong className="text-white">ACTIVE INTERESTS & CURRENTLY EXPLORING AREAS</strong>. These are not claimed as completed production projects or industrial expertise. No fabricated percentages are shown.
              </span>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const isInterest = skill.isInterestOnly;

            return (
              <div
                key={skill.name}
                onClick={() => handleSkillClick(skill)}
                onMouseEnter={() => soundFx.playHover()}
                className={`cyber-glass-card p-5 rounded-2xl cursor-pointer group transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isInterest 
                    ? 'hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]' 
                    : 'hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,242,254,0.3)]'
                }`}
              >
                {/* Decorative circuit line corner */}
                <div className={`absolute top-0 right-0 w-8 h-8 pointer-events-none border-t-2 border-r-2 transition-colors ${
                  isInterest ? 'border-emerald-500/20 group-hover:border-emerald-400' : 'border-cyan-500/20 group-hover:border-cyan-400'
                }`} />

                <div>
                  {/* Top Header: Icon + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 border transition-transform duration-300 group-hover:scale-110 ${
                      isInterest 
                        ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400' 
                        : 'bg-cyan-950/50 border-cyan-500/40 text-cyan-400'
                    }`}>
                      {renderSkillIcon(skill.icon, isInterest ? 'text-emerald-400' : 'text-cyan-400')}
                    </div>

                    <span className={`text-[10px] font-mono-tech px-2.5 py-0.5 rounded-full border ${
                      isInterest 
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                        : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                    }`}>
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="font-tech text-base font-bold text-white group-hover:text-cyan-300 transition mb-2">
                    {skill.name}
                  </h3>

                  {/* Description snippet */}
                  <p className="text-slate-400 text-xs font-light leading-relaxed line-clamp-3 mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-tech">
                  <span className="text-slate-500">
                    {skill.highlightTag || 'Skill Module'}
                  </span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
                    [EXPAND &gt;]
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for In-Depth Skill Inspection */}
        {activeSkillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-slate-950 border border-cyan-500/50 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,242,254,0.3)] animate-in fade-in zoom-in duration-200">
              
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
                    {renderSkillIcon(activeSkillModal.icon, 'text-cyan-400')}
                  </div>
                  <div>
                    <h4 className="font-tech text-base text-white font-bold">{activeSkillModal.name}</h4>
                    <span className="text-[10px] font-mono-tech text-cyan-400">{activeSkillModal.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveSkillModal(null);
                  }}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono-tech text-slate-300">
                <div>
                  <span className="text-slate-500 block mb-1">CLASSIFICATION STATUS:</span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 inline-block font-semibold">
                    {activeSkillModal.level}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">DETAILED SCOPE:</span>
                  <p className="text-slate-200 leading-relaxed text-sm bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    {activeSkillModal.description}
                  </p>
                </div>

                {activeSkillModal.isInterestOnly && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-[11px]">
                    ★ This represents an exploratory interest Deepak is actively learning through college coursework and personal hardware research.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-cyan-500/20 flex justify-end">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveSkillModal(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-tech text-xs tracking-wider transition"
                >
                  CLOSE INSPECTOR
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
