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
require("dotenv").config(); // Cargar variables de entorno

// ✅ **Verificar que las variables de entorno se están cargando**
console.log("🔎 Variables de entorno cargadas:");
console.log("🌍 CORS_ORIGIN:", process.env.CORS_ORIGIN || "No definida");
console.log("📡 DATABASE_URL:", process.env.DATABASE_URL || "No definida");

const prisma = new PrismaClient();
const app = express();

// 🚀 **Middleware de seguridad y rendimiento**
app.use(compression());
app.use(morgan("combined"));
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(expressSanitizer());

// 🔹 **Protección contra ataques de fuerza bruta**
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 50,
    delayMs: 500,
});
app.use(speedLimiter);

// 🔹 **Límite de solicitudes**
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "⚠️ Demasiadas solicitudes, intenta más tarde.",
});
app.use(limiter);

// ✅ **Configuración de CORS**
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [
    "http://localhost:3000",
    "https://denis-dev.vercel.app",
    "https://landing-gsap-three-production-2c76.up.railway.app"
];

console.log("✅ Dominios permitidos en CORS:", allowedOrigins);

app.use(cors({
    origin: allowedOrigins, // <- Permitir múltiples orígenes directamente
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}));

// 🔹 **Habilitar JSON y formularios**
app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

// ✅ **Habilitar Pre-flight requests correctamente**
app.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigins.join(","));
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

// ✅ **Ruta de prueba para verificar el backend**
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando correctamente.");
});

// ✅ **Ruta de contacto**
app.post("/api/contact", async (req, res) => {
    console.log("📩 Datos recibidos en /api/contact:", req.body);

    try {
        let { name, email, message } = req.body;

        // **Sanitizar entradas**
        name = req.sanitize(name);
        email = req.sanitize(email);
        message = req.sanitize(message);

        // 🔹 **Validaciones**
        if (!name || !email || !message) {
            console.log("⚠️ Error: Campos obligatorios vacíos.");
            return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios" });
        }

        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(email)) {
            console.log("⚠️ Error: Email inválido.");
            return res.status(400).json({ error: "⚠️ Email inválido" });
        }

        if (message.length > 500) {
            console.log("⚠️ Error: Mensaje demasiado largo.");
            return res.status(400).json({ error: "⚠️ El mensaje no puede exceder 500 caracteres" });
        }

        // 🔹 **Guardar mensaje en la base de datos**
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

// ✅ **Verificar conexión a la base de datos antes de iniciar**
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
