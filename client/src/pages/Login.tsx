import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login, loading, error, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  if (isAuthenticated) {
    return (
      <main className="auth-page auth-page--login">
        <section className="auth-card auth-card--message">
          <p className="auth-eyebrow">Session active</p>
          <h1>Vous êtes déjà connecté(e).</h1>
          <p className="auth-subtitle">Vous pouvez maintenant retourner sur la plateforme.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page auth-page--login">
      <section className="auth-card" aria-labelledby="login-title">
        <Link className="auth-brand" to="/">NOVA<span>TECH</span></Link>
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
          Nouveau sur NovaTech ? <Link to="/register">Créer un compte</Link>
        </p>
      </section>
    </main>
  );
}
