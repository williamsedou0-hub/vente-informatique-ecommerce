import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { DEMO_PRODUCTS } from "../data/products";
import ProductModal from "../components/ProductModal";
import type { Product } from "../types/cart";
import "./ShopPage.css";

export default function ShopPage() {
  const { items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<(Product & { description: string }) | null>(null);

  const cartProductIds = new Set(items.map((item) => item.product.id));
  const suggestions = DEMO_PRODUCTS.filter((p) => !cartProductIds.has(p.id));

  return (
    <div className="shop-page">
      <div className="shop-layout">
        <div className="shop-catalog">
          <h1>Outils informatiques</h1>
          <div className="products-grid">
            {DEMO_PRODUCTS.map((product) => (
              <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-card__price">{product.price.toLocaleString()} FCFA</p>
                <button
                  className="btn btn-primary product-card__add"
                  onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }}
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="shop-cart">
          <h2>Panier ({totalItems})</h2>

          {items.length === 0 ? (
            <p className="shop-cart__empty">Votre panier est vide. Cliquez sur un article pour l'ajouter.</p>
          ) : (
            <>
              <div className="shop-cart__items">
                {items.map((item) => (
                  <div key={item.product.id} className="shop-cart-row">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="shop-cart-row__info">
                      <p className="shop-cart-row__name">{item.product.name}</p>
                      <div className="qty-stepper qty-stepper--small">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Diminuer">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Augmenter">+</button>
                      </div>
                    </div>
                    <div className="shop-cart-row__right">
                      <span className="shop-cart-row__price">
                        {(item.product.price * item.quantity).toLocaleString()} FCFA
                      </span>
                      <button className="shop-cart-row__remove" onClick={() => removeFromCart(item.product.id)} aria-label={`Retirer ${item.product.name}`}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shop-cart__total">
                <span>Total</span>
                <strong>{totalPrice.toLocaleString()} FCFA</strong>
              </div>

              <button className="btn btn-primary shop-cart__checkout" onClick={() => navigate("/checkout")}>
                Passer au paiement
              </button>
            </>
          )}
        </aside>
      </div>

      {suggestions.length > 0 && (
        <section className="shop-suggestions">
          <h2>Vous pourriez le remplir avec</h2>
          <div className="products-grid">
            {suggestions.slice(0, 4).map((product) => (
              <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-card__price">{product.price.toLocaleString()} FCFA</p>
                <button
                  className="btn btn-secondary product-card__add"
                  onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }}
                >
                  Ajouter
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product) => addToCart(product, 1)}
      />
    </div>
  );
}