import { Link, useLocation, Navigate } from "react-router-dom";
import type { Order } from "../types/cart";
import "./OrderConfirmationPage.css";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const order = (location.state as { order?: Order } | null)?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-icon">✓</div>
      <h1>Merci pour votre commande !</h1>
      <p>
        Votre commande <strong>{order.id}</strong> a bien été enregistrée.
      </p>

      <div className="confirmation-details">
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

        <h2>Livraison</h2>
        <p>
          {order.shipping.fullName}<br />
          {order.shipping.address}<br />
          {order.shipping.city}, {order.shipping.postalCode}<br />
          {order.shipping.phone}
        </p>
      </div>

      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}