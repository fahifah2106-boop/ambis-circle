"use client";

import { Button, Input } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { BookOpen, User, Mail, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

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
    
    // Simulate Supabase Register
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Akun berhasil dibuat! Silakan login.");
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-6">
      <Toaster position="top-center" richColors />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass p-8 md:p-12 rounded-[2.5rem] shadow-glass"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-peach p-2 rounded-xl">
              <BookOpen className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-800">AmbisCircle</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">Buat Akun Baru 📝</h1>
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

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50 active:scale-95">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50 active:scale-95">
              <img src="https://assets-global.website-files.com/6257adef93867e3d0394e366/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" alt="Discord" className="h-4 w-4" />
              Discord
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-bold text-peach hover:underline">
            Login di sini
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
