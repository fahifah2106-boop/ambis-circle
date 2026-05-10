"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button, Input } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { Rocket, Image as ImageIcon, Tags, Users, Calendar } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateSessionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        toast.success("Sesi berhasil dibuat! 🚀");
        router.push("/dashboard");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 pb-24 lg:pb-0">
        <header>
            <h1 className="text-3xl font-extrabold text-gray-900">Buat Sesi Baru ➕</h1>
            <p className="text-gray-500">Mulai circle produktif kamu sendiri sekarang.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass p-8 rounded-[2rem] space-y-6">
                <Input label="Judul Sesi" placeholder="Contoh: Nugas Front-end Bareng" required />
                
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Kategori</label>
                    <select className="w-full rounded-2xl border-2 border-transparent bg-white px-4 py-3 shadow-sm outline-none focus:border-peach focus:ring-4 focus:ring-peach/10 transition-all">
                        <option>Belajar Bareng 📖</option>
                        <option>Nugas Bareng 💻</option>
                        <option>Coworking Online ☕</option>
                        <option>Diskusi Coding 👨‍💻</option>
                        <option>Gym Bareng 🏋️</option>
                        <option>Nongkrong Produktif 🎯</option>
                    </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Tanggal" type="date" required />
                    <Input label="Waktu" type="time" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Deskripsi Sesi</label>
                    <textarea 
                        className="w-full rounded-2xl border-2 border-transparent bg-white px-4 py-3 shadow-sm outline-none focus:border-peach focus:ring-4 focus:ring-peach/10 transition-all min-h-[120px]"
                        placeholder="Jelasin apa yang bakal dilakuin di sesi ini..."
                    ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                     <Input label="Max Peserta" type="number" placeholder="Contoh: 5" icon={<Users />} />
                     <Input label="Tags (Pisahkan koma)" placeholder="coding, react, uiux" icon={<Tags />} />
                </div>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" type="button" className="flex-1" onClick={() => router.back()}>Batal</Button>
                <Button type="submit" className="flex-[2]" isLoading={isLoading}>Publikasikan Sesi ✨</Button>
            </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
