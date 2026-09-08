import React, { useState, useMemo } from "react";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  Search,
  Pencil,
  Trash2,
  Plus,
  X,
  ChevronDown,
  Cpu,
  LogOut,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  img: string;
};

type OrderStatus = "en_attente" | "expediee" | "livree";

type Order = {
  id: string;
  client: string;
  items: number;
  total: number;
  status: OrderStatus;
  date: string;
};

type UserStatus = "actif" | "bloque";

type AppUser = {
  id: string;
  name: string;
  email: string;
  orders: number;
  status: UserStatus;
};

type PageId = "overview" | "products" | "orders" | "users";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const INITIAL_PRODUCTS: Product[] = [
  { id: "P-001", name: "Laptop ProBook X5", category: "Ordinateurs", price: 450000, stock: 12, img: "💻" },
  { id: "P-002", name: "Souris sans fil MX", category: "Périphériques", price: 15000, stock: 3, img: "🖱️" },
  { id: "P-003", name: "Clavier mécanique RGB", category: "Périphériques", price: 32000, stock: 0, img: "⌨️" },
  { id: "P-004", name: "Écran 27\" 4K", category: "Écrans", price: 180000, stock: 8, img: "🖥️" },
  { id: "P-005", name: "SSD NVMe 1To", category: "Stockage", price: 45000, stock: 21, img: "💾" },
  { id: "P-006", name: "Casque Gamer 7.1", category: "Audio", price: 28000, stock: 5, img: "🎧" },
];

const INITIAL_ORDERS: Order[] = [
  { id: "CMD-1042", client: "Awa Diop", items: 2, total: 465000, status: "en_attente", date: "2026-08-29" },
  { id: "CMD-1041", client: "Moussa Fall", items: 1, total: 180000, status: "expediee", date: "2026-08-28" },
  { id: "CMD-1040", client: "Fatou Sarr", items: 3, total: 92000, status: "livree", date: "2026-08-27" },
  { id: "CMD-1039", client: "Ibrahima Ndiaye", items: 1, total: 450000, status: "livree", date: "2026-08-25" },
  { id: "CMD-1038", client: "Khady Sy", items: 4, total: 120000, status: "expediee", date: "2026-08-24" },
];

const INITIAL_USERS: AppUser[] = [
  { id: "U-01", name: "Awa Diop", email: "awa.diop@mail.com", orders: 5, status: "actif" },
  { id: "U-02", name: "Moussa Fall", email: "m.fall@mail.com", orders: 2, status: "actif" },
  { id: "U-03", name: "Fatou Sarr", email: "fatou.sarr@mail.com", orders: 8, status: "actif" },
  { id: "U-04", name: "Cheikh Ba", email: "cheikh.ba@mail.com", orders: 1, status: "bloque" },
];

const REVENUE_TREND = [
  { m: "Fév", ca: 1.2 }, { m: "Mar", ca: 1.8 }, { m: "Avr", ca: 1.5 },
  { m: "Mai", ca: 2.4 }, { m: "Jun", ca: 2.1 }, { m: "Jul", ca: 2.9 },
  { m: "Aoû", ca: 3.4 },
];

const STATUS_META: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  en_attente: { label: "En attente", color: "#F5A623", bg: "#FEF3E2" },
  expediee: { label: "Expédiée", color: "#2F5DFF", bg: "#EAF0FF" },
  livree: { label: "Livrée", color: "#0FB88A", bg: "#E4F9F2" },
};

const fmt = (n: number) => n.toLocaleString("fr-FR") + " FCFA";

// ---------------------------------------------------------------------------

function Sidebar({ page, setPage }: { page: PageId; setPage: (p: PageId) => void }) {
  const items: { id: PageId; label: string; icon: typeof LayoutGrid }[] = [
    { id: "overview", label: "Vue d'ensemble", icon: LayoutGrid },
    { id: "products", label: "Produits", icon: Package },
    { id: "orders", label: "Commandes", icon: ShoppingCart },
    { id: "users", label: "Utilisateurs", icon: Users },
  ];
  return (
    <aside className="w-64 shrink-0 bg-[#12141C] text-white flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-9 h-9 rounded-lg bg-[#2F5DFF] flex items-center justify-center">
          <Cpu size={18} strokeWidth={2.2} />
        </div>
        <div>
          <div className="font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            TechMarket
          </div>
          <div className="text-[11px] text-white/40">Espace administrateur</div>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          const active = page === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setPage(it.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active ? "bg-[#2F5DFF] text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              {it.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#F5A623] text-[#12141C] flex items-center justify-center text-xs font-semibold">
            SA
          </div>
          <div className="text-xs">
            <div className="font-medium">System Admin</div>
            <div className="text-white/40">admin@techmarket.com</div>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/50 hover:text-white transition-colors">
          <LogOut size={14} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E7E9EF] p-5">
      <div className="text-xs text-[#6B7280] mb-2">{label}</div>
      <div className="text-2xl font-semibold text-[#12141C]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {value}
      </div>
      {sub && <div className="text-xs mt-1" style={{ color: accent || "#6B7280" }}>{sub}</div>}
    </div>
  );
}

function Overview({
  products,
  orders,
  users,
}: {
  products: Product[];
  orders: Order[];
  users: AppUser[];
}) {
  const lowStock = products.filter((p) => p.stock <= 5).length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "en_attente").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#12141C]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Vue d'ensemble
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">Activité de la boutique en un coup d'œil</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Produits en catalogue" value={products.length} sub={`${lowStock} en stock faible`} accent="#F5A623" />
        <StatCard label="Commandes" value={orders.length} sub={`${pending} en attente`} accent="#2F5DFF" />
        <StatCard label="Utilisateurs" value={users.length} sub={`${users.filter((u) => u.status === "actif").length} actifs`} accent="#0FB88A" />
        <StatCard label="Chiffre d'affaires" value={fmt(revenue)} sub="Toutes commandes" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-[#E7E9EF] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-[#12141C]">Évolution du chiffre d'affaires</div>
              <div className="text-xs text-[#6B7280]">Tendance mensuelle — millions FCFA</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_TREND}>
              <defs>
                <linearGradient id="ca" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2F5DFF" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2F5DFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="ca" stroke="#2F5DFF" strokeWidth={2} fill="url(#ca)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-[#E7E9EF] p-5">
          <div className="font-medium text-[#12141C] mb-4">Commandes par statut</div>
          <div className="space-y-3">
            {(Object.entries(STATUS_META) as [OrderStatus, typeof STATUS_META[OrderStatus]][]).map(([key, meta]) => {
              const count = orders.filter((o) => o.status === key).length;
              const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#374151]">{meta.label}</span>
                    <span className="text-[#6B7280]">{count} · {pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#F1F2F5] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: meta.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type ProductFormState = Omit<Product, "id"> | Product;

function ProductModal({
  initial,
  onClose,
  onSave,
}: {
  initial: Product | null;
  onClose: () => void;
  onSave: (form: ProductFormState) => void;
}) {
  const [form, setForm] = useState<ProductFormState>(
    initial || { name: "", category: "", price: 0, stock: 0, img: "📦" }
  );
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#12141C]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {initial ? "Modifier le produit" : "Ajouter un produit"}
          </h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#12141C]">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#6B7280]">Nom du produit</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E7E9EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5DFF]/30"
              placeholder="ex: Laptop ProBook X5"
            />
          </div>
          <div>
            <label className="text-xs text-[#6B7280]">Catégorie</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E7E9EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5DFF]/30"
              placeholder="ex: Ordinateurs"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#6B7280]">Prix (FCFA)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E7E9EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5DFF]/30"
              />
            </div>
            <div>
              <label className="text-xs text-[#6B7280]">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E7E9EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5DFF]/30"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-[#E7E9EF] text-sm text-[#374151] hover:bg-[#F6F7F9]">
            Annuler
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 py-2 rounded-lg bg-[#2F5DFF] text-white text-sm font-medium hover:bg-[#2549CC]"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

function Products({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<"new" | Product | null>(null);

  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );

  const handleSave = (form: ProductFormState) => {
    if (modal === "new") {
      const newProduct: Product = {
        ...(form as Omit<Product, "id">),
        id: `P-${String(products.length + 1).padStart(3, "0")}`,
      };
      setProducts([newProduct, ...products]);
    } else if (modal) {
      setProducts(products.map((p) => (p.id === modal.id ? { ...p, ...(form as Product) } : p)));
    }
    setModal(null);
  };

  const handleDelete = (id: string) => setProducts(products.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#12141C]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Produits
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Ajoutez, modifiez et gérez le stock du catalogue</p>
        </div>
        <button
          onClick={() => setModal("new")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2F5DFF] text-white text-sm font-medium hover:bg-[#2549CC]"
        >
          <Plus size={16} /> Nouveau produit
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E7E9EF] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5DFF]/30"
        />
      </div>

      <div className="bg-white rounded-xl border border-[#E7E9EF] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#6B7280] border-b border-[#E7E9EF]">
              <th className="px-5 py-3 font-medium">Produit</th>
              <th className="px-5 py-3 font-medium">Catégorie</th>
              <th className="px-5 py-3 font-medium">Prix</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-[#F1F2F5] last:border-0 hover:bg-[#FAFBFC]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.img}</span>
                    <div>
                      <div className="font-medium text-[#12141C]">{p.name}</div>
                      <div className="text-xs text-[#9CA3AF]">{p.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-[#374151]">{p.category}</td>
                <td className="px-5 py-3 text-[#374151]">{fmt(p.price)}</td>
                <td className="px-5 py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: p.stock === 0 ? "#FDE8E8" : p.stock <= 5 ? "#FEF3E2" : "#E4F9F2",
                      color: p.stock === 0 ? "#E5484D" : p.stock <= 5 ? "#B5760A" : "#0FB88A",
                    }}
                  >
                    {p.stock === 0 ? "Rupture" : `${p.stock} unités`}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => setModal(p)} className="p-1.5 rounded-md text-[#6B7280] hover:bg-[#EAF0FF] hover:text-[#2F5DFF]">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-md text-[#6B7280] hover:bg-[#FDE8E8] hover:text-[#E5484D]">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-[#9CA3AF] text-sm">Aucun produit trouvé</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <ProductModal
          initial={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function StatusDropdown({
  status,
  onChange,
}: {
  status: OrderStatus;
  onChange: (s: OrderStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const meta = STATUS_META[status];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{ background: meta.bg, color: meta.color }}
      >
        {meta.label} <ChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 bg-white border border-[#E7E9EF] rounded-lg shadow-lg overflow-hidden w-32">
          {(Object.entries(STATUS_META) as [OrderStatus, typeof STATUS_META[OrderStatus]][]).map(([key, m]) => (
            <button
              key={key}
              onClick={() => { onChange(key); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-[#F6F7F9]"
              style={{ color: m.color }}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Orders({
  orders,
  setOrders,
}: {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const filtered = orders.filter(
    (o) =>
      (filter === "all" || o.status === filter) &&
      (o.client.toLowerCase().includes(query.toLowerCase()) || o.id.toLowerCase().includes(query.toLowerCase()))
  );

  const updateStatus = (id: string, status: OrderStatus) =>
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));

  const counts = {
    total: orders.length,
    en_attente: orders.filter((o) => o.status === "en_attente").length,
    expediee: orders.filter((o) => o.status === "expediee").length,
    livree: orders.filter((o) => o.status === "livree").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#12141C]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Commandes
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">Suivez et mettez à jour le statut des commandes</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total" value={counts.total} />
        <StatCard label="En attente" value={counts.en_attente} accent="#F5A623" />
        <StatCard label="Expédiées" value={counts.expediee} accent="#2F5DFF" />
        <StatCard label="Livrées" value={counts.livree} accent="#0FB88A" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un client, une commande..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E7E9EF] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5DFF]/30"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | OrderStatus)}
          className="px-3 py-2.5 rounded-lg border border-[#E7E9EF] bg-white text-sm text-[#374151]"
        >
          <option value="all">Tous les statuts</option>
          {(Object.entries(STATUS_META) as [OrderStatus, typeof STATUS_META[OrderStatus]][]).map(([k, m]) => (
            <option key={k} value={k}>{m.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-[#E7E9EF] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#6B7280] border-b border-[#E7E9EF]">
              <th className="px-5 py-3 font-medium">Commande</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Articles</th>
              <th className="px-5 py-3 font-medium">Montant</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-[#F1F2F5] last:border-0 hover:bg-[#FAFBFC]">
                <td className="px-5 py-3 font-medium text-[#12141C]">{o.id}</td>
                <td className="px-5 py-3 text-[#374151]">{o.client}</td>
                <td className="px-5 py-3 text-[#374151]">{o.items}</td>
                <td className="px-5 py-3 text-[#374151]">{fmt(o.total)}</td>
                <td className="px-5 py-3 text-[#6B7280]">{o.date}</td>
                <td className="px-5 py-3">
                  <StatusDropdown status={o.status} onChange={(s) => updateStatus(o.id, s)} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center py-10 text-[#9CA3AF] text-sm">Aucune commande trouvée</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersPage({
  users,
  setUsers,
}: {
  users: AppUser[];
  setUsers: React.Dispatch<React.SetStateAction<AppUser[]>>;
}) {
  const [query, setQuery] = useState("");
  const filtered = users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

  const toggleBlock = (id: string) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "actif" ? "bloque" : "actif" } : u)));

  const remove = (id: string) => setUsers(users.filter((u) => u.id !== id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#12141C]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Utilisateurs
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">Consultez, bloquez ou supprimez des comptes clients</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un utilisateur..."
          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E7E9EF] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5DFF]/30"
        />
      </div>

      <div className="bg-white rounded-xl border border-[#E7E9EF] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#6B7280] border-b border-[#E7E9EF]">
              <th className="px-5 py-3 font-medium">Utilisateur</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Commandes</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-[#F1F2F5] last:border-0 hover:bg-[#FAFBFC]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EAF0FF] text-[#2F5DFF] flex items-center justify-center text-xs font-semibold">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="font-medium text-[#12141C]">{u.name}</div>
                  </div>
                </td>
                <td className="px-5 py-3 text-[#374151]">{u.email}</td>
                <td className="px-5 py-3 text-[#374151]">{u.orders}</td>
                <td className="px-5 py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: u.status === "actif" ? "#E4F9F2" : "#FDE8E8",
                      color: u.status === "actif" ? "#0FB88A" : "#E5484D",
                    }}
                  >
                    {u.status === "actif" ? "Actif" : "Bloqué"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => toggleBlock(u.id)}
                      className="text-xs px-2.5 py-1 rounded-md border border-[#E7E9EF] text-[#374151] hover:bg-[#F6F7F9]"
                    >
                      {u.status === "actif" ? "Bloquer" : "Débloquer"}
                    </button>
                    <button onClick={() => remove(u.id)} className="p-1.5 rounded-md text-[#6B7280] hover:bg-[#FDE8E8] hover:text-[#E5484D]">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-[#9CA3AF] text-sm">Aucun utilisateur trouvé</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [page, setPage] = useState<PageId>("overview");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [users, setUsers] = useState<AppUser[]>(INITIAL_USERS);

  return (
    <div className="flex h-screen bg-[#F6F7F9]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
      `}</style>
      <Sidebar page={page} setPage={setPage} />
      <main className="flex-1 overflow-y-auto p-8">
        {page === "overview" && <Overview products={products} orders={orders} users={users} />}
        {page === "products" && <Products products={products} setProducts={setProducts} />}
        {page === "orders" && <Orders orders={orders} setOrders={setOrders} />}
        {page === "users" && <UsersPage users={users} setUsers={setUsers} />}
      </main>
    </div>
  );
}