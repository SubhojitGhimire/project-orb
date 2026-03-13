import * as THREE from "three";
import { useMemo, useRef, useLayoutEffect } from "react";

const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // FIX: Use length() to prevent negative Z issues behind camera
    gl_PointSize = size * (300.0 / length(mvPosition.xyz));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec3 vColor;
  void main() {
    vec4 texColor = texture2D(uTexture, gl_PointCoord);
    if (texColor.a < 0.05) discard;
    gl_FragColor = vec4(vColor, 1.0) * texColor;
    gl_FragColor.a *= 0.15; // Transparency
  }
`;

export function MilkyWay({ data, visible }) {
  const meshRef = useRef();
  const texture = useMemo(() => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grd.addColorStop(0, "rgba(255, 255, 255, 1)");
      grd.addColorStop(0.4, "rgba(200, 200, 255, 0.3)");
      grd.addColorStop(0.8, "rgba(100, 0, 150, 0.05)");
      grd.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      console.error("Texture Gen Failed", e);
      return null;
    }
  }, []);

  const { positions, colors, sizes } = useMemo(() => {
    if (!data || !data.altitude || data.altitude.length === 0) {
      return {
        positions: new Float32Array(0),
        colors: new Float32Array(0),
        sizes: new Float32Array(0),
      };
    }

    const count = data.altitude.length;
    const posArray = new Float32Array(count * 3);
    const colArray = new Float32Array(count * 3);
    const sizeArray = new Float32Array(count);
    const color = new THREE.Color();
    const radius = 120;

    for (let i = 0; i < count; i++) {
      const alt = data.altitude[i];
      const az = data.azimuth[i];
      const intensity = data.intensity[i];

      if (alt < -100 || isNaN(alt)) {
        sizeArray[i] = 0;
        continue;
      }

      const phi = (90 - alt) * (Math.PI / 180);
      const theta = az * (Math.PI / 180);

      posArray[i * 3] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 1] = radius * Math.cos(phi);
      posArray[i * 3 + 2] = -radius * Math.sin(phi) * Math.cos(theta);

      if (intensity > 0.8) color.setHSL(0.1, 0.8, 0.8);
      else if (intensity > 0.5) color.setHSL(0.6, 0.5, 0.6);
      else color.setHSL(0.75, 0.6, 0.3);

      colArray[i * 3] = color.r;
      colArray[i * 3 + 1] = color.g;
      colArray[i * 3 + 2] = color.b;

      sizeArray[i] = (20 + Math.random() * 20) * intensity;
    }

    return { positions: posArray, colors: colArray, sizes: sizeArray };
  }, [data]);

  useLayoutEffect(() => {
    if (meshRef.current && positions.length > 0) {
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.attributes.customColor.needsUpdate = true;
      meshRef.current.geometry.attributes.size.needsUpdate = true;
    }
  }, [positions, colors, sizes]);

  if (!texture || positions.length === 0) return null;

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
        </bufferGeometry>
        <shaderMaterial
          uniforms={{ uTexture: { value: texture } }}
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
