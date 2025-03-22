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

console.log("🌍 CORS_ORIGIN:", process.env.CORS_ORIGIN);
console.log("📡 DATABASE_URL:", process.env.DATABASE_URL ? "✅ OK" : "❌ FALTA");

const app = express();
const prisma = new PrismaClient();

// 🔐 Seguridad y rendimiento
app.use(compression());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(expressSanitizer());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🛡️ Rate limit
app.use(slowDown({ windowMs: 15 * 60 * 1000, delayAfter: 50, delayMs: 500 }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ✅ Dominios permitidos (limpia comillas y espacios)
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(origin => origin.trim().replace(/^"|"$/g, ""));

console.log("✅ Dominios permitidos:", allowedOrigins);

// ✅ CORS dinámico
const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌐 Solicitud desde:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      console.log("✅ CORS permitido:", origin);
      callback(null, true);
    } else {
      console.warn("❌ CORS bloqueado:", origin);
      callback(new Error("CORS bloqueado: " + origin));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// 🚀 Ruta base
app.get("/", (req, res) => {
  res.send("🚀 API activa en Railway");
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
      return res.status(400).json({ error: "Mensaje demasiado largo (máx 500)" });
    }

    const saved = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    console.log("📩 Guardado:", saved);
    res.status(201).json({ success: true, message: "Mensaje enviado con éxito" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// 404
app.all("*", (req, res) => {
  res.status(404).json({ error: "❌ Ruta no encontrada" });
});

// 🟢 Start server
async function start() {
  try {
    await prisma.$connect();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al conectar DB:", err);
    process.exit(1);
  }
}

start();
