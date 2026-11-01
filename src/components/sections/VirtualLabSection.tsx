import React from 'react';
import { LabCanvas } from '../canvas/LabCanvas';
import { LabZone } from '../../types';
import { soundFx } from '../../audio/soundEffects';
import { SectionHeading } from '../common/SectionHeading';
import { Compass, Cpu, Bot, Layers, Sparkles } from 'lucide-react';

interface VirtualLabSectionProps {
  currentZone: LabZone;
  onSelectZone: (zone: LabZone) => void;
  isEcoMode: boolean;
  onOpenProjects: () => void;
  onOpenHardware: () => void;
}

export const VirtualLabSection: React.FC<VirtualLabSectionProps> = ({
  currentZone,
  onSelectZone,
  isEcoMode,
  onOpenProjects,
  onOpenHardware
}) => {
  const zones: { id: LabZone; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'CENTRAL_LAB',
      label: 'COMMAND CORE',
      icon: <Compass size={14} />,
      desc: 'Central futuristic workstation & articulated robotic arm'
    },
    {
      id: 'HARDWARE_BENCH',
      label: 'HARDWARE BENCH',
      icon: <Cpu size={14} />,
      desc: 'Microcontroller bus, ESP32 telemetry & electronic sensors'
    },
    {
      id: 'AI_CORE',
      label: 'AI MATRIX',
      icon: <Bot size={14} />,
      desc: 'FactoryMind & Padika neural scheduling pipelines'
    },
    {
      id: 'PROJECT_HOLOGRAMS',
      label: 'PROJECT VAULT',
      icon: <Layers size={14} />,
      desc: 'Holographic display gallery with 6 active projects'
    }
  ];

  const handleZoneClick = (zoneId: LabZone) => {
    soundFx.playModeSwitch();
    onSelectZone(zoneId);
  };

  return (
    <section id="lab" className="relative min-h-screen py-20 bg-[#030712] overflow-hidden border-t border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="VIRTUAL ENVIRONMENT"
          title="INNOVATION LAB 3D"
          subtitle="Explore the virtual laboratory environment where software logic meets physical hardware experimentation."
          terminalCode="LAB_ZONE // LIVE"
          accentColor="cyan"
        />

        {/* 3D Lab Simulation Container */}
        <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950/60 shadow-[0_0_50px_rgba(0,242,254,0.15)]">
          
          {/* Top HUD Telemetry Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-tech text-cyan-300">
                ACTIVE FOCUS: {currentZone.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 text-[11px] font-mono-tech text-slate-300">
              <Sparkles size={13} className="text-cyan-400" />
              <span>ROBOTIC ARM: ONLINE</span>
              <span className="text-slate-500">•</span>
              <span>QUANTUM CORE: STABLE</span>
            </div>
          </div>

          {/* Interactive Three.js R3F Canvas */}
          <LabCanvas
            currentZone={currentZone}
            onZoneSelect={onSelectZone}
            isEcoMode={isEcoMode}
          />

          {/* Bottom HUD: Zone Teleportation Controls */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-cyan-500/30">
            {/* Zone Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono-tech text-cyan-400 uppercase hidden md:inline mr-1">
                NAVIGATE:
              </span>
              {zones.map((zone) => {
                const isActive = currentZone === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => handleZoneClick(zone.id)}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-tech tracking-wider uppercase transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,242,254,0.6)] scale-105'
                        : 'bg-slate-900/90 border border-cyan-500/20 text-slate-300 hover:text-white hover:border-cyan-400'
                    }`}
                  >
                    {zone.icon}
                    <span>{zone.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Action Link for active zone */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              {currentZone === 'HARDWARE_BENCH' ? (
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onOpenHardware();
                  }}
                  className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-mono-tech hover:bg-emerald-500/30 transition flex items-center space-x-1"
                >
                  <span>INSPECT HW BENCH</span>
                  <span>&rarr;</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onOpenProjects();
                  }}
                  className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono-tech hover:bg-cyan-500/30 transition flex items-center space-x-1"
                >
                  <span>ENTER PROJECT VAULT</span>
                  <span>&rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Informational Sub-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="cyber-glass-card p-4 rounded-xl">
            <h4 className="font-tech text-xs text-cyan-400 font-bold mb-1 flex items-center space-x-1.5">
              <Bot size={14} />
              <span>ARTICULATED ROBOTIC ARM</span>
            </h4>
            <p className="text-slate-400 text-xs font-light">
              Autonomous multi-axis kinematics and procedural laser welding tool, demonstrating robotic motion principles.
            </p>
          </div>

          <div className="cyber-glass-card p-4 rounded-xl">
            <h4 className="font-tech text-xs text-purple-400 font-bold mb-1 flex items-center space-x-1.5">
              <Cpu size={14} />
              <span>QUANTUM CORE REACTOR</span>
            </h4>
            <p className="text-slate-400 text-xs font-light">
              Centrally suspended energy reactor simulating real-time system clock frequency and computational throughput.
            </p>
          </div>

          <div className="cyber-glass-card p-4 rounded-xl">
            <h4 className="font-tech text-xs text-emerald-400 font-bold mb-1 flex items-center space-x-1.5">
              <Layers size={14} />
              <span>HOLOGRAPHIC HUD CONSOLES</span>
            </h4>
            <p className="text-slate-400 text-xs font-light">
              Floating 3D glass display panels linked directly to software projects, hardware pinouts, and system metrics.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
