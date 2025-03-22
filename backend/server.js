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

// 🌍 Logs de entorno
console.log("🔎 CORS_ORIGIN:", process.env.CORS_ORIGIN);
console.log("📡 DATABASE_URL:", process.env.DATABASE_URL ? "OK ✅" : "Falta ❌");

const app = express();
const prisma = new PrismaClient();

// 🔐 Seguridad y rendimiento
app.use(compression());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(expressSanitizer());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 🕓 Rate limiter
app.use(slowDown({ windowMs: 15 * 60 * 1000, delayAfter: 50, delayMs: 500 }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "⚠️ Muchas solicitudes. Intenta más tarde."
}));

// 🌐 CORS — permitir Vercel
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .replace(/['"]+/g, "")
  .split(",");

console.log("✅ allowedOrigins:", allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS bloqueado para:", origin);
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// 🧪 Ruta base
app.get("/", (req, res) => {
  res.send("🚀 Servidor corriendo correctamente.");
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

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: "Mensaje muy largo" });
    }

    const nuevo = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    console.log("📨 Mensaje guardado:", nuevo);
    res.status(201).json({ success: true, message: "Mensaje enviado con éxito ✅" });
  } catch (error) {
    console.error("❌ Error en /api/contact:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// 404
app.all("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada ❌" });
});

// 🔥 Iniciar servidor
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado a PostgreSQL con Prisma");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error conectando a DB:", err);
    process.exit(1);
  }
}

startServer();

