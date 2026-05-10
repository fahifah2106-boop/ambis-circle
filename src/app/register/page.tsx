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
