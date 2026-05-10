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
import { useState, useRef } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState({
    name: "User Ambis",
    username: "userambis_2026",
    bio: "Lagi fokus belajar React dan UI Design. Yuk nugas bareng!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil berhasil diperbarui! ✨");
  };

  const handleLogout = () => {
      toast.info("Logging out...");
      setTimeout(() => router.push("/"), 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File terlalu besar! Maksimal 2MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
        toast.success("Foto profil berhasil diunggah! 📸");
      };
      reader.readAsDataURL(file);
    }
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
                    <div className="relative inline-block group">
                        <div className="h-32 w-32 rounded-full bg-peach/20 overflow-hidden border-4 border-white shadow-soft mx-auto transition-transform group-hover:scale-105">
                            <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
                        </div>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 p-3 bg-white rounded-full shadow-lg border border-gray-100 hover:bg-peach hover:text-white transition-all transform hover:scale-110 active:scale-90"
                        >
                            <Camera className="h-5 w-5" />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            accept="image/*" 
                            className="hidden" 
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                        <p className="text-sm text-gray-500">@{profile.username}</p>
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
                        <Input 
                            label="Nama Lengkap" 
                            value={profile.name} 
                            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))} 
                        />
                        <Input 
                            label="Username" 
                            value={profile.username}
                            onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))} 
                        />
                    </div>
                    
                    <Input label="Email" type="email" defaultValue="user@ambis.com" disabled />
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Bio</label>
                        <textarea 
                            className="w-full rounded-2xl border-2 border-transparent bg-white px-4 py-3 shadow-sm outline-none focus:border-peach focus:ring-4 focus:ring-peach/10 transition-all min-h-[100px]"
                            value={profile.bio}
                            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
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
