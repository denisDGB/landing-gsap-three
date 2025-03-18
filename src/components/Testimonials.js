"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Juan Pérez", feedback: "¡Increíble trabajo! Las animaciones son impresionantes." },
  { name: "María López", feedback: "Un profesional en diseño frontend con gran creatividad." },
  { name: "Carlos Gómez", feedback: "Excelente experiencia, las interacciones hacen que la web cobre vida." },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".testimonial-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
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
      className="testimonials-section bg-gray-900 text-white py-16"
    >
      <div className="container mx-auto px-8">
        <h2 className="text-center text-4xl font-semibold mb-12 text-blue-400 drop-shadow-lg">
          Testimonios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-blue-500 hover:border-indigo-500 hover:scale-105 hover:shadow-xl transition"
            >
              <p className="text-lg italic text-gray-300">"{testimonial.feedback}"</p>
              <h3 className="text-xl font-bold mt-4">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

