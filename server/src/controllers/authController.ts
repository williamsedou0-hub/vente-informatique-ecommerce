import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { AuthRequest } from "../middleware/authMiddleware";

function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("La variable JWT_SECRET est manquante dans le fichier .env.");
  }
  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function publicUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: "user" | "admin";
}) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as Record<string, unknown>;

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ message: "Nom, email et mot de passe sont requis." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
    const token = generateToken(user.id);

    res.status(201).json({
      user: publicUser(user),
      token,
    });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as Record<string, unknown>;

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ message: "Email et mot de passe sont requis." });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      user: publicUser(user),
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export function getCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Utilisateur non authentifié." });
  }

  res.status(200).json({ user: publicUser(req.user) });
}
