import type { Product } from "../types/cart";
import "./ProductModal.css";

interface ProductModalProps {
  product: (Product & { description: string }) | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="product-modal__backdrop" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal__close" onClick={onClose} aria-label="Fermer">✕</button>

        <div className="product-modal__image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-modal__info">
          <h2>{product.name}</h2>
          <p className="product-modal__price">{product.price.toLocaleString()} FCFA</p>
          <p className="product-modal__description">{product.description}</p>
          {product.stock !== undefined && (
            <p className="product-modal__stock">
              {product.stock > 0 ? `${product.stock} en stock` : "Rupture de stock"}
            </p>
          )}
          <button
            className="btn btn-primary product-modal__add"
            onClick={() => { onAddToCart(product); onClose(); }}
            disabled={product.stock === 0}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}