import type { CartItem } from "../types/cart";

const API_URL = "http://localhost:5000/api/payment";

export async function createCheckoutSession(items: CartItem[]): Promise<string> {
  const payload = {
    items: items.map((item) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    })),
  };

  const response = await fetch(`${API_URL}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création de la session de paiement.");
  }

  const data = await response.json();
  return data.url;
}