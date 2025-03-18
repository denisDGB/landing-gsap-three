"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Proyecto 1", image: "/project1.jpg", link: "#" },
  { title: "Proyecto 2", image: "/project2.jpg", link: "#" },
  { title: "Proyecto 3", image: "/project3.jpg", link: "#" },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse", // 🔄 Repetir al subir/bajar
        },
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="projects-section min-h-screen bg-black text-white text-center py-24 mt-32"
    >
      <h2 className="text-4xl font-semibold mb-10 text-blue-400 drop-shadow-lg">
        Proyectos Destacados
      </h2>

      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition"
            >
              <div className="w-full h-48 relative">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md hover:opacity-90 transition"
                />
              </div>
              <h3 className="text-xl font-bold mt-4">{project.title}</h3>
              <a 
                href={project.link} 
                className="text-blue-400 hover:text-indigo-400 transition font-semibold"
              >
                Ver Proyecto →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

