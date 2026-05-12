"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Star, Flame, Users, ArrowUpRight, Target, Award, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Form";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LeaderboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [topCircles, setTopCircles] = useState<any[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('circles')
        .select('*')
        .order('members', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setTopCircles(data || []);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = (title: string) => {
    toast.success(`Berhasil join ke sesi ${title}!`);
    setTimeout(() => {
      router.push(`/chat?room=${encodeURIComponent(title)}`);
    }, 1000);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 text-peach animate-spin" />
          <p className="text-gray-500 font-medium italic">Memuat peringkat terbaik...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10 pb-20">
        <header className="text-center space-y-4">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex p-4 rounded-3xl bg-yellow-400/10 text-yellow-500 mb-2"
            >
                <Trophy className="h-10 w-10 animate-bounce" />
            </motion.div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Leaderboard <span className="text-gradient">Top Circle</span></h1>
            <p className="text-gray-500 max-w-md mx-auto">Inilah circle paling produktif minggu ini. Apakah circle kamu masuk dalam daftar?</p>
        </header>

        {/* Podium Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-10">
            {/* Rank 2 */}
            {topCircles[1] && (
                <Link 
                    href={`/chat?room=${encodeURIComponent(topCircles[1].title)}`}
                    className="block w-full relative z-10 active:scale-95 transition-transform"
                >
                    <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-soft text-center h-[350px] flex flex-col justify-center relative cursor-pointer hover:bg-white transition-all">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-200 p-3 rounded-2xl shadow-lg">
                            <Medal className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="h-20 w-20 rounded-full bg-peach/10 mx-auto mb-4 border-4 border-white flex items-center justify-center font-black text-xl text-peach">2</div>
                        <h3 className="font-bold text-gray-800 line-clamp-1">{topCircles[1].title}</h3>
                        <p className="text-xs text-gray-500">{topCircles[1].members} Anggota</p>
                    </div>
                </Link>
            )}

            {/* Rank 1 */}
            {topCircles[0] && (
                <Link 
                    href={`/chat?room=${encodeURIComponent(topCircles[0].title)}`}
                    className="block w-full relative z-20 active:scale-95 transition-transform"
                >
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-1 rounded-[3rem] shadow-2xl shadow-yellow-200 cursor-pointer hover:scale-[1.02] transition-all">
                        <div className="bg-white rounded-[2.8rem] p-10 text-center h-[420px] w-full flex flex-col justify-center relative">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 p-4 rounded-2xl shadow-xl animate-float">
                                <Crown className="h-8 w-8 text-white" />
                            </div>
                            <div className="h-28 w-28 rounded-full bg-yellow-50 mx-auto mb-6 border-8 border-yellow-100 flex items-center justify-center font-black text-3xl text-yellow-500">1</div>
                            <h3 className="text-xl font-black text-gray-900 line-clamp-2">{topCircles[0].title}</h3>
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <Flame className="text-orange-500 h-4 w-4" />
                                <span className="text-sm font-bold text-orange-500">{topCircles[0].members} Members</span>
                            </div>
                            <div className="mt-8 py-3 bg-yellow-400 rounded-2xl text-white font-bold shadow-lg shadow-yellow-100">
                                Gabung Sesi
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* Rank 3 */}
            {topCircles[2] && (
                <Link 
                    href={`/chat?room=${encodeURIComponent(topCircles[2].title)}`}
                    className="block w-full relative z-10 active:scale-95 transition-transform"
                >
                    <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-soft text-center h-[300px] flex flex-col justify-center relative cursor-pointer hover:bg-white transition-all">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-200 p-3 rounded-2xl shadow-lg">
                            <Star className="h-6 w-6 text-orange-400" />
                        </div>
                        <div className="h-16 w-16 rounded-full bg-lavender/10 mx-auto mb-4 border-4 border-white flex items-center justify-center font-black text-lg text-lavender">3</div>
                        <h3 className="font-bold text-gray-800 line-clamp-1">{topCircles[2].title}</h3>
                        <p className="text-xs text-gray-500">{topCircles[2].members} Anggota</p>
                    </div>
                </Link>
            )}
        </div>

        {/* Remaining Ranks Table */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-soft overflow-hidden mt-12">
            <div className="p-8 border-b border-white/20">
                <h3 className="font-bold text-gray-800">Peringkat Lainnya</h3>
            </div>
            <div className="divide-y divide-white/20">
                {topCircles.slice(3).map((circle, i) => (
                    <Link 
                        key={circle.id}
                        href={`/chat?room=${encodeURIComponent(circle.title)}`}
                        className="block w-full hover:bg-white/40 active:bg-white/60 transition-all cursor-pointer relative z-10"
                    >
                        <div className="flex items-center justify-between p-6 group">
                            <div className="flex items-center gap-6">
                                <span className="font-black text-gray-300 group-hover:text-peach transition-colors text-xl w-8">#{i + 4}</span>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-800">{circle.title}</h4>
                                    <p className="text-[10px] text-gray-400">Owner: {circle.creator_name || "Si Ambis"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-10">
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-700 flex items-center gap-2">
                                        <Users className="h-3 w-3 text-peach" /> {circle.members}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Members</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-peach group-hover:border-peach transition-all">
                                    <ArrowUpRight className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                
                {topCircles.length === 0 && (
                    <div className="p-10 text-center text-gray-400 italic">Belum ada data peringkat</div>
                )}
            </div>
        </div>

        {/* Benefit Section */}
        <div className="pt-10">
            <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">Benefit Menjadi <span className="text-peach">Ambis Master</span> 👑</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Verified Badge", desc: "Dapatkan lencana emas di profil dan circle kamu.", icon: Star },
                    { title: "Featured Spot", desc: "Circle kamu akan selalu tampil di urutan teratas.", icon: Target },
                    { title: "Special Points", desc: "Tukarkan poin dengan tema room premium.", icon: Award },
                ].map((benefit, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + (i * 0.1) }}
                        className="glass p-8 rounded-[2rem] text-center space-y-3"
                    >
                        <div className="h-12 w-12 bg-peach/10 rounded-2xl flex items-center justify-center text-peach mx-auto">
                            <benefit.icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{benefit.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
