"use client";

import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  Trash2, 
  Search,
  MessageSquare,
  Users,
  Flag,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Form";

export default function ModerateCircles() {
  const activeCircles = [
    { id: 1, title: "Nugas Kalkulus II", creator: "Budi S.", members: 8, reports: 0, status: "Healthy" },
    { id: 2, title: "Main Game Terus", creator: "Siti A.", members: 15, reports: 5, status: "Warning" },
    { id: 3, title: "Belajar React Bareng", creator: "Andi W.", members: 12, reports: 0, status: "Healthy" },
    { id: 4, title: "Spam Link Gak Jelas", creator: "Anonim", members: 2, reports: 12, status: "Critical" },
  ];

  const handleDeleteCircle = (title: string) => {
    toast.error(`Circle "${title}" telah dihapus karena melanggar aturan.`);
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/50 shadow-soft">
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-peach transition-colors" />
          <input 
            type="text" 
            placeholder="Cari circle berdasarkan judul atau creator..." 
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/50 bg-white/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-peach/10 focus:border-peach transition-all text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
            <Button variant="outline" className="flex-1 lg:flex-none flex items-center gap-2 border-white/50 bg-white/30">
                <Filter className="h-4 w-4" /> Filter Status
            </Button>
            <Button className="flex-1 lg:flex-none flex items-center gap-2 bg-gradient-to-r from-peach to-orange-400 border-none shadow-lg shadow-peach/20">
                <ShieldAlert className="h-4 w-4" /> Lihat Semua Laporan
            </Button>
        </div>
      </div>

      {/* Circle List */}
      <div className="grid grid-cols-1 gap-6">
        {activeCircles.map((circle, i) => (
          <motion.div 
            key={circle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`group bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col lg:flex-row justify-between items-center gap-8 ${
                circle.status === 'Critical' ? 'border-red-200 bg-red-50/30' : 'border-white/50'
            } hover:shadow-xl hover:shadow-peach/5 hover:bg-white`}
          >
            {/* Circle Info */}
            <div className="flex items-center gap-6 flex-1 w-full">
              <div className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 ${
                circle.status === 'Healthy' ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-green-200' : 
                circle.status === 'Warning' ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-yellow-200' : 
                'bg-gradient-to-br from-red-400 to-pink-600 text-white shadow-red-200'
              }`}>
                {circle.status === 'Healthy' ? <CheckCircle2 className="h-8 w-8" /> : 
                 circle.status === 'Warning' ? <AlertTriangle className="h-8 w-8" /> : 
                 <ShieldAlert className="h-8 w-8" />}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xl font-black text-gray-900 tracking-tight truncate">{circle.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
                        <Users className="h-3.5 w-3.5" /> {circle.members} Peserta
                    </div>
                    <p className="text-xs font-medium text-gray-400 italic">Dibuat oleh <span className="text-peach font-bold">{circle.creator}</span></p>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="flex items-center gap-10 px-10 border-x border-gray-100/50 w-full lg:w-auto py-4 lg:py-0">
                <div className="text-center">
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Reports</p>
                    <div className={`flex items-center justify-center gap-1.5 text-xl font-black ${circle.reports > 0 ? 'text-red-500' : 'text-gray-300'}`}>
                        <Flag className={circle.reports > 0 ? "h-5 w-5 animate-bounce" : "h-5 w-5"} /> {circle.reports}
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Risk Level</p>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase ${
                        circle.status === 'Healthy' ? 'bg-green-100 text-green-600' : 
                        circle.status === 'Warning' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-red-500 text-white shadow-lg shadow-red-200'
                    }`}>
                        {circle.status}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <button 
                onClick={() => toast.info("Melihat detail chat circle...")}
                className="h-12 w-12 bg-white border border-gray-100 text-gray-400 hover:text-peach hover:border-peach hover:shadow-lg hover:shadow-peach/10 rounded-2xl transition-all flex items-center justify-center"
                title="Lihat Chat"
              >
                <MessageSquare className="h-5 w-5" />
              </button>
              <button 
                onClick={() => toast.info("Pengaturan moderasi...")}
                className="h-12 w-12 bg-white border border-gray-100 text-gray-400 hover:text-lavender hover:border-lavender hover:shadow-lg hover:shadow-lavender/10 rounded-2xl transition-all flex items-center justify-center"
                title="Opsi Lain"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleDeleteCircle(circle.title)}
                className="h-12 px-6 bg-white border border-red-100 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-200 rounded-2xl transition-all flex items-center gap-2 font-bold text-sm"
              >
                <Trash2 className="h-5 w-5" /> Hapus
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
