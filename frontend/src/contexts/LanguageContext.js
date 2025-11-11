"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";

const LanguageContext = createContext();

// Función para detectar el idioma del navegador/región del usuario
const detectBrowserLanguage = () => {
  if (typeof window === "undefined") return "es"; // Default para SSR
  
  // Obtener el idioma del navegador
  const browserLang = navigator.language || navigator.userLanguage;
  
  // Detectar si es español
  // Incluye: es, es-ES (España), es-MX (México), es-HN (Honduras), 
  // es-AR (Argentina), es-CO (Colombia), etc.
  if (browserLang.startsWith("es")) {
    return "es";
  }
  
  // Detectar si es inglés
  // Incluye: en, en-US (Estados Unidos), en-GB (Reino Unido), 
  // en-CA (Canadá), en-AU (Australia), etc.
  if (browserLang.startsWith("en")) {
    return "en";
  }
  
  // Por defecto, español (ya que el portfolio es de Honduras)
  return "es";
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("es");

  // Detectar idioma automáticamente o cargar preferencia guardada
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      // Si el usuario ya eligió un idioma manualmente, respetarlo
      setLanguage(savedLanguage);
    } else {
      // Si es la primera vez, detectar automáticamente basado en región
      const detectedLanguage = detectBrowserLanguage();
      setLanguage(detectedLanguage);
      localStorage.setItem("language", detectedLanguage);
    }
  }, []);

  // Guardar idioma en localStorage cuando cambie manualmente
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

