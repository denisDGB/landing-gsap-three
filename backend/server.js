const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");
const hpp = require("hpp");
const slowDown = require("express-slow-down");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

// 🌍 Mostrar variables cargadas
console.log("🔎 Variables de entorno cargadas:");
console.log("🌍 CORS_ORIGIN:", process.env.CORS_ORIGIN || "No definida");
console.log("📡 DATABASE_URL:", process.env.DATABASE_URL ? "Definida ✅" : "No definida ❌");

// ✅ CORS: definir orígenes permitidos
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:3000", "https://denis-dev.vercel.app"];

console.log("✅ Dominios permitidos en CORS:", allowedOrigins);

// ✅ CORS antes de todo
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Seguridad
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(expressSanitizer());

// ✅ Rendimiento y logging
app.use(compression());
app.use(morgan("combined"));

// ✅ Body parsers
app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Protección de tasa
app.use(slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "⚠️ Demasiadas solicitudes, intenta más tarde.",
}));

// ✅ Ruta raíz
app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando correctamente.");
});

// ✅ Ruta de contacto
app.post("/api/contact", async (req, res) => {
  try {
    let { name, email, message } = req.body;
    name = req.sanitize(name);
    email = req.sanitize(email);
    message = req.sanitize(message);

    if (!name || !email || !message) {
      return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios" });
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return res.status(400).json({ error: "⚠️ Email inválido" });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: "⚠️ El mensaje no puede exceder 500 caracteres" });
    }

    const newMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    return res.status(201).json({ success: true, message: "✅ Mensaje enviado con éxito" });

  } catch (error) {
    console.error("❌ Error en /api/contact:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

// ❌ Ruta 404
app.all("*", (req, res) => {
  return res.status(404).json({ error: "❌ Ruta no encontrada." });
});

// 🚀 Iniciar servidor
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado a la base de datos.");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error conectando a la base de datos:", err);
    process.exit(1);
  }
}

startServer();