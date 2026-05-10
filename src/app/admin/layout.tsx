"use client";

import { 
  Users, 
  Layers, 
  BarChart3, 
  Activity,
  BookOpen,
  LogOut,
  ShieldCheck,
  Search,
  Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: Layers },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "Moderate Circles", href: "/admin/sessions", icon: ShieldCheck },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F3] flex flex-col md:flex-row font-sans selection:bg-peach/30">
      <Toaster position="top-right" richColors />
      
      {/* Premium Sidebar */}
      <aside className="w-full md:w-72 bg-white/80 backdrop-blur-xl border-r border-peach/10 p-8 flex flex-col sticky top-0 h-screen z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-gradient-to-br from-peach to-orange-400 p-2.5 rounded-2xl shadow-lg shadow-peach/20">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">AmbisAdmin</span>
            <span className="text-[10px] font-bold text-peach uppercase tracking-[0.2em] mt-1">Management Hub</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">Main Menu</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all duration-300 group",
                  isActive 
                    ? "bg-gradient-to-r from-peach to-orange-400 text-white shadow-xl shadow-peach/30 translate-x-2" 
                    : "text-gray-500 hover:bg-peach/5 hover:text-peach"
                )}
              >
                <item.icon className={cn("h-5 w-5 transition-transform duration-300", isActive ? "" : "group-hover:scale-110")} /> 
                <span className="font-bold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-peach/10">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-4 px-5 py-4 w-full rounded-[1.25rem] text-red-500 hover:bg-red-50 transition-all duration-300 font-bold text-sm group"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> 
            Logout System
          </button>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative bg-mesh min-h-screen">
        {/* Top Header */}
        <header className="flex flex-col md:row justify-between items-start md:items-center mb-12 gap-6 bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/50 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-lavender to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-lavender/20">
                <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  {menuItems.find(i => i.href === pathname)?.name || "System Section"}
                </h1>
                <p className="text-xs font-medium text-gray-500">Control center for AmbisCircle ecosystem</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-peach transition-colors" />
                <input 
                    type="text" 
                    placeholder="Global search..." 
                    className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-peach/10 focus:border-peach transition-all text-sm font-medium"
                />
             </div>
             <button className="h-12 w-12 rounded-2xl bg-white/50 border border-white/50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-peach transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
             </button>
             <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-peach to-orange-400 p-0.5 shadow-lg shadow-peach/20 cursor-pointer hover:scale-105 transition-transform">
                <div className="h-full w-full rounded-[0.85rem] bg-white flex items-center justify-center text-peach font-black text-sm">AD</div>
             </div>
          </div>
        </header>

        <div className="relative z-10">
            {children}
        </div>
        
        {/* Subtle Decorative elements */}
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-peach/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed top-0 left-72 w-[500px] h-[500px] bg-lavender/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      </main>
    </div>
  );
}
