import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Interactive 3D Microcontroller Board (ESP32 / Arduino Hybrid Lab Board)
function MicrocontrollerBoard({ activeComponent, setActiveComponent }: {
  activeComponent: string | null;
  setActiveComponent: (name: string | null) => void;
}) {
  const boardRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Mesh>(null);

  // Subtle breathing rotation
  useFrame((state) => {
    if (boardRef.current) {
      boardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
    if (ledRef.current) {
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 8) * 0.5;
      (ledRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity * 2;
    }
  });

  return (
    <group ref={boardRef} rotation={[0.4, 0, 0]}>
      {/* PCB Base Board (Matte Dark Blue / Cyan Soldermask) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.12, 6.2]} />
        <meshStandardMaterial color="#041e2b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* PCB Circuit Traces (Gold / Copper Lines) */}
      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 5.8]} />
        <meshStandardMaterial
          color="#00f2fe"
          roughness={0.2}
          metalness={0.9}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Main Microcontroller IC Chip (ESP32 / ATmega) */}
      <group 
        position={[0, 0.18, 0.4]}
        onPointerOver={(e) => { e.stopPropagation(); setActiveComponent('Main SoC / MCU'); }}
        onPointerOut={() => setActiveComponent(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.18, 1.6]} />
          <meshStandardMaterial 
            color={activeComponent === 'Main SoC / MCU' ? '#00f2fe' : '#111827'} 
            roughness={0.4} 
            metalness={0.8}
            emissive={activeComponent === 'Main SoC / MCU' ? '#00f2fe' : '#000000'}
            emissiveIntensity={activeComponent === 'Main SoC / MCU' ? 0.4 : 0}
          />
        </mesh>
        {/* Metal RF Shield / Silicon Heat Spreader */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.4, 0.05, 1.4]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>

      {/* USB Type-B / Micro-USB Port */}
      <group 
        position={[0, 0.28, -2.8]}
        onPointerOver={(e) => { e.stopPropagation(); setActiveComponent('USB Interface & Power'); }}
        onPointerOut={() => setActiveComponent(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.45, 0.8]} />
          <meshStandardMaterial 
            color={activeComponent === 'USB Interface & Power' ? '#38bdf8' : '#cbd5e1'} 
            metalness={0.9} 
            roughness={0.2} 
          />
        </mesh>
      </group>

      {/* GPIO Header Pins Left (Digital Pins) */}
      <group 
        position={[-1.8, 0.25, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setActiveComponent('Digital I/O & PWM Pins'); }}
        onPointerOut={() => setActiveComponent(null)}
      >
        {Array.from({ length: 14 }).map((_, idx) => (
          <mesh key={idx} position={[0, 0, -2.3 + idx * 0.36]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Black plastic socket */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.2, 0.2, 5.2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>

      {/* GPIO Header Pins Right (Power, Analog & Communication) */}
      <group 
        position={[1.8, 0.25, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setActiveComponent('Analog Inputs & Power Rails'); }}
        onPointerOut={() => setActiveComponent(null)}
      >
        {Array.from({ length: 14 }).map((_, idx) => (
          <mesh key={idx} position={[0, 0, -2.3 + idx * 0.36]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Black plastic socket */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.2, 0.2, 5.2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>

      {/* Crystal Oscillator (16MHz) */}
      <group 
        position={[0.8, 0.16, -1.2]}
        onPointerOver={(e) => { e.stopPropagation(); setActiveComponent('16MHz Crystal Clock'); }}
        onPointerOut={() => setActiveComponent(null)}
      >
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Electrolytic Capacitors (Power Filtering) */}
      <group position={[-1.1, 0.35, -1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.6, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.31, 0]}>
          <cylinderGeometry args={[0.27, 0.27, 0.02, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* Reset Tactile Button */}
      <group 
        position={[-1.3, 0.2, 2.2]}
        onPointerOver={(e) => { e.stopPropagation(); setActiveComponent('Hardware Reset Switch'); }}
        onPointerOut={() => setActiveComponent(null)}
      >
        <mesh>
          <boxGeometry args={[0.4, 0.2, 0.4]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 12]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Status LEDs */}
      {/* Power LED (Steady Green) */}
      <mesh position={[1.2, 0.12, 1.8]}>
        <boxGeometry args={[0.12, 0.08, 0.12]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </mesh>
      {/* TX/RX Activity LED (Blinking Cyan) */}
      <mesh ref={ledRef} position={[1.2, 0.12, 1.4]}>
        <boxGeometry args={[0.12, 0.08, 0.12]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={1} />
      </mesh>

      {/* Wi-Fi / Bluetooth Trace Antenna */}
      <mesh position={[0, 0.08, 2.7]}>
        <boxGeometry args={[2.0, 0.02, 0.5]} />
        <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Floating Holographic Info Pin */}
      {activeComponent && (
        <Html position={[0, 1.6, 0]} center distanceFactor={8}>
          <div className="bg-black/90 border border-cyan-400 px-3 py-1.5 rounded text-xs font-tech text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.6)] backdrop-blur-md pointer-events-none whitespace-nowrap animate-pulse">
            [IDENTIFIED]: {activeComponent}
          </div>
        </Html>
      )}
    </group>
  );
}

export const HardwareModelViewer: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <div className="w-full h-[400px] md:h-[480px] relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#020617]/80 shadow-[0_0_30px_rgba(0,242,254,0.1)]">
      {/* Canvas Top Bar HUD */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-tech text-cyan-400 tracking-wider">3D LAB HARDWARE TELEMETRY</span>
        </div>
        <div className="text-[11px] font-mono-tech text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-cyan-500/20">
          DRAG TO ROTATE • SCROLL TO ZOOM
        </div>
      </div>

      {/* Active Component Inspector HUD Overlay */}
      <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none">
        <div className="bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 rounded-lg p-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400 font-mono-tech text-xs">MODULE:</span>
            <span className="text-white font-tech text-xs font-semibold">
              {activeComponent ? activeComponent : 'Hover over any component on the board'}
            </span>
          </div>
          <span className="text-[10px] text-cyan-400/80 font-mono-tech hidden sm:inline">
            ESP32 / ARDUINO ARCHITECTURE
          </span>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 4.5, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#030712']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#e0f2fe" />
        <pointLight position={[-4, 3, -2]} intensity={2.0} color="#00f2fe" />
        <pointLight position={[4, 2, 3]} intensity={1.5} color="#8b5cf6" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <MicrocontrollerBoard 
            activeComponent={activeComponent} 
            setActiveComponent={setActiveComponent} 
          />
        </Float>

        <OrbitControls
          enablePan={false}
          minDistance={3.5}
          maxDistance={9.5}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={!activeComponent}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
};
