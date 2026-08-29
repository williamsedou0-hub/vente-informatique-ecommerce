import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../api/products";
import type { Product } from "../types/product";
import ProductGrid from "../components/productgrid";
import Filters from "../components/filters";
import SearchBar from "../components/searchbar";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", brand: "", minPrice: 0, maxPrice: 1000000 });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    getProducts({ ...filters, search }).then(setProducts).catch(console.error);
  }, [filters, search]);

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <Filters categories={categories} brands={brands} selected={filters} onChange={setFilters} />
      </aside>
      <main className="md:col-span-3">
        <SearchBar value={search} onChange={setSearch} />
        <ProductGrid products={products} />
      </main>
    </div>
  );
}