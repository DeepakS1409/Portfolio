import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { PROJECTS_DATA } from '../../data/projects';
import { Project, ProjectStatus } from '../../types';
import { soundFx } from '../../audio/soundEffects';
import { 
  ShoppingCart, Cpu, MessageSquare, GraduationCap, Car, Lightbulb, 
  ExternalLink, Github, CheckCircle2, Layers, X, ShieldAlert 
} from 'lucide-react';

const renderProjectIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShoppingCart': return <ShoppingCart size={24} className="text-cyan-400" />;
    case 'Cpu': return <Cpu size={24} className="text-blue-400" />;
    case 'MessageSquare': return <MessageSquare size={24} className="text-emerald-400" />;
    case 'GraduationCap': return <GraduationCap size={24} className="text-purple-400" />;
    case 'Car': return <Car size={24} className="text-pink-400" />;
    case 'Lightbulb': return <Lightbulb size={24} className="text-amber-400" />;
    default: return <Layers size={24} className="text-cyan-400" />;
  }
};

const getStatusBadge = (status: ProjectStatus) => {
  switch (status) {
    case 'In Development':
      return {
        bg: 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300',
        dot: 'bg-cyan-400'
      };
    case 'Prototype':
      return {
        bg: 'bg-emerald-950/80 border-emerald-400/50 text-emerald-300',
        dot: 'bg-emerald-400'
      };
    case 'Concept':
      return {
        bg: 'bg-purple-950/80 border-purple-400/50 text-purple-300',
        dot: 'bg-purple-400'
      };
  }
};

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filterOptions = ['ALL', 'Full-Stack', 'AI & Automation', 'Mobile Concept', 'Smart Infrastructure'];

  const filteredProjects = selectedFilter === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedFilter);

  const handleOpenModal = (project: Project) => {
    soundFx.playClick();
    setActiveProjectModal(project);
  };

  return (
    <section id="projects" className="relative py-24 bg-lab-dark border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="HOLOGRAPHIC VAULT"
          title="PROJECT SHOWCASE"
          subtitle="Explore the portfolio of software platforms, AI reasoning engines, and smart infrastructure concepts."
          terminalCode="PROJECTS // 0x06"
          accentColor="purple"
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                soundFx.playModeSwitch();
                setSelectedFilter(opt);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-200 ${
                selectedFilter === opt
                  ? 'bg-purple-500 text-black font-bold shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-105'
                  : 'bg-slate-900/80 border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const statusConfig = getStatusBadge(project.status);

            return (
              <div
                key={project.id}
                className="cyber-glass-card rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Card Top Holographic Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center p-2.5 shadow-[inset_0_0_10px_rgba(0,242,254,0.2)] group-hover:scale-110 transition-transform">
                      {renderProjectIcon(project.iconName)}
                    </div>

                    <div className={`px-2.5 py-1 rounded-full border text-[10px] font-mono-tech flex items-center space-x-1.5 ${statusConfig.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`} />
                      <span>{project.status.toUpperCase()}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-widest block mb-1">
                    {project.category}
                  </span>

                  <h3 className="font-tech text-xl font-bold text-white group-hover:text-cyan-300 transition mb-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs font-light mb-4 leading-relaxed">
                    {project.tagline}
                  </p>

                  <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-slate-300 text-[10px] font-mono-tech"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 text-[10px] font-mono-tech">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="p-4 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="text-xs font-tech text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-semibold group/btn"
                  >
                    <span>DETAILS & ARCHITECTURE</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub Repository (Placeholder Link)"
                        onClick={() => soundFx.playClick()}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Live Demo Preview (Placeholder Link)"
                        onClick={() => soundFx.playClick()}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 hover:text-white hover:border-cyan-400 transition"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Deep Project Inspection */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-slate-950 border border-cyan-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,242,254,0.3)] max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-cyan-500/20 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
                    {renderProjectIcon(activeProjectModal.iconName)}
                  </div>
                  <div>
                    <h3 className="font-tech text-xl sm:text-2xl font-bold text-white">
                      {activeProjectModal.title}
                    </h3>
                    <p className="text-xs font-mono-tech text-cyan-400">{activeProjectModal.tagline}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveProjectModal(null);
                  }}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status Banner */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 font-mono-tech text-xs">
                <div>
                  <span className="text-slate-400">STATUS: </span>
                  <span className="text-cyan-300 font-bold">{activeProjectModal.status}</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  {activeProjectModal.metrics}
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-6 text-xs sm:text-sm font-mono-tech text-slate-300">
                <div>
                  <span className="text-cyan-400 font-tech text-xs font-bold block mb-2 uppercase">
                    // SYSTEM OVERVIEW
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans font-light bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    {activeProjectModal.description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <span className="text-cyan-400 font-tech text-xs font-bold block mb-2 uppercase">
                    // KEY ARCHITECTURAL FEATURES
                  </span>
                  <div className="space-y-2">
                    {activeProjectModal.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/80">
                        <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                        <span className="text-slate-300 text-xs font-sans">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Used */}
                <div>
                  <span className="text-cyan-400 font-tech text-xs font-bold block mb-2 uppercase">
                    // TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.technologies.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Notes */}
                {activeProjectModal.architectureNotes && (
                  <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl text-purple-300 text-xs">
                    <strong className="block font-tech text-white mb-1">ENGINEERING ARCHITECTURE NOTES:</strong>
                    <span className="font-sans font-light">{activeProjectModal.architectureNotes}</span>
                  </div>
                )}

                {/* Editable Placeholder Notice */}
                <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-amber-300/90 text-[11px] flex items-start space-x-2">
                  <ShieldAlert size={16} className="shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    <strong>HONEST NOTICE:</strong> GitHub repositories and demo endpoints are marked with clean placeholders and will be populated as Deepak's live repositories are published.
                  </span>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-8 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  {activeProjectModal.githubUrl && (
                    <a
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-tech text-xs tracking-wider transition flex items-center space-x-2"
                    >
                      <Github size={14} />
                      <span>GITHUB REPO [PLACEHOLDER]</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveProjectModal(null);
                  }}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-bold text-xs tracking-wider transition"
                >
                  RETURN TO VAULT
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
