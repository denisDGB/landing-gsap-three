"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
          toggleActions: "play none none reverse",
        },
      });

      // Animación del formulario e info
      gsap.from([formRef.current, infoRef.current], {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setError(t.contact.form.error || "Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    // 📧 IMPORTANTE: Reemplaza "YOUR_ACCESS_KEY_HERE" con tu API Key de Web3Forms
    // Obtén tu clave gratis en: https://web3forms.com/
    const accessKey = "f8a750dd-8d4d-44e1-a413-70209e597713";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          message: message,
          subject: `Nuevo mensaje de ${name} desde tu portfolio`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(t.contact.form.success || "¡Mensaje enviado con éxito! Te contactaré pronto 🚀");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else {
        setError(t.contact.form.errorSending || "Hubo un error al enviar el mensaje. Intenta nuevamente.");
      }
    } catch (error) {
      setError(t.contact.form.errorSending || "Hubo un error al enviar el mensaje. Intenta nuevamente.");
    }

    setLoading(false);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative text-white pt-32 pb-12 px-3 z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6 text-center"
        >
          {t.contact.title} <span className="text-gradient-blue">{t.contact.titleHighlight}</span>
        </h2>

        <p className="text-center text-gray-400 text-lg md:text-xl mb-20 max-w-2xl mx-auto">
          {t.contact.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Información de contacto */}
          <div ref={infoRef} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-8 flex flex-col h-full">
            <div className="space-y-6 flex-grow">
              <h3 className="text-2xl font-bold mb-6">{t.contact.info.title}</h3>
              
              {/* Email */}
              {/* 📧 MODIFICAR: Cambia "denis17.hnd@gmail.com" por tu email real en ambos lugares (href y texto) */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t.contact.info.email}</p>
                  <a href="mailto:denis17.hnd@gmail.com" className="text-lg font-semibold hover:text-blue-400 transition-colors">
                    denis17.hnd@gmail.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t.contact.info.linkedin}</p>
                  <a 
                    href="https://www.linkedin.com/in/denisgomezhn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:text-blue-400 transition-colors"
                  >
                    denisgomezhn
                  </a>
                </div>
              </div>

              {/* GitHub */}
              {/* 🐙 MODIFICAR: Cambia "tuusuario" por tu usuario de GitHub en ambos lugares (href y texto) */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t.contact.info.github}</p>
                  <a 
                    href="https://github.com/denisDGB" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:text-blue-400 transition-colors"
                  >
                    @denisDGB
                  </a>
                </div>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="border-t border-white/10 pt-6 mt-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <p className="font-semibold">{t.contact.info.available}</p>
              </div>
              <p className="text-gray-400 text-sm">
                {t.contact.info.responseTime}
              </p>
            </div>
          </div>

          {/* Formulario */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t.contact.form.namePlaceholder}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-white placeholder-gray-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t.contact.form.emailPlaceholder}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-white placeholder-gray-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                placeholder={t.contact.form.messagePlaceholder}
                rows="5"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-white placeholder-gray-500 resize-none"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full px-8 py-4 bg-white text-black rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                {loading ? (
                  t.contact.form.sending
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t.contact.form.submit}
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10">
          <p className="text-center text-gray-500 text-sm">
            {t.contact.footer}
          </p>
        </div>
    </section>
  );
}

