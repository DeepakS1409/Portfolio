import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getRoadSample, ROAD_TOTAL_LENGTH } from './RoadCurve';

interface MotorcycleModelProps {
  progress: number; // 0.0 to 1.0 along the road
  speed: number;    // current driving speed (0.0 to ~1.8)
}

// 17-inch wheel with 140/70 radial sport tire (radius ~0.35m)
const WHEEL_RADIUS = 0.35;

export const MotorcycleModel = ({ progress, speed }: MotorcycleModelProps) => {
  const bikeGroupRef = useRef<THREE.Group>(null);
  const leanGroupRef = useRef<THREE.Group>(null);
  const frontForkRef = useRef<THREE.Group>(null);
  const rearSwingarmRef = useRef<THREE.Group>(null);
  const frontWheelRef = useRef<THREE.Group>(null);
  const rearWheelRef = useRef<THREE.Group>(null);
  const steeringRef = useRef<THREE.Group>(null);

  const prevProgressRef = useRef<number>(progress);
  const prevSpeedRef = useRef<number>(speed);
  const currentForkCompressRef = useRef<number>(0);
  const currentRearSquatRef = useRef<number>(0);

  useFrame((_, delta) => {
    if (!bikeGroupRef.current) return;

    // Sample road spline position, tangent, normal, and banking curvature
    const { point, tangent, curvature, camberAngle } = getRoadSample(progress);

    // Position Yamaha R15 motorcycle on road surface
    bikeGroupRef.current.position.copy(point);
    // Align height so tires precisely touch the asphalt
    bikeGroupRef.current.position.y += WHEEL_RADIUS + 0.015;

    // Orient motorcycle heading along road tangent
    const angleY = Math.atan2(tangent.x, tangent.z);
    bikeGroupRef.current.rotation.y = angleY;

    // Pitch along road slope (elevation gradient)
    const slopePitch = Math.asin(tangent.y);
    bikeGroupRef.current.rotation.x = -slopePitch;

    // Align with road camber (transverse tilt)
    bikeGroupRef.current.rotation.z = camberAngle * 0.7;

    // Suspension dynamics (front fork dive & rear squat)
    const speedDelta = speed - prevSpeedRef.current;
    prevSpeedRef.current = speed;

    // Front fork dive under braking/deceleration
    const targetForkCompress = speedDelta < -0.01 ? Math.min(0.03, Math.abs(speedDelta) * 0.15) : 0;
    currentForkCompressRef.current = THREE.MathUtils.lerp(
      currentForkCompressRef.current,
      targetForkCompress,
      delta * 8.0
    );

    // Rear suspension squat under acceleration
    const targetRearSquat = speedDelta > 0.01 ? Math.min(0.025, speedDelta * 0.12) : 0;
    currentRearSquatRef.current = THREE.MathUtils.lerp(
      currentRearSquatRef.current,
      targetRearSquat,
      delta * 7.0
    );

    if (frontForkRef.current) {
      frontForkRef.current.position.y = -currentForkCompressRef.current;
    }
    if (rearSwingarmRef.current) {
      rearSwingarmRef.current.position.y = -currentRearSquatRef.current;
    }

    // Dynamic natural motorcycle lean into curves (supersport counter-steering physics)
    if (leanGroupRef.current) {
      // Leaning angle scales with road curvature and driving speed
      const targetRoll = THREE.MathUtils.degToRad(-curvature * (1.75 + Math.min(speed, 1.6) * 0.45));
      const clampedRoll = THREE.MathUtils.clamp(targetRoll, -0.54, 0.54);
      leanGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        leanGroupRef.current.rotation.z,
        clampedRoll,
        delta * 6.5
      );

      // Micro road texture suspension vibration (smooth at standstill, subtle hum at speed)
      const roadVibe = speed > 0.05 ? Math.sin(progress * 520) * 0.0055 * Math.min(speed, 1.2) : 0;
      leanGroupRef.current.position.y = roadVibe;
    }

    // Dynamic handlebar steering angle into turns
    if (steeringRef.current) {
      const targetSteer = THREE.MathUtils.degToRad(-curvature * 0.32);
      steeringRef.current.rotation.y = THREE.MathUtils.lerp(
        steeringRef.current.rotation.y,
        targetSteer,
        delta * 8
      );
    }

    // Calculate exact wheel rotation from road displacement (no slippage)
    const progressDelta = progress - prevProgressRef.current;
    prevProgressRef.current = progress;

    let wheelRotDelta = 0;
    if (Math.abs(progressDelta) > 0.00001) {
      const distanceMoved = progressDelta * ROAD_TOTAL_LENGTH;
      wheelRotDelta = distanceMoved / WHEEL_RADIUS;
    } else if (speed > 0.02) {
      wheelRotDelta = (speed * 8.5 * delta) / WHEEL_RADIUS;
    }

    if (frontWheelRef.current) {
      frontWheelRef.current.rotation.x += wheelRotDelta;
    }
    if (rearWheelRef.current) {
      rearWheelRef.current.rotation.x += wheelRotDelta;
    }
  });

  return (
    <group ref={bikeGroupRef}>
      {/* Lean group for banking into turns */}
      <group ref={leanGroupRef}>
        
        {/* ========================================================= */}
        {/* 1. YAMAHA R15 DELTABOX PERIMETER CHASSIS & SUBFRAME */}
        {/* ========================================================= */}
        {/* Iconic Die-Cast Aluminum Deltabox Twin-Spar Frame (Left & Right) */}
        <mesh position={[-0.15, 0.52, 0.08]} rotation={[0.22, 0, 0]} castShadow>
          <boxGeometry args={[0.065, 0.17, 1.12]} />
          <meshStandardMaterial color="#334155" metalness={0.92} roughness={0.22} />
        </mesh>
        <mesh position={[0.15, 0.52, 0.08]} rotation={[0.22, 0, 0]} castShadow>
          <boxGeometry args={[0.065, 0.17, 1.12]} />
          <meshStandardMaterial color="#334155" metalness={0.92} roughness={0.22} />
        </mesh>

        {/* Engine Pivot Box & Lower Frame Plates */}
        <mesh position={[0, 0.36, -0.16]} castShadow>
          <boxGeometry args={[0.32, 0.34, 0.52]} />
          <meshStandardMaterial color="#1e293b" metalness={0.88} roughness={0.28} />
        </mesh>

        {/* Lightweight Steel Tubular Rear Subframe */}
        <mesh position={[0, 0.62, -0.66]} rotation={[-0.24, 0, 0]} castShadow>
          <boxGeometry args={[0.24, 0.075, 0.82]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.32} />
        </mesh>

        {/* ========================================================= */}
        {/* 2. YAMAHA 155cc LIQUID-COOLED 4-VALVE VVA ENGINE */}
        {/* ========================================================= */}
        <group position={[0, 0.36, 0.10]}>
          {/* Main Engine Crankcase */}
          <mesh castShadow>
            <boxGeometry args={[0.38, 0.34, 0.56]} />
            <meshStandardMaterial color="#1e293b" metalness={0.94} roughness={0.2} />
          </mesh>
          {/* Right Clutch Cover (Yamaha Bronze Magnesium) */}
          <mesh position={[0.20, -0.04, -0.04]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 20]} />
            <meshStandardMaterial color="#78350f" metalness={0.86} roughness={0.25} />
          </mesh>
          {/* Left Stator Generator Cover with Tuning Fork Crest Ring */}
          <mesh position={[-0.20, -0.02, 0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.10, 0.10, 0.05, 18]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Cylinder Block with SOHC 4-Valve Head */}
          <mesh position={[0, 0.20, 0.04]} castShadow>
            <boxGeometry args={[0.32, 0.11, 0.46]} />
            <meshStandardMaterial color="#0f172a" metalness={0.92} roughness={0.16} />
          </mesh>
          {/* Curved Radiator Assembly with Stone Guard */}
          <mesh position={[0, 0.18, 0.34]} rotation={[-0.14, 0, 0]}>
            <boxGeometry args={[0.36, 0.30, 0.05]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.18, 0.37]} rotation={[-0.14, 0, 0]}>
            <planeGeometry args={[0.34, 0.28]} />
            <meshBasicMaterial color="#475569" wireframe />
          </mesh>
        </group>

        {/* Stainless Steel Exhaust Header Pipe */}
        <group position={[0.08, 0.24, 0.28]}>
          <mesh rotation={[0.62, 0, 0]}>
            <cylinderGeometry args={[0.026, 0.026, 0.36, 14]} />
            <meshStandardMaterial color="#ca8a04" metalness={0.92} roughness={0.18} />
          </mesh>
          {/* Catalytic Pre-chamber Underbelly */}
          <mesh position={[0.02, -0.16, -0.32]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.052, 0.056, 0.48, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Signature R15 Stubby Upswept Sport Muffler */}
        <group position={[0.20, 0.34, -0.68]} rotation={[-0.30, 0.12, 0.08]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.07, 0.062, 0.64, 20]} />
            <meshStandardMaterial color="#18181b" roughness={0.38} metalness={0.75} />
          </mesh>
          {/* Satin Silver R15 Exhaust Heat Shield */}
          <mesh position={[0.035, 0.06, 0]}>
            <boxGeometry args={[0.015, 0.42, 0.08]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.12} />
          </mesh>
          {/* Carbon Textured End Cap with Slash-Cut Outlet */}
          <mesh position={[0, -0.33, 0]}>
            <coneGeometry args={[0.07, 0.085, 20, 1, true]} />
            <meshStandardMaterial color="#09090b" roughness={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.37, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.02, 16]} />
            <meshBasicMaterial color="#020617" />
          </mesh>
        </group>

        {/* ========================================================= */}
        {/* 3. ICONIC R15 V4 / R15M FRONT FACE & PREDATORY DRL EYES */}
        {/* ========================================================= */}
        {/* Aerodynamic Front Nose Fairing with Central "M" Air Duct */}
        <group position={[0, 0.94, 0.68]}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.32, 0.38]} />
            <meshStandardMaterial color="#003ec7" metalness={0.92} roughness={0.1} />
          </mesh>

          {/* Central Recessed "M" Air Intake Tunnel */}
          <mesh position={[0, -0.04, 0.18]}>
            <boxGeometry args={[0.12, 0.12, 0.08]} />
            <meshStandardMaterial color="#020617" roughness={0.3} />
          </mesh>
          {/* Bi-Functional Class-D Single LED Projector Headlamp inside tunnel */}
          <mesh position={[0, -0.04, 0.20]}>
            <sphereGeometry args={[0.045, 18, 18]} />
            <meshStandardMaterial color="#e0f2fe" emissive="#38bdf8" emissiveIntensity={3.2} />
          </mesh>

          {/* Signature R15 Slanted Predatory LED DRL Eyebrows (Left & Right) */}
          <mesh position={[-0.14, 0.03, 0.20]} rotation={[0, 0, -0.38]}>
            <boxGeometry args={[0.11, 0.016, 0.015]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3.0} />
          </mesh>
          <mesh position={[0.14, 0.03, 0.20]} rotation={[0, 0, 0.38]}>
            <boxGeometry args={[0.11, 0.016, 0.015]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3.0} />
          </mesh>

          {/* Aerodynamic Racing Bubble Windscreen */}
          <mesh position={[0, 0.24, 0.02]} rotation={[0.50, 0, 0]}>
            <boxGeometry args={[0.32, 0.32, 0.025]} />
            <meshPhysicalMaterial
              color="#090d16"
              transparent
              opacity={0.62}
              roughness={0.08}
              transmission={0.6}
              thickness={0.025}
            />
          </mesh>
        </group>

        {/* Yamaha R15 Side Fairings with Aerodynamic Vent Ducts */}
        <mesh position={[-0.23, 0.62, 0.40]} rotation={[0, 0.14, 0]} castShadow>
          <boxGeometry args={[0.045, 0.46, 0.56]} />
          <meshStandardMaterial color="#003ec7" metalness={0.92} roughness={0.1} />
        </mesh>
        <mesh position={[0.23, 0.62, 0.40]} rotation={[0, -0.14, 0]} castShadow>
          <boxGeometry args={[0.045, 0.46, 0.56]} />
          <meshStandardMaterial color="#003ec7" metalness={0.92} roughness={0.1} />
        </mesh>

        {/* R15 Silver Graphic Slashes along side fairings */}
        <mesh position={[-0.255, 0.68, 0.42]} rotation={[0, 0.14, -0.22]}>
          <boxGeometry args={[0.01, 0.035, 0.32]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.255, 0.68, 0.42]} rotation={[0, -0.14, 0.22]}>
          <boxGeometry args={[0.01, 0.035, 0.32]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Aerodynamic Downforce Winglet Blades */}
        <mesh position={[-0.27, 0.72, 0.54]} rotation={[0, 0.22, -0.14]}>
          <boxGeometry args={[0.15, 0.018, 0.16]} />
          <meshStandardMaterial color="#09090b" roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0.27, 0.72, 0.54]} rotation={[0, -0.22, 0.14]}>
          <boxGeometry args={[0.15, 0.018, 0.16]} />
          <meshStandardMaterial color="#09090b" roughness={0.35} metalness={0.8} />
        </mesh>

        {/* Lower Belly Pan Fairing Cowling */}
        <mesh position={[0, 0.20, 0.12]} castShadow>
          <boxGeometry args={[0.36, 0.15, 0.82]} />
          <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* ========================================================= */}
        {/* 4. SCULPTED R15 FUEL TANK WITH ICONIC AIR INTAKE GILLS */}
        {/* ========================================================= */}
        <group position={[0, 0.80, 0.16]}>
          {/* Main Muscular Fuel Tank in Yamaha Racing Blue */}
          <mesh castShadow>
            <boxGeometry args={[0.40, 0.30, 0.64]} />
            <meshStandardMaterial color="#003ec7" metalness={0.92} roughness={0.1} />
          </mesh>
          {/* Tank Top Spine Ridge */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.30, 0.07, 0.54]} />
            <meshStandardMaterial color="#002884" metalness={0.94} roughness={0.1} />
          </mesh>
          {/* Iconic R15 Air Intake Gills on Left & Right of tank cover */}
          {[-0.10, 0, 0.10].map((zOffset, gi) => (
            <group key={gi}>
              <mesh position={[-0.205, 0.08, zOffset]} rotation={[0, 0, -0.25]}>
                <boxGeometry args={[0.015, 0.02, 0.065]} />
                <meshBasicMaterial color="#09090b" />
              </mesh>
              <mesh position={[0.205, 0.08, zOffset]} rotation={[0, 0, 0.25]}>
                <boxGeometry args={[0.015, 0.02, 0.065]} />
                <meshBasicMaterial color="#09090b" />
              </mesh>
            </group>
          ))}
          {/* Flush Aircraft-Style Quick Release Fuel Cap */}
          <mesh position={[0, 0.19, 0.06]}>
            <cylinderGeometry args={[0.052, 0.052, 0.022, 20]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.12} />
          </mesh>
          {/* Textured Carbon Tank Pad */}
          <mesh position={[0, 0.185, -0.11]}>
            <boxGeometry args={[0.075, 0.01, 0.32]} />
            <meshStandardMaterial color="#09090b" roughness={0.4} metalness={0.8} />
          </mesh>
        </group>

        {/* ========================================================= */}
        {/* 5. SPLIT SEATS & YAMAHA HOLLOW AERODYNAMIC TAIL COWL */}
        {/* ========================================================= */}
        {/* Rider Bucket Seat & Raised Pillion Seat */}
        <group position={[0, 0.72, -0.26]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.11, 0.44]} />
            <meshStandardMaterial color="#18181b" roughness={0.88} />
          </mesh>
          <mesh position={[0, 0.14, -0.32]} castShadow>
            <boxGeometry args={[0.24, 0.11, 0.34]} />
            <meshStandardMaterial color="#18181b" roughness={0.88} />
          </mesh>
        </group>

        {/* Sharp Upswept Aerodynamic Tail Unit with Hollow Airflow Channels */}
        <group position={[0, 0.82, -0.80]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.17, 0.46]} />
            <meshStandardMaterial color="#003ec7" metalness={0.92} roughness={0.1} />
          </mesh>
          {/* Left & Right Signature R-Series Aerodynamic Hollow Tunnel Ducts */}
          <mesh position={[-0.11, -0.01, 0.02]}>
            <boxGeometry args={[0.04, 0.07, 0.36]} />
            <meshBasicMaterial color="#020617" />
          </mesh>
          <mesh position={[0.11, -0.01, 0.02]}>
            <boxGeometry args={[0.04, 0.07, 0.36]} />
            <meshBasicMaterial color="#020617" />
          </mesh>
          {/* Vertical LED Tail-Light Strip */}
          <mesh position={[0, 0.02, -0.24]}>
            <boxGeometry args={[0.16, 0.03, 0.02]} />
            <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={3.2} />
          </mesh>
          {/* Tail Tidy with Tamil Nadu License Plate: TN 38 BL 2026 */}
          <mesh position={[0, -0.16, -0.27]} rotation={[-0.34, 0, 0]}>
            <boxGeometry args={[0.24, 0.12, 0.015]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.16, -0.26]} rotation={[-0.34, 0, 0]}>
            <boxGeometry args={[0.22, 0.035, 0.015]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* ========================================================= */}
        {/* 6. COCKPIT: TRIPLE CLAMP, LOWERED CLIP-ONS & TFT DASH */}
        {/* ========================================================= */}
        <group ref={steeringRef} position={[0, 0.96, 0.46]}>
          {/* Top Triple Tree Yoke with Weight-Saving Cutouts */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.40, 0.032, 0.08]} />
            <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.16} />
          </mesh>
          {/* R15 Digital TFT / LCD Multi-Function Instrument Console */}
          <mesh position={[0, 0.06, 0.075]} rotation={[-0.44, 0, 0]}>
            <boxGeometry args={[0.18, 0.10, 0.024]} />
            <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Screen Display Glowing with R15 Gear & RPM Tachometer */}
          <mesh position={[0, 0.065, 0.088]} rotation={[-0.44, 0, 0]}>
            <planeGeometry args={[0.16, 0.08]} />
            <meshBasicMaterial color="#00f2fe" />
          </mesh>

          {/* Lowered Left Clip-On Handlebar under top yoke */}
          <group position={[-0.21, -0.05, 0.02]} rotation={[0, 0.16, -0.09]}>
            <mesh>
              <cylinderGeometry args={[0.015, 0.015, 0.20, 16]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.021, 0.021, 0.11, 16]} />
              <meshStandardMaterial color="#18181b" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.02, 0.05]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.012, 0.11, 0.018]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
            </mesh>
            <mesh position={[0, -0.10, 0.07]}>
              <boxGeometry args={[0.018, 0.075, 0.11]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>
          </group>

          {/* Lowered Right Clip-On Handlebar & Brake Master Cylinder */}
          <group position={[0.21, -0.05, 0.02]} rotation={[0, -0.16, 0.09]}>
            <mesh>
              <cylinderGeometry args={[0.015, 0.015, 0.20, 16]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.021, 0.021, 0.11, 16]} />
              <meshStandardMaterial color="#18181b" roughness={0.9} />
            </mesh>
            {/* Front Brake Fluid Reservoir Cup */}
            <mesh position={[-0.03, 0.04, 0.04]}>
              <cylinderGeometry args={[0.018, 0.018, 0.032, 14]} />
              <meshStandardMaterial color="#fef08a" roughness={0.3} transparent opacity={0.85} />
            </mesh>
            <mesh position={[0, 0.02, 0.05]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.012, 0.11, 0.018]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
            </mesh>
            <mesh position={[0, -0.10, 0.07]}>
              <boxGeometry args={[0.018, 0.075, 0.11]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* ========================================================= */}
        {/* 7. SIGNATURE 37mm ANODIZED GOLD UPSIDE-DOWN (USD) FORKS */}
        {/* ========================================================= */}
        <group ref={frontForkRef} position={[0, 0.46, 0.60]} rotation={[-0.42, 0, 0]}>
          {/* Anodized Gold Upper Outer Stanchion Tubes */}
          <mesh position={[-0.13, 0.12, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.50, 20]} />
            <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.12} />
          </mesh>
          <mesh position={[0.13, 0.12, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.50, 20]} />
            <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.12} />
          </mesh>
          {/* Mirror-Polished Chrome Inner Sliders */}
          <mesh position={[-0.13, -0.23, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.42, 20]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.06} />
          </mesh>
          <mesh position={[0.13, -0.23, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.42, 20]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.06} />
          </mesh>
          {/* Aerodynamic Front Blue Mudguard */}
          <mesh position={[0, -0.21, 0.15]} rotation={[0.42, 0, 0]}>
            <boxGeometry args={[0.22, 0.075, 0.46]} />
            <meshStandardMaterial color="#003ec7" metalness={0.92} roughness={0.1} />
          </mesh>
        </group>

        {/* ========================================================= */}
        {/* 8. ASYMMETRIC GULL-WING SWINGARM & REAR MONOSHOCK */}
        {/* ========================================================= */}
        <group ref={rearSwingarmRef} position={[0, 0.28, -0.25]}>
          {/* Right-Side Curved Banana / Gull-Wing Arm (clears exhaust) */}
          <mesh position={[0.13, -0.04, -0.40]} rotation={[0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.045, 0.085, 0.86]} />
            <meshStandardMaterial color="#64748b" metalness={0.92} roughness={0.24} />
          </mesh>
          {/* Left-Side Straight Swingarm Arm */}
          <mesh position={[-0.13, -0.04, -0.40]} rotation={[0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.045, 0.085, 0.86]} />
            <meshStandardMaterial color="#64748b" metalness={0.92} roughness={0.24} />
          </mesh>
          {/* Link-Type Central Monoshock with Yellow / Red Spring */}
          <group position={[0, 0.15, -0.15]} rotation={[-0.46, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.034, 0.034, 0.26, 16]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.044, 0.044, 0.20, 16]} />
              <meshStandardMaterial color="#eab308" roughness={0.2} metalness={0.7} wireframe />
            </mesh>
          </group>
          {/* Drive Chain & Rear Sprocket */}
          <mesh position={[-0.11, -0.06, -0.72]}>
            <cylinderGeometry args={[0.135, 0.135, 0.014, 24]} />
            <meshStandardMaterial color="#334155" metalness={0.95} roughness={0.2} />
          </mesh>
          {/* Rear Tire Hugger & Integrated Chain Guard */}
          <mesh position={[-0.08, 0.06, -0.56]} rotation={[0.32, 0, 0]}>
            <boxGeometry args={[0.16, 0.04, 0.38]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </mesh>
        </group>

        {/* ========================================================= */}
        {/* 9. 17-INCH ALLOY WHEELS (282mm FRONT DISC & BYBRE CALIPER) */}
        {/* ========================================================= */}
        <group ref={frontWheelRef} position={[0, 0, 1.02]}>
          {/* 100/80-17 Front Radial Sport Tire with Tread Grooves */}
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.35, 0.078, 22, 54]} />
            <meshStandardMaterial color="#18181b" roughness={0.86} />
          </mesh>
          {/* Midnight Blue / Black Alloy Wheel Rim Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.085, 0.085, 0.11, 18]} />
            <meshStandardMaterial color="#002884" metalness={0.94} roughness={0.16} />
          </mesh>
          {/* Lightweight Y-Spokes */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <mesh key={i} rotation={[THREE.MathUtils.degToRad(deg), 0, 0]}>
              <boxGeometry args={[0.022, 0.31, 0.018]} />
              <meshStandardMaterial color="#002884" metalness={0.94} roughness={0.16} />
            </mesh>
          ))}
          {/* 282mm Floating Cross-Drilled Front Brake Rotor */}
          <mesh position={[-0.068, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <ringGeometry args={[0.135, 0.265, 32]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.12} side={THREE.DoubleSide} />
          </mesh>
          {/* Red ByBre Dual-Piston Front Brake Caliper */}
          <mesh position={[-0.075, 0.13, -0.09]}>
            <boxGeometry args={[0.038, 0.13, 0.065]} />
            <meshStandardMaterial color="#dc2626" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>

        {/* ========================================================= */}
        {/* 10. REAR WHEEL ASSEMBLY (FAT 140-SECTION RADIAL TIRE) */}
        {/* ========================================================= */}
        <group ref={rearWheelRef} position={[0, 0, -1.00]}>
          {/* Fat 140/70-17 Rear Radial Sport Tire */}
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.34, 0.112, 22, 54]} />
            <meshStandardMaterial color="#18181b" roughness={0.86} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.10, 0.10, 0.13, 18]} />
            <meshStandardMaterial color="#002884" metalness={0.94} roughness={0.16} />
          </mesh>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <mesh key={i} rotation={[THREE.MathUtils.degToRad(deg), 0, 0]}>
              <boxGeometry args={[0.026, 0.30, 0.022]} />
              <meshStandardMaterial color="#002884" metalness={0.94} roughness={0.16} />
            </mesh>
          ))}
          {/* 220mm Rear Brake Disc & Caliper */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <ringGeometry args={[0.11, 0.22, 28]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.12} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.085, 0.11, 0.05]}>
            <boxGeometry args={[0.032, 0.09, 0.055]} />
            <meshStandardMaterial color="#dc2626" metalness={0.85} />
          </mesh>
        </group>

      </group>
    </group>
  );
};
