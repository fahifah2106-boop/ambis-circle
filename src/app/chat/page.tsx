"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button } from "@/components/ui/Form";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Hash, MoreVertical, Search, MessageSquare, Users, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

function ChatContent() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeRoom, setActiveRoom] = useState(roomParam || "General");
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [rooms, setRooms] = useState<string[]>(["General", "Belajar Bareng", "Diskusi Tugas"]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUser();
    if (roomParam) {
      setActiveRoom(roomParam);
      if (!rooms.includes(roomParam)) {
        setRooms(prev => [roomParam, ...prev]);
      }
    }
  }, [roomParam]);

  useEffect(() => {
    if (activeRoom) {
      fetchMessages();
      const channel = subscribeToMessages();
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [activeRoom]);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      setCurrentUser({ ...user, full_name: profile?.full_name || user.email?.split('@')[0] });
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('room_name', activeRoom)
      .order('created_at', { ascending: true });
    
    if (data) setMessages(data);
    if (error) console.error("Error fetching messages:", error);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`room-${activeRoom}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_name=eq.${activeRoom}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new]);
        }
      )
      .subscribe();
    
    return channel;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentUser) return;

    const messageContent = input.trim();
    setInput("");

    const { error } = await supabase
      .from('messages')
      .insert({
        room_name: activeRoom,
        user_id: currentUser.id,
        user_name: currentUser.full_name,
        content: messageContent,
      });

    if (error) {
      toast.error("Gagal mengirim pesan");
      console.error(error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const selectRoom = (room: string) => {
    setActiveRoom(room);
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 relative overflow-hidden">
        
        {/* Chat List - Sidebar */}
        <div className={cn(
            "w-full md:w-80 flex flex-col gap-4 h-full transition-all duration-300 absolute md:relative z-20 bg-[#FDF8F3] md:bg-transparent",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
            <div className="glass p-4 rounded-3xl flex items-center gap-3 shrink-0 mx-2 md:mx-0">
                <Search className="h-4 w-4 text-gray-400" />
                <input placeholder="Cari obrolan..." className="bg-transparent text-sm outline-none w-full" />
            </div>

            <div className="flex-1 glass rounded-[2rem] md:rounded-3xl p-2 space-y-1 overflow-y-auto mx-2 md:mx-0 shadow-lg md:shadow-none">
                {rooms.map((room) => (
                    <button 
                        key={room} 
                        onClick={() => selectRoom(room)}
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
                                Klik untuk bergabung...
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Chat Window */}
        <div className={cn(
            "flex-1 glass rounded-[2rem] md:rounded-[2.5rem] flex flex-col overflow-hidden relative h-full transition-all duration-300",
            !isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}>
            {/* Chat Header */}
            <header className="p-4 md:p-6 border-b border-white/20 flex justify-between items-center bg-white/20 backdrop-blur-sm z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden p-2 -ml-2 text-gray-400"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div className="h-10 w-10 bg-peach rounded-xl flex items-center justify-center text-white shadow-soft shrink-0">
                        <Hash className="h-6 w-6" />
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="font-bold text-gray-800 truncate text-sm md:text-base"># {activeRoom}</h3>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                           <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                           Real-time Aktif
                        </p>
                    </div>
                </div>
            </header>

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 scroll-smooth"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => {
                        const isSelf = msg.user_id === currentUser?.id;
                        return (
                            <motion.div 
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={cn(
                                    "flex flex-col group",
                                    isSelf ? 'items-end' : 'items-start'
                                )}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    {!isSelf && <span className="text-[10px] font-bold text-gray-400 ml-1">{msg.user_name}</span>}
                                    <span className="text-[8px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className={cn(
                                    "max-w-[85%] md:max-w-[80%] px-4 py-2.5 md:py-3 rounded-2xl text-sm shadow-sm transition-all",
                                    isSelf 
                                        ? "bg-peach text-white rounded-tr-none hover:brightness-105" 
                                        : "bg-white text-gray-700 rounded-tl-none border border-white/50 hover:bg-gray-50"
                                )}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 md:p-6 bg-white/30 backdrop-blur-sm flex gap-2 md:gap-3 shrink-0 pb-8 md:pb-6">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Pesan ke # ${activeRoom}...`}
                    className="flex-1 bg-white px-4 md:px-6 py-3 md:py-4 rounded-2xl outline-none focus:ring-4 focus:ring-peach/10 transition-all text-sm shadow-soft border-none min-w-0"
                />
                <Button type="submit" className="rounded-2xl h-12 w-12 md:h-14 md:w-14 flex items-center justify-center p-0 shadow-lg shrink-0">
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
