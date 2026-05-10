"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button, Input } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  Users, 
  Clock, 
  Hash, 
  Lock, 
  Globe, 
  Calendar,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Study",
    type: "Public",
    maxMembers: 10
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
        toast.error("Judul circle gak boleh kosong ya! ❌");
        return;
    }

    setLoading(true);
    toast.loading("Sedang meracik circle baru kamu... 🪄");

    setTimeout(() => {
        setLoading(false);
        toast.dismiss();
        toast.success(`Circle "${formData.title}" berhasil dibuat! 🎉`);
        // Redirect to chat with the new room
        router.push(`/chat?room=${encodeURIComponent(formData.title)}`);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10 pb-20">
        <header className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-3xl bg-peach/10 text-peach mb-2">
                <PlusCircle className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Buat <span className="text-gradient">Circle Baru</span> lo!</h1>
            <p className="text-gray-500 max-w-md mx-auto">Mulai sesi produktif bareng orang-orang sefrekuensi. Gak perlu nunggu diajak, gaskeun sekarang! 🚀</p>
        </header>

        <form onSubmit={handleSubmit} className="glass p-10 rounded-[3rem] space-y-8 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-peach/5 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-lavender/5 blur-3xl rounded-full" />

            <div className="space-y-6 relative z-10">
                <Input 
                    label="Nama Circle / Topik Sesi" 
                    placeholder="Contoh: Nugas React Sat-set"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Kategori</label>
                        <select 
                            className="w-full rounded-2xl border-2 border-transparent bg-white px-4 py-3.5 shadow-sm outline-none focus:border-peach focus:ring-4 focus:ring-peach/10 transition-all text-sm appearance-none"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option>Study</option>
                            <option>Coding</option>
                            <option>Design</option>
                            <option>Gaming</option>
                            <option>Deep Talk</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                           <Users className="h-4 w-4 text-peach" /> Max Peserta
                        </label>
                        <Input 
                            type="number" 
                            min="2" 
                            max="50" 
                            value={formData.maxMembers}
                            onChange={(e) => setFormData({...formData, maxMembers: parseInt(e.target.value)})}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 ml-1">Akses Circle</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, type: 'Public'})}
                            className={cn(
                                "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group",
                                formData.type === 'Public' ? "border-peach bg-peach/5" : "border-gray-50 bg-white hover:border-peach/30"
                            )}
                        >
                            <Globe className={cn("h-6 w-6", formData.type === 'Public' ? "text-peach" : "text-gray-400 group-hover:text-peach")} />
                            <span className={cn("text-xs font-bold", formData.type === 'Public' ? "text-peach" : "text-gray-500")}>Publik</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, type: 'Private'})}
                            className={cn(
                                "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group",
                                formData.type === 'Private' ? "border-lavender bg-lavender/5" : "border-gray-50 bg-white hover:border-lavender/30"
                            )}
                        >
                            <Lock className={cn("h-6 w-6", formData.type === 'Private' ? "text-lavender" : "text-gray-400 group-hover:text-lavender")} />
                            <span className={cn("text-xs font-bold", formData.type === 'Private' ? "text-lavender" : "text-gray-500")}>Privat (Link)</span>
                        </button>
                    </div>
                </div>

                <div className="pt-4">
                    <Button 
                        type="submit" 
                        className="w-full h-16 text-lg shadow-xl shadow-peach/20 bg-gradient-to-r from-peach to-orange-400 border-none"
                        isLoading={loading}
                    >
                        Gaskeun, Buat Sekarang! 🚀
                    </Button>
                    <p className="text-[10px] text-center text-gray-400 mt-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <Sparkles className="h-3 w-3" /> Auto-create chat room & session link
                    </p>
                </div>
            </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
