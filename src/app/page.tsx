"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Star, ShieldCheck, Zap, ArrowRight, Menu, X, Moon, Sun } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('noamart_theme');
    if (savedTheme === 'dark') { setIsDark(true); document.documentElement.classList.add('dark'); }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('noamart_theme', !isDark ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen pb-20 ${isDark ? 'dark' : ''}`}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-darkSurface/80 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <ShoppingBag size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none dark:text-white">NoaMart</span>
            <span className="text-[10px] text-gray-500 font-medium">by Gandi</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* HAMBURGER MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} className="relative w-[85%] max-w-sm bg-white dark:bg-darkSurface h-full shadow-2xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold dark:text-white">MENU UTAMA</h2>
              <button onClick={() => setIsMenuOpen(false)}><X size={20} className="dark:text-white"/></button>
            </div>
            <nav className="space-y-2 mb-8">
              <Link href="/" className="block w-full text-left px-4 py-3 rounded-xl font-medium bg-primary text-white flex items-center gap-3"><ShoppingBag size={18}/> BERANDA</Link>
              <Link href="/products" className="block w-full text-left px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"><Zap size={18}/> PRODUK</Link>
              <Link href="/admin" className="block w-full text-left px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"><ShieldCheck size={18}/> ADMIN LOGIN</Link>
            </nav>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
              <span className="text-sm font-bold text-green-700 dark:text-green-400">Semua Sistem Normal</span>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 pt-8">
        {/* HERO PROFILE TOKO */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-primary rounded-full text-xs font-bold mb-6 border border-red-100 dark:border-red-800 uppercase tracking-wide">
            <Star size={14} fill="currentColor" /> DESTINASI DIGITAL TERPERCAYA SEJAK 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight dark:text-white">
            Solusi <span className="text-primary">Aplikasi Premium</span><br />
            Untuk Gaya Hidup Digital
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            NoaMart adalah penyedia layanan digital premium yang berfokus pada kualitas, keamanan, dan harga terjangkau. Kami telah melayani ratusan pelanggan sejak 2024 dengan garansi penuh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/products" className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-[24px] font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95">
              LIHAT KATALOG PRODUK <ArrowRight size={18} />
            </Link>
            <button className="bg-white dark:bg-darkSurface border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-[24px] font-bold text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              HUBUNGI CS
            </button>
          </div>
        </motion.section>

        {/* STATS & FEATURES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Layanan Premium", desc: "Akses aplikasi & layanan digital berkualitas tinggi dengan harga terjangkau.", icon: <Star size={24} className="text-primary"/> },
            { title: "Garansi Penuh", desc: "Transaksi 100% aman terenkripsi dan setiap akun dilindungi garansi penuh.", icon: <ShieldCheck size={24} className="text-primary"/> },
            { title: "Dukungan Cepat", desc: "Tim bantuan kami siap melayani dan memproses pesanan Anda dalam hitungan menit.", icon: <Zap size={24} className="text-primary"/> },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-darkSurface p-6 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800">
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-2xl w-fit">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </section>
      </div>
      
      <footer className="px-6 text-center text-gray-400 text-xs pb-8 mt-10">
        <p>&copy; 2024 NoaMart by Gandi. All rights reserved.</p>
      </footer>
    </div>
  );
}
