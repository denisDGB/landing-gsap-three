"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, logout } from "@/lib/auth";

export default function DashboardPage() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) return router.push("/admin/login");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setMessages(data);
      });
  }, []);

  const handleDelete = async (id) => {
    const token = getToken();
    const confirmDelete = window.confirm("¿Eliminar este mensaje?");
    if (!confirmDelete) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } else {
      const data = await res.json();
      alert(data.error || "Error al eliminar");
    }
  };

  const filtered = messages.filter((m) =>
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ["Fecha", "Email", "Mensaje", "IP", "User-Agent"];
    const rows = messages.map((m) => [
      new Date(m.createdAt).toLocaleString(),
      m.email,
      m.message.replace(/\n/g, " "),
      m.ip || "",
      m.userAgent || "",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "mensajes_contacto.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📨 Mensajes de Contacto</h1>
        <button
          onClick={() => {
            logout();
            router.push("/admin/login");
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:opacity-90"
        >
          🚪 Cerrar sesión
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por email..."
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/2 shadow-sm focus:outline-none focus:ring focus:border-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={downloadCSV}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-sm"
        >
          📥 Exportar CSV
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">❌ {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-lg transition-all group"
          >
            <p className="text-xs text-gray-400 mb-1">
              🕒 {new Date(msg.createdAt).toLocaleString()}
            </p>
            <p className="text-sm font-semibold text-gray-700 mb-1">📧 {msg.email}</p>
            <p className="text-sm text-gray-800 whitespace-pre-wrap mb-3">
              📝 {msg.message}
            </p>
            <p className="text-xs text-gray-400">📍 IP: {msg.ip || "-"}</p>
            <p className="text-xs text-gray-400 mb-4">
              🧠 Navegador: {msg.userAgent?.slice(0, 60) || "-"}
            </p>
            <button
              onClick={() => handleDelete(msg.id)}
              className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded hover:bg-red-200 transition"
            >
              🗑️ Eliminar
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !error && (
        <p className="text-gray-500 mt-8 text-center text-sm">📭 No hay mensajes encontrados.</p>
      )}
    </div>
  );
}
