"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Star, Zap, ShieldCheck, ArrowRight, 
  Lock, LogOut, Plus, Trash2, Menu, X, Moon, Sun,
  Globe, Users, Clock, ChevronRight, ExternalLink
} from "lucide-react";

// Data Awal (Fallback jika LocalStorage kosong)
const DEFAULT_PRODUCTS = [
  { id: 1, name: "Alight Motion Pro", price: "Rp 3.000", sold: 25, icon: "🎨", discount: "-92%" },
  { id: 2, name: "Apple Music Family", price: "Rp 10.000", sold: 42, icon: "🎵" },
  { id: 3, name: "Canva Pro Lifetime", price: "Rp 3.000", sold: 89, icon: "✏️" },
  { id: 4, name: "CapCut Premium", price: "Rp 10.000", sold: 67, icon: "🎬" },
  { id: 5, name: "Netflix UHD 4K", price: "Rp 15.000", sold: 34, icon: "📺" },
  { id: 6, name: "Spotify Premium", price: "Rp 8.000", sold: 120, icon: "🎧", hot: true },
];

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pin, setPin] = useState("");
  
  // State Produk dengan LocalStorage
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [newProd, setNewProd] = useState({ name: "", price: "" });

  // Load Data & Tema saat pertama kali buka
  useEffect(() => {
    const savedProducts = localStorage.getItem('noamart_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    
    const savedTheme = localStorage.getItem('noamart_theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Simpan Produk ke LocalStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('noamart_products', JSON.stringify(products));
  }, [products]);

  // Toggle Dark Mode
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('noamart_theme', !isDark ? 'dark' : 'light');
  };

  // Fungsi Admin
  const handleLogin = () => {
    if (pin === "1234") {
      setIsAdmin(true);
      setShowLogin(false);
      setPin("");
    } else {
      alert("PIN Salah! (Default: 1234)");
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
    if(confirm("Hapus produk ini?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className={`min-h-screen pb-20 ${isDark ? 'dark' : ''}`}>
      
      {/* --- HEADER STICKY --- */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-darkSurface/80 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-between items-center transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200 dark:shadow-none">
            <ShoppingBag size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none dark:text-white">NoaMart</span>
            <span className="text-[10px] text-gray-500 font-medium">by Gandi</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* --- HAMBURGER MENU SLIDE-IN --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-darkSurface z-50 shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold dark:text-white">MENU UTAMA</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><X size={20} className="dark:text-white"/></button>
              </div>

              <nav className="space-y-2 mb-8">
                {['Beranda', 'Produk', 'Pesanan', 'Garansi'].map((item, i) => (
                  <button key={i} className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${i===0 ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    {i===0 && <ShoppingBag size={18}/>}
                    {i===1 && <Globe size={18}/>}
                    {i===2 && <Clock size={18}/>}
                    {i===3 && <ShieldCheck size={18}/>}
                    {item.toUpperCase()}
                  </button>
                ))}
              </nav>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-6 space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">OWNER LOGIN</p>
                {isAdmin ? (
                  <button onClick={() => setIsAdmin(false)} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2">
                    <LogOut size={18} /> KELUAR ADMIN
                  </button>
                ) : (
                  <button onClick={() => {setShowLogin(true); setIsMenuOpen(false)}} className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold flex items-center justify-center gap-2">
                    <Lock size={18} /> MASUK PANEL
                  </button>
                )}
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                  <span className="text-sm font-bold text-green-700 dark:text-green-400">Semua Sistem Normal</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- LOGIN MODAL --- */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-darkSurface w-full max-w-sm p-8 rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Panel Admin</h2>
              <input type="password" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} placeholder="••••" className="w-full text-center text-3xl tracking-[1em] font-bold py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:border-primary outline-none mb-6 dark:text-white"/>
              <div className="flex gap-3">
                <button onClick={() => setShowLogin(false)} className="flex-1 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">Batal</button>
                <button onClick={handleLogin} className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none">Masuk</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-6 pt-8">
        
        {/* HERO SECTION */}
        {!isAdmin && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 py-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-primary rounded-full text-xs font-bold mb-6 border border-red-100 dark:border-red-800 uppercase tracking-wide">
              <Star size={14} fill="currentColor" /> DESTINASI DIGITAL TERPERCAYA SEJAK 2024
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight dark:text-white">
              Solusi <span className="text-primary">Aplikasi Premium</span><br />
              Untuk Gaya Hidup Digital
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Premium Digital Provider terpercaya. Murah, Bergaransi, dan Berkualitas tinggi. Nikmati akses aplikasi premium dengan harga termurah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-[24px] font-bold text-base shadow-glow transition-all flex items-center justify-center gap-2 active:scale-95">
                ORDER SEKARANG <ArrowRight size={18} />
              </button>
              <button className="bg-white dark:bg-darkSurface border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-[24px] font-bold text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
                PELAJARI LEBIH LANJUT
              </button>
            </div>
          </motion.section>
        )}

        {/* STATS CARDS */}
        <section className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: "PRODUK", val: `${products.length}+`, icon: <Globe size={24} className="text-primary" /> },
            { label: "PELANGGAN", val: "200+", icon: <Users size={24} className="text-primary" /> },
            { label: "PESANAN", val: "600+", icon: <Zap size={24} className="text-primary" /> },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-darkSurface p-6 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-2xl">{stat.icon}</div>
              <span className="text-2xl font-black text-gray-900 dark:text-white">{stat.val}</span>
              <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </section>

        {/* ADMIN PANEL: TAMBAH PRODUK */}
        {isAdmin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-darkSurface p-6 rounded-[24px] shadow-soft border border-red-100 dark:border-red-900/30 mb-8">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white"><Plus size={20} className="text-primary"/> Tambah Produk Baru</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input placeholder="Nama Produk" value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary outline-none dark:text-white"/>
              <input placeholder="Harga (Rp)" value={newProd.price} onChange={(e) => setNewProd({...newProd, price: e.target.value})} className="w-full sm:w-32 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary outline-none dark:text-white"/>
              <button onClick={addProduct} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-700 transition-colors">Tambah</button>
            </div>
          </motion.div>
        )}

        {/* PRODUCT GRID */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight dark:text-white">TEMUKAN LAYANAN</h2>
              <h2 className="text-3xl font-black tracking-tight text-primary italic">DIGITAL TERBAIK</h2>
            </div>
            {!isAdmin && <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">Lihat Semua <ChevronRight size={16}/></button>}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-darkSurface p-4 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-red-100 dark:hover:border-red-900/50 transition-all group relative">
                
                {isAdmin && (
                  <button onClick={() => deleteProduct(p.id)} className="absolute top-3 right-3 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 z-10">
                    <Trash2 size={14} />
                  </button>
                )}
                
                {p.discount && <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-sm z-10">{p.discount}</span>}
                
                <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-[20px] mb-4 overflow-hidden relative flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                  {p.icon}
                  {p.hot && <span className="absolute bottom-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-1 rounded-full shadow-sm">HOT</span>}
                </div>
                
                <h3 className="font-bold text-gray-900 dark:text-white truncate text-sm mb-1">{p.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-3">{p.sold} TERJUAL</p>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">MULAI</p>
                    <p className="text-primary font-black text-lg">{p.price}</p>
                  </div>
                  {!isAdmin && (
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS / FOOTER SIMPLE */}
        <section className="mt-20 mb-10 text-center">
          <h2 className="text-2xl font-black mb-8 dark:text-white">APA KATA MEREKA?</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {[
              { user: "@mpawsukayepink", text: "Proses cepat banget, aman!" },
              { user: "@azriler", text: "Harga murah, garansi jelas." },
              { user: "@gandi_store", text: "Recommended seller!" }
            ].map((t, i) => (
              <div key={i} className="snap-center shrink-0 w-64 bg-white dark:bg-darkSurface p-6 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800 text-left">
                <div className="flex gap-1 text-yellow-400 mb-3"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 italic">"{t.text}"</p>
                <p className="text-xs font-bold text-gray-900 dark:text-white">{t.user}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-gray-50 dark:bg-darkSurface rounded-[32px] border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <ShoppingBag size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl dark:text-white">NOAMART</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">EST. 2024 MARKETPLACE PROFESIONAL</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">Semua Sistem Normal • Garansi Penuh • Proses Otomatis</p>
            <button className="px-6 py-3 border border-primary text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors flex items-center gap-2 mx-auto">
              LIHAT BUKTI DI INSTAGRAM <ExternalLink size={14}/>
            </button>
          </div>
        </section>
      </div>

      <footer className="px-6 text-center text-gray-400 text-xs pb-8">
        <p>&copy; 2024 NoaMart by Gandi. All rights reserved.</p>
      </footer>
    </div>
  );
}
