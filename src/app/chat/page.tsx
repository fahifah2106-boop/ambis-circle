"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button } from "@/components/ui/Form";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Hash, MoreVertical, Search, MessageSquare, Users } from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

function ChatContent() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");

  const [activeRoom, setActiveRoom] = useState(roomParam || "Nugas Kalkulus");
  const [messages, setMessages] = useState<Record<string, any[]>>({
    "Nugas Kalkulus": [
      { id: 1, sender: "Budi", content: "Halo guys! Jadi nugas jam berapa?", time: "14:20", self: false },
      { id: 2, sender: "Siti", content: "Jam 15:00 aja gimana? Aku baru selesai kelas.", time: "14:22", self: false },
      { id: 3, sender: "Kamu", content: "Gaspol! Jam 15:00 ya.", time: "14:25", self: true },
    ],
    "Belajar React": [
      { id: 1, sender: "Andi", content: "Ada yang tau cara pake server actions?", time: "10:00", self: false },
      { id: 2, sender: "Kamu", content: "Coba cek dokumentasi Next.js terbaru bro.", time: "10:05", self: true },
    ],
    "Gym Circle": [
      { id: 1, sender: "Rina", content: "Besok pagi jam 6 jadi ya di GOR?", time: "19:00", self: false },
    ]
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // If room doesn't exist in messages, initialize it
  useEffect(() => {
    if (activeRoom && !messages[activeRoom]) {
        setMessages(prev => ({
            ...prev,
            [activeRoom]: [{ id: 0, sender: "System", content: `Selamat datang di room ${activeRoom}!`, time: "Now", self: false }]
        }));
    }
  }, [activeRoom]);

  // Update active room if param changes
  useEffect(() => {
    if (roomParam) setActiveRoom(roomParam);
  }, [roomParam]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "Kamu",
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      self: true,
    };

    setMessages(prev => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), newMessage]
    }));
    setInput("");
  };

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeRoom]);

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-10rem)] lg:h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 pb-24 lg:pb-0">
        
        {/* Chat List - Sidebar */}
        <div className="w-full md:w-80 flex flex-col gap-4 h-full">
            <div className="glass p-4 rounded-3xl flex items-center gap-3 shrink-0">
                <Search className="h-4 w-4 text-gray-400" />
                <input placeholder="Cari obrolan..." className="bg-transparent text-sm outline-none w-full" />
            </div>

            <div className="flex-1 glass rounded-3xl p-2 space-y-1 overflow-y-auto">
                {Object.keys(messages).map((room) => (
                    <button 
                        key={room} 
                        onClick={() => setActiveRoom(room)}
                        className={cn(
                            "w-full flex items-center gap-3 p-4 rounded-2xl transition-all",
                            activeRoom === room 
                                ? "bg-peach text-white shadow-soft" 
                                : "hover:bg-white/50 text-gray-600"
                        )}
                    >
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                            activeRoom === room ? "bg-white/20" : "bg-peach/10"
                        )}>
                            <Hash className="h-5 w-5" />
                        </div>
                        <div className="text-left overflow-hidden">
                            <p className="font-bold text-sm truncate">{room}</p>
                            <p className={cn(
                                "text-[10px] truncate",
                                activeRoom === room ? "text-white/70" : "text-gray-400"
                            )}>
                                {messages[room][messages[room].length - 1]?.content || "Belum ada pesan"}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 glass rounded-[2.5rem] flex flex-col overflow-hidden relative h-full">
            {/* Chat Header */}
            <header className="p-6 border-b border-white/20 flex justify-between items-center bg-white/20 backdrop-blur-sm z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-peach rounded-xl flex items-center justify-center text-white shadow-soft">
                        <Hash className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800"># {activeRoom}</h3>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                           <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                           {(messages[activeRoom]?.length || 0) + 2} Online
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/50 rounded-xl transition-colors text-gray-400">
                        <Users className="h-5 w-5" />
                    </button>
                    <button 
                        onClick={() => toast.info("Pengaturan channel segera hadir!")}
                        className="p-2 hover:bg-white/50 rounded-xl transition-colors text-gray-400"
                    >
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </header>

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 p-6 overflow-y-auto space-y-4 scroll-smooth"
            >
                <AnimatePresence initial={false}>
                    {messages[activeRoom]?.map((msg) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "flex flex-col group",
                                msg.self ? 'items-end' : 'items-start'
                            )}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                {!msg.self && <span className="text-[10px] font-bold text-gray-400 ml-1">{msg.sender}</span>}
                                <span className="text-[8px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">{msg.time}</span>
                            </div>
                            <div className={cn(
                                "max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm transition-all",
                                msg.self 
                                    ? "bg-peach text-white rounded-tr-none hover:brightness-105" 
                                    : "bg-white text-gray-700 rounded-tl-none border border-white/50 hover:bg-gray-50"
                            )}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                    {messages[activeRoom]?.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <MessageSquare className="h-12 w-12 opacity-20" />
                            <p className="text-sm font-medium">Belum ada obrolan di sini. Mulai sapa teman-temanmu!</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-6 bg-white/30 backdrop-blur-sm flex gap-3 shrink-0">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Kirim pesan ke # ${activeRoom}...`}
                    className="flex-1 bg-white px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-peach/10 transition-all text-sm shadow-soft border-none"
                />
                <Button type="submit" className="rounded-2xl h-14 w-14 flex items-center justify-center p-0 shadow-lg">
                    <Send className="h-5 w-5" />
                </Button>
            </form>
        </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="flex items-center justify-center h-full">Memuat Chat...</div>}>
        <ChatContent />
      </Suspense>
    </DashboardLayout>
  );
}
