import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, Ring } from "@react-three/drei";
import * as THREE from "three";

// Spinning asteroid / space rock
const Asteroid = () => {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      {/* Main asteroid body */}
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <MeshDistortMaterial
          color="#915EFF"
          emissive="#3d1a7a"
          emissiveIntensity={0.6}
          roughness={0.8}
          metalness={0.3}
          distort={0.5}
          speed={2}
        />
      </Sphere>

      {/* Orbital ring */}
      <Ring ref={ringRef} args={[1.6, 1.8, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#00cea8" transparent opacity={0.5} side={THREE.DoubleSide} />
      </Ring>

      {/* Glow halo */}
      <Sphere args={[1.3, 16, 16]}>
        <meshBasicMaterial color="#915EFF" transparent opacity={0.06} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
};

// Floating particle orbiting the asteroid
const OrbitalParticle = ({ radius, speed, yOffset, color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = yOffset + Math.sin(t * 2) * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const SpaceAsteroid = () => {
  return (
    <div className="w-full h-[280px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#915EFF" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#00cea8" />

        <Stars radius={30} depth={10} count={300} factor={2} fade />

        <Asteroid />
        <OrbitalParticle radius={2.2} speed={0.8} yOffset={0} color="#00cea8" />
        <OrbitalParticle radius={2.5} speed={0.5} yOffset={0.3} color="#bf61ff" />
        <OrbitalParticle radius={2.0} speed={1.2} yOffset={-0.2} color="#06b6d4" />
      </Canvas>
    </div>
  );
};

export default SpaceAsteroid;
