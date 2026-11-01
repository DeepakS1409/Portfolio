import React from 'react';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle: string;
  terminalCode?: string;
  accentColor?: 'cyan' | 'blue' | 'purple' | 'emerald';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  terminalCode = 'SYS.SEC // 0x4F',
  accentColor = 'cyan'
}) => {
  const accentBorder = {
    cyan: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
    blue: 'border-blue-500/40 text-blue-400 bg-blue-950/40',
    purple: 'border-purple-500/40 text-purple-400 bg-purple-950/40',
    emerald: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
  }[accentColor];

  const titleGlow = {
    cyan: 'holo-glow-cyan text-white',
    blue: 'holo-glow-blue text-white',
    purple: 'holo-glow-violet text-white',
    emerald: 'text-white'
  }[accentColor];

  return (
    <div className="flex flex-col items-center text-center mb-14 relative">
      {/* HUD System Tag */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono-tech tracking-wider uppercase ${accentBorder}`}>
          {badge}
        </span>
        <span className="text-[10px] font-mono-tech text-slate-400">
          [{terminalCode}]
        </span>
      </div>

      {/* Main Section Title */}
      <h2 className={`font-tech text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase ${titleGlow}`}>
        {title}
      </h2>

      {/* Futuristic Bracketed Subtitle */}
      <div className="flex items-center space-x-3 mt-4 max-w-2xl">
        <span className="text-cyan-500 font-mono-tech text-lg select-none">&lt;</span>
        <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
          {subtitle}
        </p>
        <span className="text-cyan-500 font-mono-tech text-lg select-none">&gt;</span>
      </div>

      {/* Circuit accent line */}
      <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-6 opacity-60" />
    </div>
  );
};
