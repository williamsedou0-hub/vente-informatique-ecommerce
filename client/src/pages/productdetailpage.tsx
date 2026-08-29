import { useEffect, useState } from "react";
import { getProductById } from "../api/products";
import type { Product } from "../types/product";

export default function ProductDetailPage() {
  const id = window.location.pathname.split("/").filter(Boolean).pop();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) getProductById(id).then(setProduct).catch(console.error);
  }, [id]);

  if (!product) return <p className="p-6">Chargement...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg" />
          <div className="flex gap-2 mt-2">
            {product.images?.map((img, i) => (
              <img key={i} src={img} className="w-16 h-16 object-cover rounded" />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 my-2">{product.price.toLocaleString()} FCFA</p>
          <p className="text-gray-600">{product.description}</p>

          <h2 className="mt-4 font-semibold">Caractéristiques</h2>
          <ul className="list-disc list-inside text-sm">
            {product.specs && Object.entries(product.specs).map(([k, v]) => (
              <li key={k}>{k} : {v}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-8 font-semibold text-lg">Avis clients</h2>
      {product.reviews?.map((r, i) => (
        <div key={i} className="border-t py-2">
          <p className="font-medium">{r.author} — {r.rating}/5</p>
          <p className="text-sm text-gray-600">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}