const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");
const nodemailer = require("nodemailer");
const hpp = require("hpp");
const slowDown = require("express-slow-down");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();

// 🚀 Logs para verificar qué rutas está cargando Railway
console.log("✅ Cargando servidor Express...");
console.log(`🌐 Dominio permitido en CORS: ${process.env.CORS_ORIGIN || "No definido"}`);
console.log(`📡 Conectando a la base de datos: ${process.env.DATABASE_URL || "No definida"}`);

// 🔹 Middleware de seguridad y rendimiento
app.use(compression());
app.use(morgan("combined"));
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(expressSanitizer());

// 🔹 Protección contra ataques de fuerza bruta
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 50,
    delayMs: 500
});
app.use(speedLimiter);

// 🔹 Límite de solicitudes para evitar abuso
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "⚠️ Demasiadas solicitudes, intenta más tarde.",
});
app.use(limiter);

// ✅ **CORRECCIÓN: Configuración correcta de CORS**
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://denis-dev.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("❌ No permitido por CORS"));
        }
    },
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}));

// Habilitar JSON y formularios
app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

// ✅ **Habilitar Pre-flight requests para todas las rutas**
app.options("*", cors());

// ✅ **Ruta de prueba**
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando correctamente.");
});

// ✅ **Ruta para recibir mensajes del formulario**
app.post("/api/contact", async (req, res) => {
    console.log("📩 Datos recibidos en /api/contact:", req.body);

    try {
        let { name, email, message } = req.body;

        // Sanitizar entradas
        name = req.sanitize(name);
        email = req.sanitize(email);
        message = req.sanitize(message);

        // 🔹 Validaciones
        if (!name || !email || !message) {
            console.log("⚠️ Error: Campos obligatorios vacíos.");
            return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios" });
        }

        // 🔹 Validación de email
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(email)) {
            console.log("⚠️ Error: Email inválido.");
            return res.status(400).json({ error: "⚠️ Email inválido" });
        }

        if (message.length > 500) {
            console.log("⚠️ Error: Mensaje demasiado largo.");
            return res.status(400).json({ error: "⚠️ El mensaje no puede exceder 500 caracteres" });
        }

        // 🔹 Guardar mensaje en la base de datos
        const newMessage = await prisma.contactMessage.create({
            data: { name, email, message },
        });

        console.log("✅ Mensaje guardado en la base de datos:", newMessage);

        res.status(201).json({ success: true, message: "✅ Mensaje enviado con éxito" });

    } catch (error) {
        console.error("⚠️ Error en la API:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// ✅ **Capturar rutas inexistentes**
app.all("*", (req, res) => {
    console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
    res.status(404).json({ error: "❌ Ruta no encontrada en el backend." });
});

// 🔹 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
