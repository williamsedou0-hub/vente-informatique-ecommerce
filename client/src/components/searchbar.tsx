export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      placeholder="Rechercher un produit..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg p-2 w-full mb-4"
    />
  );
}