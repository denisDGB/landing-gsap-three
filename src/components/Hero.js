"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, { opacity: 0, y: 50, duration: 1 });
    gsap.from(descRef.current, { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from(buttonRef.current, { opacity: 1, scale: 1, duration: 0.5, delay: 1 });
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center h-screen text-center text-white z-10"
    >
      {/* Título */}
      <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold drop-shadow-lg relative z-20">
        ¡Hola, soy <span className="text-blue-400">Denis</span>!
      </h1>

      {/* Descripción */}
      <p ref={descRef} className="text-lg md:text-xl mt-4 max-w-md md:max-w-lg text-gray-300 relative z-20">
        Creative Frontend & Motion Designer | UI Interactions & Web Animations
      </p>

      {/* Botón "Ver Portafolio" */}
      <div className="mt-16 relative z-30">
        <a
          ref={buttonRef}
          href="#portfolio"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md text-lg font-semibold hover:scale-105 hover:shadow-xl transition"
        >
          Ver Portafolio
        </a>
      </div>
    </section>
  );
}




