"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  const services = [
    { 
      icon: "💻",
      title: t.services.service1.title, 
      description: t.services.service1.description,
      features: t.services.service1.features
    },
    { 
      icon: "⚙️",
      title: t.services.service2.title, 
      description: t.services.service2.description,
      features: t.services.service2.features
    },
    { 
      icon: "🗄️",
      title: t.services.service3.title, 
      description: t.services.service3.description,
      features: t.services.service3.features
    },
    { 
      icon: "☁️",
      title: t.services.service4.title, 
      description: t.services.service4.description,
      features: t.services.service4.features
    },
    { 
      icon: "🔌",
      title: t.services.service5.title, 
      description: t.services.service5.description,
      features: t.services.service5.features
    },
    { 
      icon: "🛠️",
      title: t.services.service6.title, 
      description: t.services.service6.description,
      features: t.services.service6.features
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
          {t.services.title} <span className="text-gradient-blue">{t.services.titleHighlight}</span>
        </h2>

        <p className="text-center text-gray-400 text-lg md:text-xl mb-20 max-w-2xl mx-auto">
          {t.services.subtitle}
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
