"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  const services = [
    { 
      icon: "💻",
      title: "Desarrollo Frontend", 
      description: "Interfaces modernas y responsivas con React, Next.js y TypeScript. Diseño UI/UX intuitivo y animaciones fluidas.",
      features: ["React & Next.js", "TypeScript", "Tailwind CSS"]
    },
    { 
      icon: "⚙️",
      title: "Desarrollo Backend", 
      description: "APIs REST robustas y escalables con Node.js, Java, Python y PHP. Arquitectura de microservicios y servicios en la nube.",
      features: ["Node.js", "Java", "Python & PHP"]
    },
    { 
      icon: "🗄️",
      title: "Bases de Datos", 
      description: "Diseño e implementación de bases de datos relacionales optimizadas con MySQL, PostgreSQL, MariaDB y Azure SQL.",
      features: ["MySQL", "PostgreSQL", "Azure SQL"]
    },
    { 
      icon: "☁️",
      title: "Cloud & DevOps", 
      description: "Deploy y gestión de aplicaciones en la nube con Azure, Docker, Jenkins, Vercel y Railway. CI/CD automatizado.",
      features: ["Azure", "Docker", "Jenkins"]
    },
    { 
      icon: "🔌",
      title: "APIs & Integración", 
      description: "Desarrollo de APIs REST, integración de servicios externos y WebSockets para aplicaciones en tiempo real.",
      features: ["REST APIs", "WebSockets", "Postman"]
    },
    { 
      icon: "🛠️",
      title: "Full Stack Apps", 
      description: "Aplicaciones web completas de punta a punta, desde la base de datos hasta el frontend, con deploy en producción.",
      features: ["MERN/MEAN Stack", "WordPress", "E-commerce"]
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
      if (cardsRef.current && cardsRef.current.children) {
        Array.from(cardsRef.current.children).forEach((child, index) => {
          gsap.fromTo(child, 
            {
              opacity: 0,
              y: 60,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
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
      id="services" 
      className="relative min-h-screen text-white py-32 px-6 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6 text-center"
        >
          Mis <span className="text-gradient-blue">Servicios</span>
        </h2>

        <p className="text-center text-gray-400 text-lg md:text-xl mb-20 max-w-2xl mx-auto">
          Transformo ideas en experiencias digitales memorables con las últimas tecnologías
        </p>

        {/* Grid de servicios */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Borde animado */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="16"
                  ry="16"
                  fill="none"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth="2"
                  strokeDasharray="1500"
                  className="animate-border-draw"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
                  }}
                />
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4facfe" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#00f2fe" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Icono */}
              <div className="relative z-10 text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Título */}
              <h3 className="relative z-10 text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>

              {/* Descripción */}
              <p className="relative z-10 text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {service.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Efecto de brillo */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
