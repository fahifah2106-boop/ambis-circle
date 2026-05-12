"use client";

import { Button, Input } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { BookOpen, User, Mail, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '',
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Gagal login dengan Google");
      setIsLoading(false);
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.username) newErrors.username = "Username wajib diisi";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email tidak valid";
    if (formData.password.length < 8) newErrors.password = "Password minimal 8 karakter";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    
    try {
      // 1. Sign Up User
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            username: formData.username
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create Profile in 'profiles' table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.fullName,
            username: formData.username,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authData.user.id}`
          });
        
        if (profileError) {
          console.error("Profile creation error:", profileError);
          // We don't throw here to allow user to still login if profile creation failed but auth succeeded
        }
      }

      toast.success("Akun berhasil dibuat! Silakan cek email atau langsung login.");
      router.push("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Gagal membuat akun. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-6">
      <Toaster position="top-center" richColors />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass p-8 md:p-12 rounded-[2.5rem] shadow-glass"
      >
        {/* Logo Moved Inside Card */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-peach p-2.5 rounded-2xl shadow-lg">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">AmbisCircle</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-xl font-extrabold text-gray-900">Buat Akun Baru 📝</h1>
          <p className="text-gray-500 mt-2">Gabung ke circle produktif favoritmu sekarang.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Input 
              label="Nama Lengkap" 
              placeholder="Contoh: Budi Santoso"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              error={errors.fullName}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
             <Input 
              label="Username" 
              placeholder="budisans"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              error={errors.username}
            />
             <Input 
              label="Email" 
              type="email"
              placeholder="budi@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              error={errors.email}
            />
          </div>

          <Input 
            label="Password" 
            type="password"
            placeholder="Minimal 8 karakter"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            error={errors.password}
          />

          <Input 
            label="Konfirmasi Password" 
            type="password"
            placeholder="Ulangi password kamu"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            error={errors.confirmPassword}
          />

          <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
            Daftar Sekarang ✨
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/50 px-2 text-gray-500 backdrop-blur-sm">Atau daftar dengan</span>
            </div>
          </div>

          <div className="w-full">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all hover:bg-gray-50 active:scale-95 shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
              Daftar dengan Google
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-bold text-peach hover:underline">
            Login di sini
          </Link>
        </p>

        <div className="mt-10 text-center">
            <p className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">© 2026 AmbisCircle — Solusi Produktif</p>
        </div>
      </motion.div>
    </div>
  );
}
