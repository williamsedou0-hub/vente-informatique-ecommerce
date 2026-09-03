import { useEffect, useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import type { Order } from "../types/cart";
import "./OrderConfirmationPage.css";

const PENDING_ORDER_KEY = "techstore_pending_order";

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const pending = sessionStorage.getItem(PENDING_ORDER_KEY);
    if (!pending) {
      setStatus("error");
      return;
    }

    const { items, shipping } = JSON.parse(pending);

    createOrder(items, shipping)
      .then((createdOrder) => {
        setOrder(createdOrder);
        setStatus("done");
        sessionStorage.removeItem(PENDING_ORDER_KEY);
        clearCart();
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (status === "error") {
    return <Navigate to="/" replace />;
  }

  if (status === "loading" || !order) {
    return (
      <div className="confirmation-page">
        <p>Vérification du paiement...</p>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-icon">✓</div>
      <h1>Merci pour votre commande !</h1>
      <p>
        Votre commande <strong>{order.id}</strong> a bien été payée et enregistrée.
      </p>

      <div className="confirmation-details">
        <div>
          <h2>Résumé</h2>
          <ul>
            {order.items.map((item) => (
              <li key={item.product.id}>
                <span>{item.product.name} × {item.quantity}</span>
                <span>{(item.product.price * item.quantity).toLocaleString()} FCFA</span>
              </li>
            ))}
          </ul>
          <div className="confirmation-total">
            <span>Total payé</span>
            <strong>{order.total.toLocaleString()} FCFA</strong>
          </div>
        </div>

        <div>
          <h2>Livraison</h2>
          <p>
            {order.shipping.fullName}<br />
            {order.shipping.address}<br />
            {order.shipping.city}, {order.shipping.postalCode}<br />
            {order.shipping.phone}
          </p>
        </div>
      </div>

      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}