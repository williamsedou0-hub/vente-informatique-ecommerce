import { type FormEvent, useState } from "react";
import { useCart } from "../context/CartContext";
import { createCheckoutSession } from "../services/paymentService";
import type { ShippingInfo } from "../types/cart";
import "./CheckoutPage.css";

const EMPTY_SHIPPING: ShippingInfo = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

const PENDING_ORDER_KEY = "techstore_pending_order";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof ShippingInfo, value: string) {
    setShipping((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    setIsSubmitting(true);
    try {
      // On sauvegarde les infos de commande AVANT de partir sur Stripe,
      // pour pouvoir créer la commande au retour une fois le paiement confirmé.
      sessionStorage.setItem(
        PENDING_ORDER_KEY,
        JSON.stringify({ items, shipping })
      );

      const url = await createCheckoutSession(items);
      window.location.href = url; // redirection vers la vraie page Stripe
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion au paiement. Réessayez.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="checkout-page">
      <h1>Finaliser la commande</h1>

      <div className="checkout-layout">
        <aside className="checkout-summary">
          <h2>Récapitulatif de la commande</h2>
          <ul>
            {items.map((item) => (
              <li key={item.product.id}>
                <span>{item.product.name} × {item.quantity}</span>
                <span>{(item.product.price * item.quantity).toLocaleString()} FCFA</span>
              </li>
            ))}
          </ul>
          <div className="checkout-summary__total">
            <span>Total</span>
            <strong>{totalPrice.toLocaleString()} FCFA</strong>
          </div>
        </aside>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Adresse de livraison</h2>

          <label>
            Nom complet
            <input required value={shipping.fullName} onChange={(e) => handleChange("fullName", e.target.value)} disabled={isSubmitting} />
          </label>

          <label>
            Téléphone
            <input required value={shipping.phone} onChange={(e) => handleChange("phone", e.target.value)} disabled={isSubmitting} />
          </label>

          <label>
            Adresse
            <input required value={shipping.address} onChange={(e) => handleChange("address", e.target.value)} disabled={isSubmitting} />
          </label>

          <div className="checkout-form__row">
            <label>
              Ville
              <input required value={shipping.city} onChange={(e) => handleChange("city", e.target.value)} disabled={isSubmitting} />
            </label>
            <label>
              Code postal
              <input required value={shipping.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} disabled={isSubmitting} />
            </label>
          </div>

          <p className="checkout-form__payment-note">
            🔒 Vous allez être redirigé vers Stripe (paiement sécurisé, mode test).
          </p>

          {error && <p className="checkout-form__error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Redirection en cours..." : "Payer avec Stripe"}
          </button>
        </form>
      </div>
    </div>
  );
}