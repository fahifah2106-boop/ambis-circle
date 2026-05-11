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
  Bell,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: Layers },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "Moderate Circles", href: "/admin/sessions", icon: ShieldCheck },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F3] flex flex-col md:flex-row font-sans selection:bg-peach/30">
      <Toaster position="top-right" richColors />
      
      {/* Mobile Top Bar */}
      <div className={cn(
        "md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-peach/10 sticky top-0 z-[60] transition-opacity duration-300",
        isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-peach to-orange-400 p-1.5 rounded-lg shadow-sm">
            <BookOpen className="text-white h-5 w-5" />
          </div>
          <span className="font-black text-gray-900 tracking-tight">AmbisAdmin</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-500 hover:text-peach transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Menu (Desktop & Mobile) */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-full md:w-72 bg-white p-8 flex flex-col z-[1000] transition-all duration-500 ease-in-out md:relative md:translate-x-0 md:h-screen overflow-hidden",
        isSidebarOpen 
          ? "translate-x-0 opacity-100 pointer-events-auto shadow-2xl" 
          : "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto"
      )}>
        {/* Fixed Close Button for Mobile */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-6 right-6 p-3 bg-peach/10 rounded-full text-peach hover:bg-peach hover:text-white transition-all z-[1100]"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Decorative blobs for sidebar */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-peach/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-lavender/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-3 mb-12 relative z-10">
          <div className="bg-gradient-to-br from-peach to-orange-400 p-2.5 rounded-2xl shadow-lg shadow-peach/20">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">AmbisAdmin</span>
            <span className="text-[10px] font-bold text-peach uppercase tracking-[0.2em] mt-1">Management Hub</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2 mt-4 md:mt-0 relative z-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-6">Main Menu</p>
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

        <div className="mt-auto pt-8 border-t border-peach/10 relative z-10">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-4 px-5 py-4 w-full rounded-[1.25rem] text-red-500 hover:bg-red-50 transition-all duration-300 font-bold text-sm group"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> 
            Logout System
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[900] md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Admin Content */}
      <main className="flex-1 p-3 md:p-10 overflow-y-auto relative bg-mesh min-h-screen pb-10">
        {/* Top Header - Row layout even on mobile */}
        <header className="flex flex-row justify-between items-center mb-6 md:mb-12 bg-white/40 backdrop-blur-md p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/50 shadow-soft">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-lavender to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-lavender/20">
                <ShieldCheck className="h-5 w-5 md:h-7 md:w-7" />
            </div>
            <div>
                <h1 className="text-sm md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                  {menuItems.find(i => i.href === pathname)?.name || "System"}
                </h1>
                <p className="hidden md:block text-[10px] md:text-xs font-medium text-gray-500">Control center</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
             <div className="hidden lg:flex relative w-64 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-peach transition-colors" />
                <input 
                    type="text" 
                    placeholder="Global search..." 
                    className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-peach/10 focus:border-peach transition-all text-sm font-medium"
                />
             </div>
             <button className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-white/50 border border-white/50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-peach transition-all relative">
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-red-500 rounded-full border-2 border-white" />
             </button>
             <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-peach to-orange-400 p-0.5 shadow-lg shadow-peach/20 cursor-pointer hover:scale-105 transition-transform">
                <div className="h-full w-full rounded-[0.6rem] md:rounded-[0.85rem] bg-white flex items-center justify-center text-peach font-black text-[10px] md:text-sm">AD</div>
             </div>
          </div>
        </header>

        <div className="relative z-10">
            {children}
        </div>
        
        {/* Subtle Decorative elements */}
        <div className="fixed bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-peach/5 blur-[80px] md:blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed top-0 left-0 md:left-72 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lavender/5 blur-[80px] md:blur-[120px] rounded-full -z-10 pointer-events-none" />
      </main>
    </div>
  );
}
