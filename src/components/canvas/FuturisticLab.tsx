import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { LabZone } from '../../types';
import { soundFx } from '../../audio/soundEffects';

interface FuturisticLabProps {
  currentZone: LabZone;
  onZoneSelect: (zone: LabZone) => void;
  isEcoMode?: boolean;
}

// 1. Articulated 3D Robotic Arm with kinematics & welding laser
function RoboticArm() {
  const basePivotRef = useRef<THREE.Group>(null);
  const shoulderPivotRef = useRef<THREE.Group>(null);
  const elbowPivotRef = useRef<THREE.Group>(null);
  const wristPivotRef = useRef<THREE.Group>(null);
  const laserRef = useRef<THREE.PointLight>(null);
  const sparkRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Base panning rotation back and forth
    if (basePivotRef.current) {
      basePivotRef.current.rotation.y = Math.sin(t * 0.7) * 0.5;
    }
    // Shoulder flexion
    if (shoulderPivotRef.current) {
      shoulderPivotRef.current.rotation.z = -0.3 + Math.sin(t * 0.9) * 0.25;
    }
    // Elbow articulate
    if (elbowPivotRef.current) {
      elbowPivotRef.current.rotation.z = 0.6 + Math.cos(t * 1.1) * 0.3;
    }
    // Wrist orientation
    if (wristPivotRef.current) {
      wristPivotRef.current.rotation.y = Math.sin(t * 1.5) * 0.6;
    }

    // Laser welding spark bursts
    if (laserRef.current && sparkRef.current) {
      const isSparking = Math.sin(t * 5) > 0.6;
      laserRef.current.intensity = isSparking ? 4.5 : 0.2;
      sparkRef.current.scale.setScalar(isSparking ? 1.4 : 0.2);
    }
  });

  return (
    <group position={[-2.8, 0, 0.5]}>
      {/* Heavy Base Pedestal */}
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.6, 24]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Ring indicator */}
      <mesh position={[0, 0.62, 0]}>
        <ringGeometry args={[0.7, 0.85, 32]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating Base Turret */}
      <group ref={basePivotRef} position={[0, 0.65, 0]}>
        <mesh castShadow position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.65, 0.75, 0.7, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Shoulder Joint */}
        <group ref={shoulderPivotRef} position={[0, 0.7, 0]}>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 0.9, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>

          {/* Upper Arm Boom */}
          <mesh castShadow position={[0.7, 1.0, 0]} rotation={[0, 0, -0.6]}>
            <boxGeometry args={[0.4, 2.2, 0.4]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Elbow Joint */}
          <group ref={elbowPivotRef} position={[1.3, 1.9, 0]}>
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.7, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>

            {/* Forearm */}
            <mesh castShadow position={[-0.6, 0.9, 0]} rotation={[0, 0, 0.6]}>
              <boxGeometry args={[0.3, 1.8, 0.3]} />
              <meshStandardMaterial color="#0369a1" metalness={0.75} roughness={0.25} />
            </mesh>

            {/* Wrist Assembly */}
            <group ref={wristPivotRef} position={[-1.1, 1.7, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color="#00f2fe" metalness={0.9} roughness={0.2} />
              </mesh>

              {/* End Effector / Welder Tool & Gripper */}
              <group position={[0, 0.35, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.08, 0.15, 0.4, 12]} />
                  <meshStandardMaterial color="#475569" metalness={0.9} />
                </mesh>

                {/* Gripper Claws */}
                <mesh position={[-0.12, 0.25, 0]} rotation={[0, 0, -0.2]}>
                  <boxGeometry args={[0.06, 0.3, 0.08]} />
                  <meshStandardMaterial color="#00ffcc" metalness={0.8} />
                </mesh>
                <mesh position={[0.12, 0.25, 0]} rotation={[0, 0, 0.2]}>
                  <boxGeometry args={[0.06, 0.3, 0.08]} />
                  <meshStandardMaterial color="#00ffcc" metalness={0.8} />
                </mesh>

                {/* Laser Point and Spark Particle */}
                <pointLight ref={laserRef} color="#00f2fe" intensity={1} distance={4} />
                <mesh ref={sparkRef} position={[0, 0.42, 0]}>
                  <sphereGeometry args={[0.08, 12, 12]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// 2. Futuristic Workstation & Quantum Reactor Core
function WorkstationAndCore({ onSelectHolo }: { onSelectHolo: (zone: LabZone) => void }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(t * 3) * 0.15;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 1.5;
      ring1Ref.current.rotation.y = t * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 1.8;
      ring2Ref.current.rotation.z = t * 1.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Curved Console Desk */}
      <mesh receiveShadow position={[0, 0.9, -0.4]}>
        <cylinderGeometry args={[2.8, 3.2, 0.2, 32, 1, false, Math.PI * 0.65, Math.PI * 0.7]} />
        <meshStandardMaterial color="#080e1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Illuminated Desk Edge Trim */}
      <mesh position={[0, 0.95, -0.4]}>
        <cylinderGeometry args={[2.82, 3.22, 0.04, 32, 1, false, Math.PI * 0.65, Math.PI * 0.7]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={1.5} />
      </mesh>

      {/* Desk Support Pillars */}
      <mesh position={[-1.8, 0.45, -0.8]}>
        <cylinderGeometry args={[0.15, 0.2, 0.9, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[1.8, 0.45, -0.8]}>
        <cylinderGeometry args={[0.15, 0.2, 0.9, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>

      {/* Quantum Reactor Core (Center Floating) */}
      <group position={[0, 1.8, -0.6]}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
        <pointLight color="#00f2fe" intensity={2.5} distance={8} />

        {/* Orbiting Quantum Containment Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[0.65, 0.02, 16, 48]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[0.85, 0.02, 16, 48]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* 3 Floating Holographic Display Screens */}
      {/* Screen 1: System & AI Core (Left) */}
      <group 
        position={[-1.7, 2.1, -0.2]} 
        rotation={[0, 0.35, 0]}
        onClick={() => { soundFx.playClick(); onSelectHolo('AI_CORE'); }}
        onPointerOver={() => soundFx.playHover()}
      >
        <mesh>
          <planeGeometry args={[1.6, 1.0]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#00f2fe"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        <Html position={[0, 0, 0.02]} transform occlude center distanceFactor={4}>
          <div className="w-56 p-2.5 bg-slate-950/80 border border-cyan-400/60 rounded text-[9px] font-mono-tech text-cyan-300 pointer-events-auto select-none backdrop-blur-md cursor-pointer hover:border-cyan-300">
            <div className="flex items-center justify-between pb-1 border-b border-cyan-500/30 font-tech font-bold text-[10px] text-cyan-400">
              <span>AI MATRIX // TELEMETRY</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <p className="mt-1 text-slate-300">Neural Sync: 99.8% Online</p>
            <p className="text-cyan-400">Model: FactoryMind & Padika AI</p>
            <div className="mt-1.5 flex gap-1">
              <span className="px-1.5 py-0.5 bg-cyan-950/80 rounded border border-cyan-500/40 text-[8px] hover:bg-cyan-900/60">
                [INSPECT MATRIX]
              </span>
            </div>
          </div>
        </Html>
      </group>

      {/* Screen 2: Hardware Bench & IoT (Right) */}
      <group 
        position={[1.7, 2.1, -0.2]} 
        rotation={[0, -0.35, 0]}
        onClick={() => { soundFx.playClick(); onSelectHolo('HARDWARE_BENCH'); }}
        onPointerOver={() => soundFx.playHover()}
      >
        <mesh>
          <planeGeometry args={[1.6, 1.0]} />
          <meshStandardMaterial
            color="#059669"
            emissive="#10b981"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        <Html position={[0, 0, 0.02]} transform occlude center distanceFactor={4}>
          <div className="w-56 p-2.5 bg-slate-950/80 border border-emerald-400/60 rounded text-[9px] font-mono-tech text-emerald-300 pointer-events-auto select-none backdrop-blur-md cursor-pointer hover:border-emerald-300">
            <div className="flex items-center justify-between pb-1 border-b border-emerald-500/30 font-tech font-bold text-[10px] text-emerald-400">
              <span>HARDWARE LAB // BUS</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="mt-1 text-slate-300">MCU: ESP32 + Arduino Uno</p>
            <p className="text-emerald-400">Status: Exploratory Bench</p>
            <div className="mt-1.5 flex gap-1">
              <span className="px-1.5 py-0.5 bg-emerald-950/80 rounded border border-emerald-500/40 text-[8px] hover:bg-emerald-900/60">
                [VIEW HARDWARE]
              </span>
            </div>
          </div>
        </Html>
      </group>

      {/* Screen 3: Project Hologram Queue (Center High) */}
      <group 
        position={[0, 2.7, -1.2]} 
        rotation={[0.1, 0, 0]}
        onClick={() => { soundFx.playClick(); onSelectHolo('PROJECT_HOLOGRAMS'); }}
        onPointerOver={() => soundFx.playHover()}
      >
        <mesh>
          <planeGeometry args={[2.4, 0.9]} />
          <meshStandardMaterial
            color="#6d28d9"
            emissive="#8b5cf6"
            emissiveIntensity={0.7}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        <Html position={[0, 0, 0.02]} transform occlude center distanceFactor={4.5}>
          <div className="w-72 p-2.5 bg-slate-950/85 border border-purple-400/60 rounded text-[9px] font-mono-tech text-purple-300 pointer-events-auto select-none backdrop-blur-md cursor-pointer hover:border-purple-300">
            <div className="flex items-center justify-between pb-1 border-b border-purple-500/30 font-tech font-bold text-[10px] text-purple-400">
              <span>PROJECT VAULT // 6 ACTIVE</span>
              <span className="text-[8px] text-purple-400">LAB PIPELINE</span>
            </div>
            <p className="mt-1 text-slate-300">DeepKart • FactoryMind • WhatsApp AI</p>
            <p className="text-purple-300">Padika AI • Smart Parking • Streetlights</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[8px] text-slate-400">CLICK TO ENTER SHOWCASE</span>
              <span className="text-cyan-400 font-bold">&gt;&gt;</span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

// 3. Floating Silicon Microchips & Circuit Nodes in Stasis
function FloatingSiliconChips() {
  const chip1 = useRef<THREE.Group>(null);
  const chip2 = useRef<THREE.Group>(null);
  const chip3 = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (chip1.current) {
      chip1.current.rotation.x = t * 0.4;
      chip1.current.rotation.y = t * 0.6;
    }
    if (chip2.current) {
      chip2.current.rotation.y = -t * 0.5;
      chip2.current.rotation.z = t * 0.3;
    }
    if (chip3.current) {
      chip3.current.rotation.x = -t * 0.3;
      chip3.current.rotation.z = -t * 0.4;
    }
  });

  return (
    <>
      {/* Floating Processor Chip 1 */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        <group ref={chip1} position={[3.2, 1.8, 0.8]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.1, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.5, 0.02, 0.5]} />
            <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={1.8} />
          </mesh>
        </group>
      </Float>

      {/* Floating Processor Chip 2 */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
        <group ref={chip2} position={[-3.4, 2.5, -0.6]}>
          <mesh castShadow>
            <boxGeometry args={[0.9, 0.12, 0.9]} />
            <meshStandardMaterial color="#0b1329" roughness={0.2} metalness={0.95} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <boxGeometry args={[0.6, 0.02, 0.6]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.8} />
          </mesh>
        </group>
      </Float>

      {/* Floating Circuit Node 3 */}
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.5}>
        <group ref={chip3} position={[2.6, 3.1, -1.5]}>
          <mesh>
            <octahedronGeometry args={[0.45]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1.2} wireframe />
          </mesh>
        </group>
      </Float>
    </>
  );
}

// 4. Lab Floor Grid & Circuit Paths
function LabFloor() {
  return (
    <group position={[0, 0, 0]}>
      {/* Dark Laboratory Floor Plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Futuristic Grid Lines */}
      <gridHelper args={[24, 24, '#00f2fe', '#0c4a6e']} position={[0, 0.01, 0]} />

      {/* Concentric Cyber Rings on Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[3.8, 3.9, 64]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[6.5, 6.6, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// 5. Tech Dust Particles
function TechParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate lightweight deterministic coordinates
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 16;
    particles[i * 3 + 1] = Math.random() * 6;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#00f2fe"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export const FuturisticLab: React.FC<FuturisticLabProps> = ({
  currentZone: _currentZone,
  onZoneSelect,
  isEcoMode = false
}) => {
  return (
    <group>
      {/* Floor & Grid */}
      <LabFloor />

      {/* Robotic Arm */}
      <RoboticArm />

      {/* Central Workstation with Holograms and Core */}
      <WorkstationAndCore onSelectHolo={onZoneSelect} />

      {/* Floating Hardware Chips */}
      <FloatingSiliconChips />

      {/* Tech Dust Particle Field (Optimized for 8GB RAM) */}
      <TechParticles count={isEcoMode ? 60 : 130} />
    </group>
  );
};
