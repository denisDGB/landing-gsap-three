"use client"; // Para usar en App Router

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function Background3D() {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full" camera={{ position: [0, 0, 5] }}>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Sphere args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial color="#007bff" attach="material" distort={0.4} speed={2} />
      </Sphere>
    </Canvas>
  );
}
