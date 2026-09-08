import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const { user, register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
    await register(name, email, password);
  }

  if (isAuthenticated) {
    return (
      <main className="auth-page auth-page--register">
        <section className="auth-card auth-card--message">
          <p className="auth-eyebrow">Session active</p>
          <h1>Vous êtes déjà connecté(e).</h1>
          <p className="auth-subtitle">Vous pouvez maintenant retourner sur la plateforme.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page auth-page--register">
      <section className="auth-card" aria-labelledby="register-title">
        <Link className="auth-brand" to="/">TGIstore</Link>
        <p className="auth-eyebrow">Commencez votre expérience</p>
        <h1 id="register-title">Créer un compte</h1>
        <p className="auth-subtitle">Rejoignez TGIstore et trouvez le matériel qu'il vous faut.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
          <label htmlFor="name">Nom</label>
          <input
            id="name"
            type="text"
            placeholder="Votre nom complet"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            placeholder="Au moins 6 caractères"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>

        <p className="auth-switch">
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </section>
    </main>
  );
}
