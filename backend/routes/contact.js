const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Ruta para recibir mensajes de contacto
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const newMessage = await prisma.contactMessage.create({
            data: { name, email, message },
        });

        res.status(201).json({ success: true, message: 'Mensaje enviado con éxito', data: newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});

module.exports = router;
