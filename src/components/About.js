"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animación de entrada inicial para el texto
    gsap.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    // Animación de opacidad al scrollear
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 }, // Estado inicial
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Se activa cuando la sección está al 80% visible
          toggleActions: "play none none reverse", // Reproduce la animación al bajar y revierte al subir
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section min-h-screen flex flex-col items-center justify-center text-center text-white bg-black py-24 px-6 mt-32"
    >
      <h2 className="text-4xl font-bold text-blue-400 drop-shadow-lg mb-10">
        Sobre Mí
      </h2>

      <div 
        ref={textRef} 
        className="bg-gray-800 p-8 max-w-3xl rounded-lg shadow-lg text-lg text-gray-300 leading-relaxed"
      >
        <p>
          Soy un <span className="text-blue-400 font-semibold">diseñador y desarrollador frontend</span> 
          apasionado por las <span className="text-indigo-400 font-semibold">animaciones web</span> y las 
          <span className="text-indigo-400 font-semibold"> interacciones de usuario.</span> Me encanta convertir ideas 
          en experiencias visuales cautivadoras.
        </p>

        <p className="mt-6">
          Con más de <span className="text-blue-400 font-semibold">2 años de experiencia</span> , he trabajado en 
          diversos proyectos que combinan diseño, creatividad y tecnología. Mi objetivo es crear interfaces 
          atractivas y funcionales que mejoren la experiencia del usuario en la web.
        </p>

        <p className="mt-6">
          Cuando no estoy diseñando o programando, me gusta explorar nuevas tecnologías, 
          inspirarme en el arte digital y compartir conocimientos con la comunidad.
        </p>
      </div>
    </section>
  );
}
