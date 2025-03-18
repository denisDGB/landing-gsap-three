"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado (aún no conectado a backend)");
  };

  return (
    <section className="contact-section h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-8">
      <h2 className="text-4xl font-semibold mb-6">Contáctame</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          name="name"
          placeholder="Tu Nombre"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Tu Email"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Tu Mensaje"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        />
        <button type="submit" className="px-6 py-3 bg-blue-500 rounded-md text-lg font-semibold hover:bg-blue-600 transition">
          Enviar
        </button>
      </form>
    </section>
  );
}
