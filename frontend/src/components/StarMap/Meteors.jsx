import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export function Meteors({ dateStr }) {
  const meshRef = useRef();
  const date = new Date(dateStr);
  const activeShower = useMemo(() => {}, [dateStr]);
  const count = activeShower ? 12 : 3;

  const { positions, velocities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(count * 3 * 2);
    const vel = [];
    const life = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      resetMeteor(i, pos, vel, life, activeShower);
    }
    return { positions: pos, velocities: vel, lifetimes: life };
  }, [activeShower]);

  function resetMeteor(i, pos, vel, life, shower) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const start = new THREE.Vector3().setFromSphericalCoords(90, phi, theta);

    let velocity = new THREE.Vector3();

    if (shower) {
      const radiant = new THREE.Vector3(...shower.radiant).normalize();
      velocity
        .subVectors(start, radiant)
        .normalize()
        .multiplyScalar(1.5 + Math.random());
      const angle = start.angleTo(radiant);
      if (angle > Math.PI / 1.5 || angle < 0.2) {
        resetMeteor(i, pos, vel, life, shower);
        return;
      }
    } else {
      velocity
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(2.0);
    }

    pos[i * 6] = start.x;
    pos[i * 6 + 1] = start.y;
    pos[i * 6 + 2] = start.z;
    pos[i * 6 + 3] = start.x;
    pos[i * 6 + 4] = start.y;
    pos[i * 6 + 5] = start.z;

    vel[i] = velocity;
    life[i] = Math.random() * 200;
  }

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      lifetimes[i] -= 1.0;

      if (lifetimes[i] < 0) {
        if (lifetimes[i] > -15) {
          const headIdx = i * 6;
          const tailIdx = i * 6 + 3;

          posAttr.array[tailIdx] = posAttr.array[headIdx] - velocities[i].x * 3;
          posAttr.array[tailIdx + 1] =
            posAttr.array[headIdx + 1] - velocities[i].y * 3;
          posAttr.array[tailIdx + 2] =
            posAttr.array[headIdx + 2] - velocities[i].z * 3;

          posAttr.array[headIdx] += velocities[i].x;
          posAttr.array[headIdx + 1] += velocities[i].y;
          posAttr.array[headIdx + 2] += velocities[i].z;
        } else {
          resetMeteor(i, posAttr.array, velocities, lifetimes, activeShower);
        }
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={activeShower ? "#ccddff" : "#ffffff"}
        transparent
        opacity={0.5}
        linewidth={1}
      />
    </lineSegments>
  );
}
