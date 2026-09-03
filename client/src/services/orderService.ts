import type { CartItem, Order, ShippingInfo } from "../types/cart";

const API_URL = "http://localhost:5000/api/orders";

export async function createOrder(
  items: CartItem[],
  shipping: ShippingInfo
): Promise<Order> {
  const payload = {
    items: items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    })),
    shipping,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Erreur lors de la création de la commande");
  }

  const data = await response.json();

  // Le backend renvoie _id (MongoDB) ; on l'adapte au format attendu par le frontend
  return {
    id: data._id,
    items,
    shipping: data.shipping,
    total: data.total,
    createdAt: data.createdAt,
    status: data.status,
  };
}