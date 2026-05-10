"use client";

import { Button } from "@/components/ui/Form";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Users, 
  BookOpen, 
  Coffee, 
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-mesh overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full glass px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-peach p-2 rounded-xl">
              <BookOpen className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-gradient">AmbisCircle</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-peach transition-colors">Fitur</Link>
            <Link href="#about" className="hover:text-peach transition-colors">Tentang</Link>
            <Link href="#recommendations" className="hover:text-peach transition-colors">Rekomendasi</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button>Daftar Sekarang</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-peach/10 text-peach border border-peach/20 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Platform Belajar Gen Z #1</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
              Cari <span className="text-gradient">Circle Ambis</span> <br /> 
              Tanpa Drama. ✨
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Temukan partner nugas, temen belajar bareng, sampe circle produktif yang sefrekuensi sama minat kamu. Belajar lebih seru, nugas jadi ringan! 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Gabung Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Eksplor Sesi
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-lavender/30 flex items-center justify-center overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">1,200+</span> User produktif sudah bergabung
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-soft/30 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-lavender/30 blur-3xl rounded-full" />
            
            <div className="glass p-6 rounded-[2rem] shadow-glass relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-pastel p-2 rounded-xl">
                    <Coffee className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Nugas Bareng UI/UX</h3>
                    <p className="text-xs text-gray-500">Kategori: Desain</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold">LIVE</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  {['Figma', 'Productive', 'Design'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs">#{tag}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">"Woi ada yang lagi ngerjain project akhir ga? Join yuk, biar ga ngantuk ngerjainnya sendirian!"</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-peach/20 overflow-hidden">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=creator" alt="Creator" />
                    </div>
                    <span className="text-xs font-medium">Budi Santoso</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => {
                        import('sonner').then(({ toast }) => {
                            toast.success("Join Sesi berhasil! Mengalihkan...");
                            setTimeout(() => window.location.href = '/login', 1000);
                        });
                    }}
                  >
                    Join Sesi
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-4 top-1/4 glass p-4 rounded-2xl shadow-xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-400 rounded-full flex items-center justify-center text-white">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Pesan Baru</p>
                  <p className="text-[10px] text-gray-500">"Woi join Discord nya dong!"</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Kenapa Harus <span className="text-gradient">AmbisCircle?</span></h2>
            <p className="text-gray-500">Fitur yang didesain khusus buat kamu yang pengen tetep produktif tapi tetep santai.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-peach" />}
              title="Circle Sesuai Minat"
              description="Dari coding sampe gym bareng, temukan orang-orang dengan passion yang sama."
              color="peach"
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-lavender" />}
              title="Verified & Aman"
              description="Sistem moderasi admin yang ketat buat mastiin circle kamu tetep sehat dan produktif."
              color="lavender"
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="Realtime Interaction"
              description="Chat langsung di dalam sesi biar koordinasi nugas jadi lebih gampang dan asik."
              color="yellow-pastel"
            />
          </div>
        </div>
      </section>

      {/* Recommendations / About Mockup */}
      <section id="recommendations" className="py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">Rekomendasi <span className="text-gradient">Circle</span> Minggu Ini</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => (
                    <div key={i} className="glass p-6 rounded-3xl border border-white/50 text-left">
                        <div className="h-12 w-12 bg-peach/10 rounded-2xl flex items-center justify-center mb-4 text-peach font-bold">#{i}</div>
                        <h4 className="font-bold mb-2">Circle Belajar #{i}</h4>
                        <p className="text-xs text-gray-500 mb-4">Gabung bareng {i * 5} user lainnya yang lagi produktif.</p>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full text-xs"
                            onClick={() => {
                                import('sonner').then(({ toast }) => toast.success("Segera hadir di versi aplikasi!"));
                            }}
                        >
                            Lihat Detail
                        </Button>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-peach p-1.5 rounded-lg">
              <BookOpen className="text-white h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-gray-800">AmbisCircle</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 AmbisCircle. Dibuat dengan ❤️ untuk Gen Z Indonesia.</p>
          <div className="flex gap-6 text-gray-400">
            <Link href="#" className="hover:text-peach transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-peach transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-peach transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-8 rounded-3xl bg-white shadow-soft border border-gray-100"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-${color}/10`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}
