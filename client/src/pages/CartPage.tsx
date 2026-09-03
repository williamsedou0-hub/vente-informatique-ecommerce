import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { DEMO_PRODUCTS } from "../data/products";
import ProductModal from "../components/ProductModal";
import type { Product } from "../types/cart";
import "./CartPage.css";

const STEPS = ["Panier", "Validation", "Payer", "Confirmation"];
const PAYMENT_METHODS = ["Carte Bancaire", "Visa", "Mastercard", "PayPal", "Orange Money", "Wave"];

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, addToCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<(Product & { description: string }) | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set(items.map((i) => i.product.id)));

  const cartProductIds = new Set(items.map((item) => item.product.id));
  const suggestions = DEMO_PRODUCTS.filter((p) => !cartProductIds.has(p.id));
  const allChecked = items.length > 0 && checkedIds.size === items.length;

  function toggleAll() {
    setCheckedIds(allChecked ? new Set() : new Set(items.map((i) => i.product.id)));
  }

  function toggleOne(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedTotal = items.filter((item) => checkedIds.has(item.product.id)).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const selectedCount = items.filter((item) => checkedIds.has(item.product.id)).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Panier</h1>

      <div className="cart-steps">
        {STEPS.map((step, i) => (
          <span key={step} className={i === 0 ? "cart-steps__active" : ""}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: i === 0 ? "linear-gradient(90deg,#3b9dff,#22d3ee)" : "#151d35",
                border: "1px solid #232c47",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                color: i === 0 ? "#fff" : "#8b95b3",
              }}
            >
              {i + 1}
            </span>
            {step}
            {i < STEPS.length - 1 && <span className="cart-steps__sep"></span>}
          </span>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty-layout">
          <div className="cart-empty">
            <svg className="cart-empty__svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10h6l6 32h30l6-22H18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="24" cy="52" r="3" strokeWidth="2" />
              <circle cx="42" cy="52" r="3" strokeWidth="2" />
            </svg>

            <h2>VOTRE PANIER EST VIDE</h2>
            <p>Ajoutez des articles pour commencer vos achats.</p>

            <div className="cart-empty__actions">
              <button type="button" className="cart-empty__btn cart-empty__btn--dark">Se connecter</button>
              <a href="#suggestions" className="cart-empty__btn cart-empty__btn--outline">Voir les articles</a>
            </div>
          </div>

          <div className="side-panels">
            <div className="why-panel">
              <h3>Pourquoi acheter chez TechStore ?</h3>
              <div className="why-item">
                <span className="why-item__icon">🛡</span>
                <div>
                  <p className="why-item__title">Produits de qualité</p>
                  <p className="why-item__desc">Des outils performants et durables</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-item__icon">🏷</span>
                <div>
                  <p className="why-item__title">Prix compétitifs</p>
                  <p className="why-item__desc">Les meilleurs prix du marché</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-item__icon">🚚</span>
                <div>
                  <p className="why-item__title">Livraison rapide à Dakar</p>
                  <p className="why-item__desc">Livraison offerte dès 50 000 FCFA</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-item__icon">🔒</span>
                <div>
                  <p className="why-item__title">Paiement sécurisé</p>
                  <p className="why-item__desc">Transactions 100% sécurisées</p>
                </div>
              </div>
            </div>

            <div className="help-panel">
              <span className="help-panel__icon">🎧</span>
              <p className="help-panel__title">Besoin d'aide ?</p>
              <p className="help-panel__desc">Notre équipe est là pour vous accompagner.</p>
              <button className="help-panel__btn">Nous contacter</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-items__header">
              <label className="cart-checkbox">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                Tous les articles ({totalItems})
              </label>
            </div>

            {items.map((item) => (
              <div key={item.product.id} className="cart-row">
                <input type="checkbox" className="cart-row__checkbox" checked={checkedIds.has(item.product.id)} onChange={() => toggleOne(item.product.id)} />
                <img src={item.product.image} alt={item.product.name} className="cart-row__image" />
                <div className="cart-row__info">
                  <p className="cart-row__name">{item.product.name}</p>
                  <p className="cart-row__unit-price">{item.product.price.toLocaleString()} FCFA / unité</p>
                  <div className="cart-row__bottom">
                    <label className="qty-select">
                      Qté :
                      <select value={item.quantity} onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}>
                        {Array.from({ length: Math.max(item.quantity, item.product.stock ?? 10) }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </label>
                    <div className="cart-row__icons">
                      <button type="button" className="icon-btn" aria-label="Ajouter aux favoris" title="Favoris">♡</button>
                      <button type="button" className="icon-btn" aria-label={`Retirer ${item.product.name} du panier`} title="Supprimer" onClick={() => removeFromCart(item.product.id)}>🗑</button>
                    </div>
                  </div>
                </div>
                <div className="cart-row__subtotal">{(item.product.price * item.quantity).toLocaleString()} FCFA</div>
              </div>
            ))}
          </div>

          <aside className="cart-summary-card">
            <h2>Résumé de votre commande</h2>
            <div className="cart-summary-card__row">
              <span>Sous-total</span>
              <span>{selectedTotal.toLocaleString()} FCFA</span>
            </div>
            <div className="cart-summary-card__row">
              <span>Livraison</span>
              <span>Offerte</span>
            </div>
            <div className="cart-summary-card__row cart-summary-card__row--total">
              <span>Total</span>
              <strong>{selectedTotal.toLocaleString()} FCFA</strong>
            </div>

            <button
              className="btn btn-primary cart-summary-card__cta"
              onClick={() => navigate("/checkout")}
              disabled={selectedCount === 0}
            >
              Passer au paiement ({selectedCount})
            </button>

            <p className="cart-summary-card__coupon-note">
              Appliquez un code promo à l'étape suivante.
            </p>

            <div className="cart-summary-card__payments">
              <p>Nous acceptons</p>
              <div className="payment-badges">
                {PAYMENT_METHODS.map((method) => (
                  <span key={method} className="payment-badge">{method}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {suggestions.length > 0 && (
        <section className="cart-suggestions" id="suggestions">
          <h2>Vous pourriez le remplir avec</h2>
          <div className="products-grid">
            {suggestions.map((product) => (
              <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-card__price">{product.price.toLocaleString()} FCFA</p>
                <button className="btn btn-secondary product-card__add" onClick={(e) => { e.stopPropagation(); addToCart(product, 1); setCheckedIds((prev) => new Set(prev).add(product.id)); }}>
                  Ajouter
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(product) => { addToCart(product, 1); setCheckedIds((prev) => new Set(prev).add(product.id)); }} />
    </div>
  );
}