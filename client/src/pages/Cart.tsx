import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <main className="connected-page">
      <header className="connected-header">
        <Link to="/accueil" className="site-brand">TGI<span>store</span></Link>
        <Link to="/catalogue" className="catalogue-link">Catalogue</Link>
      </header>
      <section className="connected-hero">
        <p className="home-kicker">TGIstore</p>
        <h1>Votre panier</h1>
        <p>Votre panier est actuellement vide.</p>
        <Link to="/catalogue" className="home-btn home-btn-primary">Voir le catalogue</Link>
      </section>
    </main>
  );
}
