"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, LogOut, Plus, Trash2, LayoutDashboard, Users, Settings, 
  Activity, FileText, Shield, Eye, EyeOff, ChevronRight, Save
} from "lucide-react";

// DATA AKUN ADMIN (Hardcoded untuk demo)
const ADMIN_ACCOUNTS = [
  { username: "Noadmin", password: "Nhuy0551", pin: "0551", role: "developer", name: "Gandi (Owner)" },
  { username: "moderator1", password: "modpass123", pin: "1111", role: "moderator", name: "Admin Moderasi" }
];

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "", pin: "" });
  const [showPass, setShowPass] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // State Manajemen Produk
  const [products, setProducts] = useState<any[]>([]);
  const [newProd, setNewProd] = useState({ name: "", price: "" });

  // State Logs
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const savedSession = sessionStorage.getItem('noamart_admin_session');
    if (savedSession) setSession(JSON.parse(savedSession));
    
    const savedProducts = localStorage.getItem('noamart_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));

    const savedLogs = localStorage.getItem('noamart_logs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  const addLog = (action: string) => {
    const newLog = `[${new Date().toLocaleString()}] ${session?.name} (${session?.role}): ${action}`;
    const updatedLogs = [newLog, ...logs].slice(0, 50);
    setLogs(updatedLogs);
    localStorage.setItem('noamart_logs', JSON.stringify(updatedLogs));
  };

  const handleLogin = () => {
    const account = ADMIN_ACCOUNTS.find(a => 
      a.username === loginForm.username && 
      a.password === loginForm.password && 
      a.pin === loginForm.pin
    );

    if (account) {
      const sess = { ...account, loginTime: new Date().toISOString() };
      setSession(sess);
      sessionStorage.setItem('noamart_admin_session', JSON.stringify(sess));
      addLog("LOGIN SUCCESS");
      setLoginForm({ username: "", password: "", pin: "" });
    } else {
      alert("Username, Password, atau PIN salah!");
    }
  };

  const handleLogout = () => {
    addLog("LOGOUT");
    setSession(null);
    sessionStorage.removeItem('noamart_admin_session');
  };

  const addProduct = () => {
    if (!newProd.name || !newProd.price) return;
    const newItem = { id: Date.now(), name: newProd.name, price: newProd.price, sold: 0, icon: "📦" };
    const updated = [newItem, ...products];
    setProducts(updated);
    localStorage.setItem('noamart_products', JSON.stringify(updated));
    addLog(`MENAMBAH PRODUK: ${newProd.name}`);
    setNewProd({ name: "", price: "" });
  };

  const deleteProduct = (id: number, name: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('noamart_products', JSON.stringify(updated));
    addLog(`MENGHAPUS PRODUK: ${name}`);
  };

  // --- TAMPILAN LOGIN ---
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-darkBg p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-darkSurface w-full max-w-md p-8 rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Shield size={32} />
            </div>
            <h2 className="text-2xl font-bold dark:text-white">Panel Admin NoaMart</h2>
            <p className="text-sm text-gray-500 mt-2">Masukkan kredensial keamanan 3 lapis</p>
          </div>
          
          <div className="space-y-4">
            <input placeholder="Username" value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary outline-none dark:text-white"/>
            
            <div className="relative">
              <input type={showPass ? "text" : "password"} placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary outline-none dark:text-white pr-12"/>
              <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>

            <input type="password" maxLength={4} placeholder="PIN Keamanan (4 digit)" value={loginForm.pin} onChange={(e) => setLoginForm({...loginForm, pin: e.target.value})} className="w-full text-center text-2xl tracking-[1em] font-bold py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary outline-none dark:text-white"/>
            
            <button onClick={handleLogin} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-red-200 dark:shadow-none mt-4">MASUK DASHBOARD</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- TAMPILAN DASHBOARD ---
  const isDev = session.role === 'developer';
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkBg flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-darkSurface border-r border-gray-100 dark:border-gray-800 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white"><Shield size={20}/></div>
          <div>
            <h1 className="font-bold text-lg dark:text-white">NoaMart Admin</h1>
            <p className="text-[10px] text-gray-500 uppercase">{session.role}</p>
          </div>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab("dashboard")} className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 ${activeTab==="dashboard" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><LayoutDashboard size={18}/> Dashboard</button>
          <button onClick={() => setActiveTab("products")} className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 ${activeTab==="products" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><FileText size={18}/> Kelola Produk</button>
          {isDev && <button onClick={() => setActiveTab("users")} className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 ${activeTab==="users" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><Users size={18}/> Manajemen Akun</button>}
          {isDev && <button onClick={() => setActiveTab("logs")} className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 ${activeTab==="logs" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><Activity size={18}/> System Logs</button>}
        </nav>

        <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 mt-auto"><LogOut size={18}/> KELUAR</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold dark:text-white capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-3 bg-white dark:bg-darkSurface px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold dark:text-white">{session.name[0]}</div>
            <span className="text-sm font-medium dark:text-white">{session.name}</span>
          </div>
        </div>

        {/* TAB: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-darkSurface p-6 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 mb-2">Total Produk Aktif</p>
              <h3 className="text-3xl font-black dark:text-white">{products.length}</h3>
            </div>
            <div className="bg-white dark:bg-darkSurface p-6 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 mb-2">Status Sistem</p>
              <h3 className="text-xl font-bold text-green-600 flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"/> NORMAL</h3>
            </div>
            <div className="bg-white dark:bg-darkSurface p-6 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 mb-2">Role Akses</p>
              <h3 className="text-xl font-bold text-primary uppercase">{session.role}</h3>
            </div>
          </div>
        )}

        {/* TAB: KELOLA PRODUK (Developer & Moderator) */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-darkSurface p-6 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-4 dark:text-white flex items-center gap-2"><Plus size={20} className="text-primary"/> Tambah Produk Baru</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input placeholder="Nama Produk" value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary outline-none dark:text-white"/>
                <input placeholder="Harga (Rp)" value={newProd.price} onChange={(e) => setNewProd({...newProd, price: e.target.value})} className="w-full sm:w-32 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary outline-none dark:text-white"/>
                <button onClick={addProduct} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-700 transition-colors">Tambah</button>
              </div>
            </div>

            <div className="bg-white dark:bg-darkSurface rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Nama Produk</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Harga</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Terjual</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <td className="p-4 font-medium dark:text-white">{p.name}</td>
                      <td className="p-4 text-primary font-bold">{p.price}</td>
                      <td className="p-4 text-gray-500">{p.sold}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => deleteProduct(p.id, p.name)} className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 ml-auto"><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: MANAJEMEN AKUN (Developer Only) */}
        {activeTab === "users" && isDev && (
          <div className="bg-white dark:bg-darkSurface p-8 rounded-[24px] shadow-soft border border-gray-100 dark:border-gray-800 text-center">
            <Users size={48} className="mx-auto text-gray-300 mb-4"/>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Manajemen Akun Admin</h3>
            <p className="text-gray-500 mb-6">Fitur tambah/hapus admin dan ubah role hanya tersedia untuk Developer.</p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-left space-y-3">
              {ADMIN_ACCOUNTS.map((acc, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-darkSurface rounded-lg border border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="font-bold dark:text-white">{acc.username}</p>
                    <p className="text-xs text-gray-500 uppercase">{acc.role} • {acc.name}</p>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded dark:text-gray-300">Protected</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SYSTEM LOGS (Developer Only) */}
        {activeTab === "logs" && isDev && (
          <div className="bg-black dark:bg-gray-900 p-6 rounded-[24px] shadow-soft border border-gray-800 font-mono text-sm h-[500px] overflow-y-auto">
            {logs.length === 0 ? <p className="text-gray-500 text-center mt-20">Belum ada aktivitas log.</p> : 
              logs.map((log, i) => (
                <div key={i} className="mb-2 text-green-400 border-b border-gray-800 pb-2 last:border-0">
                  <span className="text-gray-500 mr-2">{log.split(']:')[0]}]:</span>
                  {log.split(']:')[1]}
                </div>
              ))
            }
          </div>
        )}
      </main>
    </div>
  );
}
