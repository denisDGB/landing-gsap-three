"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // Animación de la imagen
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // Animación del contenido
      gsap.from(contentRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center text-white py-32 px-6 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Título */}
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-16 text-center"
        >
          Sobre <span className="text-gradient-blue">Mí</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Espacio para Foto - Izquierda */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* 📸 MODIFICAR: Cambia "/mi-foto.jpg" por la ruta de tu foto */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="/mi-perfil.jpg"
                  alt="Denis - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Efecto decorativo */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Contenido - Derecha */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-justify">
              Soy un <span className="text-white font-semibold">desarrollador Full Stack</span> especializado en 
              crear soluciones completas de software. Trabajo con tecnologías modernas tanto en el frontend como 
              en el backend, diseñando arquitecturas escalables y eficientes.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-justify">
              Con más de <span className="text-white font-semibold">2 años de experiencia</span>, he desarrollado 
              aplicaciones web completas, implementado bases de datos robustas y desplegado proyectos en la nube. 
              Mi enfoque está en crear productos de alta calidad con las mejores prácticas de desarrollo.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-justify">
              Domino desde el diseño de interfaces hasta la gestión de servidores, pasando por APIs REST, bases de 
              datos relacionales y herramientas de DevOps. Siempre estoy aprendiendo nuevas tecnologías para ofrecer 
              las mejores soluciones.
            </p>

            {/* CTA */}
            <div className="pt-6">
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Trabajemos juntos →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
