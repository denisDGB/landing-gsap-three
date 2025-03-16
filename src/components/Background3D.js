"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState } from "react";

function AnimatedSphere() {
  const sphereRef = useRef();
  const [color, setColor] = useState("#007bff"); // Color inicial

  useFrame(({ clock, mouse }) => {
    // Movimiento suave con el mouse
    sphereRef.current.rotation.y = mouse.x * 0.5;
    sphereRef.current.rotation.x = mouse.y * 0.5;

    // Cambia de color dinámicamente con el tiempo
    const time = clock.getElapsedTime(); // Obtiene el tiempo transcurrido
    const newColor = `hsl(${(time * 50) % 360}, 100%, 50%)`; // Crea colores cambiantes en HSL
    setColor(newColor);
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial attach="material" color={color} distort={0.4} speed={2} />
    </Sphere>
  );
}

export default function Background3D() {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full" camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <AnimatedSphere />
    </Canvas>
  );
}
