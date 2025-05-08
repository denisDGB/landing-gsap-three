const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const ADMIN_USER = process.env.ADMIN_EMAIL;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciales incorrectas" });
});

module.exports = router;