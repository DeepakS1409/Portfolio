import { useMemo } from 'react';
import * as THREE from 'three';
import { getRoadSample } from './RoadCurve';
import { JOURNEY_DESTINATIONS } from '../../data/destinations';
import { JourneyDestination, JourneyDestinationId } from '../../types';
import { soundFx } from '../../audio/soundEffects';

interface RoadsideEnvironmentProps {
  onSelectDestination: (destId: JourneyDestinationId) => void;
  isEcoMode?: boolean;
}

// 1. Procedural 3D Asphalt Road Ribbon with Lane Markings
function AsphaltRoad() {
  const { roadGeo, markingGeo } = useMemo(() => {
    const steps = 180;
    const roadWidth = 4.6;
    const vertices: number[] = [];
    const indices: number[] = [];
    const markingVerts: number[] = [];
    const markingIndices: number[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const { point, normal } = getRoadSample(t);

      // Left edge, right edge of asphalt road
      const left = point.clone().addScaledVector(normal, -roadWidth / 2);
      const right = point.clone().addScaledVector(normal, roadWidth / 2);

      vertices.push(left.x, left.y + 0.02, left.z);
      vertices.push(right.x, right.y + 0.02, right.z);

      if (i < steps) {
        const v = i * 2;
        indices.push(v, v + 1, v + 2);
        indices.push(v + 1, v + 3, v + 2);
      }

      // Dashed centerline markings (every other interval)
      if (i % 4 < 2) {
        const mLeft = point.clone().addScaledVector(normal, -0.1);
        const mRight = point.clone().addScaledVector(normal, 0.1);
        markingVerts.push(mLeft.x, mLeft.y + 0.035, mLeft.z);
        markingVerts.push(mRight.x, mRight.y + 0.035, mRight.z);

        const mv = markingVerts.length / 3 - 2;
        if (mv >= 2 && i % 4 === 1) {
          markingIndices.push(mv - 2, mv - 1, mv);
          markingIndices.push(mv - 1, mv + 1, mv);
        }
      }
    }

    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    rGeo.setIndex(indices);
    rGeo.computeVertexNormals();

    const mGeo = new THREE.BufferGeometry();
    mGeo.setAttribute('position', new THREE.Float32BufferAttribute(markingVerts, 3));
    mGeo.setIndex(markingIndices);
    mGeo.computeVertexNormals();

    return { roadGeo: rGeo, markingGeo: mGeo };
  }, []);

  return (
    <group>
      {/* Asphalt Surface */}
      <mesh geometry={roadGeo} receiveShadow>
        <meshStandardMaterial color="#1f2937" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Yellow/White Dashed Centerline */}
      <mesh geometry={markingGeo}>
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  );
}

// 2. 3D Physical Roadside Destination Signboard
function DestinationSignboard({
  dest,
  onSelect
}: {
  dest: JourneyDestination;
  onSelect: (id: JourneyDestinationId) => void;
}) {
  const { point, normal, tangent } = getRoadSample(dest.progress);
  const isRight = dest.direction !== 'left';
  const sideOffset = isRight ? 4.8 : -4.8;
  const boardPos = point.clone().addScaledVector(normal, sideOffset);
  boardPos.y += 1.8;

  // Orient face toward motorcycle view angle
  const angleY = Math.atan2(tangent.x, tangent.z) + (isRight ? -0.2 : 0.2);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundFx.playClick();
    onSelect(dest.id);
  };

  return (
    <group position={[boardPos.x, boardPos.y, boardPos.z]} rotation={[0, angleY, 0]}>
      {/* Support Steel Posts */}
      <mesh position={[-1.2, -1.1, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 2.2, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>
      <mesh position={[1.2, -1.1, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 2.2, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>

      {/* Main Highway Green Signboard Plate */}
      <group onClick={handleClick} onPointerOver={() => soundFx.playHover()}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 1.4, 0.12]} />
          <meshStandardMaterial color="#14532d" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* White Highway Border */}
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[3.25, 1.25, 0.01]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.075]}>
          <boxGeometry args={[3.12, 1.12, 0.01]} />
          <meshStandardMaterial color="#15803d" roughness={0.3} />
        </mesh>

        {/* Top KM Badge */}
        <mesh position={[0, 0.38, 0.085]}>
          <boxGeometry args={[1.2, 0.22, 0.01]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>

        {/* Directional Indicator Lights on Sign */}
        <mesh position={[1.35, 0, 0.085]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh position={[-1.35, 0, 0.085]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>

      {/* Concrete Base Footing */}
      <mesh position={[-1.2, -2.15, 0]}>
        <boxGeometry args={[0.35, 0.2, 0.35]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} />
      </mesh>
      <mesh position={[1.2, -2.15, 0]}>
        <boxGeometry args={[0.35, 0.2, 0.35]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} />
      </mesh>
    </group>
  );
}

// 3. Indian Highway Milestone Stones (Yellow & White Pillars)
function MilestonePillars() {
  const milestones = useMemo(() => {
    return [0.05, 0.2, 0.36, 0.52, 0.66, 0.8, 0.95].map((t, idx) => {
      const { point, normal } = getRoadSample(t);
      const pos = point.clone().addScaledVector(normal, 2.9);
      return { id: idx, pos, km: idx + 1 };
    });
  }, []);

  return (
    <group>
      {milestones.map((m) => (
        <group key={m.id} position={[m.pos.x, 0.45, m.pos.z]}>
          {/* White Bottom Pillar */}
          <mesh castShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.25, 0.7, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
          {/* Yellow Curved Top */}
          <mesh castShadow position={[0, 0.45, 0]}>
            <sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#eab308" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 4. South Indian Scenery: Coconut Palms & Trees
function RoadsideFoliage({ isEcoMode = false }: { isEcoMode?: boolean }) {
  const trees = useMemo(() => {
    const list: { pos: THREE.Vector3; type: 'palm' | 'tree'; scale: number; rot: number }[] = [];
    const count = isEcoMode ? 28 : 55;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * 0.96 + 0.02;
      const { point, normal } = getRoadSample(t);
      const side = i % 2 === 0 ? 1 : -1;
      const distance = 6.0 + (i % 5) * 2.2;
      const pos = point.clone().addScaledVector(normal, side * distance);
      pos.y = 0;

      list.push({
        pos,
        type: i % 3 === 0 ? 'tree' : 'palm',
        scale: 0.8 + (i % 4) * 0.15,
        rot: (i * 1.3) % (Math.PI * 2)
      });
    }
    return list;
  }, [isEcoMode]);

  return (
    <group>
      {trees.map((t, idx) => (
        <group key={idx} position={[t.pos.x, t.pos.y, t.pos.z]} scale={t.scale} rotation={[0, t.rot, 0]}>
          {t.type === 'palm' ? (
            // Slender curved South Indian coconut palm
            <group>
              {/* Slender curved trunk */}
              <mesh position={[0, 3.2, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.28, 6.5, 10]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
              </mesh>
              {/* Green Palm Fronds Canopy */}
              <group position={[0, 6.4, 0]}>
                {[0, 1, 2, 3, 4, 5].map((angleIdx) => (
                  <mesh
                    key={angleIdx}
                    rotation={[0.4, (angleIdx * Math.PI) / 3, 0]}
                    position={[0, 0, 0]}
                  >
                    <cylinderGeometry args={[0.04, 0.45, 3.2, 8]} />
                    <meshStandardMaterial color="#15803d" roughness={0.7} />
                  </mesh>
                ))}
                {/* Cluster of tender green coconuts */}
                <mesh position={[0, -0.3, 0]}>
                  <sphereGeometry args={[0.3, 10, 10]} />
                  <meshStandardMaterial color="#65a30d" />
                </mesh>
              </group>
            </group>
          ) : (
            // Shady roadside neem / banyan tree
            <group>
              <mesh position={[0, 1.8, 0]} castShadow>
                <cylinderGeometry args={[0.35, 0.5, 3.6, 10]} />
                <meshStandardMaterial color="#57341d" roughness={0.9} />
              </mesh>
              <mesh position={[0, 4.2, 0]} castShadow>
                <sphereGeometry args={[2.2, 12, 12]} />
                <meshStandardMaterial color="#166534" roughness={0.8} />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

// 5. Electric Utility Poles & South Indian Roadside Buildings
function RuralStructures() {
  const poles = useMemo(() => {
    return [0.06, 0.18, 0.32, 0.48, 0.62, 0.76, 0.9].map((t, idx) => {
      const { point, normal } = getRoadSample(t);
      const pos = point.clone().addScaledVector(normal, 5.2);
      return { id: idx, pos };
    });
  }, []);

  // Roadside tea stall / tender coconut shop at KM 2.2
  const teaStallPos = useMemo(() => {
    const { point, normal } = getRoadSample(0.35);
    return point.clone().addScaledVector(normal, -6.5);
  }, []);

  // SECE Bus shelter at KM 3.5
  const busStopPos = useMemo(() => {
    const { point, normal } = getRoadSample(0.56);
    return point.clone().addScaledVector(normal, 5.8);
  }, []);

  return (
    <group>
      {/* Concrete Electric Utility Poles */}
      {poles.map((p) => (
        <group key={p.id} position={[p.pos.x, 0, p.pos.z]}>
          <mesh position={[0, 4.0, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.16, 8.0, 8]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.8} />
          </mesh>
          {/* Crossarm */}
          <mesh position={[0, 7.5, 0]}>
            <boxGeometry args={[1.8, 0.1, 0.1]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Roadside Chai & Tender Coconut Stall */}
      <group position={[teaStallPos.x, 0, teaStallPos.z]}>
        {/* Stall Counter & Base */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[3.2, 1.6, 2.2]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        {/* Striped Canopy Awning */}
        <mesh position={[0, 2.1, 0.3]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[3.6, 0.1, 2.6]} />
          <meshStandardMaterial color="#ea580c" roughness={0.6} />
        </mesh>
      </group>

      {/* Tamil Nadu Village Bus Stop Shelter */}
      <group position={[busStopPos.x, 0, busStopPos.z]}>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[4.2, 2.8, 1.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 2.8, 0]}>
          <boxGeometry args={[4.6, 0.15, 2.2]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
      </group>
    </group>
  );
}

// 6. Terrain Ground Mesh (Lush South Indian Countryside)
function CountrysideTerrain() {
  return (
    <mesh receiveShadow position={[0, -0.15, 280]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[260, 640, 32, 32]} />
      <meshStandardMaterial color="#1c2c19" roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

export const RoadsideEnvironment = ({
  onSelectDestination,
  isEcoMode = false
}: RoadsideEnvironmentProps) => {
  return (
    <group>
      {/* Ground Terrain */}
      <CountrysideTerrain />

      {/* Asphalt Curved Road */}
      <AsphaltRoad />

      {/* 3D Roadside Destination Signboards */}
      {JOURNEY_DESTINATIONS.filter((d) => d.id !== 'HERO').map((dest) => (
        <DestinationSignboard
          key={dest.id}
          dest={dest}
          onSelect={onSelectDestination}
        />
      ))}

      {/* Milestone Stones */}
      <MilestonePillars />

      {/* Roadside Trees & Coconut Palms */}
      <RoadsideFoliage isEcoMode={isEcoMode} />

      {/* Rural Electric Poles & Buildings */}
      <RuralStructures />
    </group>
  );
};
