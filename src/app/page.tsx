"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, Star, Zap, ShieldCheck, ArrowRight, 
  Lock, LogOut, Plus, Trash2, Package 
} from "lucide-react";

// Data Awal Produk
const INITIAL_PRODUCTS = [
  { id: 1, name: "Alight Motion Pro", price: "Rp 3.000", sold: 25, icon: "" },
  { id: 2, name: "Apple Music Family", price: "Rp 10.000", sold: 42, icon: "🎵" },
  { id: 3, name: "Canva Pro Lifetime", price: "Rp 3.000", sold: 89, icon: "✏️" },
  { id: 4, name: "CapCut Premium", price: "Rp 10.000", sold: 67, icon: "🎬" },
];

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pin, setPin] = useState("");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  
  // State Form Tambah Produk
  const [newProd, setNewProd] = useState({ name: "", price: "" });

  const handleLogin = () => {
    if (pin === "1234") { // PIN Default: 1234
      setIsAdmin(true);
      setShowLogin(false);
      setPin("");
    } else {
      alert("PIN Salah! Coba lagi.");
      setPin("");
    }
  };

  const addProduct = () => {
    if (!newProd.name || !newProd.price) return;
    const newItem = {
      id: Date.now(),
      name: newProd.name,
      price: newProd.price,
      sold: 0,
      icon: "📦"
    };
    setProducts([newItem, ...products]);
    setNewProd({ name: "", price: "" });
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // --- Tampilan LOGIN MODAL ---
  if (showLogin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white w-full max-w-sm p-8 rounded-[32px] shadow-2xl border border-gray-100 text-center"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Panel Admin</h2>
          <p className="text-gray-500 mb-6 text-sm">Masukkan PIN keamanan untuk mengakses dashboard.</p>
          
          <input 
            type="password" 
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            className="w-full text-center text-3xl tracking-[1em] font-bold py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-purple-200 outline-none transition-all mb-6"
          />
          
          <div className="flex gap-3">
            <button onClick={() => setShowLogin(false)} className="flex-1 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Batal</button>
            <button onClick={handleLogin} className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-violet-700 transition-all active:scale-95">Masuk</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- TAMPILAN UTAMA / ADMIN DASHBOARD ---
  return (
    <main className="min-h-screen pb-20">
      {/* Header Sticky Glassmorphism */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <ShoppingBag size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none">NoaMart</span>
            <span className="text-[10px] text-gray-500 font-medium">by Gandi</span>
          </div>
        </div>
        
        {isAdmin ? (
          <button onClick={() => setIsAdmin(false)} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-bold hover:bg-red-100 transition-colors">
            <LogOut size={14} /> KELUAR
          </button>
        ) : (
          <button onClick={() => setShowLogin(true)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Lock size={18} />
          </button>
        )}
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-8">
        
        {/* HERO SECTION (Hanya muncul jika bukan admin) */}
        {!isAdmin && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-primary rounded-full text-xs font-bold mb-6 border border-purple-100 uppercase tracking-wide">
              <Star size={14} fill="currentColor" /> Digital Store Terpercaya 2024
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] mb-5 tracking-tight">
              Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Aplikasi Premium</span><br />
              Untuk Gaya Hidup Digitalmu
            </h1>
            <p className="text-gray-500 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Nikmati akses aplikasi & layanan digital berkualitas tinggi dengan harga termurah. Proses otomatis, bergaransi penuh, dan didukung langsung oleh Gandi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-primary hover:bg-violet-700 text-white px-8 py-4 rounded-[24px] font-bold text-base shadow-xl shadow-purple-200/50 transition-all flex items-center justify-center gap-2 active:scale-95">
                ORDER SEKARANG <ArrowRight size={18} />
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-[24px] font-bold text-base hover:bg-gray-50 transition-all active:scale-95">
                Lihat Katalog
              </button>
            </div>
          </motion.section>
        )}

        {/* STATS CARDS */}
        <section className="grid grid-cols-3 gap-3 mb-12">
          {[
            { label: "PRODUK", val: `${products.length}+`, icon: <Zap size={22} className="text-primary" /> },
            { label: "PELANGGAN", val: "200+", icon: <ShieldCheck size={22} className="text-primary" /> },
            { label: "TERJUAL", val: "600+", icon: <Star size={22} className="text-primary" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="mb-3 p-3 bg-purple-50 rounded-2xl">{stat.icon}</div>
              <span className="text-xl font-black text-gray-900">{stat.val}</span>
              <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </section>

        {/* ADMIN PANEL: TAMBAH PRODUK */}
        {isAdmin && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-[24px] shadow-sm border border-purple-100 mb-8"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus size={20} className="text-primary"/> Tambah Produk Baru</h3>
            <div className="flex gap-3">
              <input 
                placeholder="Nama Produk" 
                value={newProd.name}
                onChange={(e) => setNewProd({...newProd, name: e.target.value})}
                className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary outline-none"
              />
              <input 
                placeholder="Harga (Rp)" 
                value={newProd.price}
                onChange={(e) => setNewProd({...newProd, price: e.target.value})}
                className="w-32 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary outline-none"
              />
              <button onClick={addProduct} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-violet-700 transition-colors">Tambah</button>
            </div>
          </motion.div>
        )}

        {/* PRODUCT GRID */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-black tracking-tight">LAYANAN <span className="text-primary">DIGITAL TERBAIK</span></h2>
            {!isAdmin && <button className="text-primary text-sm font-bold hover:underline">Lihat Semua</button>}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-100 transition-all group relative"
              >
                {isAdmin && (
                  <button onClick={() => deleteProduct(p.id)} className="absolute top-3 right-3 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 z-10">
                    <Trash2 size={14} />
                  </button>
                )}
                
                <div className="aspect-square bg-gray-50 rounded-[20px] mb-4 overflow-hidden relative flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                  {p.icon}
                  {p.sold > 50 && <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm">HOT</span>}
                </div>
                <h3 className="font-bold text-gray-900 truncate text-sm">{p.name}</h3>
                <div className="flex justify-between items-end mt-3">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{p.sold} Terjual</p>
                    <p className="text-primary font-black text-lg">{p.price}</p>
                  </div>
                  {!isAdmin && (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-20 px-6 text-center text-gray-400 text-xs pb-8">
        <p>&copy; 2024 NoaMart by Gandi. All rights reserved.</p>
      </footer>
    </main>
  );
}
