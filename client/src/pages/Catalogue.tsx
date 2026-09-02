import { Link } from "react-router-dom";

export default function Catalogue() {
  return (
    <main className="connected-page">
      <header className="connected-header">
        <Link to="/accueil" className="site-brand">TGI<span>store</span></Link>
        <Link to="/panier" className="catalogue-link">Mon panier</Link>
      </header>
      <section className="connected-hero">
        <p className="home-kicker">TGIstore</p>
        <h1>Catalogue des produits</h1>
        <p>Découvrez notre sélection de matériel informatique.</p>
      </section>
    </main>
  );
}
