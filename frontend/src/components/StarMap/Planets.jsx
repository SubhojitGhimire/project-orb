import * as THREE from "three";
import { useMemo } from "react";
import { Text, Billboard } from "@react-three/drei";

const PLANET_STYLES = {
  Sun: { color: "#ffaa00", size: 15.0, label: "Sun" },
  Mercury: { color: "#ff0000", size: 3.0, label: "Mercury" },
  Venus: { color: "#e3bb76", size: 4.5, label: "Venus" },
  Moon: { color: "#999999", size: 6.0, label: "Moon" },
  Mars: { color: "#9C2E35", size: 4.0, label: "Mars" },
  Jupiter: { color: "#B45C3D", size: 8.0, label: "Jupiter" },
  Saturn: { color: "#eddbad", size: 7.0, label: "Saturn" },
  Uranus: { color: "#BBE1E4", size: 6.0, label: "Uranus" },
  Neptune: { color: "#7CB7BB", size: 6.0, label: "Neptune" },

  // Dwarf Planets
  Pluto: { color: "#d1c5b4", size: 2.5, label: "Pluto" },
  Ceres: { color: "#aaaaaa", size: 2.0, label: "Ceres" },
  Eris: { color: "#eeeeee", size: 2.0, label: "Eris" },
  Haumea: { color: "#999999", size: 2.0, label: "Haumea" },
  Makemake: { color: "#cc9966", size: 2.0, label: "Makemake" },
};

export function Planets({ data, visible, showLabels }) {
  const glowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const planetObjects = useMemo(() => {
    if (!data) return [];
    const objects = [];
    const radius = 90;
    data.names.forEach((name, i) => {
      const alt = data.altitude[i];
      const az = data.azimuth[i];
      const phi = (90 - alt) * (Math.PI / 180);
      const theta = az * (Math.PI / 180);
      const x = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      const z = -radius * Math.sin(phi) * Math.cos(theta);

      const style = PLANET_STYLES[name] || { color: "white", size: 3 };
      objects.push({ name, position: [x, y, z], ...style });
    });
    return objects;
  }, [data]);

  return (
    <group visible={visible}>
      {planetObjects.map((planet) => (
        <group key={planet.name} position={planet.position}>
          <mesh>
            <sphereGeometry args={[planet.size * 0.1, 16, 16]} />
            <meshBasicMaterial color={planet.color} />
          </mesh>

          <sprite scale={[planet.size, planet.size, 1]} renderOrder={1}>
            <spriteMaterial
              map={glowTexture}
              color={planet.color}
              transparent={true}
              opacity={0.8}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>

          {showLabels && (
            <Billboard>
              <Text
                position={[0, -planet.size * 0.6, 0]}
                fontSize={2.5}
                color={planet.color}
                anchorX="center"
                anchorY="top"
                renderOrder={10}
                depthTest={false}
                depthWrite={false}
              >
                {planet.name === "Moon" || planet.name === "Sun"
                  ? planet.label
                  : planet.name}
              </Text>
            </Billboard>
          )}
        </group>
      ))}
    </group>
  );
}
