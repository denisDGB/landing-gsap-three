const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔐 Ruta para login de administrador
router.post("/auth", (req, res) => {
  const { user, pass } = req.body;

  if (!user || !pass) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    const token = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciales inválidas" });
});

module.exports = router;
