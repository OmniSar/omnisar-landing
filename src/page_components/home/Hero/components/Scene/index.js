"use client";
import "./styles.scss";
import React from "react";
import { useState, useEffect, useRef, useMemo } from "react";

import { motion } from "framer-motion";

import * as THREE from "three";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uThreshold;

  attribute float aElevation;
  attribute float aPhase;

  float vOpacity;
  varying vec4 vColor;

  void main() {
    float growth = 0.0;
    vOpacity = 0.12;

    float t = fract(uTime * uSpeed + aPhase);
    
    if (aElevation > uThreshold) {
      growth = aElevation * t;
      float pulse = clamp(1.0 - smoothstep(0.0, 0.08, growth), 0.0, 1.0);
      vOpacity = max(vOpacity, pulse);
    }

    vec3 newPosition = position + (normalize(position) * growth);
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vec4 clipPos = projectionMatrix * mvPosition;


    vec4 whiteColor = vec4(1.0, 1.0, 1.0, vOpacity);

    vColor = whiteColor;

    float size = 2.0 * (1.0 / -mvPosition.z);
    gl_PointSize = clamp(size, 1.0, 5.0);
    gl_Position = clipPos;
  }
`;

const fragmentShader = `
  varying vec4 vColor;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    float mask = 1.0 - smoothstep(0.25, 0.5, dist);
    gl_FragColor = vec4(vColor.rgb, vColor.a * mask);
  }
`;

export default function Scene() {
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    new THREE.FileLoader().setResponseType("arraybuffer").load("/land_points.bin", (buffer) => {
      setBuffer(new Float32Array(buffer));
    });
  }, []);

  if (!buffer) return null;

  return (
    <motion.div className="home-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
      <Canvas
        camera={{ position: [1.55, 1.2, 1.55], fov: 100, near: 0.5, far: 20 }}
        shadows
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#040404"]} />
        <ambientLight color="#1a2030" intensity={0.08} />

        <Earth buffer={buffer} />

        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.42} luminanceSmoothing={0.55} intensity={0.75} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
}

const Earth = ({ buffer }) => {
  const materialRef = useRef(THREE.ShaderMaterial > null);
  const globeRef = useRef(null);

  const { positions, elevations, phases } = useMemo(() => {
    const rawData = new Float32Array(buffer);
    const numPoints = rawData.length / 4;

    const posArray = new Float32Array(numPoints * 3);
    const elevArray = new Float32Array(numPoints);
    const phaseArray = new Float32Array(numPoints);

    for (let i = 0; i < numPoints; i++) {
      posArray[i * 3 + 0] = rawData[i * 4 + 0];
      posArray[i * 3 + 1] = rawData[i * 4 + 1];
      posArray[i * 3 + 2] = rawData[i * 4 + 2];
      elevArray[i] = rawData[i * 4 + 3];
      phaseArray[i] = Math.random();
    }

    return { positions: posArray, elevations: elevArray, phases: phaseArray };
  }, [buffer]);

  useFrame(({ clock }, delta) => {
    const mat = materialRef.current;
    if (!mat) return;

    const g = globeRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.05;

    mat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group ref={globeRef} position={[0.85, 0, 0]} rotation={[THREE.MathUtils.degToRad(23.5), 0, 0]} scale={0.9}>
      <Sphere args={[1.0, 64, 64]} position={[0, 0, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#05060c" metalness={0.92} roughness={0.88} emissive="#000000" emissiveIntensity={0.01} />
      </Sphere>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aElevation" args={[elevations, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        </bufferGeometry>

        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uSpeed: { value: 0.04 },
            uThreshold: { value: 0.000001 },
          }}
          transparent={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
        ></shaderMaterial>
      </points>
    </group>
  );
};
