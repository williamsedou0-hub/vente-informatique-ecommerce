import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import type { ShippingInfo } from "../types/cart";
import "./CheckoutPage.css";

const EMPTY_SHIPPING: ShippingInfo = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
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
      const order = await createOrder(items, shipping);
      clearCart();
      navigate("/confirmation", { state: { order } });
    } catch (err) {
      setError("Une erreur est survenue lors de la commande. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="checkout-page">
      <h1>Finaliser la commande</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Adresse de livraison</h2>

          <label>
            Nom complet
            <input required value={shipping.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
          </label>

          <label>
            Email
            <input required type="email" value={shipping.email} onChange={(e) => handleChange("email", e.target.value)} />
          </label>

          <label>
            Téléphone
            <input required value={shipping.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          </label>

          <label>
            Adresse
            <input required value={shipping.address} onChange={(e) => handleChange("address", e.target.value)} />
          </label>

          <div className="checkout-form__row">
            <label>
              Ville
              <input required value={shipping.city} onChange={(e) => handleChange("city", e.target.value)} />
            </label>
            <label>
              Code postal
              <input required value={shipping.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} />
            </label>
          </div>

          <h2>Paiement</h2>
          <div className="checkout-form__payment">
            <label>
              <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
              Carte bancaire
            </label>
            <label>
              <input type="radio" name="payment" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />
              PayPal
            </label>
          </div>
          <p className="checkout-form__payment-note">
            Simulation de paiement — aucun montant réel n'est débité pour le moment.
          </p>

          {error && <p className="checkout-form__error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Traitement en cours..." : "Confirmer la commande"}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Récapitulatif</h2>
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
      </div>
    </div>
  );
}