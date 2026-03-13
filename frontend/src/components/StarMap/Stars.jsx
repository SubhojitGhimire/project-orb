import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useLayoutEffect } from "react";

const vertexShader = `
attribute float size;
attribute vec3 customColor;
attribute float random;
varying vec3 vColor;
varying float vRandom;
void main() {
  vColor = customColor;
  vRandom = random;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  
  // Scale size based on distance (perspective)
  // 300.0 is an arbitrary scale factor to make them look good
  gl_PointSize = size * (300.0 / -mvPosition.z);
  
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform float uTime;
varying vec3 vColor;
varying float vRandom;

void main() {
  // Make it a circular particle
  vec2 uv = gl_PointCoord.xy - 0.5;
  float dist = length(uv);
  
  // Discard corners of the square point
  if (dist > 0.5) discard;

  // Soft edge (glow)
  // gradient from center (0.0) to edge (0.5)
  float glow = 1.0 - (dist * 2.0);
  glow = pow(glow, 1.5); // sharpen the glow curve

  // Twinkle Logic
  // Use sine wave based on Time + Random offset
  // vRandom makes sure every star blinks out of phase
  float twinkleSpeed = 3.0 + (vRandom * 2.0); // varied speeds
  float twinkle = sin((uTime * twinkleSpeed) + (vRandom * 100.0));
  
  // Map sine (-1 to 1) to a brightness factor (e.g. 0.6 to 1.0)
  float brightness = 0.7 + (0.3 * twinkle);

  gl_FragColor = vec4(vColor, glow * brightness);
}
`;

export function Stars({ data, visible }) {
  const meshRef = useRef();
  const materialRef = useRef();

  const { positions, colors, sizes, randoms } = useMemo(() => {
    if (!data)
      return {
        positions: new Float32Array(0),
        colors: new Float32Array(0),
        sizes: new Float32Array(0),
        randoms: new Float32Array(0),
      };

    const starCount = data.stars.ids.length;
    const posArray = new Float32Array(starCount * 3);
    const colArray = new Float32Array(starCount * 3);
    const sizeArray = new Float32Array(starCount);
    const randArray = new Float32Array(starCount);

    const radius = 100;
    const color = new THREE.Color();

    for (let i = 0; i < starCount; i++) {
      const alt = data.stars.altitude[i];
      const az = data.stars.azimuth[i];
      const mag = data.stars.magnitude[i];
      const id = data.stars.ids[i];

      const phi = (90 - alt) * (Math.PI / 180);
      const theta = az * (Math.PI / 180);
      posArray[i * 3] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 1] = radius * Math.cos(phi);
      posArray[i * 3 + 2] = -radius * Math.sin(phi) * Math.cos(theta);

      const spectralType = id % 10;
      if (mag < 1.0) {
        color.setHex(id % 2 === 0 ? 0xaaccff : 0xffddaa); // White-Blue or Gold for very bright stars
      } else if (spectralType < 2) {
        color.setHex(0xaaccff); // Blueish
      } else if (spectralType < 4) {
        color.setHex(0xffffff); // White
      } else if (spectralType < 7) {
        color.setHex(0xffebcd); // Yellow/White
      } else {
        color.setHex(0xffccaa); // Orange/Reddish
      }

      colArray[i * 3] = color.r;
      colArray[i * 3 + 1] = color.g;
      colArray[i * 3 + 2] = color.b;

      let s = 4.0 - mag * 0.5;
      if (s < 1.5) s = 1.5;
      sizeArray[i] = s;

      randArray[i] = Math.random(); // Random value for twinkling efect
    }

    return {
      positions: posArray,
      colors: colArray,
      sizes: sizeArray,
      randoms: randArray,
    };
  }, [data]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  useLayoutEffect(() => {
    if (meshRef.current) {
      const geo = meshRef.current.geometry;
      geo.attributes.position.needsUpdate = true;
      geo.attributes.customColor.needsUpdate = true;
      geo.attributes.size.needsUpdate = true;
      geo.attributes.random.needsUpdate = true;
    }
  }, [positions, colors, sizes, randoms]);

  return (
    <group visible={visible}>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-customColor"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-random"
            count={randoms.length}
            array={randoms}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
