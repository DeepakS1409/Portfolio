import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Futuristic Companion Drone / Robotic Assistant
function RoboticDrone() {
  const droneRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const eyeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const { pointer, clock } = state;
    const t = clock.elapsedTime;

    if (droneRef.current) {
      // Smoothly orient towards cursor
      droneRef.current.rotation.y = THREE.MathUtils.lerp(droneRef.current.rotation.y, pointer.x * 0.8, 0.05);
      droneRef.current.rotation.x = THREE.MathUtils.lerp(droneRef.current.rotation.x, -pointer.y * 0.5, 0.05);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 1.2;
      ringRef1.current.rotation.x = t * 0.8;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y = -t * 1.5;
      ringRef2.current.rotation.z = -t * 0.5;
    }

    if (eyeRef.current) {
      const glow = 1.5 + Math.sin(t * 4) * 0.8;
      (eyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    }
  });

  return (
    <group ref={droneRef} position={[0, 0, 0]}>
      {/* Central Spherical Core Chassis */}
      <mesh castShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial 
          color="#0b1329" 
          roughness={0.2} 
          metalness={0.9} 
          envMapIntensity={1}
        />
      </mesh>

      {/* Titanium Shell Armor Plates */}
      <mesh position={[0, 0, -0.1]}>
        <sphereGeometry args={[1.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[1.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Glowing AI Cyber Eye */}
      <mesh ref={eyeRef} position={[0, 0, 1.1]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#00f2fe" 
          emissive="#00f2fe" 
          emissiveIntensity={2} 
          roughness={0.1}
        />
      </mesh>

      {/* Cyber Visor Ring */}
      <mesh position={[0, 0, 1.05]}>
        <torusGeometry args={[0.45, 0.06, 16, 32]} />
        <meshStandardMaterial color="#00ffcc" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Floating Magnetic Stabilizer Gyro Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.6, 0.04, 16, 48]} />
        <meshStandardMaterial 
          color="#00f2fe" 
          emissive="#00f2fe" 
          emissiveIntensity={0.8} 
          wireframe
        />
      </mesh>

      <mesh ref={ringRef2}>
        <torusGeometry args={[1.85, 0.03, 16, 48]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          emissive="#8b5cf6" 
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      {/* Dual Floating Sensor Pods / Antennas */}
      <group position={[-1.4, 0.4, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.15, 0.6, 16]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.8} />
        </mesh>
        <pointLight color="#00f2fe" intensity={0.8} distance={2} />
      </group>

      <group position={[1.4, 0.4, 0]}>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <coneGeometry args={[0.15, 0.6, 16]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.8} />
        </mesh>
        <pointLight color="#38bdf8" intensity={0.8} distance={2} />
      </group>
    </group>
  );
}

export const RoboticAssistant3D: React.FC = () => {
  return (
    <div className="w-full h-[320px] sm:h-[400px] lg:h-[480px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[-5, -5, -3]} intensity={1.2} color="#8b5cf6" />
        <directionalLight position={[0, 4, 3]} intensity={0.8} color="#ffffff" />

        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <RoboticDrone />
        </Float>
      </Canvas>
    </div>
  );
};
