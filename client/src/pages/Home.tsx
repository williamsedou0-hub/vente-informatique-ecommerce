import { Link } from "react-router-dom";
import Fond1 from "../assets/Fond1.jpg";
import Fond2 from "../assets/Fond2.jpg";
import Fond4 from "../assets/Fond4.jpg";
import Fond5 from "../assets/Fond5.jpg";
import "../App.css";

const products = [
  { image: Fond1, name: "Ordinateur portable", category: "Ordinateurs" },
  { image: Fond2, name: "Carte graphique", category: "Composants" },
  { image: Fond4, name: "Boîtier gaming", category: "Configurations" },
  { image: Fond5, name: "SSD Samsung", category: "Stockage" },
];

export default function Home() {
  return (
    <main className="home-page">
      <header className="public-header">
        <Link to="/" className="site-brand">TGI<span>store</span></Link>
        <nav className="public-nav" aria-label="Navigation principale">
          <Link to="/login">Se connecter</Link>
          <Link to="/register" className="nav-cta">Créer un compte</Link>
        </nav>
      </header>
      <section className="home-hero">
        <img className="home-brand-image" src={Fond1} alt="Ordinateur portable" />
        <div className="home-hero-content">
          <p className="home-kicker">Matériel informatique sélectionné</p>
          <h1 className="home-hero-title">Bienvenue sur TGIstore</h1>
          <p className="home-hero-subtitle">
            La meilleure sélection de matériel informatique à portée de main.
          </p>
          <div className="home-actions">
            <Link to="/register" className="home-btn home-btn-primary">Découvrir la boutique</Link>
            <Link to="/login" className="home-btn home-btn-secondary">Déjà client ?</Link>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-features-content">
          <h2>Pourquoi choisir TGIstore</h2>
          <div className="home-features-grid">
            <article className="home-feature-card">
              <div className="home-feature-icon">🔒</div>
              <h3>Sécurité garantie</h3>
              <p>Vos données et vos transactions sont protégées avec les meilleurs standards de sécurité.</p>
            </article>
            <article className="home-feature-card">
              <div className="home-feature-icon">⚡</div>
              <h3>Performance</h3>
              <p>Une plateforme ultra-rapide et réactive pour une expérience utilisateur exceptionnelle.</p>
            </article>
            <article className="home-feature-card">
              <div className="home-feature-icon">🎯</div>
              <h3>Simplicité d'usage</h3>
              <p>Une interface intuitive et facile à naviguer pour tous les niveaux d'utilisateurs.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-products">
        <div className="home-products-content">
          <h2>Nos catégories populaires</h2>
          <div className="home-products-grid">
            {products.map((product) => (
              <article className="home-product-card" key={product.name}>
                <img src={product.image} alt={product.name} />
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>
                <Link to="/register">Voir le produit <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
