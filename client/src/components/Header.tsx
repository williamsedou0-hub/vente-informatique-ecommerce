import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="promo-bar">
        🚚 Livraison offerte dès <strong>50 000 FCFA</strong> d'achat — partout à Dakar
      </div>
      <header className="site-header">
        <div className="site-header__left">
          <span className="site-header__logo">💻 TgiStore</span>
          <span className="site-header__delivery">📍 Livraison à Dakar ⌄</span>
        </div>
        <nav className="site-header__nav">
          <a href="/">Accueil</a>
          <a href="/">Boutique</a>
          <a href="/">Catégories</a>
          <a href="/">Promotions</a>
          <a href="/">Contact</a>
        </nav>
        <div className="site-header__right">
          <button className="icon-circle" aria-label="Rechercher">🔍</button>
          <button className="icon-circle" aria-label="Compte">👤</button>
          <button className="icon-circle" aria-label="Panier">🛒</button>
          <span className="secure-badge">🛡 Paiement fiable</span>
        </div>
      </header>
    </>
  );
}