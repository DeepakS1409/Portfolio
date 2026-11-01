import * as THREE from 'three';

// Procedural 3D Winding Road through South Indian Countryside (Tamil Nadu / Coimbatore)
// Length: ~560 units with natural undulating rolling hills, smooth S-bends, and organic road banking
const ROAD_CONTROL_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0.0, 0),         // 0.00: Origin Start
  new THREE.Vector3(8, 0.4, 35),        // 0.08: Gentle uphill rise & right bend
  new THREE.Vector3(22, 1.2, 75),       // 0.14: Crest near Station 1: ABOUT ME
  new THREE.Vector3(14, 0.8, 115),      // 0.22: Smooth downward slope & sweeping left curve
  new THREE.Vector3(-15, 0.3, 155),     // 0.30: Valley curve near Station 2: PROJECTS
  new THREE.Vector3(-25, 0.9, 195),     // 0.38: Gentle rise through coconut grove S-bend
  new THREE.Vector3(-6, 1.6, 235),      // 0.46: Hilltop near Station 3: SKILLS
  new THREE.Vector3(18, 1.1, 275),      // 0.54: Gentle descent towards SECE highway corridor
  new THREE.Vector3(30, 0.5, 315),      // 0.60: Scenic bend near Station 4: EDUCATION
  new THREE.Vector3(16, 0.9, 355),      // 0.68: Smooth right arc with rolling crest
  new THREE.Vector3(-10, 1.4, 395),     // 0.74: Hilltop curve near Station 5: ACHIEVEMENTS
  new THREE.Vector3(-28, 0.8, 435),     // 0.82: Winding curve & dip
  new THREE.Vector3(-12, 0.4, 475),     // 0.88: Station 6: TECH INTERESTS / CERTIFICATES
  new THREE.Vector3(8, 0.2, 515),       // 0.94: Straightening out on coastal plain
  new THREE.Vector3(0, 0.0, 560),       // 1.00: Final Station: CONTACT TERMINAL
];

export const ROAD_SPLINE = new THREE.CatmullRomCurve3(ROAD_CONTROL_POINTS, false, 'catmullrom', 0.5);

// Total road length in world units
export const ROAD_TOTAL_LENGTH = ROAD_SPLINE.getLength();

// Helper to sample position, tangent, and normal along the road (0.0 to 1.0)
export function getRoadSample(t: number) {
  const clampedT = Math.max(0, Math.min(1, t));
  const point = ROAD_SPLINE.getPointAt(clampedT);
  const tangent = ROAD_SPLINE.getTangentAt(clampedT).normalize();
  
  // Up vector
  const up = new THREE.Vector3(0, 1, 0);
  
  // Right normal vector
  const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
  
  // Calculate curvature banking angle for motorcycle leaning and road camber
  // Derivative of tangent X gives curvature
  const aheadT = Math.min(1, clampedT + 0.015);
  const aheadTangent = ROAD_SPLINE.getTangentAt(aheadT).normalize();
  const curvature = (aheadTangent.x - tangent.x) * 45;
  
  // Subtle road surface banking (camber) tilting into curves
  const camberAngle = THREE.MathUtils.degToRad(-curvature * 0.18);
  const bankedNormal = normal.clone().applyAxisAngle(tangent, camberAngle);
  
  return {
    point,
    tangent,
    normal,
    bankedNormal,
    curvature, // degrees to lean
    camberAngle
  };
}
