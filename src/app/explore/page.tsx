"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button, Input } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Flame,
  ArrowUpRight,
  TrendingUp,
  Award,
  Flag,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("trending");
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSessions();
  }, [activeTab]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      let query = supabase.from('circles').select('*');
      
      if (activeTab === 'trending') {
        query = query.order('members', { ascending: false });
      } else if (activeTab === 'new') {
        query = query.order('created_at', { ascending: false });
      }
      
      const { data, error } = await query.limit(20);
      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = (title: string) => {
    toast.success(`Berhasil bergabung ke sesi ${title}! ✨`);
    setTimeout(() => {
        router.push(`/chat?room=${encodeURIComponent(title)}`);
    }, 1000);
  };

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-24 lg:pb-0">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Eksplor Sesi 🔎</h1>
            <p className="text-gray-500">Temukan circle produktif yang paling pas buat kamu.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder="Cari topik atau kategori..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="px-4">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'trending', label: 'Trending', icon: Flame },
            { id: 'new', label: 'Terbaru', icon: Clock },
            { id: 'followed', label: 'Diikuti', icon: Users },
            { id: 'top', label: 'Top Mentor', icon: Award },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all font-bold text-sm ${
                activeTab === tab.id 
                  ? "bg-peach text-white shadow-soft scale-105" 
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid Sessions */}
        {loading ? (
            <div className="h-[40vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-10 w-10 text-peach animate-spin" />
                <p className="text-gray-500 italic">Mencari circle terbaik...</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session, i) => (
                <motion.div
                key={session.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleJoin(session.title)}
                className="bg-white p-6 rounded-[2.5rem] shadow-soft border border-gray-50 group flex flex-col cursor-pointer hover:shadow-lg transition-all"
                >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-lavender/10 text-lavender text-[10px] font-bold uppercase tracking-wider">
                        {session.category}
                    </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                toast.warning(`Circle "${session.title}" telah dilaporkan ke admin. Terima kasih atas laporannya! 🛡️`);
                            }}
                            className="p-1.5 text-gray-300 hover:text-red-400 transition-colors"
                            title="Laporkan Circle"
                        >
                            <Flag className="h-4 w-4" />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden border-2 border-white">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.creator_name || session.id}`} alt="creator" />
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-peach transition-colors truncate">
                    {session.title}
                </h3>
                <p className="text-[10px] text-gray-400 mb-4 italic">Dibuat oleh {session.creator_name || "Si Ambis"}</p>

                <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1 font-medium">
                        <Users className="h-3 w-3 text-peach" /> {session.members}/{session.max_members} Peserta
                    </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                        className="bg-peach h-full rounded-full transition-all" 
                        style={{ width: `${(session.members/session.max_members) * 100}%` }}
                    />
                    </div>

                    <Button 
                    className="w-full rounded-2xl group-hover:shadow-lg transition-all"
                    variant={session.members >= session.max_members ? "outline" : "primary"}
                    disabled={session.members >= session.max_members}
                    >
                    {session.members >= session.max_members ? "Penuh" : "Join Sesi Sekarang"}
                    </Button>
                </div>
                </motion.div>
            ))}
            </div>
        )}

        {/* Call to action */}
        <section className="bg-peach/10 border-2 border-peach/20 rounded-[2.5rem] p-10 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gak nemu circle yang cocok?</h3>
            <p className="text-sm text-gray-500 mb-6">Buat circle kamu sendiri dan ajak temen-temen buat nugas bareng!</p>
            <Button onClick={() => router.push('/create-session')} className="rounded-2xl">
               Buat Sesi Kamu Sendiri <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
        </section>
      </div>
    </DashboardLayout>
  );
}
