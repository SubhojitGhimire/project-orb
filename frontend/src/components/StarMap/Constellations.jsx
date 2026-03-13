import { useMemo, useState } from "react";
import { Line, Text, Billboard } from "@react-three/drei";
import { CONSTELLATIONS } from "../../data/constellations";

export function Constellations({ data, visible, showLabels, onSelect, tiers }) {
  const [hovered, setHovered] = useState(null);

  const { constellationGroups } = useMemo(() => {
    if (!data) return { constellationGroups: [] };

    const radius = 99.5;
    const starMap = new Map();
    data.ids.forEach((id, index) => starMap.set(id, index));

    const groups = [];

    CONSTELLATIONS.forEach((c) => {
      const tier = c.tier || 3;
      if (tier === 1 && !tiers.tier1) return;
      if (tier === 2 && !tiers.tier2) return;
      if (tier === 3 && !tiers.tier3) return;

      const lines = [];
      if (c.lines) {
        c.lines.forEach(([start, end]) => {
          const idxA = starMap.get(start);
          const idxB = starMap.get(end);

          if (idxA !== undefined && idxB !== undefined) {
            lines.push([
              getPosition(data, idxA, radius),
              getPosition(data, idxB, radius),
            ]);
          }
        });
      }

      let labelPos = null;
      if (c.anchor) {
        const anchorIdx = starMap.get(c.anchor);
        if (anchorIdx !== undefined) {
          labelPos = getPosition(data, anchorIdx, radius);
        }
      }

      groups.push({ data: c, lines, labelPos });
    });

    return { constellationGroups: groups };
  }, [data, tiers]);

  function getPosition(data, index, r) {
    const alt = data.altitude[index];
    const az = data.azimuth[index];
    const phi = (90 - alt) * (Math.PI / 180);
    const theta = az * (Math.PI / 180);
    return [
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
      -r * Math.sin(phi) * Math.cos(theta),
    ];
  }

  return (
    <group visible={visible}>
      {constellationGroups.map((group, i) => (
        <group key={i}>
          {group.lines.map((points, j) => (
            <Line
              key={j}
              points={points}
              color={
                hovered === group.data.name
                  ? "#ffd700"
                  : "rgba(255, 255, 255, 0.2)"
              }
              lineWidth={hovered === group.data.name ? 2 : 1}
              transparent
              opacity={hovered === group.data.name ? 0.8 : 0.3}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(group.data.name);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                setHovered(null);
                document.body.style.cursor = "auto";
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(group.data);
              }}
            />
          ))}

          {showLabels && group.labelPos && (
            <Billboard position={group.labelPos}>
              <Text
                fontSize={hovered === group.data.name ? 2.5 : 1.8}
                color={hovered === group.data.name ? "#ffd700" : "#88ccff"}
                anchorX="center"
                anchorY="middle"
                fillOpacity={hovered === group.data.name ? 1 : 0.6}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHovered(group.data.name);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  setHovered(null);
                  document.body.style.cursor = "auto";
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(group.data);
                }}
              >
                {group.data.name.toUpperCase()}
              </Text>
            </Billboard>
          )}
        </group>
      ))}
    </group>
  );
}
