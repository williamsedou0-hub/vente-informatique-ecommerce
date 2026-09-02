import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user, login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const isAdmin = user?.role === "admin" || user?.email.toLowerCase() === "phares@gmail.com";
      navigate(isAdmin ? "/admin" : "/accueil", { replace: true });
    }
  }, [isAuthenticated, navigate, user?.role]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <main className="auth-page auth-page--login">
      <section className="auth-card" aria-labelledby="login-title">
        <Link className="auth-brand" to="/">TGIstore</Link>
        <p className="auth-eyebrow">Bon retour parmi nous</p>
        <h1 id="login-title">Connexion</h1>
        <p className="auth-subtitle">Accédez à votre espace en toute sécurité.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="nom@exemple.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

          <div className="auth-field">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="Votre mot de passe"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="auth-switch">
          Nouveau sur TGIstore ? <Link to="/register">Créer un compte</Link>
        </p>
      </section>
    </main>
  );
}
