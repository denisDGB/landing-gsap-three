const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acceso denegado. Token faltante o inválido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Opcional: puede ser útil si quieres usar datos del usuario autenticado
    next();
  } catch (err) {
    console.error("❌ Token inválido:", err.message);
    res.status(401).json({ error: "Token inválido o expirado." });
  }
};
