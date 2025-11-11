"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);

  // Datos de proyectos de ejemplo
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Plataforma de comercio electrónico con animaciones fluidas",
      image: "/images/project1.jpg",
      tags: ["Next.js", "GSAP", "Stripe"],
      link: "#",
    },
    {
      title: "Portfolio 3D",
      description: "Portfolio interactivo con gráficos 3D y WebGL",
      image: "/images/project2.jpg",
      tags: ["Three.js", "React", "WebGL"],
      link: "#",
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard con visualizaciones de datos animadas",
      image: "/images/project3.jpg",
      tags: ["React", "D3.js", "Tailwind"],
      link: "#",
    },
  ];

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

      // Animación de las tarjetas - asegurar que todas se animen
      if (projectsRef.current && projectsRef.current.children) {
        Array.from(projectsRef.current.children).forEach((child, index) => {
          gsap.fromTo(child, 
            {
              opacity: 0,
              y: 80,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: projectsRef.current,
                start: "top 75%",
                end: "bottom 20%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen text-white py-32 px-6 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-20 text-center"
        >
          {t.projects.title} <span className="text-gradient-blue">{t.projects.titleHighlight}</span>
        </h2>

        {/* Grid de proyectos */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Imagen del proyecto */}
              <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-blue-400 font-semibold pt-4">
                  <span>Ver proyecto</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-full text-lg font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Ver todos los proyectos →
          </a>
        </div>
      </div>
    </section>
  );
}
