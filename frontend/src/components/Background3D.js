"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function AnimatedSphere({ mousePosition }) {
  const sphereRef = useRef();
  const [color, setColor] = useState("#8b5cf6");
  const [scale, setScale] = useState([0.8, 0.8, 0.8]);
  const [position, setPosition] = useState([0, 0, 0]);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 480) {
        setScale([0.5, 0.5, 0.5]); 
        setPosition([0, 0, 0]); 
      } else if (width < 768) {
        setScale([0.6, 0.6, 0.6]); 
        setPosition([0, 0, 0]); 
      } else if (width < 1024) {
        setScale([0.8, 0.8, 0.8]); 
        setPosition([0, 0, 0]); 
      } else {
        setScale([1, 1, 1]); 
        setPosition([0, 0, 0]); 
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Color animado con más saturación y brillo
    const hue = (time * 40) % 360;
    const newColor = `hsl(${hue + 250}, 100%, 70%)`;
    setColor(newColor);

    if (sphereRef.current) {
      // Rotación base automática constante
      sphereRef.current.rotation.y += 0.004;
      sphereRef.current.rotation.x += 0.002;

      // Seguimiento sutil del mouse - efecto "lava viscosa"
      const sensitivity = 0.15; // Sensibilidad reducida para efecto sutil
      const smoothness = 0.08;  // Más suave para efecto viscoso
      
      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        mousePosition.y * sensitivity,
        smoothness
      );
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        mousePosition.x * sensitivity,
        smoothness
      );

      // Aplicar rotación con factor más bajo para efecto viscoso
      sphereRef.current.rotation.x += targetRotation.current.x * 0.015;
      sphereRef.current.rotation.y += targetRotation.current.y * 0.015;

      // Flotación sutil
      const baseFloat = Math.sin(time * 0.6) * 0.15;
      sphereRef.current.position.y = baseFloat;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1.5, 128, 128]} scale={scale} position={position}>
      <MeshDistortMaterial 
        attach="material" 
        color={color} 
        distort={0.4}
        speed={1.8}
        roughness={0}
        metalness={1}
        emissive={color}
        emissiveIntensity={0.3}
        toneMapped={false}
      />
    </Sphere>
  );
}

export default function Background3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalizar posición del mouse de -1 a 1 (global)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Iluminación mejorada para más brillo */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, -5, 5]} intensity={1.5} color="#4facfe" />
        <pointLight position={[0, 0, 3]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00f2fe" />
        <AnimatedSphere 
          mousePosition={mousePosition}
        />
      </Canvas>
    </div>
  );
}
