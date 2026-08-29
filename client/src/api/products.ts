const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getProducts(params?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  search?: string;
}) {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${API_URL}/products?${query}`);
  if (!res.ok) throw new Error("Erreur lors du chargement des produits");
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Produit introuvable");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
}