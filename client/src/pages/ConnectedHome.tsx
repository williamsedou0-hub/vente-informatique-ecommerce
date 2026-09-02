import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Fond1 from "../assets/Fond1.jpg";
import Fond2 from "../assets/Fond2.jpg";
import Fond4 from "../assets/Fond4.jpg";
import Fond5 from "../assets/Fond5.jpg";

const products = [
  { image: Fond1, name: "Ordinateur portable", price: "899 €" },
  { image: Fond2, name: "Carte graphique", price: "349 €" },
  { image: Fond4, name: "Boîtier gaming", price: "119 €" },
  { image: Fond5, name: "SSD Samsung", price: "79 €" },
];

export default function ConnectedHome() {
  const { user, logout } = useAuth();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  return (
    <main className="connected-page">
      <header className="connected-header">
        <Link to="/accueil" className="site-brand">TGI<span>store</span></Link>
        <nav className="connected-nav" aria-label="Navigation de votre espace">
          <button type="button" className="icon-link" title="Mon compte" aria-label="Mon compte" aria-expanded={isAccountMenuOpen} onClick={() => setIsAccountMenuOpen((open) => !open)}><span className="account-icon" aria-hidden="true" /></button>
          <Link to="/panier" className="icon-link" title="Mon panier" aria-label="Mon panier"><span className="cart-icon" aria-hidden="true" /></Link>
          <Link to="/catalogue" className="catalogue-link">Catalogue</Link>
          {isAccountMenuOpen && <div className="account-menu"><Link to="/profile">Mon profil</Link><button type="button" className="logout-btn" onClick={logout}>Déconnexion</button></div>}
        </nav>
      </header>
      <section className="connected-hero">
        <img className="connected-hero-background" src={Fond1} alt="" aria-hidden="true" />
        <p className="home-kicker">Votre espace TGIstore</p>
        <h1>Bonjour, {user?.name || "client"}.</h1>
        <p>Retrouvez vos produits et composez votre prochaine configuration.</p>
        <Link to="/catalogue" className="home-btn home-btn-primary">Explorer le catalogue</Link>
      </section>
      <section className="connected-products" aria-labelledby="selection-title">
        <div className="section-heading">
          <div><p className="home-kicker">Sélection du moment</p><h2 id="selection-title">Les produits à découvrir</h2></div>
          <Link to="/catalogue">Tout le catalogue <span aria-hidden="true">→</span></Link>
        </div>
        <div className="connected-product-grid">
          {products.map((product) => <article className="connected-product" key={product.name}>
            <img src={product.image} alt={product.name} />
            <div><h3>{product.name}</h3><strong>{product.price}</strong></div>
            <button type="button" className="add-cart-btn" aria-label={`Ajouter ${product.name} au panier`}>+</button>
          </article>)}
        </div>
      </section>
    </main>
  );
}