export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  total: number;
  createdAt: string;
  status: "pending" | "confirmed";
}