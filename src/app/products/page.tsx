"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Alight Motion Pro", price: "Rp 3.000", sold: 25, icon: "🎨", discount: "-92%" },
  { id: 2, name: "Apple Music Family", price: "Rp 10.000", sold: 42, icon: "🎵" },
  { id: 3, name: "Canva Pro Lifetime", price: "Rp 3.000", sold: 89, icon: "✏️" },
  { id: 4, name: "CapCut Premium", price: "Rp 10.000", sold: 67, icon: "🎬" },
  { id: 5, name: "Netflix UHD 4K", price: "Rp 15.000", sold: 34, icon: "📺" },
  { id: 6, name: "Spotify Premium", price: "Rp 8.000", sold: 120, icon: "🎧", hot: true },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);

  useEffect(() => {
    const saved = localStorage.getItem('noamart_products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-darkBg pb-20">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-darkSurface/80 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex flex-col">
          <span className="font-bold text-xl dark:text-white">Katalog Produk</span>
          <span className="text-[10px] text-gray-500">Temukan layanan digital terbaik</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight dark:text-white">TEMUKAN LAYANAN</h2>
          <h2 className="text-3xl font-black tracking-tight text-primary italic">DIGITAL TERBAIK</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-darkSurface p-4 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-red-100 dark:hover:border-red-900/50 transition-all group relative">
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
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
