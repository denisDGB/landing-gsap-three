"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Background3D from "@/components/Background3D";

gsap.registerPlugin(ScrollTrigger);

console.log("API URL desde el servidor:", process.env.NEXT_PUBLIC_API_URL);

export default function Home() {
  return (
    <div className="relative w-full">
      <Background3D /> {/* 🔥 Aseguramos que el fondo se carga antes que el contenido */}
      <Hero />
      <About />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
      <p className="text-center text-white mt-4">API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
    </div>
  );
}

