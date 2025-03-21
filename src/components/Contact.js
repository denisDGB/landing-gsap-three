"use client";

import { useState } from "react";
import { API_URL } from "@/config"; // Importamos la URL del backend desde un archivo de configuración

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // ✅ Validación de Campos
    if (!formData.name || !formData.email || !formData.message) {
      setError("⚠️ Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    console.log("Enviando datos a:", `${API_URL}/api/contact`); // Debugging: Verificar si API_URL es correcta

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al enviar el mensaje");
      }

      setSuccess("✅ Mensaje enviado con éxito");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setError("⚠️ Error al conectar con el servidor");
    }

    setLoading(false);
  };

  return (
    <section className="contact-section h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-8">
      <h2 className="text-4xl font-semibold mb-6">Contáctame</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          name="name"
          placeholder="Tu Nombre"
          className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Tu Email"
          className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Tu Mensaje"
          className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 rounded-md text-lg font-semibold hover:bg-blue-600 transition disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
        {success && <p className="text-green-400 mt-4">{success}</p>}
      </form>
    </section>
  );
}

