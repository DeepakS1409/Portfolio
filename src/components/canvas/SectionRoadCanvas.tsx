import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotorcycleModel } from './MotorcycleModel';
import { getRoadSample } from './RoadCurve';
import { SectionJourneyConfig } from '../../types';
import { soundFx } from '../../audio/soundEffects';

interface SectionRoadCanvasProps {
  journeyConfig: SectionJourneyConfig;
  progress: number;
  speed: number;
  onSelectStation: (index: number) => void;
  isEcoMode: boolean;
}

// Third-Person Camera Rig Following Motorcycle with Smooth Tracking
function ThirdPersonCameraRig({ progress }: { progress: number; speed: number }) {
  const currentCamPos = useMemo(() => new THREE.Vector3(0, 3, -6), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(0, 1.2, 10), []);

  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const { point, tangent, normal } = getRoadSample(progress);

    const bikePos = point.clone();
    bikePos.y += 0.42;

    const camDistance = 4.8;
    const camHeight = 2.25;
    const targetCamPos = bikePos
      .clone()
      .addScaledVector(tangent, -camDistance)
      .add(new THREE.Vector3(0, camHeight, 0));

    targetCamPos.addScaledVector(normal, pointer.x * 0.65);
    targetCamPos.y += -pointer.y * 0.32;

    const targetLookAt = bikePos.clone().addScaledVector(tangent, 7.5);
    targetLookAt.y += 0.85;

    currentCamPos.lerp(targetCamPos, delta * 5.0);
    currentLookAt.lerp(targetLookAt, delta * 6.0);

    camera.position.copy(currentCamPos);
    camera.lookAt(currentLookAt);
  });

  return null;
}

// Procedural Realistic Asphalt Road with Aggregate Texture, Concrete Curbs & Markings
function AsphaltRoad() {
  const asphaltTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Asphalt Base Color (Dark Charcoal Grey)
    ctx.fillStyle = '#22262d';
    ctx.fillRect(0, 0, 512, 512);

    // Fine mineral aggregate stone noise
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 26;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    // Tire track wear lanes
    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0.0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.24, 'rgba(12,14,18,0.22)');
    gradient.addColorStop(0.48, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.74, 'rgba(12,14,18,0.22)');
    gradient.addColorStop(1.0, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Micro cracks
    ctx.strokeStyle = 'rgba(15,18,22,0.22)';
    ctx.lineWidth = 1;
    for (let j = 0; j < 5; j++) {
      ctx.beginPath();
      let x = Math.random() * 512;
      let y = Math.random() * 512;
      ctx.moveTo(x, y);
      for (let k = 0; k < 4; k++) {
        x += (Math.random() - 0.5) * 55;
        y += (Math.random() - 0.5) * 55;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 55);
    return texture;
  }, []);

  const { roadGeo, curbGeo, centerMarkingGeo, shoulderMarkingGeo, vergeGeo } = useMemo(() => {
    const steps = 240;
    const roadWidth = 5.4;
    const curbWidth = 0.28;
    const curbHeight = 0.08;
    const vergeWidth = 2.4;

    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const curbVerts: number[] = [];
    const curbIndices: number[] = [];
    const vergeVerts: number[] = [];
    const vergeIndices: number[] = [];
    const cMarkingVerts: number[] = [];
    const cMarkingIndices: number[] = [];
    const sMarkingVerts: number[] = [];
    const sMarkingIndices: number[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const { point, normal, bankedNormal } = getRoadSample(t);

      // Asphalt Road Surface
      const leftEdge = point.clone().addScaledVector(bankedNormal, -roadWidth / 2);
      const rightEdge = point.clone().addScaledVector(bankedNormal, roadWidth / 2);

      vertices.push(leftEdge.x, leftEdge.y + 0.03, leftEdge.z);
      vertices.push(rightEdge.x, rightEdge.y + 0.03, rightEdge.z);

      const vDist = t * 55;
      uvs.push(0, vDist);
      uvs.push(1, vDist);

      if (i < steps) {
        const v = i * 2;
        indices.push(v, v + 1, v + 2);
        indices.push(v + 1, v + 3, v + 2);
      }

      // Concrete Drainage Curbs
      const clInner = leftEdge.clone();
      const clCrown = leftEdge.clone().addScaledVector(normal, -curbWidth * 0.5);
      clCrown.y += curbHeight;
      const clOuter = leftEdge.clone().addScaledVector(normal, -curbWidth);
      clOuter.y += 0.01;

      const crInner = rightEdge.clone();
      const crCrown = rightEdge.clone().addScaledVector(normal, curbWidth * 0.5);
      crCrown.y += curbHeight;
      const crOuter = rightEdge.clone().addScaledVector(normal, curbWidth);
      crOuter.y += 0.01;

      const curbBaseIdx = curbVerts.length / 3;
      curbVerts.push(clInner.x, clInner.y + 0.03, clInner.z);
      curbVerts.push(clCrown.x, clCrown.y + 0.03, clCrown.z);
      curbVerts.push(clOuter.x, clOuter.y + 0.01, clOuter.z);

      curbVerts.push(crInner.x, crInner.y + 0.03, crInner.z);
      curbVerts.push(crCrown.x, crCrown.y + 0.03, crCrown.z);
      curbVerts.push(crOuter.x, crOuter.y + 0.01, crOuter.z);

      if (i < steps) {
        const cb = curbBaseIdx;
        const cn = cb + 6;
        curbIndices.push(cb, cb + 1, cn);
        curbIndices.push(cb + 1, cn + 1, cn);
        curbIndices.push(cb + 1, cb + 2, cn + 1);
        curbIndices.push(cb + 2, cn + 2, cn + 1);
        curbIndices.push(cb + 3, cb + 4, cn + 3);
        curbIndices.push(cb + 4, cn + 4, cn + 3);
        curbIndices.push(cb + 4, cb + 5, cn + 4);
        curbIndices.push(cb + 5, cn + 5, cn + 4);
      }

      // South Indian Semman (Red Soil) Verge
      const outerLeftVerge = clOuter.clone().addScaledVector(normal, -vergeWidth);
      outerLeftVerge.y = Math.max(0, outerLeftVerge.y - 0.06);

      const outerRightVerge = crOuter.clone().addScaledVector(normal, vergeWidth);
      outerRightVerge.y = Math.max(0, outerRightVerge.y - 0.06);

      const vergeBaseIdx = vergeVerts.length / 3;
      vergeVerts.push(clOuter.x, clOuter.y, clOuter.z);
      vergeVerts.push(outerLeftVerge.x, outerLeftVerge.y, outerLeftVerge.z);
      vergeVerts.push(crOuter.x, crOuter.y, crOuter.z);
      vergeVerts.push(outerRightVerge.x, outerRightVerge.y, outerRightVerge.z);

      if (i < steps) {
        const vb = vergeBaseIdx;
        const vn = vb + 4;
        vergeIndices.push(vb, vb + 1, vn);
        vergeIndices.push(vb + 1, vn + 1, vn);
        vergeIndices.push(vb + 2, vn + 2, vb + 3);
        vergeIndices.push(vb + 3, vn + 2, vn + 3);
      }

      // Center Dashed Yellow Highway Lines
      if (i % 4 < 2) {
        const mLeft = point.clone().addScaledVector(bankedNormal, -0.09);
        const mRight = point.clone().addScaledVector(bankedNormal, 0.09);
        cMarkingVerts.push(mLeft.x, mLeft.y + 0.045, mLeft.z);
        cMarkingVerts.push(mRight.x, mRight.y + 0.045, mRight.z);

        const mv = cMarkingVerts.length / 3 - 2;
        if (mv >= 2 && i % 4 === 1) {
          cMarkingIndices.push(mv - 2, mv - 1, mv);
          cMarkingIndices.push(mv - 1, mv + 1, mv);
        }
      }

      // Solid White Shoulder Lines
      const slLeft = leftEdge.clone().addScaledVector(bankedNormal, 0.22);
      const slRight = leftEdge.clone().addScaledVector(bankedNormal, 0.34);
      const srLeft = rightEdge.clone().addScaledVector(bankedNormal, -0.34);
      const srRight = rightEdge.clone().addScaledVector(bankedNormal, -0.22);

      const smBase = sMarkingVerts.length / 3;
      sMarkingVerts.push(slLeft.x, slLeft.y + 0.042, slLeft.z);
      sMarkingVerts.push(slRight.x, slRight.y + 0.042, slRight.z);
      sMarkingVerts.push(srLeft.x, srLeft.y + 0.042, srLeft.z);
      sMarkingVerts.push(srRight.x, srRight.y + 0.042, srRight.z);

      if (i < steps) {
        const sv = smBase;
        const sn = sv + 4;
        sMarkingIndices.push(sv, sv + 1, sn);
        sMarkingIndices.push(sv + 1, sn + 1, sn);
        sMarkingIndices.push(sv + 2, sv + 3, sn + 2);
        sMarkingIndices.push(sv + 3, sn + 3, sn + 2);
      }
    }

    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    rGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    rGeo.setIndex(indices);
    rGeo.computeVertexNormals();

    const cGeo = new THREE.BufferGeometry();
    cGeo.setAttribute('position', new THREE.Float32BufferAttribute(curbVerts, 3));
    cGeo.setIndex(curbIndices);
    cGeo.computeVertexNormals();

    const vgGeo = new THREE.BufferGeometry();
    vgGeo.setAttribute('position', new THREE.Float32BufferAttribute(vergeVerts, 3));
    vgGeo.setIndex(vergeIndices);
    vgGeo.computeVertexNormals();

    const cmGeo = new THREE.BufferGeometry();
    cmGeo.setAttribute('position', new THREE.Float32BufferAttribute(cMarkingVerts, 3));
    cmGeo.setIndex(cMarkingIndices);
    cmGeo.computeVertexNormals();

    const smGeo = new THREE.BufferGeometry();
    smGeo.setAttribute('position', new THREE.Float32BufferAttribute(sMarkingVerts, 3));
    smGeo.setIndex(sMarkingIndices);
    smGeo.computeVertexNormals();

    return { roadGeo: rGeo, curbGeo: cGeo, vergeGeo: vgGeo, centerMarkingGeo: cmGeo, shoulderMarkingGeo: smGeo };
  }, []);

  return (
    <group>
      {/* Tamil Nadu Semman Red Soil Verge */}
      <mesh geometry={vergeGeo} receiveShadow>
        <meshStandardMaterial color="#854d0e" roughness={0.96} metalness={0.02} />
      </mesh>

      {/* Concrete Drainage Curbs */}
      <mesh geometry={curbGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#94a3b8" roughness={0.88} metalness={0.15} />
      </mesh>

      {/* Textured Asphalt Highway Surface */}
      <mesh geometry={roadGeo} receiveShadow>
        <meshStandardMaterial
          map={asphaltTexture}
          color="#d1d5db"
          roughness={0.84}
          metalness={0.14}
        />
      </mesh>

      {/* Center Dashed Retroreflective Markings */}
      <mesh geometry={centerMarkingGeo}>
        <meshStandardMaterial color="#facc15" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Solid White Boundary Lines */}
      <mesh geometry={shoulderMarkingGeo}>
        <meshStandardMaterial color="#f8fafc" roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  );
}

// Tamil Nadu Bilingual Highway Signboards (Tamil & English script)
function TamilNaduHighwaySignboards() {
  const { tamilCollegeBoardTex, tamilSpeedBoardTex } = useMemo(() => {
    // 1. College Directional Sign (Green Highway Board)
    const cCanvas = document.createElement('canvas');
    cCanvas.width = 512;
    cCanvas.height = 256;
    const cCtx = cCanvas.getContext('2d')!;

    // Forest green highway retroreflective background
    cCtx.fillStyle = '#15803d';
    cCtx.fillRect(0, 0, 512, 256);
    cCtx.strokeStyle = '#ffffff';
    cCtx.lineWidth = 8;
    cCtx.strokeRect(12, 12, 488, 232);

    // Tamil Heading
    cCtx.fillStyle = '#fef08a';
    cCtx.font = 'bold 24px sans-serif';
    cCtx.textAlign = 'center';
    cCtx.fillText('ஸ்ரீ ஈஸ்வர் பொறியியல் கல்லூரி', 256, 60);

    // English Subheading
    cCtx.fillStyle = '#ffffff';
    cCtx.font = 'bold 20px sans-serif';
    cCtx.fillText('SRI ESHWAR COLLEGE OF ENGINEERING', 256, 100);

    // Highway Info & KM
    cCtx.fillStyle = '#93c5fd';
    cCtx.font = 'bold 18px monospace';
    cCtx.fillText('NH-47 • COIMBATORE 25 KM • POLLACHI 15 KM', 256, 145);

    // Arrow & Distance Badge
    cCtx.fillStyle = '#facc15';
    cCtx.fillRect(160, 175, 192, 42);
    cCtx.fillStyle = '#020617';
    cCtx.font = 'bold 18px monospace';
    cCtx.fillText('⮞ 2.5 KM AHEAD', 256, 202);

    const cTex = new THREE.CanvasTexture(cCanvas);

    // 2. Tamil Nadu Speed Limit & Curve Caution Sign
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 256;
    sCanvas.height = 256;
    const sCtx = sCanvas.getContext('2d')!;

    sCtx.fillStyle = '#1e3a8a';
    sCtx.fillRect(0, 0, 256, 256);
    sCtx.strokeStyle = '#ffffff';
    sCtx.lineWidth = 6;
    sCtx.strokeRect(8, 8, 240, 240);

    sCtx.fillStyle = '#facc15';
    sCtx.font = 'bold 18px sans-serif';
    sCtx.textAlign = 'center';
    sCtx.fillText('வேகக் கட்டுப்பாடு', 128, 55);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'black 64px sans-serif';
    sCtx.fillText('40', 128, 130);

    sCtx.fillStyle = '#93c5fd';
    sCtx.font = 'bold 16px sans-serif';
    sCtx.fillText('SPEED LIMIT 40 KM/H', 128, 170);

    sCtx.fillStyle = '#fef08a';
    sCtx.font = 'bold 14px sans-serif';
    sCtx.fillText('வளைவு • மெதுவாக செல்லவும்', 128, 215);

    const sTex = new THREE.CanvasTexture(sCanvas);

    return { tamilCollegeBoardTex: cTex, tamilSpeedBoardTex: sTex };
  }, []);

  // Place boards along road
  const { pCollege, pSpeed } = useMemo(() => {
    const s1 = getRoadSample(0.25);
    const pos1 = s1.point.clone().addScaledVector(s1.normal, 5.2);
    pos1.y += 2.8;

    const s2 = getRoadSample(0.55);
    const pos2 = s2.point.clone().addScaledVector(s2.normal, -5.2);
    pos2.y += 2.4;

    return {
      pCollege: { pos: pos1, rot: Math.atan2(s1.tangent.x, s1.tangent.z) - 0.2 },
      pSpeed: { pos: pos2, rot: Math.atan2(s2.tangent.x, s2.tangent.z) + 0.2 }
    };
  }, []);

  return (
    <group>
      {/* 1. Large Overhead College Directional Board */}
      <group position={[pCollege.pos.x, pCollege.pos.y, pCollege.pos.z]} rotation={[0, pCollege.rot, 0]}>
        <mesh position={[-1.8, -1.5, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 3.2, 12]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        <mesh position={[1.8, -1.5, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 3.2, 12]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[4.2, 2.1, 0.1]} />
          <meshStandardMaterial map={tamilCollegeBoardTex} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* 2. Speed Limit & Caution Bend Board */}
      <group position={[pSpeed.pos.x, pSpeed.pos.y, pSpeed.pos.z]} rotation={[0, pSpeed.rot, 0]}>
        <mesh position={[0, -1.2, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 12]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[1.8, 1.8, 0.08]} />
          <meshStandardMaterial map={tamilSpeedBoardTex} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Traditional Tamil Nadu Roadside Scenery: Odu Veedu, Thinnai, Annai Tea Kadai, Vinayagar Kovil, Banana Groves & Palms
function TamilNaduScenery({ isEcoMode }: { isEcoMode: boolean }) {
  const palmGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!palmGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    palmGroupRef.current.children.forEach((child, i) => {
      child.rotation.z = Math.sin(time * 1.5 + i * 0.7) * 0.035;
      child.rotation.x = Math.cos(time * 1.2 + i * 0.5) * 0.025;
    });
  });

  const { foliage, bananas, houses, teaStalls, temples, templeWalls, milestones } = useMemo(() => {
    const folList: { pos: THREE.Vector3; type: 'palm' | 'neem'; scale: number; rot: number }[] = [];
    const banList: { pos: THREE.Vector3; rot: number }[] = [];
    const houseList: { pos: THREE.Vector3; rot: number }[] = [];
    const stallList: { pos: THREE.Vector3; rot: number }[] = [];
    const templeList: { pos: THREE.Vector3; rot: number }[] = [];
    const wallList: { pos: THREE.Vector3; rot: number }[] = [];
    const stoneList: { pos: THREE.Vector3; km: number }[] = [];

    const count = isEcoMode ? 32 : 64;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * 0.96 + 0.02;
      const { point, normal, tangent } = getRoadSample(t);
      const side = i % 2 === 0 ? 1 : -1;
      const distance = 6.8 + (i % 4) * 2.5;
      const pos = point.clone().addScaledVector(normal, side * distance);
      pos.y = Math.max(0, pos.y);

      folList.push({
        pos,
        type: i % 3 === 0 ? 'neem' : 'palm',
        scale: 0.92 + (i % 3) * 0.2,
        rot: (i * 1.5) % (Math.PI * 2)
      });

      // Banana Plant Clusters beside village plots (வாழை மரம்)
      if (i % 5 === 1) {
        const banPos = point.clone().addScaledVector(normal, side * (distance - 2.0));
        banPos.y = Math.max(0, banPos.y);
        banList.push({ pos: banPos, rot: i * 0.8 });
      }

      // Traditional Tamil Nadu Odu Veedu (கிராமத்து ஓடு வீடு with Thinnai)
      if (i % 8 === 2) {
        const housePos = point.clone().addScaledVector(normal, side * 15.5);
        housePos.y = Math.max(0, housePos.y);
        const angle = Math.atan2(tangent.x, tangent.z) + (side > 0 ? -1.35 : 1.35);
        houseList.push({ pos: housePos, rot: angle });

        // Red & White Striped Temple/Campus Compound Wall (கோவில் மதில்)
        const wallPos = point.clone().addScaledVector(normal, side * 11.2);
        wallPos.y = Math.max(0, wallPos.y);
        wallList.push({ pos: wallPos, rot: angle });
      }

      // Authentic Tamil Nadu Highway Tea Kadai ("அன்னை டீ ஸ்டால்")
      if (i % 12 === 4) {
        const stallPos = point.clone().addScaledVector(normal, side * 8.2);
        stallPos.y = Math.max(0, stallPos.y);
        const angle = Math.atan2(tangent.x, tangent.z) + (side > 0 ? -1.45 : 1.45);
        stallList.push({ pos: stallPos, rot: angle });
      }

      // Roadside Pillayar / Vinayagar Temple (விநாயகர் கோவில்)
      if (i % 18 === 8) {
        const templePos = point.clone().addScaledVector(normal, side * 9.5);
        templePos.y = Math.max(0, templePos.y);
        const angle = Math.atan2(tangent.x, tangent.z) + (side > 0 ? -1.4 : 1.4);
        templeList.push({ pos: templePos, rot: angle });
      }

      // Concrete Milestone Markers
      if (i % 7 === 1) {
        const stonePos = point.clone().addScaledVector(normal, side * 3.4);
        stonePos.y += 0.25;
        stoneList.push({ pos: stonePos, km: i * 2 });
      }
    }

    return { foliage: folList, bananas: banList, houses: houseList, teaStalls: stallList, temples: templeList, templeWalls: wallList, milestones: stoneList };
  }, [isEcoMode]);

  return (
    <group>
      {/* 1. Coconut Palms & Neem Shade Trees */}
      <group ref={palmGroupRef}>
        {foliage.map((t, idx) => (
          <group key={`fol-${idx}`} position={[t.pos.x, t.pos.y, t.pos.z]} scale={t.scale} rotation={[0, t.rot, 0]}>
            {t.type === 'palm' ? (
              <group>
                {/* Curved Coconut Palm Trunk with Bark Rings */}
                <mesh position={[0, 3.6, 0]} castShadow>
                  <cylinderGeometry args={[0.2, 0.35, 7.2, 12]} />
                  <meshStandardMaterial color="#78350f" roughness={0.88} />
                </mesh>
                {/* Flared Base */}
                <mesh position={[0, 0.4, 0]}>
                  <cylinderGeometry args={[0.34, 0.5, 0.8, 12]} />
                  <meshStandardMaterial color="#57341d" roughness={0.92} />
                </mesh>
                {/* Coconut Clusters */}
                <group position={[0, 6.8, 0]}>
                  {[0, 1.25, 2.5, 3.75].map((rot, cIdx) => (
                    <mesh key={cIdx} position={[Math.cos(rot) * 0.22, -0.15, Math.sin(rot) * 0.22]}>
                      <sphereGeometry args={[0.16, 8, 8]} />
                      <meshStandardMaterial color={cIdx % 2 === 0 ? '#15803d' : '#854d0e'} roughness={0.75} />
                    </mesh>
                  ))}
                </group>
                {/* Arching Palm Fronds */}
                <group position={[0, 7.1, 0]}>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((angleIdx) => (
                    <group key={angleIdx} rotation={[0.45, (angleIdx * Math.PI) / 4, 0]}>
                      <mesh position={[0, 0, 1.8]}>
                        <boxGeometry args={[0.44, 0.04, 3.6]} />
                        <meshStandardMaterial color="#16a34a" roughness={0.65} />
                      </mesh>
                    </group>
                  ))}
                </group>
              </group>
            ) : (
              <group>
                {/* Broad Native Neem / Banyan Tree Trunk (வேப்ப மரம்) */}
                <mesh position={[0, 2.1, 0]} castShadow>
                  <cylinderGeometry args={[0.42, 0.62, 4.2, 10]} />
                  <meshStandardMaterial color="#451a03" roughness={0.92} />
                </mesh>
                {/* Multi-layered Lush Green Leaf Canopies */}
                <mesh position={[0, 4.8, 0]} castShadow>
                  <sphereGeometry args={[2.6, 12, 12]} />
                  <meshStandardMaterial color="#15803d" roughness={0.78} />
                </mesh>
                <mesh position={[0.45, 5.6, 0.25]} castShadow>
                  <sphereGeometry args={[1.8, 10, 10]} />
                  <meshStandardMaterial color="#22c55e" roughness={0.72} />
                </mesh>
                <mesh position={[-0.4, 5.2, -0.3]} castShadow>
                  <sphereGeometry args={[1.6, 10, 10]} />
                  <meshStandardMaterial color="#16a34a" roughness={0.75} />
                </mesh>
              </group>
            )}
          </group>
        ))}
      </group>

      {/* 2. Tamil Nadu Banana Plants (வாழை மரம்) */}
      {bananas.map((b, idx) => (
        <group key={`ban-${idx}`} position={[b.pos.x, b.pos.y, b.pos.z]} rotation={[0, b.rot, 0]} scale={0.85}>
          {/* Green Banana Trunk */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.15, 0.22, 2.4, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.7} />
          </mesh>
          {/* Broad Arching Leaves */}
          {[0, 1.2, 2.4, 3.6, 4.8].map((rotAngle, li) => (
            <mesh key={li} position={[Math.cos(rotAngle) * 0.9, 2.2, Math.sin(rotAngle) * 0.9]} rotation={[0.4, rotAngle, 0]}>
              <boxGeometry args={[0.65, 0.02, 1.8]} />
              <meshStandardMaterial color="#4ade80" roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 3. Traditional Tamil Nadu Houses (கிராமத்து ஓடு வீடு with Thinnai) */}
      {houses.map((h, idx) => (
        <group key={`house-${idx}`} position={[h.pos.x, h.pos.y, h.pos.z]} rotation={[0, h.rot, 0]}>
          {/* Whitewashed Lime Walls with Red Oxide Plinth Base */}
          <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[7.2, 3.8, 5.4]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.82} />
          </mesh>
          {/* Red Oxide Base Border */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[7.3, 0.5, 5.5]} />
            <meshStandardMaterial color="#991b1b" roughness={0.85} />
          </mesh>
          {/* Terracotta Clay Tiled Roof (மங்களூர் ஓடு கூரை) */}
          <mesh position={[0, 4.6, 0]} castShadow>
            <coneGeometry args={[5.2, 2.4, 4]} />
            <meshStandardMaterial color="#c2410c" roughness={0.84} />
          </mesh>
          {/* Raised Front Porch Veranda (திண்ணை - Thinnai) */}
          <mesh position={[0, 0.75, 3.1]}>
            <boxGeometry args={[5.8, 0.45, 1.4]} />
            <meshStandardMaterial color="#991b1b" roughness={0.8} />
          </mesh>
          {/* Carved Teak Veranda Pillars */}
          {[-2.2, 2.2].map((px, pi) => (
            <mesh key={pi} position={[px, 1.95, 3.5]} castShadow>
              <cylinderGeometry args={[0.09, 0.11, 2.4, 8]} />
              <meshStandardMaterial color="#451a03" roughness={0.75} />
            </mesh>
          ))}
          {/* Traditional Wooden Door Frame with Vasalpadi */}
          <mesh position={[0, 1.5, 2.72]}>
            <boxGeometry args={[1.2, 2.3, 0.06]} />
            <meshStandardMaterial color="#451a03" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* 4. Authentic Tamil Nadu Highway "Annai Tea Kadai" (அன்னை டீ ஸ்டால்) */}
      {teaStalls.map((s, idx) => (
        <group key={`stall-${idx}`} position={[s.pos.x, s.pos.y, s.pos.z]} rotation={[0, s.rot, 0]}>
          {/* Wooden Tea Shop Shack */}
          <mesh position={[0, 1.4, 0]} castShadow>
            <boxGeometry args={[3.8, 2.6, 2.6]} />
            <meshStandardMaterial color="#78350f" roughness={0.88} />
          </mesh>
          {/* Blue/Green Painted Corrugated Tin Awning */}
          <mesh position={[0, 2.8, 0.4]} rotation={[0.25, 0, 0]} castShadow>
            <boxGeometry args={[4.4, 0.1, 3.2]} />
            <meshStandardMaterial color="#0284c7" roughness={0.6} metalness={0.5} />
          </mesh>
          {/* Stainless Steel Round Tea Boiler / Samovar (டீ கொதிகலன்) */}
          <mesh position={[-0.8, 1.35, 1.15]}>
            <cylinderGeometry args={[0.22, 0.22, 0.55, 18]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.12} />
          </mesh>
          {/* Glass Snack Display Box (கண்ணாடி பெட்டி with vadai/bonda) */}
          <mesh position={[0.6, 1.3, 1.15]}>
            <boxGeometry args={[0.8, 0.45, 0.4]} />
            <meshPhysicalMaterial color="#ffffff" transmission={0.7} opacity={0.6} transparent roughness={0.1} />
          </mesh>
          {/* Yellow Snacks inside Glass Petti */}
          <mesh position={[0.6, 1.25, 1.15]}>
            <boxGeometry args={[0.65, 0.2, 0.25]} />
            <meshStandardMaterial color="#eab308" roughness={0.7} />
          </mesh>
          {/* Hanging Banana Bunch (வாழைத்தார்) */}
          <mesh position={[1.4, 2.2, 1.2]}>
            <cylinderGeometry args={[0.12, 0.08, 0.45, 10]} />
            <meshStandardMaterial color="#facc15" roughness={0.65} />
          </mesh>
          {/* Roadside Wooden Tea Bench */}
          <mesh position={[0, 0.45, 2.0]}>
            <boxGeometry args={[2.8, 0.4, 0.6]} />
            <meshStandardMaterial color="#451a03" roughness={0.85} />
          </mesh>
          {/* Stall Counter Table */}
          <mesh position={[0, 1.05, 1.25]}>
            <boxGeometry args={[3.2, 0.1, 0.5]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* 5. Roadside Vinayagar / Pillayar Temple Shrine (விநாயகர் கோவில்) */}
      {temples.map((temple, idx) => (
        <group key={`temple-${idx}`} position={[temple.pos.x, temple.pos.y, temple.pos.z]} rotation={[0, temple.rot, 0]}>
          {/* Temple Sanctum Base (Whitewashed stone) */}
          <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 2.2, 2.4]} />
            <meshStandardMaterial color="#fef08a" roughness={0.8} />
          </mesh>
          {/* Traditional South Indian Gopuram Tiered Dome */}
          <mesh position={[0, 2.7, 0]} castShadow>
            <coneGeometry args={[1.6, 1.2, 4]} />
            <meshStandardMaterial color="#ea580c" roughness={0.75} />
          </mesh>
          {/* Brass Kalasam Finial on Top (கலசம்) */}
          <mesh position={[0, 3.4, 0]}>
            <cylinderGeometry args={[0.04, 0.12, 0.35, 16]} />
            <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Saffron Red Flag Pole with Trishul */}
          <mesh position={[1.4, 1.6, 1.2]}>
            <cylinderGeometry args={[0.03, 0.03, 3.2, 8]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.85} />
          </mesh>
          <mesh position={[1.5, 2.8, 1.2]}>
            <boxGeometry args={[0.45, 0.3, 0.02]} />
            <meshStandardMaterial color="#dc2626" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* 6. Traditional Temple/Campus Compound Walls with Alternating Red & White Stripes (கோவில் மதில்) */}
      {templeWalls.map((w, idx) => (
        <group key={`wall-${idx}`} position={[w.pos.x, w.pos.y, w.pos.z]} rotation={[0, w.rot, 0]}>
          {/* Main Wall Base */}
          <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.5, 1.6, 0.35]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
          {/* Alternating Red Oxide Stripes (Signature Tamil Nadu wall pattern) */}
          {[-3.0, -1.5, 0, 1.5, 3.0].map((sx, si) => (
            <mesh key={si} position={[sx, 0.8, 0.01]}>
              <boxGeometry args={[0.7, 1.58, 0.36]} />
              <meshStandardMaterial color="#dc2626" roughness={0.8} />
            </mesh>
          ))}
          {/* Concrete Wall Coping Stone */}
          <mesh position={[0, 1.65, 0]}>
            <boxGeometry args={[8.8, 0.12, 0.45]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* 7. NH-47 Concrete Milestone Markers (TN 38 • SEC 2 KM) */}
      {milestones.map((m, idx) => (
        <group key={`stone-${idx}`} position={[m.pos.x, m.pos.y, m.pos.z]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.24, 0.85, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#facc15" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// TNEB Utility Electricity Transmission Poles with Continuous Overhead Cables
function UtilityPolesWithWires() {
  const { poles, wireLines } = useMemo(() => {
    const poleTValues = [0.04, 0.15, 0.27, 0.39, 0.51, 0.63, 0.75, 0.87, 0.98];
    const poleList = poleTValues.map((t, idx) => {
      const { point, normal } = getRoadSample(t);
      const pos = point.clone().addScaledVector(normal, 5.5);
      return { id: idx, pos };
    });

    const wireGeos: THREE.BufferGeometry[] = [];

    for (let i = 0; i < poleList.length - 1; i++) {
      const p1 = poleList[i].pos;
      const p2 = poleList[i + 1].pos;

      [-0.8, 0, 0.8].forEach((xOff) => {
        const start = new THREE.Vector3(p1.x + xOff, p1.y + 7.9, p1.z);
        const end = new THREE.Vector3(p2.x + xOff, p2.y + 7.9, p2.z);
        const mid = start.clone().lerp(end, 0.5);
        mid.y -= 0.65; // Catenary sag

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(16);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        wireGeos.push(lineGeo);
      });
    }

    return { poles: poleList, wireLines: wireGeos };
  }, []);

  return (
    <group>
      {poles.map((p) => (
        <group key={p.id} position={[p.pos.x, p.pos.y, p.pos.z]}>
          <mesh position={[0, 4.2, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.18, 8.4, 8]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.78} />
          </mesh>
          <mesh position={[0, 7.8, 0]}>
            <boxGeometry args={[2.0, 0.12, 0.12]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
          {[-0.8, 0, 0.8].map((xOff, i) => (
            <mesh key={i} position={[xOff, 8.0, 0]}>
              <cylinderGeometry args={[0.045, 0.055, 0.2, 8]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {wireLines.map((wGeo, i) => (
        <primitive
          key={`wire-${i}`}
          object={new THREE.Line(wGeo, new THREE.LineBasicMaterial({ color: 0x1e293b }))}
        />
      ))}
    </group>
  );
}

// 3D Physical Roadside Station Showcase Signboards (Alternating Sides)
function StationSignboard({
  stationNumber,
  progress,
  themeColor,
  onClick
}: {
  title: string;
  kmMarker: string;
  stationNumber: number;
  progress: number;
  themeColor: string;
  onClick: () => void;
}) {
  const { point, normal, tangent } = getRoadSample(progress);
  const isRight = stationNumber % 2 === 0;
  const sideOffset = isRight ? 4.9 : -4.9;
  const boardPos = point.clone().addScaledVector(normal, sideOffset);
  boardPos.y += 1.85;

  const angleY = Math.atan2(tangent.x, tangent.z) + (isRight ? -0.15 : 0.15);

  return (
    <group position={[boardPos.x, boardPos.y, boardPos.z]} rotation={[0, angleY, 0]}>
      <mesh position={[-1.2, -1.1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.3, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[1.2, -1.1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.3, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.25} />
      </mesh>

      <group
        onClick={(e) => {
          e.stopPropagation();
          soundFx.playClick();
          onClick();
        }}
        onPointerOver={() => soundFx.playHover()}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 1.4, 0.12]} />
          <meshStandardMaterial color="#15803d" roughness={0.35} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[3.25, 1.25, 0.01]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.075]}>
          <boxGeometry args={[3.12, 1.12, 0.01]} />
          <meshStandardMaterial color={themeColor} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.38, 0.085]}>
          <boxGeometry args={[1.4, 0.22, 0.01]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      </group>

      <mesh position={[-1.2, -2.15, 0]}>
        <boxGeometry args={[0.38, 0.22, 0.38]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
      </mesh>
      <mesh position={[1.2, -2.15, 0]}>
        <boxGeometry args={[0.38, 0.22, 0.38]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
      </mesh>
    </group>
  );
}

// Natural Rolling Countryside Ground Terrain
function CountrysideGround() {
  return (
    <mesh receiveShadow position={[0, -0.18, 280]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[360, 720, 24, 24]} />
      <meshStandardMaterial color="#2d5a27" roughness={0.94} metalness={0.02} />
    </mesh>
  );
}

export const SectionRoadCanvas = ({
  journeyConfig,
  progress,
  speed,
  onSelectStation,
  isEcoMode
}: SectionRoadCanvasProps) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 3, -6], fov: 48, near: 0.1, far: 550 }}
        dpr={isEcoMode ? [1, 1] : [1, 1.5]}
        gl={{ antialias: !isEcoMode, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Soft Natural Daylight Sky & Atmospheric Fog */}
        <color attach="background" args={['#93c5fd']} />
        <fogExp2 attach="fog" args={['#c7d2fe', 0.0032]} />

        {/* Balanced Natural Sunlight & Sky Light */}
        <ambientLight intensity={0.92} color="#ffffff" />
        <hemisphereLight args={['#bae6fd', '#dcfce7', 0.88]} />
        <directionalLight
          position={[50, 95, 60]}
          intensity={2.3}
          color="#fff8e7"
          castShadow={!isEcoMode}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-40, 40, -35]} intensity={0.65} color="#dbeafe" />

        {/* Third-Person Camera Tracking following Yamaha R15 */}
        <ThirdPersonCameraRig progress={progress} speed={speed} />

        {/* Natural Lush Countryside Ground Terrain */}
        <CountrysideGround />

        {/* Procedural Asphalt Road with Texture, Concrete Curbs & Markings */}
        <AsphaltRoad />

        {/* Tamil Nadu Bilingual Highway Signboards (Tamil & English) */}
        <TamilNaduHighwaySignboards />

        {/* Station Signboards for this section */}
        {journeyConfig.stations.map((station, idx) => (
          <StationSignboard
            key={station.id}
            title={station.title}
            kmMarker={station.kmMarker}
            stationNumber={station.stationNumber}
            progress={station.progress}
            themeColor={journeyConfig.themeColor}
            onClick={() => onSelectStation(idx)}
          />
        ))}

        {/* Authentic Tamil Nadu Scenery: Odu Veedu, Thinnai, Annai Tea Kadai, Vinayagar Kovil, Banana Groves & Palms */}
        <TamilNaduScenery isEcoMode={isEcoMode} />

        {/* TNEB Utility Transmission Poles with Continuous Overhead Wires */}
        <UtilityPolesWithWires />

        {/* Authentic Yamaha YZF-R15 V4 Motorcycle Model */}
        <MotorcycleModel progress={progress} speed={speed} />
      </Canvas>
    </div>
  );
};
