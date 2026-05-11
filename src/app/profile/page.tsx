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
  Star,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    bio: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    email: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile({
          name: data.full_name || "",
          username: data.username || user.email?.split('@')[0] || "",
          bio: data.bio || "Lagi fokus belajar produktif bareng AmbisCircle!",
          avatar: data.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
          email: user.email || ""
        });
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.name,
          username: profile.username,
          bio: profile.bio,
          avatar_url: profile.avatar
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success("Profil berhasil diperbarui! ✨");
    } catch (error: any) {
      toast.error(error.message || "Gagal memperbarui profil");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.info("Berhasil keluar...");
    router.push("/");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File terlalu besar! Maksimal 5MB.");
        return;
      }
      
      setUpdating(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        setProfile(prev => ({ ...prev, avatar: publicUrl }));
        
        // Save to DB immediately
        await supabase
          .from('profiles')
          .update({ avatar_url: publicUrl })
          .eq('id', user.id);

        toast.success("Foto profil berhasil diunggah! 📸");
      } catch (error: any) {
        toast.error(error.message || "Gagal mengunggah foto");
      } finally {
        setUpdating(false);
      }
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 text-peach animate-spin" />
          <p className="text-gray-500 font-medium italic">Menyiapkan profil ambismu...</p>
        </div>
      </DashboardLayout>
    );
  }

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
                            disabled={updating}
                            className="absolute bottom-1 right-1 p-3 bg-white rounded-full shadow-lg border border-gray-100 hover:bg-peach hover:text-white transition-all transform hover:scale-110 active:scale-90 disabled:opacity-50"
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
                        <h2 className="text-xl font-bold text-gray-800">{profile.name || "Si Ambis"}</h2>
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
                    
                    <Input label="Email" type="email" value={profile.email} disabled />
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Bio</label>
                        <textarea 
                            className="w-full rounded-2xl border-2 border-transparent bg-white px-4 py-3 shadow-sm outline-none focus:border-peach focus:ring-4 focus:ring-peach/10 transition-all min-h-[100px]"
                            value={profile.bio}
                            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        ></textarea>
                    </div>

                    <Button type="submit" disabled={updating} className="w-full md:w-auto px-10">
                        {updating ? "Menyimpan..." : "Simpan Perubahan ✨"}
                    </Button>
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
