import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// The spinning globe
const Globe = () => {
  const globeRef = useRef();
  const pinRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.12; // slow auto-rotate
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.12 + Math.sin(t * 1.5) * 0.04;
    }
  });

  // Puducherry lat/lon → 3D position on sphere of radius 1
  // lat: 11.9416° N, lon: 79.8083° E
  const lat = (11.9416 * Math.PI) / 180;
  const lon = (79.8083 * Math.PI) / 180;
  const r = 1.05;
  const pinX = r * Math.cos(lat) * Math.sin(lon);
  const pinY = r * Math.sin(lat);
  const pinZ = r * Math.cos(lat) * Math.cos(lon);

  return (
    <group>
      {/* Globe body */}
      <Sphere ref={globeRef} args={[1, 48, 48]}>
        <meshStandardMaterial
          color="#0a1628"
          emissive="#0d2145"
          emissiveIntensity={0.4}
          roughness={0.6}
          metalness={0.4}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe overlay for the "map grid" look */}
      <Sphere args={[1.005, 24, 24]}>
        <meshBasicMaterial
          color="#915EFF"
          wireframe
          transparent
          opacity={0.07}
        />
      </Sphere>

      {/* Outer atmospheric glow */}
      <Sphere ref={glowRef} args={[1.15, 32, 32]}>
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Pin for Puducherry */}
      <mesh position={[pinX, pinY, pinZ]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color="#ff4444" />
      </mesh>

      {/* Pulsing ring around pin */}
      <mesh position={[pinX, pinY, pinZ]}>
        <ringGeometry args={[0.05, 0.065, 32]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const InteractiveGlobe = () => {
  return (
    <div className="w-full h-[300px] relative">
      <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[-4, 4, 4]} intensity={2} color="#915EFF" />
        <pointLight position={[4, -2, -4]} intensity={1} color="#2563eb" />

        <Stars radius={50} depth={15} count={400} factor={2} fade />
        <Globe />
      </Canvas>

      {/* Location label overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0f1424]/80 backdrop-blur-md border border-[#ffffff15] px-3 py-1.5 rounded-full">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-white text-[12px] font-medium">
          Puducherry, India 🇮🇳
        </span>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
