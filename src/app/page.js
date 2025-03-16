"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import Background3D from "@/components/Background3D";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.from(".scroll-section", {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="relative w-full">
      <Background3D />
      <Hero />
      <div className="scroll-section h-screen flex items-center justify-center bg-gray-900 text-white">
        <h2 className="text-4xl font-semibold">Este texto aparece al hacer scroll</h2>
      </div>
    </div>
  );
}
