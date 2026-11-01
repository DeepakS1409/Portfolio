import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { JOURNEY_DATA, VERIFIED_ACHIEVEMENT_PLACEHOLDERS } from '../../data/journey';
import { Milestone } from '../../types';
import { soundFx } from '../../audio/soundEffects';
import { GraduationCap, Trophy, Sparkles, Terminal, Code, Award, Clock } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredMilestones = filterType === 'ALL'
    ? JOURNEY_DATA
    : JOURNEY_DATA.filter((m) => m.type === filterType);

  const getMilestoneIcon = (type: Milestone['type']) => {
    switch (type) {
      case 'Education': return <GraduationCap size={18} className="text-cyan-400" />;
      case 'Hackathon': return <Trophy size={18} className="text-purple-400" />;
      case 'Project': return <Sparkles size={18} className="text-emerald-400" />;
      case 'Coding': return <Code size={18} className="text-amber-400" />;
      default: return <Terminal size={18} className="text-cyan-400" />;
    }
  };

  return (
    <section id="journey" className="relative py-24 bg-lab-dark border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="CHRONICLES & MILESTONES"
          title="ACHIEVEMENTS & JOURNEY"
          subtitle="The academic and engineering path at Sri Eshwar College of Engineering, hackathons, and software milestones."
          terminalCode="TIMELINE // 2026-2030"
          accentColor="purple"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {['ALL', 'Education', 'Hackathon', 'Coding', 'Milestone'].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                soundFx.playModeSwitch();
                setFilterType(filter);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-200 ${
                filterType === filter
                  ? 'bg-purple-500 text-black font-bold shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-105'
                  : 'bg-slate-900/80 border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-cyan-500/40 ml-4 md:ml-32 space-y-12">
          {filteredMilestones.map((milestone) => (
            <div key={milestone.id} className="relative pl-6 md:pl-10 group">
              
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.6)] group-hover:scale-125 transition-transform duration-300">
                {getMilestoneIcon(milestone.type)}
              </div>

              {/* Year Stamp on Desktop (Left of node) */}
              <div className="hidden md:block absolute -left-36 top-2 text-right w-24">
                <span className="font-tech text-sm font-bold text-cyan-400 block">{milestone.year}</span>
                <span className="text-[10px] font-mono-tech text-slate-500 block">{milestone.period}</span>
              </div>

              {/* Content Card */}
              <div className="cyber-glass-card p-6 rounded-2xl border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all duration-300">
                
                {/* Mobile Year Badge */}
                <div className="md:hidden flex items-center space-x-2 mb-2 font-mono-tech text-xs text-cyan-400">
                  <Clock size={12} />
                  <span>{milestone.year} • {milestone.period}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-tech text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition">
                    {milestone.title}
                  </h3>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech border ${
                    milestone.status === 'Completed'
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : milestone.status === 'In Progress'
                      ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                      : 'bg-purple-950/60 border-purple-500/40 text-purple-300'
                  }`}>
                    {milestone.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-cyan-400 font-mono-tech text-xs mb-3">
                  {milestone.organization}
                </p>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-4">
                  {milestone.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                  {milestone.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono-tech text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Editable Certifications & Awards Placeholder Vault */}
        <div className="mt-20 pt-10 border-t border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="text-amber-400" size={22} />
            <h3 className="font-tech text-xl font-bold text-white uppercase">
              HONORS & CREDENTIALS VAULT
            </h3>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300">
              EDITABLE PLACEHOLDERS
            </span>
          </div>

          <p className="text-slate-400 text-xs font-mono-tech mb-6">
            In compliance with strict portfolio integrity guidelines, unverified certificates or competition rankings are marked below as placeholders ready to be linked with verified credentials.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VERIFIED_ACHIEVEMENT_PLACEHOLDERS.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/20 hover:border-amber-400/50 transition cyber-glass-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-tech text-amber-400 uppercase">
                    {cert.category}
                  </span>
                  <span className="text-[10px] font-mono-tech text-slate-500">
                    {cert.date}
                  </span>
                </div>

                <h4 className="font-tech text-sm text-white font-semibold mb-1">
                  {cert.title}
                </h4>

                <p className="text-slate-400 text-xs mb-3 font-mono-tech">
                  {cert.issuer}
                </p>

                <div className="p-2 bg-slate-900/60 rounded border border-slate-800 text-[10px] font-mono-tech text-amber-300/80 italic">
                  {cert.note}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
