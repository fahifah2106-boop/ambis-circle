"use client";

import { Button, Input } from "@/components/ui/Form";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Auth Logic
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        if (formData.email === "admin@ambis.com") {
          toast.success("Welcome back, Admin!");
          router.push("/admin");
        } else if (formData.email && formData.password.length >= 8) {
          toast.success("Login berhasil!");
          router.push("/dashboard");
        } else {
          toast.error("Email atau password salah.");
        }
      } else {
        toast.success("Akun berhasil dibuat! Silakan masuk.");
        setIsLogin(true);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-6 overflow-hidden">
      <Toaster position="top-center" richColors />
      
      <div className="absolute top-10 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-peach p-2.5 rounded-2xl shadow-lg">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">AmbisCircle</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="w-full max-w-md glass p-10 rounded-[3rem] shadow-glass relative z-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {isLogin ? "Halo Lagi! 👋" : "Gabung Yuk! 🚀"}
            </h1>
            <p className="text-gray-500 text-sm">
              {isLogin ? "Udah siap buat produktif hari ini?" : "Cari circle ambis kamu dan mulai berprogres."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <Input 
                label="Nama Lengkap" 
                placeholder="Budi Santoso"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            )}
            
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

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-peach hover:underline">
                  Lupa Password?
                </button>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              {isLogin ? "Masuk 🚀" : "Daftar Sekarang ✨"}
            </Button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/40 px-2 text-gray-400 backdrop-blur-sm">Opsi lainnya</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white/50 px-4 py-2.5 text-sm font-medium transition-all hover:bg-white active:scale-95">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white/50 px-4 py-2.5 text-sm font-medium transition-all hover:bg-white active:scale-95">
                <img src="https://assets-global.website-files.com/6257adef93867e3d0394e366/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" alt="Discord" className="h-4 w-4" />
                Discord
              </button>
            </div>
          </div>

          <p className="text-center mt-10 text-sm text-gray-500">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-peach hover:underline"
            >
              {isLogin ? "Daftar Gratis" : "Masuk di sini"}
            </button>
          </p>

          {isLogin && (
            <div className="mt-8 pt-8 border-t border-white/30 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Demo Access</p>
              <div className="flex justify-center gap-2">
                <button 
                  type="button"
                  onClick={() => setFormData({ fullName: '', email: 'admin@ambis.com', password: 'password123' })}
                  className="px-3 py-1 bg-white/50 rounded-lg text-[10px] font-bold hover:bg-white transition-colors"
                >
                  Admin Account
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({ fullName: '', email: 'user@ambis.com', password: 'password123' })}
                  className="px-3 py-1 bg-white/50 rounded-lg text-[10px] font-bold hover:bg-white transition-colors"
                >
                  User Account
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative Circles */}
      <div className="fixed -bottom-20 -left-20 w-96 h-96 bg-peach/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed -top-20 -right-20 w-96 h-96 bg-lavender/20 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
