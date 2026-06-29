'use client';

import React, { useState } from 'react';
import { Product } from './MenuCatalog';
import { Plus, Edit2, ShieldAlert, BarChart2, DollarSign, Package, ShoppingCart as CartIcon, LogOut } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Order {
  id: string;
  items: { productName: string; quantity: number; price: number }[];
  total: number;
  time: string;
  status: 'pending' | 'preparing' | 'completed';
}

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
}

interface AdminDashboardProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
}

export default function AdminDashboard({
  products,
  onUpdateProduct,
  onAddProduct,
}: AdminDashboardProps) {
  // Auth simulation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard active section
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'inventory'>('analytics');

  // Product edit form helper state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Seeded Admin Orders List
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'UT-4091',
      items: [
        { productName: 'Premium Akara (Full)', quantity: 2, price: 1500 },
        { productName: 'Cold Homemade Zobo', quantity: 3, price: 800 },
      ],
      total: 5400,
      time: '10:45 AM',
      status: 'pending',
    },
    {
      id: 'UT-4092',
      items: [
        { productName: 'Pepper Awara', quantity: 1, price: 1200 },
        { productName: 'Roasted Maize', quantity: 2, price: 500 },
        { productName: 'Cold Homemade Zobo', quantity: 1, price: 800 },
      ],
      total: 3000,
      time: '11:15 AM',
      status: 'preparing',
    },
    {
      id: 'UT-4093',
      items: [
        { productName: 'Sweet Popcorn (Large)', quantity: 3, price: 1000 },
      ],
      total: 3000,
      time: '12:05 PM',
      status: 'completed',
    },
  ]);

  // Seeded Admin Inventory List
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Beans Flour (Bag)', stock: 12, unit: 'bags' },
    { id: '2', name: 'Raw Soybean (Kg)', stock: 45, unit: 'kg' },
    { id: '3', name: 'Zobo Leaves (Dry)', stock: 8, unit: 'bags' },
    { id: '4', name: 'Raw Maize (Cob)', stock: 120, unit: 'cobs' },
    { id: '5', name: 'Popcorn Corn Kernels (Kg)', stock: 50, unit: 'kg' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      confetti({
        particleCount: 50,
        spread: 40,
        colors: ['#D8BE7A', '#8FA93D'],
      });
    } else {
      setAuthError('Incorrect management security passcode.');
    }
  };

  const updateOrderStatus = (id: string, nextStatus: 'pending' | 'preparing' | 'completed') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o))
    );
  };

  const updateInventoryStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i
      )
    );
  };

  const handleProductEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(editingProduct);
      setEditingProduct(null);
      confetti({
        particleCount: 20,
        spread: 30,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="py-20 max-w-md mx-auto px-4">
        <div className="glass-panel p-8 rounded-3xl border border-[#D8BE7A]/30 space-y-6 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#D8BE7A]/10 text-[#D8BE7A] flex items-center justify-center text-2xl mx-auto border border-[#D8BE7A]/30">
            🔐
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-playfair text-[#F7F4EB]">Admin CRM Authentication</h3>
            <p className="text-xs text-[#F7F4EB]/60">Enter security code to access sales metrics, inventory, and catalogues.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#D8BE7A] uppercase mb-1.5">Passcode</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Hint: admin123"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F7F4EB] focus:outline-none focus:border-[#D8BE7A]"
              />
            </div>
            {authError && <p className="text-xs text-red-400 font-medium">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] font-bold text-sm transition-all"
            >
              Verify Passcode
            </button>
          </form>
        </div>
      </section>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-playfair font-bold text-[#F7F4EB]">Admin Dashboard</h2>
          <p className="text-xs text-[#A7C957] font-medium uppercase tracking-wider">UnderTree CRM Terminal</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold bg-red-950/20 border border-red-800/40 px-4 py-2 rounded-xl transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'analytics' ? 'bg-[#8FA93D] text-[#0D1F14]' : 'glass-panel text-[#F7F4EB]/70 hover:text-[#D8BE7A]'
          }`}
        >
          📈 Sales Analytics
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products' ? 'bg-[#8FA93D] text-[#0D1F14]' : 'glass-panel text-[#F7F4EB]/70 hover:text-[#D8BE7A]'
          }`}
        >
          🍔 Manage Catalogue
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders' ? 'bg-[#8FA93D] text-[#0D1F14]' : 'glass-panel text-[#F7F4EB]/70 hover:text-[#D8BE7A]'
          }`}
        >
          📦 Active Orders ({orders.filter((o) => o.status !== 'completed').length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'inventory' ? 'bg-[#8FA93D] text-[#0D1F14]' : 'glass-panel text-[#F7F4EB]/70 hover:text-[#D8BE7A]'
          }`}
        >
          🌾 Ingredient Stock
        </button>
      </div>

      {/* Dynamic Content Panel */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl">
        
        {/* ANALYTICS SECTION */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold font-playfair text-[#D8BE7A]">General Performance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-panel-light p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#F7F4EB]/60 block mb-1">Total Revenue Today</span>
                  <span className="text-2xl font-bold text-[#F7F4EB]">₦{totalRevenue.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
              <div className="glass-panel-light p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#F7F4EB]/60 block mb-1">Incoming Orders</span>
                  <span className="text-2xl font-bold text-[#F7F4EB]">
                    {orders.filter((o) => o.status === 'pending').length}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
                  <CartIcon className="w-6 h-6" />
                </div>
              </div>
              <div className="glass-panel-light p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#F7F4EB]/60 block mb-1">Stock Alerts</span>
                  <span className="text-2xl font-bold text-[#F7F4EB]">
                    {inventory.filter((i) => i.stock < 15).length} Items Low
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                  <Package className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Custom SVG line chart to simulate live analytics */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#F7F4EB]/80 uppercase">Hourly Sales Velocity</h4>
              <div className="h-60 w-full rounded-2xl bg-black/40 border border-white/10 p-4 relative flex items-end">
                {/* Simulated Chart Graph Line */}
                <svg className="w-full h-full absolute inset-0 p-4 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Area fill */}
                  <polygon
                    points="0,100 15,80 30,85 45,60 60,70 75,40 90,45 100,20 100,100"
                    fill="url(#grad)"
                    opacity="0.15"
                  />
                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="#D8BE7A"
                    strokeWidth="2"
                    points="0,80 15,80 30,85 45,60 60,70 75,40 90,45 100,20"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D8BE7A" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* X axis labels */}
                <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[10px] text-[#F7F4EB]/40">
                  <span>9:00 AM</span>
                  <span>12:00 PM</span>
                  <span>3:00 PM</span>
                  <span>6:00 PM</span>
                  <span>9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS SECTION */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-playfair text-[#D8BE7A]">Product Catalog Manager</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="glass-panel-light p-5 rounded-2xl border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.image}</span>
                    <div>
                      <h4 className="font-bold text-sm text-[#F7F4EB] font-playfair">{p.name}</h4>
                      <p className="text-xs text-[#D8BE7A] font-semibold">₦{p.price.toLocaleString()}</p>
                      <span className={`text-[10px] uppercase font-bold ${p.available ? 'text-[#A7C957]' : 'text-red-400'}`}>
                        {p.available ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="p-2.5 rounded-lg bg-white/5 text-[#D8BE7A] hover:bg-white/10 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Product Edit Modal */}
            {editingProduct && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-panel p-8 rounded-3xl border border-[#D8BE7A]/40 w-full max-w-md space-y-6">
                  <h3 className="text-lg font-bold font-playfair text-[#F7F4EB]">Modify Product Details</h3>
                  
                  <form onSubmit={handleProductEditSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-[#D8BE7A] mb-1">Price (₦)</label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="w-full bg-[#0D1F14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#F7F4EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#D8BE7A] mb-1">Availability</label>
                      <select
                        value={editingProduct.available ? 'true' : 'false'}
                        onChange={(e) => setEditingProduct({ ...editingProduct, available: e.target.value === 'true' })}
                        className="w-full bg-[#0D1F14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#F7F4EB]"
                      >
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-[#8FA93D] text-[#0D1F14] text-xs font-bold hover:bg-[#A7C957]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ORDERS SECTION */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-playfair text-[#D8BE7A]">Active Orders</h3>

            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="glass-panel-light p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-[#F7F4EB] text-sm">{o.id}</span>
                      <span className="text-[10px] text-[#F7F4EB]/40 font-semibold">{o.time}</span>
                    </div>
                    <ul className="text-xs text-[#F7F4EB]/80 space-y-1">
                      {o.items.map((i, idx) => (
                        <li key={idx}>
                          • {i.productName} (x{i.quantity})
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-bold text-[#D8BE7A] mt-2">Total: ₦{o.total.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateOrderStatus(o.id, 'preparing')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        o.status === 'preparing'
                          ? 'bg-[#8FA93D] text-[#0D1F14]'
                          : 'bg-white/5 text-[#F7F4EB]/70 hover:bg-white/10'
                      }`}
                    >
                      Prepare
                    </button>
                    <button
                      onClick={() => updateOrderStatus(o.id, 'completed')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        o.status === 'completed'
                          ? 'bg-[#A7C957] text-[#0D1F14]'
                          : 'bg-white/5 text-[#F7F4EB]/70 hover:bg-white/10'
                      }`}
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVENTORY SECTION */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-playfair text-[#D8BE7A]">Kitchen Inventory</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel-light p-6 rounded-2xl border border-white/5 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#F7F4EB]">{item.name}</h4>
                    <p className="text-xs text-[#F7F4EB]/60">Current Stock: <span className="text-[#D8BE7A] font-bold">{item.stock} {item.unit}</span></p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateInventoryStock(item.id, -5)}
                      className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-bold"
                    >
                      -5
                    </button>
                    <button
                      onClick={() => updateInventoryStock(item.id, 5)}
                      className="px-3 py-1.5 rounded bg-[#8FA93D] text-[#0D1F14] hover:bg-[#A7C957] text-xs font-bold"
                    >
                      +5
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
