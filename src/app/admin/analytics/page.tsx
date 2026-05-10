"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight,
  PieChart,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/Form";

export default function AdminAnalytics() {
  const data = [
    { label: "User Baru", value: "420", growth: "+12%", color: "bg-peach" },
    { label: "Sesi Selesai", value: "1,205", growth: "+18%", color: "bg-lavender" },
    { label: "Rata-rata Durasi", value: "2.5 Jam", growth: "+5%", color: "bg-yellow-400" },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-soft"
          >
            <div className="flex justify-between items-center mb-4">
                <div className={`${item.color} p-3 rounded-2xl text-white shadow-lg`}>
                    <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-green-500">{item.growth}</span>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
            <p className="text-3xl font-black text-gray-900 mt-1">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mock Chart Area */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-soft h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <h3 className="font-black text-gray-800 flex items-center gap-2 text-lg">
                    <BarChart3 className="text-peach h-5 w-5" /> Traffic Pengguna Mingguan
                </h3>
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-peach" />
                    <span className="w-3 h-3 rounded-full bg-lavender" />
                </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-4 px-4">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                        className="w-full bg-gradient-to-t from-peach to-orange-300 rounded-t-xl relative group"
                    >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {h * 10} Users
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between mt-6 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
            </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-soft flex flex-col">
            <h3 className="font-black text-gray-800 mb-8 flex items-center gap-2 text-lg">
                <PieChart className="text-lavender h-5 w-5" /> Distribusi Topik Circle
            </h3>
            <div className="space-y-6 flex-1 flex flex-col justify-center">
                {[
                    { label: "Coding", percent: 45, color: "bg-peach" },
                    { label: "Education", percent: 30, color: "bg-lavender" },
                    { label: "Design", percent: 15, color: "bg-yellow-400" },
                    { label: "Others", percent: 10, color: "bg-gray-200" },
                ].map((item) => (
                    <div key={item.label} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="text-gray-900">{item.percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percent}%` }}
                                className={`h-full ${item.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="outline" className="mt-8 border-lavender text-lavender hover:bg-lavender/5">
                Download Report Lengkap <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>
    </div>
  );
}
