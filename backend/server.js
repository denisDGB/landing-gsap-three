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

console.log("🔎 Variables de entorno cargadas:");
console.log("🌍 CORS_ORIGIN:", process.env.CORS_ORIGIN || "No definida");
console.log("📡 DATABASE_URL:", process.env.DATABASE_URL ? "Definida ✅" : "No definida ❌");

const prisma = new PrismaClient();
const app = express();

// ✅ Lista de dominios permitidos para CORS
const allowedOrigins = [
  "https://denis-dev.vercel.app",
  "http://localhost:3000",
];

// ✅ Configuración dinámica de CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

// ✅ Respuesta al preflight
app.options("*", cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}), (req, res) => {
  res.sendStatus(200);
});

// 🚀 Middlewares de seguridad y rendimiento
app.use(compression());
app.use(morgan("combined"));
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(expressSanitizer());

app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
});
app.use(speedLimiter);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "⚠️ Demasiadas solicitudes, intenta más tarde.",
});
app.use(limiter);

// 🔹 Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando correctamente.");
});

// 📩 Ruta de contacto
app.post("/api/contact", async (req, res) => {
  console.log("📩 Datos recibidos en /api/contact:", req.body);

  try {
    let { name, email, message } = req.body;

    name = req.sanitize(name);
    email = req.sanitize(email);
    message = req.sanitize(message);

    if (!name || !email || !message) {
      console.log("⚠️ Campos vacíos.");
      return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios" });
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      console.log("⚠️ Email inválido.");
      return res.status(400).json({ error: "⚠️ Email inválido" });
    }

    if (message.length > 500) {
      console.log("⚠️ Mensaje muy largo.");
      return res.status(400).json({ error: "⚠️ El mensaje no puede exceder 500 caracteres" });
    }

    const newMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    console.log("✅ Mensaje guardado:", newMessage);
    res.status(201).json({ success: true, message: "✅ Mensaje enviado con éxito" });

  } catch (error) {
    console.error("⚠️ Error en /api/contact:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ❌ Ruta no encontrada
app.all("*", (req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: "❌ Ruta no encontrada en el backend." });
});

// 🚀 Iniciar servidor
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado a la base de datos correctamente.");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
    process.exit(1);
  }
}

startServer();
