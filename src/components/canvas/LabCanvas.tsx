import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FuturisticLab } from './FuturisticLab';
import { LabZone } from '../../types';

interface LabCanvasProps {
  currentZone: LabZone;
  onZoneSelect: (zone: LabZone) => void;
  isEcoMode: boolean;
}

// Camera controller that smoothly transitions between laboratory zones
function CameraRig({ targetZone }: { targetZone: LabZone }) {
  const lookAtTarget = useRef(new THREE.Vector3(0, 1.4, 0));

  useFrame((state) => {
    const { camera, pointer } = state;

    let targetCamPos = new THREE.Vector3(0, 3.2, 7.2);
    let targetLookAt = new THREE.Vector3(0, 1.4, 0);

    if (targetZone === 'CENTRAL_LAB') {
      targetCamPos = new THREE.Vector3(pointer.x * 0.8, 3.2 - pointer.y * 0.4, 7.2);
      targetLookAt = new THREE.Vector3(0, 1.4, 0);
    } else if (targetZone === 'HARDWARE_BENCH') {
      targetCamPos = new THREE.Vector3(3.2 + pointer.x * 0.4, 2.6, 3.2);
      targetLookAt = new THREE.Vector3(1.7, 2.1, -0.2);
    } else if (targetZone === 'AI_CORE') {
      targetCamPos = new THREE.Vector3(-3.2 + pointer.x * 0.4, 2.6, 3.0);
      targetLookAt = new THREE.Vector3(-1.7, 2.1, -0.2);
    } else if (targetZone === 'PROJECT_HOLOGRAMS') {
      targetCamPos = new THREE.Vector3(pointer.x * 0.5, 3.6, 4.2);
      targetLookAt = new THREE.Vector3(0, 2.7, -1.2);
    }

    camera.position.lerp(targetCamPos, 0.04);
    lookAtTarget.current.lerp(targetLookAt, 0.05);
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}

export const LabCanvas: React.FC<LabCanvasProps> = ({
  currentZone,
  onZoneSelect,
  isEcoMode
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-lab-dark border border-cyan-500/30 p-8 text-center rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-500 flex items-center justify-center text-cyan-400 mb-4 animate-pulse">
          ⚡
        </div>
        <h3 className="font-tech text-lg text-cyan-400 mb-2">WebGL Acceleration Disabled</h3>
        <p className="text-sm text-slate-300 max-w-md">
          Your browser or GPU does not have WebGL enabled. The Innovation Lab will render in high-fidelity 2D interactive mode.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 3.2, 7.2], fov: 45, near: 0.1, far: 50 }}
        dpr={isEcoMode ? [1, 1] : [1, 1.5]} // Clamped DPR for 8GB RAM smoothness
        gl={{
          antialias: !isEcoMode,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#030712']} />
        <fogExp2 attach="fog" args={['#030712', 0.07]} />

        {/* Cinematic Ambient & Key Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 12, 6]} intensity={1.2} color="#bae6fd" />
        <directionalLight position={[-6, 8, -4]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[0, 4, 2]} intensity={1.0} color="#00f2fe" distance={12} />

        {/* Camera Rig Transitions */}
        <CameraRig targetZone={currentZone} />

        {/* 3D Virtual Innovation Laboratory */}
        <FuturisticLab 
          currentZone={currentZone} 
          onZoneSelect={onZoneSelect} 
          isEcoMode={isEcoMode} 
        />

        {/* Interactive Lab Orbit Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={Math.PI / 3.8}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
