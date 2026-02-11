"use client";

import React, { useEffect, useState } from "react";
import { superAdminService } from "@/services/super-admin.service";
import { AdminUser } from "@/types/super-admin.types";
import { useAuth } from "@/contexts/AuthContext"; // Pour l'auto-protection
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { toast } from "sonner";
import Link from "next/link";
import { 
  UserPlus, ShieldCheck, ShieldAlert, RefreshCw, 
  Search, Eye, Power, Clock, ChevronLeft, ChevronRight, UserCog,
  Mail,Phone
} from "lucide-react";
import { useParams } from "next/navigation";
import { CreateAdminModal } from "@/components/admin/super/CreateAdminModal";

export default function SuperAdminPage() {
  const { locale } = useParams();
  const { user: currentUser } = useAuth(); // Récupère l'admin connecté
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const data = await superAdminService.listAdmins();
      setAdmins(data);
    } catch (error: any) {
      toast.error("Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleToggle = async (admin: AdminUser) => {
    // SÉCURITÉ : Empêcher l'auto-blocage
    if (admin.id === currentUser?.id) {
      toast.error("Action interdite", { description: "Vous ne pouvez pas désactiver votre propre compte Super Admin." });
      return;
    }

    const action = admin.isActive ? "désactiver" : "réactiver";
    try {
      await superAdminService.toggleStatus(admin.id);
      toast.success(`Compte ${admin.isActive ? 'suspendu' : 'activé'}`);
      fetchAdmins(); 
    } catch (error: any) {
      toast.error("Erreur lors de l'opération");
    }
  };

  // --- FILTRAGE & PAGINATION ---
  const filteredAdmins = admins.filter(a => 
    a.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAdmins.length / pageSize);
  const paginatedAdmins = filteredAdmins.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Administrateurs Système</h1>
          <p className="text-text-secondary">Gérez les accès de haut niveau et la sécurité globale.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-primary h-11">
          <UserPlus size={18} /> Créer un Admin
        </Button>
      </div>

      {/* RECHERCHE */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
        <input 
          type="text"
          placeholder="Rechercher un administrateur..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-default bg-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* TABLEAU */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={5} columns={4} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Administrateur</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Statut & Activité</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 overflow-hidden shrink-0">
                            {admin.photoUrl ? <img src={admin.photoUrl} className="size-full object-cover" /> : <UserCog size={20} />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{admin.firstName} {admin.lastName}</p>
                            <p className="text-xs text-slate-400">@{admin.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="text-xs text-slate-600 flex items-center gap-2"><Mail size={12} className="text-slate-400" /> {admin.email}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-2"><Phone size={12} className="text-slate-400" /> {admin.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border w-fit ${
                            admin.isActive 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                              : 'bg-red-50 text-red-600 border-red-100'
                          }`}>
                            {admin.isActive ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                            {admin.isActive ? 'Actif' : 'Suspendu'}
                          </span>
                          {admin.lastLoginAt ? (
                            <p className="text-[9px] text-slate-400 flex items-center gap-1">
                              <Clock size={10} /> {new Date(admin.lastLoginAt).toLocaleString()}
                            </p>
                          ) : (
                            <p className="text-[9px] text-slate-400 italic">Aucune connexion</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Link 
                            href={`/${locale}/admin/super/admins/${admin.id}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                          >
                            <Eye size={16} />
                          </Link>
                          <button 
                            disabled={admin.id === currentUser?.id}
                            onClick={() => handleToggle(admin)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                              admin.id === currentUser?.id ? 'opacity-10 cursor-not-allowed' :
                              admin.isActive ? 'text-red-400 hover:bg-red-50' : 'text-emerald-400 hover:bg-emerald-50'
                            }`}
                            title={admin.id === currentUser?.id ? "Vous ne pouvez pas vous bloquer" : (admin.isActive ? "Suspendre" : "Activer")}
                          >
                            <Power size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                {filteredAdmins.length} Administrateurs
              </p>
              <div className="flex items-center gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-30"><ChevronLeft size={16} /></button>
                <span className="text-xs font-bold text-slate-600 px-2">Page {currentPage} / {totalPages || 1}</span>
                <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-30"><ChevronRight size={16} /></button>
              </div>
            </div>
          </>
        )}
      </div>

      <CreateAdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchAdmins} 
      />
    </div>
  );
}