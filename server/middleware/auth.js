const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Vérifie que la requête contient un token JWT valide
async function protect(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }

      if (req.user.status === "bloque") {
        return res.status(403).json({ message: "Compte bloqué" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalide ou expiré" });
    }
  }

  return res.status(401).json({ message: "Non autorisé, aucun token fourni" });
}

// Vérifie que l'utilisateur authentifié a le rôle admin
// À utiliser TOUJOURS après `protect`
function adminOnly(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Accès réservé aux administrateurs" });
}

module.exports = { protect, adminOnly };