import React from "react";
import "./styles.scss";
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

  float vOpacity;
  varying vec4 vColor;

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  }

  void main() {
    float growth = 0.0;
    vOpacity = 0.12;

    float t = fract(uTime * uSpeed + hash(position));
    
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
    const loader = new THREE.FileLoader().setResponseType("arraybuffer");
    loader.load("/land_points.bin", (rawBuffer) => {
      setBuffer(new Float32Array(rawBuffer));
    });
  }, []);

  if (!buffer) return null;

  return (
    <motion.div className="home-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
      <Canvas
        camera={{ position: [1.55, 1.2, 1.55], fov: 100, near: 0.5, far: 60 }}
        dpr={[1, 1.5]}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#040404"]} />
        <ambientLight color="#1a2030" intensity={0.2} />

        <Earth buffer={buffer} />

        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.42} luminanceSmoothing={0.55} intensity={0.95} />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
}

const Earth = ({ buffer }) => {
  const materialRef = useRef(null);
  const globeRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 0.04 },
      uThreshold: { value: 0.000001 },
    }),
    [],
  );

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const interleaved = new THREE.InterleavedBuffer(buffer, 4);
    geometry.setAttribute("position", new THREE.InterleavedBufferAttribute(interleaved, 3, 0));
    geometry.setAttribute("aElevation", new THREE.InterleavedBufferAttribute(interleaved, 1, 3));
    return geometry;
  }, [buffer]);

  useEffect(() => {
    return () => {
      pointsGeometry.dispose();
    };
  }, [pointsGeometry]);

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
      <Sphere args={[1.0, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#05060c" metalness={0.92} roughness={0.88} emissive="#000000" emissiveIntensity={0.01} />
      </Sphere>

      <points geometry={pointsGeometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
        ></shaderMaterial>
      </points>
    </group>
  );
};
