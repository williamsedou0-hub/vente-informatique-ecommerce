// Types partagés pour le panier et les commandes
// À terme, "Product" devrait correspondre au modèle produit renvoyé par l'API backend.

export interface Product {
  id: string;
  name: string;
  price: number; // prix unitaire en FCFA (ou la devise du projet)
  image?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
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