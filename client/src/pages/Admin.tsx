import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <main className="connected-page">
      <header className="connected-header">
        <Link to="/admin" className="site-brand">TGI<span>store</span></Link>
        <Link to="/accueil" className="catalogue-link">Accueil</Link>
      </header>
      <section className="connected-hero">
        <p className="home-kicker">Espace sécurisé</p>
        <h1>Bienvenue dans l’espace administrateur</h1>
        <p>Cette page est réservée à l’administration de TGIstore.</p>
      </section>
    </main>
  );
}
