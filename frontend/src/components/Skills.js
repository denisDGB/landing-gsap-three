"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiWordpress, SiNodedotjs, SiPython, 
  SiPhp, SiJavascript, SiMysql, SiPostgresql, SiMariadb,
  SiDocker, SiJenkins, SiVercel,
  SiGit, SiGithub, SiPostman,
  SiRemix, SiFigma
} from "react-icons/si";
import { FaDatabase, FaMobileAlt, FaSearch, FaPalette, FaCode, FaCube, FaTrain, FaServer, FaJava, FaMicrosoft } from "react-icons/fa";
import { VscCode, VscAzure } from "react-icons/vsc";
import { MdDesignServices } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const categoriesRef = useRef([]);

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

      // Animación de las categorías
      categoriesRef.current.forEach((category, index) => {
        if (category) {
          gsap.from(category, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: t.skills.categories.frontend,
      icon: "💻",
      skills: [
        { name: "React.js", Icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
        { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
        { name: "GSAP", Icon: FaCode, color: "#88CE02" },
        { name: "Three.js", Icon: FaCube, color: "#000000" },
        { name: "WordPress", Icon: SiWordpress, color: "#21759B" }
      ]
    },
    {
      title: t.skills.categories.backend,
      icon: "⚙️",
      skills: [
        { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
        { name: "Java", Icon: FaJava, color: "#007396" },
        { name: "Python", Icon: SiPython, color: "#3776AB" },
        { name: "PHP", Icon: SiPhp, color: "#777BB4" },
        { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
        { name: "REST APIs", Icon: FaDatabase, color: "#FF6C37" }
      ]
    },
    {
      title: t.skills.categories.databases,
      icon: "🗄️",
      skills: [
        { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
        { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
        { name: "MariaDB", Icon: SiMariadb, color: "#003545" },
        { name: "Azure SQL", Icon: VscAzure, color: "#0078D4" }
      ]
    },
    {
      title: t.skills.categories.cloud,
      icon: "☁️",
      skills: [
        { name: "Azure", Icon: VscAzure, color: "#0078D4" },
        { name: "Docker", Icon: SiDocker, color: "#2496ED" },
        { name: "Jenkins", Icon: SiJenkins, color: "#D24939" },
        { name: "Vercel", Icon: SiVercel, color: "#000000" },
        { name: "Railway", Icon: FaTrain, color: "#0B0D0E" },
        { name: "Proxmox", Icon: FaServer, color: "#E57000" }
      ]
    },
    {
      title: t.skills.categories.tools,
      icon: "🛠️",
      skills: [
        { name: "Git", Icon: SiGit, color: "#F05032" },
        { name: "GitHub", Icon: SiGithub, color: "#181717" },
        { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
        { name: "VS Code", Icon: VscCode, color: "#007ACC" },
        { name: "Visual Studio", Icon: FaMicrosoft, color: "#5C2D91" },
        { name: "Remix", Icon: SiRemix, color: "#000000" }
      ]
    },
    {
      title: t.skills.categories.design,
      icon: "🎨",
      skills: [
        { name: "UI/UX Design", Icon: MdDesignServices, color: "#FF61F6" },
        { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
        { name: "Adobe XD", Icon: FaPalette, color: "#FF61F6" },
        { name: "Responsive Design", Icon: FaMobileAlt, color: "#38BDF8" },
        { name: "SEO", Icon: FaSearch, color: "#4285F4" }
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center text-white py-32 px-6 z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Título */}
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6 text-center"
        >
          {t.skills.title} <span className="text-gradient-blue">{t.skills.titleHighlight}</span>
        </h2>

        <p className="text-center text-gray-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto">
          {t.skills.subtitle}
        </p>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              ref={el => categoriesRef.current[catIndex] = el}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
            >
              {/* Encabezado de categoría */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{category.icon}</span>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>

              {/* Lista de skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.Icon;
                  // Validar que el componente existe
                  if (!IconComponent) {
                    console.warn(`Icon not found for ${skill.name}`);
                    return null;
                  }
                  
                  // Detectar colores oscuros (luminosidad < 30%)
                  const isDarkColor = (color) => {
                    const hex = color.replace('#', '');
                    const r = parseInt(hex.substr(0, 2), 16);
                    const g = parseInt(hex.substr(2, 2), 16);
                    const b = parseInt(hex.substr(4, 2), 16);
                    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                    return luminance < 0.3;
                  };
                  
                  const textColor = isDarkColor(skill.color) ? '#FFFFFF' : skill.color;
                  
                  return (
                    <div
                      key={skillIndex}
                      className="group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2"
                      style={{
                        backgroundColor: `${skill.color}20`,
                        borderColor: `${skill.color}50`,
                        borderWidth: '1px',
                        color: textColor
                      }}
                    >
                      <IconComponent 
                        className="text-lg flex-shrink-0" 
                        style={{ 
                          color: textColor
                        }}
                      />
                      <span>{skill.name}</span>
                      
                      {/* Efecto hover */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          backgroundColor: `${skill.color}30`,
                          borderColor: `${skill.color}70`,
                          borderWidth: '1px'
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#projects"
            className="inline-block px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            {t.skills.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
