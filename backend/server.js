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

// Habilitar compresión para mejorar el rendimiento
app.use(compression());

// Agregar logs de solicitudes para depuración y análisis de rendimiento
app.use(morgan("combined"));

// Configurar transporte Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Usar `true` para SSL, `false` para TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Seguridad HTTP
app.use(helmet());

// Protección contra XSS
app.use(xss());

// Protección contra inyección de parámetros HTTP
app.use(hpp());

// Protección contra ataques de fuerza bruta con ralentización
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutos
    delayAfter: 50, // Retrasa solicitudes después de 50 intentos
    delayMs: 500 // Retrasa cada solicitud en 500ms después del límite
});
app.use(speedLimiter);

// Sanitización de datos
app.use(expressSanitizer());

// Habilitar CORS correctamente
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://tuweb.vercel.app"],
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type"
}));

app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
    console.log(`📡 Nueva solicitud: ${req.method} ${req.url}`);
    next();
});

// Límite de tasa para evitar abuso (100 solicitudes por IP cada 15 min)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "⚠️ Demasiadas solicitudes desde esta IP, intenta más tarde.",
});
app.use(limiter);

// Ruta de prueba para verificar que el servidor está funcionando
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando correctamente.");
});

// Manejo de pre-flight requests de CORS
app.options("/api/contact", (req, res) => {
    res.sendStatus(200);
});

// Ruta para recibir mensajes del formulario y guardarlos en PostgreSQL
app.post("/api/contact", async (req, res) => {
    console.log("📩 Datos recibidos:", req.body); // 👈 Para ver si llegan los datos
    try {
        let { name, email, message } = req.body;

        // Sanitizar entradas
        name = req.sanitize(name);
        email = req.sanitize(email);
        message = req.sanitize(message);

        // Validaciones básicas
        if (!name || !email || !message) {
            console.log("⚠️ Error: Todos los campos son obligatorios");
            return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios" });
        }
        
        // Validación de email corregida
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(email)) {
            console.log("⚠️ Error: Email inválido");
            return res.status(400).json({ error: "⚠️ Email inválido" });
        }
        
        if (message.length > 500) {
            console.log("⚠️ Error: El mensaje no puede exceder 500 caracteres");
            return res.status(400).json({ error: "⚠️ El mensaje no puede exceder 500 caracteres" });
        }

        const newMessage = await prisma.contactMessage.create({
            data: { name, email, message },
        });

        console.log("✅ Mensaje guardado en la base de datos:", newMessage);

        // Enviar correo de notificación
        const mailOptions = {
            from: `Contacto Web <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: "Nuevo mensaje de contacto",
            text: `Has recibido un nuevo mensaje de contacto.\n\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("⚠️ Error al enviar el correo:", error);
            } else {
                console.log("✅ Correo enviado:", info.response);
            }
        });

        res.status(201).json({ success: true, message: "✅ Mensaje enviado con éxito", data: newMessage });
    } catch (error) {
        console.error("⚠️ Error en la API:", error);
        res.status(500).json({ error: "Error al enviar el mensaje" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
