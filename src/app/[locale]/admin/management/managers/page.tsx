"use client";

import React, { useEffect, useState } from "react";
import { adminManagementService } from "@/services/admin-management.service";
import { FleetManager } from "@/types/fleet-manager.types";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { toast } from "sonner";
import Link from "next/link";
import { 
  Mail, Phone, ShieldCheck, 
  ShieldAlert, Search, Users, Eye,
  ChevronLeft, ChevronRight, Clock, Power
} from "lucide-react";
import { useParams } from "next/navigation";

export default function AdminManagersPage() {
  const { locale } = useParams();
  const [managers, setManagers] = useState<FleetManager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- CONFIGURATION PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchManagers = async () => {
    try {
      setIsLoading(true);
      const data = await adminManagementService.listManagers();
      setManagers(data);
    } catch (error: any) {
      toast.error("Erreur de chargement des managers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchManagers(); }, []);

  const handleToggleStatus = async (manager: FleetManager) => {
    const action = manager.isActive ? "suspendre" : "réactiver";
    try {
      await adminManagementService.toggleManagerStatus(manager.id || "");
      toast.success(`Le compte a été ${action}é avec succès`);
      fetchManagers(); 
    } catch (error: any) {
      toast.error(`Impossible de ${action} le compte`);
    }
  };

  // --- FILTRAGE ---
  const filteredManagers = managers.filter(m => 
    m.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- PAGINATION ---
  const totalPages = Math.ceil(filteredManagers.length / pageSize);
  const paginatedManagers = filteredManagers.slice(
    (currentPage - 1) * pageSize, 
    currentPage * pageSize
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Gestion des Managers</h1>
          <p className="text-text-secondary">Supervisez les accès et les informations des entreprises partenaires.</p>
        </div>
        <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Total Managers</p>
            <p className="text-xl font-black text-text-primary">{managers.length}</p>
          </div>
        </div>
      </div>

      {/* RECHERCHE */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
        <input 
          type="text"
          placeholder="Rechercher par nom, entreprise, email..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-default bg-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* TABLEAU */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={10} columns={4} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Entreprise / Manager</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Statut & Connexion</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedManagers.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden shrink-0 border border-slate-200">
                            {m.photoUrl ? <img src={m.photoUrl} className="size-full object-cover" alt="" /> : <Users size={20} />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 truncate">{m.companyName}</p>
                            <p className="text-xs text-slate-400 truncate">{m.firstName} {m.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="text-xs text-slate-600 flex items-center gap-2">
                            <Mail size={12} className="text-slate-400" /> {m.email}
                          </p>
                          <p className="text-xs text-slate-400 flex items-center gap-2">
                            <Phone size={12} className="text-slate-400" /> {m.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border w-fit ${
                            m.isActive 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                              : 'bg-red-50 text-red-600 border-red-100'
                          }`}>
                            {m.isActive ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                            {m.isActive ? 'Actif' : 'Suspendu'}
                          </span>
                          {m.lastLoginAt ? (
                            <p className="text-[9px] text-slate-400 flex items-center gap-1">
                              <Clock size={10} /> {new Date(m.lastLoginAt).toLocaleString()}
                            </p>
                          ) : (
                            <p className="text-[9px] text-slate-400 italic">Jamais connecté</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Link 
                            href={`/${locale}/admin/management/managers/${m.id}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                            title="Voir les détails"
                          >
                            <Eye size={16} />
                          </Link>
                          <button 
                            onClick={() => handleToggleStatus(m)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                              m.isActive ? 'text-red-400 hover:bg-red-50 hover:text-red-600' : 'text-emerald-400 hover:bg-emerald-50 hover:text-emerald-600'
                            }`}
                            title={m.isActive ? "Suspendre" : "Activer"}
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
                {filteredManagers.length} Managers au total
              </p>
              <div className="flex items-center gap-2">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(prev => prev - 1)} 
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-bold text-slate-600 px-2">Page {currentPage} / {totalPages || 1}</span>
                <button 
                  disabled={currentPage === totalPages || totalPages === 0} 
                  onClick={() => setCurrentPage(prev => prev + 1)} 
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}