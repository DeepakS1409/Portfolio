import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotorcycleModel } from './MotorcycleModel';
import { RoadsideEnvironment } from './RoadsideEnvironment';
import { getRoadSample } from './RoadCurve';
import { JourneyDestinationId } from '../../types';

interface TechRideCanvasProps {
  progress: number;
  speed: number;
  onSelectDestination: (id: JourneyDestinationId) => void;
  isEcoMode: boolean;
}

// 3rd Person Follow Camera Rig behind the Motorcycle
function ThirdPersonCameraRig({ progress }: { progress: number; speed: number }) {
  const currentCamPos = useRef(new THREE.Vector3(0, 3, -6));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 10));

  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const { point, tangent, normal } = getRoadSample(progress);

    // Motorcycle position
    const bikePos = point.clone();
    bikePos.y += 0.4;

    // Ideal camera position: behind motorcycle and slightly above
    // Camera is placed opposite to forward tangent
    const camDistance = 4.6;
    const camHeight = 2.3;
    const targetCamPos = bikePos
      .clone()
      .addScaledVector(tangent, -camDistance)
      .add(new THREE.Vector3(0, camHeight, 0));

    // Subtle mouse steering influence
    targetCamPos.addScaledVector(normal, pointer.x * 0.9);
    targetCamPos.y += -pointer.y * 0.4;

    // Target look-at: points down the road ahead of motorcycle
    const targetLookAt = bikePos.clone().addScaledVector(tangent, 7.5);
    targetLookAt.y += 0.8;

    // Smooth lerp camera tracking
    currentCamPos.current.lerp(targetCamPos, delta * 5.0);
    currentLookAt.current.lerp(targetLookAt, delta * 6.0);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export const TechRideCanvas = ({
  progress,
  speed,
  onSelectDestination,
  isEcoMode
}: TechRideCanvasProps) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-8 text-center">
        <h3 className="font-tech text-lg text-emerald-400 mb-2">WebGL Disabled</h3>
        <p className="text-sm text-slate-400 max-w-md">
          Please enable WebGL hardware acceleration to experience the 3D Tech Ride.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 3, -6], fov: 52, near: 0.1, far: 450 }}
        dpr={isEcoMode ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: !isEcoMode,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#070d19']} />
        <fogExp2 attach="fog" args={['#070d19', 0.009]} />

        {/* Ambient & Warm Natural Indian Sunlight */}
        <ambientLight intensity={0.7} color="#f0fdf4" />
        <directionalLight
          position={[30, 60, 40]}
          intensity={1.4}
          color="#fef08a"
          castShadow={!isEcoMode}
        />
        <directionalLight position={[-30, 20, -20]} intensity={0.4} color="#67e8f9" />

        {/* Third-Person Camera Rig Following Motorcycle */}
        <ThirdPersonCameraRig progress={progress} speed={speed} />

        {/* 3D Roadside Environment & Destination Signboards */}
        <RoadsideEnvironment
          onSelectDestination={onSelectDestination}
          isEcoMode={isEcoMode}
        />

        {/* 3D Motorcycle Model with Banking & Rolling Wheels */}
        <MotorcycleModel progress={progress} speed={speed} />
      </Canvas>
    </div>
  );
};
