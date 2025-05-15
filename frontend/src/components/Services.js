"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Animaciones Web", description: "Efectos interactivos y animaciones fluidas para mejorar la UX." },
  { title: "Diseño UI", description: "Interfaces atractivas y funcionales con un enfoque en la experiencia del usuario." },
  { title: "Desarrollo Frontend", description: "Creación de páginas web dinámicas con tecnologías modernas." },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse", // 🔄 Se activa al scrollear arriba y abajo
        },
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="services-section bg-gray-900 text-white py-16"
    >
      <div className="container mx-auto px-8">
        <h2 className="text-center text-4xl font-semibold mb-12 text-blue-400 drop-shadow-lg">
          Mis Servicios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-gray-300 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
