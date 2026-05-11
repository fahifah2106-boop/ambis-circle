"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Trash2, 
  Search,
  UserPlus,
  MoreVertical,
  Mail,
  Calendar,
  Filter,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Form";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('joined_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast.error("Gagal mengambil data user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus user ${name}?`)) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setUsers(users.filter(u => u.id !== id));
      toast.error(`User ${name} telah dihapus.`);
    } catch (error: any) {
      toast.error("Gagal menghapus user: " + error.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/50 shadow-soft">
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-peach transition-colors" />
          <input 
            type="text" 
            placeholder="Cari user berdasarkan nama atau email..." 
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/50 bg-white/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-peach/10 focus:border-peach transition-all text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
            <Button variant="outline" className="flex-1 lg:flex-none flex items-center gap-2 border-white/50 bg-white/30">
                <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="flex-1 lg:flex-none flex items-center gap-2 border-white/50 bg-white/30">
                <Download className="h-4 w-4" /> Export
            </Button>
            <Button 
                onClick={() => toast.info("Fitur tambah user sedang dalam pengembangan.")}
                className="flex-1 lg:flex-none flex items-center gap-2 bg-gradient-to-r from-peach to-orange-400 border-none shadow-lg shadow-peach/20"
            >
              <UserPlus className="h-4 w-4" /> Tambah User
            </Button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-gray-400 font-bold">Sedang mengambil data user... 🚀</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                <tr>
                  <th className="px-8 py-5">User Profil</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Tanggal Gabung</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user, i) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white transition-all duration-300 group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-peach/10 to-orange-100 flex items-center justify-center text-peach font-black text-sm group-hover:scale-110 transition-transform">
                          {user.full_name ? user.full_name.split(' ').map((n: any) => n[0]).join('') : 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900">{user.full_name || 'Anonymous User'}</p>
                          <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 mt-0.5">
                            <Mail className="h-3 w-3" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${user.role === 'Admin' ? 'bg-indigo-50 text-indigo-500' : 'bg-gray-50 text-gray-500'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit ${user.status === 'Active' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-400'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
                         <Calendar className="h-3.5 w-3.5 text-peach/60" /> {user.joined_at ? new Date(user.joined_at).toLocaleDateString() : 'Unknown'}
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => toast.info(`Detail user ${user.full_name} segera hadir.`)}
                            className="p-2 text-gray-400 hover:text-peach transition-colors"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.full_name)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
