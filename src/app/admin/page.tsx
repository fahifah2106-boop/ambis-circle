"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Trash2, 
  ShieldCheck,
  Activity,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/Form";

import { useState } from "react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total User", value: "1,248", change: "+12%", icon: Users, color: "from-peach to-orange-400", shadow: "shadow-peach/20" },
    { label: "Laporan Baru", value: "17", change: "+24%", icon: ShieldCheck, color: "from-red-400 to-red-600", shadow: "shadow-red-400/20" },
    { label: "Circle Aktif", value: "86", change: "+8%", icon: Activity, color: "from-lavender to-indigo-400", shadow: "shadow-lavender/20" },
  ];

  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: "Budi Santoso", email: "budi@gmail.com", role: "Customer", status: "Active", joined: "Today" },
    { id: 2, name: "Siti Aminah", email: "siti@gmail.com", role: "Customer", status: "Inactive", joined: "Yesterday" },
    { id: 3, name: "Andi Wijaya", email: "andi@gmail.com", role: "Admin", status: "Active", joined: "2 Days ago" },
  ]);

  const handleDeleteUser = (id: number) => {
    setRecentUsers(recentUsers.filter(u => u.id !== id));
    toast.error(`User #${id} telah dihapus.`);
  };

  return (
    <div className="space-y-10">
      {/* Stats Grid - Laptop-like 3 columns even on mobile */}
      <div className="grid grid-cols-3 gap-3 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/70 backdrop-blur-md p-3 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/50 shadow-soft group hover:bg-white transition-all duration-500 relative overflow-hidden"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className={`p-2 md:p-4 rounded-lg md:rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              {stat.change && (
                <div className={`hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${
                    stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change.startsWith('+') ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </div>
              )}
            </div>
            
            <div className="mt-3 md:mt-6 relative z-10">
                <h3 className="text-[8px] md:text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</h3>
                <p className="text-lg md:text-4xl font-black text-gray-900 mt-0.5 md:mt-1 tracking-tight leading-none">{stat.value}</p>
            </div>

            {/* Decorative background circle */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.08] transition-opacity`} />
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Table & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users Table */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-soft overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white/30">
            <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight">User Terbaru</h3>
                <p className="text-xs font-medium text-gray-400">Daftar registrasi terbaru di platform</p>
            </div>
            <Link href="/admin/users" className="bg-peach/10 text-peach px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-peach hover:text-white transition-all flex items-center gap-2 group">
               Lihat Semua <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                <tr>
                  <th className="px-8 py-5">User Profil</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-xl bg-peach/10 flex items-center justify-center text-peach font-black text-xs group-hover:scale-110 transition-transform">
                            {user.name.split(' ').map(n => n[0]).join('')}
                         </div>
                         <div>
                            <p className="text-sm font-black text-gray-900">{user.name}</p>
                            <p className="text-[10px] font-medium text-gray-400">{user.email}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${user.role === 'Admin' ? 'bg-indigo-50 text-indigo-500' : 'bg-gray-50 text-gray-500'}`}>
                            {user.role}
                        </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit ${user.status === 'Active' ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-peach transition-colors">
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                        <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity Sidebar */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-2">
                    <Activity className="text-indigo-400 h-5 w-5" /> Aktivitas Sistem
                </h3>
                <div className="space-y-6">
                    {[
                        { time: "10:45", event: "User baru bergabung", desc: "Andi baru saja mendaftar." },
                        { time: "09:30", event: "Laporan masuk", desc: "Circle 'Toxic' dilaporkan." },
                        { time: "08:15", event: "Sesi dihapus", desc: "Admin menghapus sesi spam." },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 relative group">
                            <div className="flex flex-col items-center">
                                <div className="h-2 w-2 rounded-full bg-indigo-400" />
                                {i !== 2 && <div className="w-0.5 h-12 bg-indigo-400/20 my-1" />}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-indigo-400">{item.time}</p>
                                <p className="text-xs font-bold mt-0.5">{item.event}</p>
                                <p className="text-[10px] text-white/50">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Button variant="glass" size="sm" className="w-full mt-8 border-white/10 text-white hover:bg-white/10">
                    Lihat Semua Log
                </Button>
            </div>
            
            {/* Live Monitoring Section */}
            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300 mb-6">Server Health</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-white/40 uppercase">API Status</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs font-bold text-green-400">Stable</span>
                        </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-white/40 uppercase">Database</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs font-bold text-green-400">99.9% Up</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-peach/10 blur-[60px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
