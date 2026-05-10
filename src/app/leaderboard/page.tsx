"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Star, Flame, Users, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Form";

export default function LeaderboardPage() {
  const topCircles = [
    { id: 1, name: "Pejuang Skripsi 2024", owner: "Andi Wijaya", hours: 450, members: 42, growth: "+12%" },
    { id: 2, name: "Coding Beast", owner: "Budi Santoso", hours: 380, members: 28, growth: "+8%" },
    { id: 3, name: "English Talk Zone", owner: "Siti Aminah", hours: 310, members: 56, growth: "+15%" },
    { id: 4, name: "Math Wizards", owner: "Rina Kartika", hours: 290, members: 12, growth: "+5%" },
    { id: 5, name: "Design Jam Session", owner: "Eko Prasetyo", hours: 240, members: 18, growth: "+2%" },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-10">
            {/* Rank 2 */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-soft text-center h-[350px] flex flex-col justify-center relative order-2 md:order-1"
            >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-200 p-3 rounded-2xl shadow-lg">
                    <Medal className="h-6 w-6 text-gray-400" />
                </div>
                <div className="h-20 w-20 rounded-full bg-peach/10 mx-auto mb-4 border-4 border-white flex items-center justify-center font-black text-xl text-peach">2</div>
                <h3 className="font-bold text-gray-900">{topCircles[1].name}</h3>
                <p className="text-xs text-gray-500">{topCircles[1].hours} Jam Produktif</p>
            </motion.div>

            {/* Rank 1 */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-gradient-to-br from-yellow-400 to-orange-400 p-1 rounded-[3rem] shadow-2xl shadow-yellow-200 order-1 md:order-2"
            >
                <div className="bg-white rounded-[2.8rem] p-10 text-center h-[420px] flex flex-col justify-center relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 p-4 rounded-2xl shadow-xl animate-float">
                        <Crown className="h-8 w-8 text-white" />
                    </div>
                    <div className="h-28 w-28 rounded-full bg-yellow-50 mx-auto mb-6 border-8 border-yellow-100 flex items-center justify-center font-black text-3xl text-yellow-500">1</div>
                    <h3 className="text-xl font-black text-gray-900">{topCircles[0].name}</h3>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <Flame className="text-orange-500 h-4 w-4" />
                        <span className="text-sm font-bold text-orange-500">{topCircles[0].hours} Jam</span>
                    </div>
                    <Button className="mt-8 bg-yellow-400 border-none hover:bg-yellow-500 shadow-lg shadow-yellow-100">Gabung Sesi</Button>
                </div>
            </motion.div>

            {/* Rank 3 */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-soft text-center h-[300px] flex flex-col justify-center relative order-3"
            >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-200 p-3 rounded-2xl shadow-lg">
                    <Star className="h-6 w-6 text-orange-400" />
                </div>
                <div className="h-16 w-16 rounded-full bg-lavender/10 mx-auto mb-4 border-4 border-white flex items-center justify-center font-black text-lg text-lavender">3</div>
                <h3 className="font-bold text-gray-900">{topCircles[2].name}</h3>
                <p className="text-xs text-gray-500">{topCircles[2].hours} Jam Produktif</p>
            </motion.div>
        </div>

        {/* Remaining Ranks Table */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-soft overflow-hidden mt-12">
            <div className="p-8 border-b border-white/20">
                <h3 className="font-bold text-gray-800">Peringkat 4 - 10</h3>
            </div>
            <div className="divide-y divide-white/20">
                {topCircles.slice(3).map((circle, i) => (
                    <motion.div 
                        key={circle.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.6 }}
                        className="flex items-center justify-between p-6 hover:bg-white/40 transition-all group"
                    >
                        <div className="flex items-center gap-6">
                            <span className="font-black text-gray-300 group-hover:text-peach transition-colors text-xl w-8">#{i + 4}</span>
                            <div>
                                <h4 className="font-bold text-gray-800">{circle.name}</h4>
                                <p className="text-[10px] text-gray-400">Owner: {circle.owner}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-700 flex items-center gap-2">
                                    <Users className="h-3 w-3 text-peach" /> {circle.members}
                                </p>
                                <p className="text-[10px] text-gray-400">Members</p>
                            </div>
                            <button className="h-10 w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-peach hover:border-peach transition-all">
                                <ArrowUpRight className="h-5 w-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
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
