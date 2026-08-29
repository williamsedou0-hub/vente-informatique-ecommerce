import type { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a href={`/products/${product.id}`} className="border rounded-lg p-3 hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="mt-2 font-semibold text-sm">{product.name}</h3>
      <p className="text-gray-700 font-bold">{product.price.toLocaleString()} FCFA</p>
    </a>
  );
}