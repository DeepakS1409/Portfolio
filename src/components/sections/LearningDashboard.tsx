import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { CURRENTLY_LEARNING_DATA } from '../../data/learning';
import { BookOpen, Target, Activity } from 'lucide-react';

export const LearningDashboard: React.FC = () => {
  return (
    <section id="learning" className="relative py-24 bg-lab-dark border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="KNOWLEDGE PIPELINE"
          title="CURRENTLY LEARNING // TELEMETRY"
          subtitle="Real-time telemetry of active engineering subjects, curriculum studies, and personal research objectives."
          terminalCode="LEARNING // REPO"
          accentColor="blue"
        />

        {/* Dashboard Top Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between flex-wrap gap-4 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <div className="font-mono-tech text-xs text-slate-300">
              <span className="text-white font-tech font-bold mr-2">LEARNING VELOCITY:</span>
              <span>7 Active Research Tracks • 1st Year B.Tech IT Coursework</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-[10px] font-mono-tech text-cyan-300">
            TRANSPARENT LEARNER GOALS
          </span>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRENTLY_LEARNING_DATA.map((item) => {
            const statusColor = {
              'Active Study': 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
              'Hands-on Practice': 'border-purple-500/40 text-purple-400 bg-purple-950/40',
              'Future Exploration': 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
            }[item.status];

            const barColor = {
              'Active Study': 'from-cyan-500 to-blue-500',
              'Hands-on Practice': 'from-purple-500 to-pink-500',
              'Future Exploration': 'from-emerald-500 to-teal-500'
            }[item.status];

            return (
              <div
                key={item.id}
                className="cyber-glass-card p-6 rounded-2xl flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div>
                  {/* Card Header: Category + Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech border ${statusColor}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Topic Title */}
                  <h3 className="font-tech text-lg font-bold text-white group-hover:text-cyan-300 transition mb-3">
                    {item.topic}
                  </h3>

                  {/* Current Focus */}
                  <div className="mb-4">
                    <span className="text-[11px] font-mono-tech text-cyan-400 flex items-center space-x-1 mb-1">
                      <Activity size={13} />
                      <span>CURRENT DEEP DIVE:</span>
                    </span>
                    <p className="text-slate-300 text-xs font-light leading-relaxed bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                      {item.currentFocus}
                    </p>
                  </div>

                  {/* Target Goal */}
                  <div className="mb-4">
                    <span className="text-[11px] font-mono-tech text-purple-400 flex items-center space-x-1 mb-1">
                      <Target size={13} />
                      <span>CORE TARGET GOAL:</span>
                    </span>
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {item.goal}
                    </p>
                  </div>
                </div>

                {/* Progress Bar & Resources */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex justify-between items-center text-[10px] font-mono-tech mb-1.5">
                    <span className="text-slate-400">MASTERY TRAJECTORY</span>
                    <span className="text-cyan-400 font-bold">{item.progressPercent}%</span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-3">
                    <div
                      className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10px] font-mono-tech text-slate-500 truncate">
                    <BookOpen size={11} className="shrink-0" />
                    <span className="truncate">Ref: {item.resources}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
