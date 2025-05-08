"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      router.push("/admin/dashboard");
    } else {
      setError(data.error || "Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 text-white p-8 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">🔐 Panel Admin</h1>

        <input
          type="text"
          placeholder="Usuario"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">❌ {error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
