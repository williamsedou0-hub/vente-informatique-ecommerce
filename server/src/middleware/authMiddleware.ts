import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { IUser } from "../models/User";
import User from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}

export async function protect(req: AuthRequest, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token d'authentification manquant." });
  }

  const token = authorization.slice(7);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: "Configuration JWT manquante." });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    if (typeof decoded.id !== "string") {
      return res.status(401).json({ message: "Token d'authentification invalide." });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable." });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Token d'authentification invalide ou expiré." });
  }
}

export function authorize(...roles: Array<IUser["role"]>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès non autorisé." });
    }

    next();
  };
}
