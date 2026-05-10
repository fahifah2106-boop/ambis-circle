"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button, Input } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { 
  User, 
  Settings, 
  Award, 
  Clock, 
  Calendar,
  Camera,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil berhasil diperbarui! ✨");
  };

  const handleLogout = () => {
      toast.info("Logging out...");
      setTimeout(() => router.push("/"), 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-24 lg:pb-0">
        <header>
            <h1 className="text-3xl font-extrabold text-gray-900">Profil Saya 👤</h1>
            <p className="text-gray-500">Kelola informasi akun dan preferensi belajarmu.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar Profile */}
            <div className="lg:col-span-1 space-y-6">
                <div className="glass p-8 rounded-[2.5rem] text-center space-y-4">
                    <div className="relative inline-block">
                        <div className="h-24 w-24 rounded-full bg-peach/20 overflow-hidden border-4 border-white shadow-soft mx-auto">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="Profile" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 transition-all">
                            <Camera className="h-4 w-4 text-peach" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">User Ambis</h2>
                        <p className="text-sm text-gray-500">@userambis_2026</p>
                    </div>
                    <div className="flex justify-center gap-2">
                        <div className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-[10px] font-bold flex items-center gap-1">
                            <Award className="h-3 w-3" /> Pro Member
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-[2.5rem] space-y-2">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Statistik</h3>
                    {[
                        { label: 'Total Sesi', value: '42', icon: Clock, color: 'text-peach' },
                        { label: 'Followers', value: '128', icon: User, color: 'text-lavender' },
                        { label: 'Rating', value: '4.9', icon: Star, color: 'text-yellow-500' },
                    ].map((stat) => (
                        <div key={stat.label} className="flex justify-between items-center p-3 rounded-2xl hover:bg-white/50 transition-all">
                            <div className="flex items-center gap-3">
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                            </div>
                            <span className="font-bold text-gray-900">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Profile Settings */}
            <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleUpdate} className="glass p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-peach" /> Pengaturan Dasar
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Nama Lengkap" defaultValue="User Ambis" />
                        <Input label="Username" defaultValue="userambis_2026" />
                    </div>
                    
                    <Input label="Email" type="email" defaultValue="user@ambis.com" disabled />
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Bio</label>
                        <textarea 
                            className="w-full rounded-2xl border-2 border-transparent bg-white px-4 py-3 shadow-sm outline-none focus:border-peach focus:ring-4 focus:ring-peach/10 transition-all min-h-[100px]"
                            defaultValue="Lagi fokus belajar React dan UI Design. Yuk nugas bareng!"
                        ></textarea>
                    </div>

                    <Button type="submit" className="w-full md:w-auto px-10">Simpan Perubahan ✨</Button>
                </form>

                <div className="glass p-8 rounded-[2.5rem] space-y-6">
                     <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-green-500" /> Keamanan & Akun
                    </h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-dashed border-gray-100 hover:border-peach/50 hover:bg-white/50 transition-all group">
                            <span className="text-sm font-bold text-gray-600 group-hover:text-peach">Ganti Password</span>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-peach" />
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-dashed border-red-50 hover:border-red-200 hover:bg-red-50 transition-all group"
                        >
                            <span className="text-sm font-bold text-red-400">Keluar dari Akun</span>
                            <LogOut className="h-4 w-4 text-red-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
