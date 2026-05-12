"use client";

import { Button, Input } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { BookOpen, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Login berhasil! Selamat datang kembali.");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Email atau password salah. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-6">
      <Toaster position="top-center" richColors />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-10 rounded-[2.5rem] shadow-glass"
      >
        {/* Logo Moved Inside Card */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-peach p-2.5 rounded-2xl shadow-lg">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">AmbisCircle</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-xl font-extrabold text-gray-900">Halo Lagi! 👋</h1>
          <p className="text-gray-500 mt-2">Udah siap buat produktif hari ini?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Email" 
            type="email"
            placeholder="budi@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <Input 
            label="Password" 
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <div className="flex justify-end">
            <Link href="#" className="text-xs font-bold text-peach hover:underline">
              Lupa Password?
            </Link>
          </div>

          <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
            Masuk 🚀
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/50 px-2 text-gray-500 backdrop-blur-sm">Atau masuk dengan</span>
            </div>
          </div>

          <div className="w-full">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all hover:bg-gray-50 active:scale-95 shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
              Masuk dengan Google
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-peach hover:underline">
            Daftar Gratis
          </Link>
        </p>

        <div className="mt-12 text-center">
            <p className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">© 2026 AmbisCircle — Solusi Produktif</p>
        </div>
      </motion.div>
    </div>
  );
}
