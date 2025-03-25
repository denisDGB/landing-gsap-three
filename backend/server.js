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
const adminRoutes = require("./routes/admin");
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
app.use("/api/admin", adminRoutes);

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
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS bloqueado: " + origin));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  credentials: true,
  optionsSuccessStatus: 200,
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

// ❌ Eliminar mensaje por ID
app.delete("/api/messages/:id", async (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Falta token" });

  try {
    const decoded = require("jsonwebtoken").verify(token, process.env.JWT_SECRET);
    const messageId = parseInt(req.params.id);

    const deleted = await prisma.contactMessage.delete({
      where: { id: messageId },
    });

    res.status(200).json({ success: true, deleted });
  } catch (err) {
    console.error("❌ Error al eliminar mensaje:", err);
    res.status(401).json({ error: "Token inválido o ID no encontrado" });
  }
});

// Añade al final de tu server.js, antes del 404
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Token inválido" });
  }
}

app.get("/api/messages", authMiddleware, async (req, res) => {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(messages);
});

const auth = require("./middleware/auth");

app.get("/api/messages", auth, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(messages);
  } catch (err) {
    console.error("❌ Error al obtener mensajes:", err);
    res.status(500).json({ error: "Error al obtener mensajes" });
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