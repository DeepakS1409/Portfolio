import React, { useState, useEffect } from 'react';
import { Menu, X, HelpCircle, Terminal, Cpu } from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { PerformanceModeToggle } from './PerformanceModeToggle';
import { soundFx } from '../../audio/soundEffects';

interface NavigationProps {
  onOpenGuide: () => void;
  isEcoMode: boolean;
  onToggleEco: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenGuide,
  isEcoMode,
  onToggleEco
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'lab', label: '3D LAB' },
    { id: 'about', label: 'IDENTITY' },
    { id: 'skills', label: 'ARSENAL' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'hardware', label: 'PHYSICAL HW' },
    { id: 'learning', label: 'LEARNING' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'contact', label: 'TERMINAL' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Intersection detection
      const sections = ['hero', ...navLinks.map((l) => l.id)];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/20 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex items-center space-x-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(0,242,254,0.5)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#030712] rounded-[6px] flex items-center justify-center">
              <Cpu className="text-cyan-400 group-hover:rotate-45 transition-transform duration-300" size={17} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-tech text-base font-extrabold tracking-wider text-white group-hover:text-cyan-400 transition">
              DEEPAK S
            </span>
            <span className="text-[9px] font-mono-tech text-cyan-400/80 -mt-1 tracking-widest hidden sm:inline">
              INNOVATION LAB // SECE IT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 border border-cyan-500/20 rounded-full px-3 py-1 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech tracking-wider transition-all duration-200 relative ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Audio, Eco Mode, Guide, Terminal */}
        <div className="flex items-center space-x-2">
          {/* Audio Synthesizer Toggle */}
          <AudioToggle />

          {/* Eco / 8GB RAM Mode Toggle */}
          <PerformanceModeToggle isEcoMode={isEcoMode} onToggle={onToggleEco} />

          {/* Guide Modal Trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenGuide();
            }}
            title="Lab Interaction Guide"
            className="p-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:text-white transition"
          >
            <HelpCircle size={16} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 lg:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-cyan-500/30 backdrop-blur-xl px-4 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-mono-tech tracking-wider flex items-center justify-between transition ${
                  activeSection === link.id
                    ? 'bg-cyan-950/80 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <Terminal size={14} className="text-cyan-500" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
