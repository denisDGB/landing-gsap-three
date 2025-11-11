"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background3D from "./Background3D";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada con split text effect
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
      })
      .from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, "-=0.5")
      .from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
      }, "-=0.3");

      // Efecto parallax en scroll
      gsap.to(containerRef.current, {
        y: 100,
        opacity: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white overflow-hidden px-6"
    >
      {/* Esfera 3D - Solo en Hero */}
      <Background3D />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Título principal */}
        <h1 
          ref={titleRef} 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Full Stack Developer
          <br />
          <span className="text-gradient-blue">& Software Engineer</span>
        </h1>

        {/* Descripción */}
        <p 
          ref={descRef} 
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-400 mb-12 leading-relaxed"
        >
          Desarrollando soluciones completas desde el 
          <span className="text-white font-semibold"> frontend hasta el backend</span>, con 
          <span className="text-white font-semibold"> bases de datos</span> y 
          <span className="text-white font-semibold"> deploy en la nube</span>
        </p>

        {/* Botones */}
        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-white text-black rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
          >
            <span className="relative z-10">Ver mi trabajo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-full text-lg font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Contactar
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}




