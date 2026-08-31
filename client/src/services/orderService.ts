import type { CartItem, Order, ShippingInfo } from "../types/cart";

export async function createOrder(
  items: CartItem[],
  shipping: ShippingInfo
): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order: Order = {
    id: `CMD-${Date.now()}`,
    items,
    shipping,
    total,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };

  return order;
}