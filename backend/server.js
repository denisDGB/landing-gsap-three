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

// 🟡 Limpiar comillas y generar lista de orígenes permitidos
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .replace(/['"]/g, "") // eliminar comillas dobles o simples
  .split(",")
  .map(origin => origin.trim());

console.log("🌍 CORS_ORIGIN permitidos:", allowedOrigins);

// 🔐 Middleware de seguridad
app.use(compression());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(expressSanitizer());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 🚀 Rate limiter y slowdown
app.use(slowDown({ windowMs: 15 * 60 * 1000, delayAfter: 50, delayMs: 500 }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "⚠️ Demasiadas solicitudes, intenta más tarde.",
}));

// ✅ Configurar CORS correctamente
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("⛔ Origin bloqueado:", origin);
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// 🧪 Ruta test
app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando correctamente desde Railway");
});

// 📩 Ruta de contacto
app.post("/api/contact", async (req, res) => {
  try {
    let { name, email, message } = req.body;
    name = req.sanitize(name);
    email = req.sanitize(email);
    message = req.sanitize(message);

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: "Mensaje demasiado largo" });
    }

    const newMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    console.log("📨 Mensaje guardado:", newMessage);
    res.status(201).json({ success: true, message: "Mensaje enviado con éxito ✅" });
  } catch (err) {
    console.error("❌ Error en /api/contact:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ❌ Rutas no encontradas
app.all("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// 🔥 Iniciar servidor
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado a la base de datos");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar DB:", error);
    process.exit(1);
  }
}

startServer();

