import type { Product } from "../types/product";
import ProductCard from "./productcard";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return <p className="text-center text-gray-500">Aucun produit trouvé.</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}