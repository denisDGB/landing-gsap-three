"use client"; // Necesario en App Router

import { useEffect } from "react";
import { gsap } from "gsap";

export default function Hero() {
  useEffect(() => {
    gsap.from(".title", { opacity: 0, y: 50, duration: 1 });
    gsap.from(".description", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from(".cta-button", { opacity: 0, scale: 0.8, duration: 0.5, delay: 1 });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center text-white">
      <h1 className="title text-5xl md:text-6xl font-bold">Bienvenido a mi Web Animada</h1>
      <p className="description text-lg mt-4 max-w-md">
        Explora y diviértete con las animaciones y efectos interactivos.
      </p>
      <button className="cta-button mt-6 px-6 py-3 bg-blue-500 rounded-md text-lg font-semibold hover:bg-blue-600 transition">
        Empezar
      </button>
    </div>
  );
}
