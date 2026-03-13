import * as THREE from "three";
import { useMemo, useState } from "react";
import { Text, Billboard } from "@react-three/drei";

const TYPE_COLORS = {
  Galaxy: "#ff88cc", // Pink
  Nebula: "#88ffcc", // Teal
  Cluster: "#ffff88", // Yellow
};

const TYPE_SHAPES = {
  Galaxy: "O",
  Nebula: "☁",
  Cluster: "::",
};

export function DSOs({ data, visible, showLabels, onSelect }) {
  const [hovered, setHovered] = useState(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.5, "rgba(255,255,255,0.2)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 64, 64);

    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }, []);

  const objects = useMemo(() => {
    if (!data || data.names.length === 0) return [];

    const radius = 95;
    const list = [];

    data.names.forEach((name, i) => {
      const alt = data.altitude[i];
      const az = data.azimuth[i];

      const phi = (90 - alt) * (Math.PI / 180);
      const theta = az * (Math.PI / 180);

      list.push({
        name: name,
        type: data.types[i],
        mag: data.magnitude[i],
        pos: [
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
          -radius * Math.sin(phi) * Math.cos(theta),
        ],
      });
    });
    return list;
  }, [data]);

  return (
    <group visible={visible}>
      {objects.map((obj, i) => (
        <group key={i} position={obj.pos}>
          <sprite
            scale={[3, 3, 1]}
            onClick={(e) => {
              e.stopPropagation();
              onSelect({
                name: obj.name,
                description: `${obj.type} - Mag ${obj.mag}`,
              });
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(obj.name);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              setHovered(null);
              document.body.style.cursor = "auto";
            }}
          >
            <spriteMaterial
              map={texture}
              color={TYPE_COLORS[obj.type] || "white"}
              transparent
              opacity={hovered === obj.name ? 1 : 0.6}
              depthWrite={false}
            />
          </sprite>

          {(showLabels || hovered === obj.name) && (
            <Billboard>
              <Text
                position={[0, -2.5, 0]}
                fontSize={hovered === obj.name ? 2 : 1.5}
                color={TYPE_COLORS[obj.type]}
                anchorY="top"
                fillOpacity={hovered === obj.name ? 1 : 0.7}
              >
                {obj.name}
              </Text>
            </Billboard>
          )}
        </group>
      ))}
    </group>
  );
}
