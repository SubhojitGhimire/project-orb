import { Text } from "@react-three/drei";

export function Compass() {
  const radius = 90;
  const color = "#444";

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <gridHelper
        args={[200, 20, color, "#222"]}
        position={[0, -0.1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Text
        position={[0, radius, 0]}
        fontSize={10}
        color="#ff5555"
        rotation={[0, 0, Math.PI]}
      >
        N
      </Text>
      <Text
        position={[0, -radius, 0]}
        fontSize={10}
        color="white"
        rotation={[0, 0, 0]}
      >
        S
      </Text>
      <Text
        position={[-radius, 0, 0]}
        fontSize={10}
        color="white"
        rotation={[0, 0, -Math.PI / 2]}
      >
        E
      </Text>
      <Text
        position={[radius, 0, 0]}
        fontSize={10}
        color="white"
        rotation={[0, 0, Math.PI / 2]}
      >
        W
      </Text>
    </group>
  );
}
