"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Search, 
  PlusCircle, 
  User, 
  LogOut, 
  MessageSquare,
  Settings,
  BookOpen,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    name: "User Ambis",
    email: "user@ambis.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setUserProfile({
          name: profile.full_name || "User Ambis",
          email: user.email || "user@ambis.com",
          avatar: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
        });
      } else {
        setUserProfile(prev => ({ ...prev, email: user.email || "user@ambis.com" }));
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.info("Berhasil keluar...");
    setTimeout(() => {
        router.push("/");
    }, 1000);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    { icon: PlusCircle, label: "Buat Sesi", href: "/create-session" },
    { icon: MessageSquare, label: "Chat Room", href: "/chat" },
    { icon: User, label: "Profil", href: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-cream-light flex">
      <Toaster position="top-right" richColors />
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 flex-col glass m-4 rounded-[2rem] shadow-glass border-none fixed h-[calc(100vh-2rem)] z-40">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-peach p-2 rounded-xl">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-bold text-gradient">AmbisCircle</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 font-medium",
                  isActive 
                    ? "bg-peach text-white shadow-soft" 
                    : "text-gray-500 hover:bg-white/50 hover:text-peach"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <Link href="/profile" className="bg-white/50 rounded-2xl p-4 mb-4 flex items-center gap-3 border border-white/50 hover:bg-white hover:shadow-soft transition-all group">
             <div className="h-10 w-10 rounded-full bg-lavender/30 overflow-hidden shrink-0">
                <img src={userProfile.avatar} alt="Avatar" />
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-bold truncate group-hover:text-peach transition-colors">{userProfile.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{userProfile.email}</p>
             </div>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-red-400 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 p-4 lg:p-8">
        {children}
      </main>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 glass h-20 rounded-2xl flex items-center justify-around px-4 z-50 shadow-glass">
        {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  isActive ? "bg-peach text-white" : "text-gray-400"
                )}
              >
                <item.icon className="h-6 w-6" />
              </Link>
            );
        })}
      </nav>
    </div>
  );
}
