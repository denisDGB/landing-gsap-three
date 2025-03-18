"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

function AnimatedSphere() {
  const sphereRef = useRef();
  const [color, setColor] = useState("#ff0055");
  const [scale, setScale] = useState([0.8, 0.8, 0.8]);
  const [position, setPosition] = useState([0, 3.8, -3.5]);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 480) {
        // 📱 Dispositivos muy pequeños (móviles compactos)
        setScale([0.2, 0.2, 0.2]); 
        setPosition([0, 2.8, -3]); 
      } else if (width < 768) {
        // 📲 Móviles estándar
        setScale([0.3, 0.3, 0.3]); 
        setPosition([0, 4.1, -3.2]); 
      } else if (width < 1024) {
        // 📱 Tablets
        setScale([0.5, 0.5, 0.5]); 
        setPosition([0, 3.9, -3.3]); 
      } else {
        // 🖥️ Escritorio
        setScale([0.6, 0.6, 0.6]); 
        setPosition([0, 3.9, -3.5]); 
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const newColor = `hsl(${(time * 80) % 360}, 100%, 60%)`;
    setColor(newColor);

    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
      sphereRef.current.rotation.x += 0.005;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1.2, 64, 64]} scale={scale} position={position}>
      <MeshDistortMaterial attach="material" color={color} distort={0.5} speed={1.5} />
    </Sphere>
  );
}

export default function Background3D() {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full -z-10 flex justify-center items-start pointer-events-none"
    >
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 2]} intensity={1.5} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
