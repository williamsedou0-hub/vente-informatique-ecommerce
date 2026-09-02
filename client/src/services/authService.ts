import type { AuthUser } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/auth";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}

async function getErrorMessage(response: Response, fallback: string): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data: unknown = await response.json();
    if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") {
      return data.message;
    }
  }

  return fallback;
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Impossible de joindre le serveur. Démarrez l'API avec npm run dev dans le dossier server.");
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Erreur lors de l'inscription"));
  }

  return response.json();
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Impossible de joindre le serveur. Démarrez l'API avec npm run dev dans le dossier server.");
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Erreur lors de la connexion"));
  }

  return response.json();
}
