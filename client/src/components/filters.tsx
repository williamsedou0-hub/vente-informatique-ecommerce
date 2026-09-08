interface FiltersProps {
  categories: string[];
  brands: string[];
  selected: {
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
  };
  onChange: (filters: FiltersProps["selected"]) => void;
}

export default function Filters({ categories, brands, selected, onChange }: FiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div>
        <label className="block text-sm font-medium">Catégorie</label>
        <select
          value={selected.category}
          onChange={(e) => onChange({ ...selected, category: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">Toutes</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Marque</label>
        <select
          value={selected.brand}
          onChange={(e) => onChange({ ...selected, brand: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">Toutes</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
    </div>
  );
}