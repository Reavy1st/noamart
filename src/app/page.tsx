import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Zap, ShoppingBag } from "lucide-react";

const products = [
  { id: 1, name: "Alight Motion Pro", price: "Rp 3.000", sold: 25 },
  { id: 2, name: "Apple Music Family", price: "Rp 10.000", sold: 42 },
  { id: 3, name: "Canva Pro Lifetime", price: "Rp 3.000", sold: 89 },
  { id: 4, name: "CapCut Premium", price: "Rp 10.000", sold: 67 },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 pb-20 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <ShoppingBag size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none">NoaMart</span>
            <span className="text-[10px] text-gray-500 font-medium">by Gandi</span>
          </div>
        </div>
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs font-bold">G</div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-8 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-xs font-bold mb-6 border border-purple-100 uppercase tracking-wide">
          <Star size={14} fill="currentColor" /> Digital Store Terpercaya 2024
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] mb-5 tracking-tight">
          Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">Aplikasi Premium</span><br />
          Untuk Gaya Hidup Digitalmu
        </h1>
        <p className="text-gray-500 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Nikmati akses aplikasi & layanan digital berkualitas tinggi dengan harga termurah. Proses otomatis, bergaransi penuh, dan didukung langsung oleh Gandi.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-[24px] font-bold text-base shadow-xl shadow-purple-200/50 transition-all flex items-center justify-center gap-2 active:scale-95">
            ORDER SEKARANG <ArrowRight size={18} />
          </Link>
          <button className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-[24px] font-bold text-base hover:bg-gray-50 transition-all active:scale-95">
            Lihat Katalog
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="px-6 max-w-4xl mx-auto grid grid-cols-3 gap-3 mb-16">
        {[
          { label: "PRODUK", val: "86+", icon: <Zap size={22} className="text-purple-600" /> },
          { label: "PELANGGAN", val: "200+", icon: <ShieldCheck size={22} className="text-purple-600" /> },
          { label: "TERJUAL", val: "600+", icon: <Star size={22} className="text-purple-600" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="mb-3 p-3 bg-purple-50 rounded-2xl">{stat.icon}</div>
            <span className="text-xl font-black text-gray-900">{stat.val}</span>
            <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Product Grid */}
      <section className="px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-black tracking-tight">LAYANAN <span className="text-purple-600">DIGITAL TERBAIK</span></h2>
          <Link href="/products" className="text-purple-600 text-sm font-bold hover:underline">Lihat Semua</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-100 transition-all group cursor-pointer">
              <div className="aspect-square bg-gray-50 rounded-[20px] mb-4 overflow-hidden relative flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                
                {p.sold > 50 && <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm">HOT</span>}
              </div>
              <h3 className="font-bold text-gray-900 truncate text-sm">{p.name}</h3>
              <div className="flex justify-between items-end mt-3">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{p.sold} Terjual</p>
                  <p className="text-purple-600 font-black text-lg">{p.price}</p>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-20 px-6 text-center text-gray-400 text-xs pb-8">
        <p>&copy; 2024 NoaMart by Gandi. All rights reserved.</p>
      </footer>
    </main>
  );
}
