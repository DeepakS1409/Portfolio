import React, { useState } from 'react';
import { 
  JourneyStation, SectionId 
} from '../../types';
import { 
  CheckCircle2, ExternalLink, Github, ArrowRight, ArrowLeft, 
  FileDown, Sparkles, Terminal, Globe, Bot, Cpu, ShoppingCart, 
  MessageSquare, GraduationCap, Car, Lightbulb, Trophy, BookOpen, 
  MapPin, Send, AlertCircle, CheckCircle, ChevronDown, ChevronUp,
  Award, ShieldCheck, Maximize2, Download, X
} from 'lucide-react';
import { soundFx } from '../../audio/soundEffects';

interface LargeContentPanelProps {
  station: JourneyStation;
  sectionId: SectionId;
  totalStations: number;
  onNextStation: () => void;
  onPrevStation: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const renderVisualIcon = (type?: string, className = 'text-cyan-400') => {
  const props = { size: 28, className };
  switch (type) {
    case 'ShoppingCart': return <ShoppingCart {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'MessageSquare': return <MessageSquare {...props} />;
    case 'GraduationCap': return <GraduationCap {...props} />;
    case 'Car': return <Car {...props} />;
    case 'Lightbulb': return <Lightbulb {...props} />;
    case 'Terminal': return <Terminal {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Bot': return <Bot {...props} />;
    case 'Trophy': return <Trophy {...props} />;
    case 'Award': return <Award {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'BookOpen': return <BookOpen {...props} />;
    case 'MapPin': return <MapPin {...props} />;
    case 'Send': return <Send {...props} />;
    case 'FileDown': return <FileDown {...props} />;
    default: return <Sparkles {...props} />;
  }
};

export const LargeContentPanel: React.FC<LargeContentPanelProps> = ({
  station,
  sectionId,
  totalStations,
  onNextStation,
  onPrevStation,
  hasNext,
  hasPrev
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Form state for contact transmission station
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

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

ACADEMIC & TECHNICAL HIGHLIGHTS:
- B.Tech Information Technology | 2026–2030 • Sri Eshwar College of Engineering
- Core Languages: C, C++, Python, JavaScript (ES6+)
- Modern Web: React, Vite, Tailwind CSS, Responsive Design
- AI Passion: Generative AI, Prompt Engineering, API Integration
- Hardware Interests: Arduino UNO, ESP32, Embedded C, Robotics Kinematics

PROJECTS SHOWCASE:
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setFormError('Please input name, email, and message packet.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
    soundFx.playSuccess();

    // Auto mailto fallback
    const mailtoLink = `mailto:deepak.placeholder@sece.ac.in?subject=${encodeURIComponent(
      `[Tech Ride] ${contactForm.subject || 'Inquiry'}`
    )}&body=${encodeURIComponent(
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
    )}`;
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 1000);
  };

  // Alternating side logic: Stop 1 = LEFT, Stop 2 = RIGHT, Stop 3 = LEFT, Stop 4 = RIGHT...
  const isRightSide = station.stationNumber % 2 === 0;

  return (
    <div 
      key={station.id}
      className={`fixed bottom-20 z-30 pointer-events-auto transition-all duration-500 ease-out ${
        isRightSide
          ? 'left-4 right-4 sm:left-auto sm:right-8 sm:w-[480px] md:w-[540px] animate-in slide-in-from-right-12 fade-in duration-400'
          : 'left-4 right-4 sm:right-auto sm:left-8 sm:w-[480px] md:w-[540px] animate-in slide-in-from-left-12 fade-in duration-400'
      }`}
    >
      <div className="bg-slate-950/92 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col max-h-[78vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              {renderVisualIcon(station.content.visualType, 'text-emerald-400')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 uppercase">
                  STATION {station.stationNumber} OF {totalStations} • {isRightSide ? 'RIGHT SIDE' : 'LEFT SIDE'}
                </span>
                <span className="text-[10px] font-mono-tech text-slate-400">
                  {station.kmMarker}
                </span>
              </div>
              <span className="text-[11px] font-mono-tech text-cyan-400 font-semibold block">
                {station.categoryTag || 'Showcase Destination'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {station.content.badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-cyan-400/50 text-[10px] font-mono-tech text-cyan-300 hidden sm:inline">
                {station.content.badge}
              </span>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title={isMinimized ? 'Expand Panel' : 'Minimize Panel'}
            >
              {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="shrink-0 mb-2">
          <h2 className="font-tech text-xl sm:text-2xl font-black text-white tracking-wide">
            {station.title}
          </h2>
          <p className="text-xs font-mono-tech text-slate-300 mt-0.5">
            {station.subtitle}
          </p>
        </div>

        {/* Expandable Body */}
        {!isMinimized && (
          <div className="overflow-y-auto space-y-4 my-2 pr-1 custom-scrollbar text-xs sm:text-sm">
            
            {/* ======================================================== */}
            {/* 1. CERTIFICATE SHOWCASE MODE (CERTIFICATE IMAGE FIRST!) */}
            {/* ======================================================== */}
            {station.content.certificateImage ? (
              <div className="space-y-3.5 animate-in fade-in zoom-in-95 duration-300">
                {/* PRIMARY PROMINENT CERTIFICATE IMAGE (SHOWN FIRST AT THE TOP!) */}
                <div 
                  onClick={() => {
                    soundFx.playClick();
                    setIsLightboxOpen(true);
                  }}
                  className="group relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 hover:border-emerald-400 transition-all cursor-pointer shadow-[0_0_35px_rgba(16,185,129,0.35)] bg-black flex items-center justify-center p-1.5"
                >
                  <img
                    src={station.content.certificateImage}
                    alt={station.title}
                    className="w-full h-56 sm:h-64 md:h-72 object-contain rounded-xl bg-slate-950/90 group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <span className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-tech text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-2xl">
                      <Maximize2 size={14} />
                      <span>CLICK TO ZOOM FULLSCREEN</span>
                    </span>
                  </div>
                </div>

                {/* ACTION BUTTONS: DOWNLOAD & VERIFY */}
                <div className="flex flex-wrap items-center gap-2">
                  {station.content.downloadUrl && (
                    <a
                      href={station.content.downloadUrl}
                      download
                      onClick={() => soundFx.playSuccess()}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-tech text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-lg hover:shadow-emerald-500/40"
                    >
                      <Download size={15} />
                      <span>DOWNLOAD ORIGINAL CERTIFICATE</span>
                    </a>
                  )}

                  {station.content.verificationUrl && (
                    <a
                      href={station.content.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-tech text-xs font-bold tracking-wider uppercase transition flex items-center justify-center space-x-1.5"
                    >
                      <ExternalLink size={14} />
                      <span>OFFICIAL PORTAL</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setIsLightboxOpen(true);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition flex items-center space-x-1.5"
                    title="Fullscreen Preview"
                  >
                    <Maximize2 size={14} />
                    <span className="text-[11px] font-mono-tech hidden sm:inline">FULLSCREEN</span>
                  </button>
                </div>

                {/* VERIFIED CREDENTIAL METADATA CHIPS */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono-tech pt-1">
                  <span className="text-emerald-400 font-bold flex items-center space-x-1 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                    <ShieldCheck size={13} />
                    <span>VERIFIED CREDENTIAL</span>
                  </span>

                  {station.content.organization && (
                    <span className="text-slate-200 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                      {station.content.organization}
                    </span>
                  )}

                  {station.content.validity && (
                    <span className="text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/40">
                      VALIDITY: {station.content.validity}
                    </span>
                  )}

                  {station.content.credentialId && (
                    <span className="text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/40">
                      ID: {station.content.credentialId}
                    </span>
                  )}
                </div>

                {/* KEY VERIFIED HIGHLIGHTS */}
                {station.content.highlights && station.content.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {station.content.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start space-x-2 bg-slate-900/50 p-2 rounded-xl border border-slate-800/80">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200 text-xs font-sans">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ======================================================== */
              /* 2. STANDARD BODY FOR OTHER SECTIONS (PROJECTS, SKILLS) */
              /* ======================================================== */
              <>
                {/* Description */}
                <p className="text-slate-300 font-light leading-relaxed bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80">
                  {station.content.description}
                </p>

                {/* Highlights */}
                {station.content.highlights && station.content.highlights.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono-tech text-emerald-400 uppercase tracking-wider block font-semibold">
                      // KEY ARCHITECTURAL FEATURES & HIGHLIGHTS
                    </span>
                    {station.content.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start space-x-2 bg-slate-900/40 p-2 rounded-xl border border-slate-800/60">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-xs leading-relaxed font-sans">{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Chips */}
                {station.content.techStack && (
                  <div>
                    <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block font-semibold mb-1.5">
                      // TECHNOLOGIES & TOOLS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {station.content.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono-tech">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons for Projects */}
                {sectionId === 'projects' && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {station.content.githubUrl && (
                      <a
                        href={station.content.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-tech text-xs tracking-wider uppercase transition flex items-center justify-center space-x-1.5"
                      >
                        <Github size={14} />
                        <span>GITHUB REPO [PLACEHOLDER]</span>
                      </a>
                    )}
                    {station.content.liveDemoUrl && (
                      <a
                        href={station.content.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-300 font-tech text-xs tracking-wider uppercase transition flex items-center justify-center space-x-1.5"
                      >
                        <ExternalLink size={14} />
                        <span>LIVE DEMO [PLACEHOLDER]</span>
                      </a>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Action for Resume Station */}
            {station.id === 'resume-station' && (
              <div className="pt-2">
                <button
                  onClick={handleDownloadResume}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-tech font-bold text-xs tracking-wider uppercase transition shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center space-x-2"
                >
                  <FileDown size={16} />
                  <span>DOWNLOAD VERIFIED RESUME (.TXT)</span>
                </button>
              </div>
            )}

            {/* Interactive Form for Contact Terminal Station */}
            {station.id === 'terminal-station' && (
              <div className="pt-2">
                {formSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-400 text-center space-y-2">
                    <CheckCircle className="text-emerald-400 mx-auto" size={24} />
                    <span className="font-tech text-sm text-white font-bold block">TRANSMISSION DISPATCHED</span>
                    <p className="text-[11px] font-mono-tech text-slate-300">
                      Message logged and prepared for email delivery to Deepak.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono-tech focus:border-cyan-400 focus:outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Your Email *"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono-tech focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Transmission Message Data Packet *"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono-tech focus:border-cyan-400 focus:outline-none resize-none"
                    />
                    {formError && (
                      <p className="text-red-400 text-[10px] font-mono-tech flex items-center space-x-1">
                        <AlertCircle size={10} />
                        <span>{formError}</span>
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center space-x-1.5"
                    >
                      <Send size={13} />
                      <span>DISPATCH TRANSMISSION</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Extra architectural note */}
            {station.content.extraNote && (
              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] font-mono-tech text-slate-400 italic">
                ★ {station.content.extraNote}
              </div>
            )}
          </div>
        )}

        {/* Bottom Station Navigation Stepper */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              onPrevStation();
            }}
            disabled={!hasPrev}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl font-tech text-xs tracking-wider uppercase transition ${
              hasPrev ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700' : 'opacity-40 text-slate-600 cursor-not-allowed'
            }`}
          >
            <ArrowLeft size={13} />
            <span>PREV STATION</span>
          </button>

          <span className="text-[10px] font-mono-tech text-slate-400 hidden sm:inline">
            SCROLL TO ADVANCE ROAD TRIP
          </span>

          <button
            onClick={() => {
              soundFx.playClick();
              onNextStation();
            }}
            disabled={!hasNext}
            className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-xl font-tech font-bold text-xs tracking-wider uppercase transition ${
              hasNext 
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
                : 'opacity-40 bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>NEXT STATION</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      {isLightboxOpen && station.content.certificateImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[92vh] bg-slate-950 border border-emerald-500/40 rounded-3xl p-4 sm:p-6 shadow-[0_0_60px_rgba(16,185,129,0.3)] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono-tech text-emerald-400 uppercase tracking-widest block font-bold">
                  // VERIFIED CREDENTIAL PREVIEW
                </span>
                <h3 className="font-tech text-base sm:text-xl font-bold text-white uppercase mt-0.5">
                  {station.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                {station.content.downloadUrl && (
                  <a
                    href={station.content.downloadUrl}
                    download
                    onClick={() => soundFx.playSuccess()}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-tech text-xs font-bold uppercase transition"
                  >
                    <Download size={13} />
                    <span>DOWNLOAD</span>
                  </a>
                )}
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* High-Res Image Display */}
            <div className="overflow-auto max-h-[78vh] w-full flex items-center justify-center rounded-2xl bg-black/60 p-2">
              <img
                src={station.content.certificateImage}
                alt={station.title}
                className="max-w-full max-h-[74vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
