import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { HardwareModelViewer } from '../canvas/HardwareModelViewer';
import { soundFx } from '../../audio/soundEffects';
import { Cpu, Wifi, Bot, ShieldCheck, Zap, Terminal } from 'lucide-react';

export const HardwareLabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bridge' | 'boards' | 'sensors'>('bridge');

  return (
    <section id="hardware" className="relative py-24 bg-lab-dark border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="PHYSICAL COMPUTING // INTERESTS"
          title="BEYOND SOFTWARE — EXPLORING THE PHYSICAL WORLD"
          subtitle="Investigating the deep relationship between software algorithms, microcontroller telemetry, and physical actuators."
          terminalCode="HW_LAB // EMBEDDED"
          accentColor="emerald"
        />

        {/* Academic Disclosure Alert */}
        <div className="mb-10 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-start space-x-3.5 backdrop-blur-md">
          <ShieldCheck size={20} className="text-emerald-400 mt-0.5 shrink-0" />
          <div className="text-xs font-mono-tech text-emerald-300">
            <strong className="text-white font-tech block text-sm mb-0.5">
              EXPLORATORY INTERESTS & FUTURE LEARNING ROADMAP
            </strong>
            <p className="leading-relaxed">
              This specialized physical computing laboratory zone documents Deepak's active interests, hardware experimentation goals, and coursework investigations in IoT, embedded systems, and robotics. It represents future exploration and foundational learning, not commercial hardware deployments.
            </p>
          </div>
        </div>

        {/* Main Grid: Interactive 3D Hardware Inspector + Physical Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: 3D Hardware Model Inspector */}
          <div className="lg:col-span-7 flex flex-col">
            <HardwareModelViewer />
            
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono-tech text-slate-400 px-2">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>3D PROCEDURAL LAB BENCH BOARD</span>
              </span>
              <span>SIMULATED ESP32 / ARDUINO CORE</span>
            </div>
          </div>

          {/* Right Column: The Software-Hardware Bridge Concept */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Interactive Tab Switcher */}
            <div className="flex items-center space-x-1.5 p-1 bg-slate-900/80 border border-emerald-500/30 rounded-xl">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('bridge');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-tech tracking-wider uppercase transition ${
                  activeTab === 'bridge'
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                THE BRIDGE
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('boards');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-tech tracking-wider uppercase transition ${
                  activeTab === 'boards'
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                BOARDS & MCUS
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('sensors');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-tech tracking-wider uppercase transition ${
                  activeTab === 'sensors'
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SENSORS & ROBOTICS
              </button>
            </div>

            {/* Tab 1: Software to Hardware Pipeline */}
            {activeTab === 'bridge' && (
              <div className="cyber-glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center space-x-2 text-emerald-400 font-tech text-xs font-bold uppercase tracking-wider">
                  <Terminal size={16} />
                  <span>HOW CODE BECOMES PHYSICAL ACTION</span>
                </div>

                <div className="space-y-3 font-mono-tech text-xs text-slate-300">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      1
                    </span>
                    <div>
                      <strong className="text-white block font-tech">High-Level Web Logic (React/Python)</strong>
                      <span className="text-slate-400 text-[11px]">
                        Web dashboard sends commands via HTTP REST or WebSockets to edge gateway brokers.
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center text-cyan-500 text-sm">
                    ↓ MQTT / Serial Communication Protocol ↓
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-400 text-emerald-300 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      2
                    </span>
                    <div>
                      <strong className="text-white block font-tech">Microcontroller Firmware (C / C++)</strong>
                      <span className="text-slate-400 text-[11px]">
                        ESP32 / Arduino interprets byte packets, parses JSON, and toggles hardware GPIO registers.
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center text-emerald-500 text-sm">
                    ↓ Pulse Width Modulation (PWM) & Logic Levels ↓
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-400 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      3
                    </span>
                    <div>
                      <strong className="text-white block font-tech">Physical Actuation & Sensor Feedback</strong>
                      <span className="text-slate-400 text-[11px]">
                        Servos pivot robotic joints, relays switch circuit paths, and ultrasonic sensors stream distance back.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Boards & MCUs */}
            {activeTab === 'boards' && (
              <div className="cyber-glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center space-x-2 text-cyan-400 font-tech text-xs font-bold uppercase tracking-wider">
                  <Cpu size={16} />
                  <span>HARDWARE TARGETS BEING STUDIED</span>
                </div>

                <div className="space-y-3 font-mono-tech text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-cyan-500/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-tech font-bold">ESP32 SoC Module</span>
                      <span className="text-cyan-400 text-[10px]">Wi-Fi + BLE 5.0</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Studying dual-core Tensilica Xtensa LX6 processors, freeRTOS multi-tasking, deep sleep power modes, and cloud telemetry transmission.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/70 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-tech font-bold">Arduino UNO (ATmega328P)</span>
                      <span className="text-emerald-400 text-[10px]">16MHz AVR</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Foundational board used to learn analog-to-digital conversion, interrupt service routines, timer counters, and basic breadboard wiring.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Sensors & Robotics */}
            {activeTab === 'sensors' && (
              <div className="cyber-glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center space-x-2 text-purple-400 font-tech text-xs font-bold uppercase tracking-wider">
                  <Bot size={16} />
                  <span>SENSORS & ROBOTIC KINEMATICS</span>
                </div>

                <div className="space-y-3 font-mono-tech text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-purple-500/30">
                    <span className="text-white font-tech font-bold block mb-1">Ultrasonic & Optical Bay Sensors</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Explored in the Smart Parking System concept for non-contact obstacle detection and parking slot vacancy telemetry.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/70 border border-purple-500/30">
                    <span className="text-white font-tech font-bold block mb-1">LDRs & Current Telemetry Sensors</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Explored in the Smart Street Light Monitoring System concept to detect blown fixtures and optimize municipal power consumption.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/70 border border-purple-500/30">
                    <span className="text-white font-tech font-bold block mb-1">Servo & Stepper Actuators</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Learning forward and inverse kinematics formulas to control robotic arm degree-of-freedom coordinates.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 4 Cards: Specific Hardware Interests Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="cyber-glass-card p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3">
              <Wifi size={18} />
            </div>
            <h4 className="font-tech text-sm text-white font-bold mb-1">IoT SENSOR NETWORKS</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Interest in gathering distributed environmental sensor data and channeling telemetry into modern cloud analytics dashboards.
            </p>
          </div>

          <div className="cyber-glass-card p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3">
              <Cpu size={18} />
            </div>
            <h4 className="font-tech text-sm text-white font-bold mb-1">EMBEDDED FIRMWARE</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Studying low-level C memory management to execute deterministic control loops on constrained microcontrollers.
            </p>
          </div>

          <div className="cyber-glass-card p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-3">
              <Bot size={18} />
            </div>
            <h4 className="font-tech text-sm text-white font-bold mb-1">ROBOTICS KINEMATICS</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Curious about multi-axis articulated arms, motor torque calculation, and autonomous path planning algorithms.
            </p>
          </div>

          <div className="cyber-glass-card p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
              <Zap size={18} />
            </div>
            <h4 className="font-tech text-sm text-white font-bold mb-1">SMART INFRASTRUCTURE</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Applying physical computing ideas to solve municipal street lighting and urban parking friction in Indian cities.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
