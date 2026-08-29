import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { loginUser, registerUser } from "../services/authService";

export function useAuth() {
  const { user, token, login: setAuthData, logout: clearAuthData } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser({ email, password });
      setAuthData(data.user, data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser({ name, email, password });
      setAuthData(data.user, data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearAuthData();
  }

  return {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
  };
}
