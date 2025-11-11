"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLanguage } from "../contexts/LanguageContext";

gsap.registerPlugin(ScrollToPlugin);

export default function ScrollToTop() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando el usuario haga scroll más de 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const button = document.getElementById("scroll-to-top");
    
    if (isVisible && button) {
      gsap.to(button, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    } else if (button) {
      gsap.to(button, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 0,
      scrollTo: 0,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    const button = document.getElementById("scroll-to-top");
    gsap.to(button, {
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const button = document.getElementById("scroll-to-top");
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <button
      id="scroll-to-top"
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center group opacity-0"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
      aria-label={t.scrollToTop}
    >
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icono de flecha */}
      <svg 
        className="w-5 h-5 relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-300" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>

      {/* Anillo animado */}
      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20"></div>
    </button>
  );
}

