"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  TrendingUp, 
  Clock, 
  Award,
  Users,
  Calendar,
  ChevronRight,
  Flag
} from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "sonner";

export default function UserDashboard() {
  const stats = [
    { label: "Sesi Diikuti", value: "12", icon: Calendar, color: "bg-peach" },
    { label: "Circle Aktif", value: "3", icon: Users, color: "bg-lavender" },
    { label: "Level Ambis", value: "Pro", icon: Award, color: "bg-yellow-400" },
  ];

  const recommendedSessions = [
    { id: 1, title: "Belajar React Bareng", category: "Coding", time: "19:00 WIB", tags: ["React", "Frontend"] },
    { id: 2, title: "Nugas Kalkulus II", category: "Edukasi", time: "15:30 WIB", tags: ["Math", "Kampus"] },
    { id: 3, title: "Coworking Online", category: "Produktif", time: "09:00 WIB", tags: ["Work", "Relax"] },
  ];

  return (
    <DashboardLayout>
      <Toaster position="top-right" richColors />
      <div className="max-w-6xl mx-auto space-y-8 pb-24 lg:pb-0">
        {/* Welcome Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Halo, User Ambis! 👋</h1>
            <p className="text-gray-500">Siap ngerjain apa hari ini? Ada 15 sesi baru yang cocok buat kamu.</p>
          </div>
          <Link href="/create-session">
            <Button className="w-full md:w-auto shadow-xl">
              <Plus className="mr-2 h-5 w-5" /> Buat Sesi Baru
            </Button>
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.button 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                import('sonner').then(({ toast }) => toast.info(`Detail ${stat.label} akan muncul di sini.`));
              }}
              className="glass p-6 rounded-3xl flex items-center gap-6 text-left w-full transition-all border-none"
            >
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Recommended Sessions */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-peach h-5 w-5" /> Rekomendasi Buat Kamu ✨
            </h2>
            <Link href="/explore" className="text-sm font-bold text-peach flex items-center gap-1 hover:underline">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedSessions.map((session, i) => (
              <motion.div 
                key={session.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[2rem] shadow-soft border border-gray-50 group transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-peach/10 text-peach text-[10px] font-bold uppercase tracking-wider">
                      {session.category}
                    </span>
                    <button 
                        onClick={() => toast.warning(`Circle "${session.title}" telah dilaporkan.`)}
                        className="p-1 text-gray-300 hover:text-red-400 transition-colors"
                        title="Laporkan"
                    >
                        <Flag className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                    <Clock className="h-3 w-3" /> {session.time}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-peach transition-colors">{session.title}</h3>
                
                <div className="flex gap-2 mb-6 flex-wrap">
                  {session.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-gray-400">#{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-7 w-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + session.id}`} alt="participant" />
                      </div>
                    ))}
                    <div className="h-7 w-7 rounded-full border-2 border-white bg-peach/10 text-peach text-[8px] font-bold flex items-center justify-center">
                      +5
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-xl group-hover:bg-peach group-hover:text-white transition-all"
                    onClick={() => {
                        import('sonner').then(({ toast }) => {
                            toast.success(`Berhasil join ke sesi ${session.title}! Mengalihkan ke Chat Room...`);
                            setTimeout(() => {
                                window.location.href = `/chat?room=${encodeURIComponent(session.title)}`;
                            }, 1000);
                        });
                    }}
                  >
                    Join
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Empty State Mock */}
        <section className="bg-white/40 border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center">
             <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="text-gray-400 h-10 w-10" />
             </div>
             <h3 className="text-lg font-bold text-gray-800">Cari Circle Lainnya?</h3>
             <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2">Masih banyak circle produktif yang nungguin kamu buat join. Cek halaman eksplor yuk!</p>
             <Link href="/explore">
                <Button variant="ghost" className="mt-6">Buka Halaman Eksplor</Button>
             </Link>
        </section>
      </div>
    </DashboardLayout>
  );
}
