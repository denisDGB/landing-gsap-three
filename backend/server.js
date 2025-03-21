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

// 🔹 Habilitar CORS para permitir el acceso solo desde los dominios permitidos
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://denis-dev.vercel.app"); // 🔹 Permitir Vercel
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true"); // 🔹 Necesario si usas autenticación
    next();
});

// 🔹 Habilitar JSON y formularios
app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Verificar que el servidor está funcionando
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando correctamente.");
});

// ✅ Habilitar Pre-flight requests para todas las rutas
app.options("*", (req, res) => {
    res.sendStatus(200);
});

// ✅ Ruta para recibir mensajes del formulario y guardarlos en PostgreSQL
app.post("/api/contact", async (req, res) => {
    console.log("📩 Datos recibidos en /api/contact:", req.body); // 📡 Debugging

    try {
        let { name, email, message } = req.body;

        // Sanitizar entradas
        name = req.sanitize(name);
        email = req.sanitize(email);
        message = req.sanitize(message);

        // 🔹 Validaciones básicas
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

        // 🔹 Enviar correo de notificación
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `Contacto Web <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: "Nuevo mensaje de contacto",
            text: `Has recibido un nuevo mensaje.\n\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("⚠️ Error al enviar el correo:", error);
            } else {
                console.log("✅ Correo enviado:", info.response);
            }
        });

        res.status(201).json({ success: true, message: "✅ Mensaje enviado con éxito" });

    } catch (error) {
        console.error("⚠️ Error en la API:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// ✅ 🔹 Capturar rutas inexistentes
app.all("*", (req, res) => {
    console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
    res.status(404).json({ error: "❌ Ruta no encontrada en el backend." });
});

// 🔹 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
