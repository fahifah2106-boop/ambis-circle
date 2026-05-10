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
  Flag
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("trending");

  const sessions = [
    { id: 1, title: "Belajar React & Next.js", creator: "Budi S.", category: "Coding", members: 8, max: 10, time: "LIVE", tags: ["React", "JS"], level: "Intermediate" },
    { id: 2, title: "Nugas Kalkulus II", creator: "Siti A.", category: "Education", members: 4, max: 5, time: "15:00", tags: ["Math", "Study"], level: "Basic" },
    { id: 3, title: "UI/UX Design Jam", creator: "Andi W.", category: "Design", members: 12, max: 20, time: "LIVE", tags: ["Figma", "UIUX"], level: "All Levels" },
    { id: 4, title: "Morning Workout", creator: "Rina K.", category: "Health", members: 3, max: 10, time: "07:00", tags: ["Gym", "Sport"], level: "Beginner" },
    { id: 5, title: "English Conversation", creator: "Eko P.", category: "Language", members: 6, max: 8, time: "20:00", tags: ["English", "Talk"], level: "Advanced" },
    { id: 6, title: "Side Project Sync", creator: "Doni R.", category: "Productive", members: 2, max: 4, time: "19:30", tags: ["Startup", "Build"], level: "Intermediate" },
  ];

  const handleJoin = (id: number) => {
    toast.success(`Berhasil bergabung ke sesi #${id}! ✨`);
  };

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
              <Input className="pl-10" placeholder="Cari topik atau mentor..." />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[2.5rem] shadow-soft border border-gray-50 group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-lavender/10 text-lavender text-[10px] font-bold uppercase tracking-wider">
                    {session.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-lg text-[8px] font-bold ${
                    session.time === 'LIVE' ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {session.time}
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
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.creator}`} alt="creator" />
                    </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-peach transition-colors truncate">
                {session.title}
              </h3>
              
              <div className="flex gap-2 mb-4 flex-wrap">
                {session.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-gray-400">#{tag}</span>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                   <div className="flex items-center gap-1 font-medium">
                     <Users className="h-3 w-3 text-peach" /> {session.members}/{session.max} Peserta
                   </div>
                   <div className="font-bold text-gray-400">{session.level}</div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                   <div 
                    className="bg-peach h-full rounded-full" 
                    style={{ width: `${(session.members/session.max) * 100}%` }}
                   />
                </div>

                <Button 
                  onClick={() => handleJoin(session.id)}
                  className="w-full rounded-2xl group-hover:shadow-lg transition-all"
                  variant={session.members >= session.max ? "outline" : "primary"}
                  disabled={session.members >= session.max}
                >
                  {session.members >= session.max ? "Penuh" : "Join Sesi Sekarang"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <section className="bg-peach/10 border-2 border-peach/20 rounded-[2.5rem] p-10 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gak nemu circle yang cocok?</h3>
            <p className="text-sm text-gray-500 mb-6">Buat circle kamu sendiri dan ajak temen-temen buat nugas bareng!</p>
            <Button onClick={() => window.location.href='/create-session'} className="rounded-2xl">
               Buat Sesi Kamu Sendiri <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
        </section>
      </div>
    </DashboardLayout>
  );
}
