import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { DEMO_PRODUCTS } from "../data/products";
import "./ProductsPage.css";

export default function ProductsPage() {
  const { addToCart, totalItems } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  function handleAdd(productId: string) {
    const product = DEMO_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    addToCart(product, 1);
    setJustAdded(productId);
    setTimeout(() => setJustAdded(null), 1200);
  }

  return (
    <div className="products-page">
      <div className="products-page__header">
        <h1>Outils informatiques</h1>
        <Link to="/cart" className="products-page__cart-link">
          🛒 Panier ({totalItems})
        </Link>
      </div>

      <div className="products-grid">
        {DEMO_PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="product-card__price">{product.price.toLocaleString()} FCFA</p>
            <button className="btn btn-primary product-card__add" onClick={() => handleAdd(product.id)}>
              {justAdded === product.id ? "Ajouté ✓" : "Ajouter au panier"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}