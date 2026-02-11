"use client";

import React, { useEffect, useState } from "react";
import { adminManagementService } from "@/services/admin-management.service";
import { FleetManager } from "@/types/fleet-manager.types";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import Link from "next/link";
import { 
  Building2, Mail, Phone, ShieldCheck, 
  ShieldAlert, Search, RefreshCw, Users, Eye,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { useParams } from "next/navigation";

export default function AdminManagersPage() {
  const { locale } = useParams();
  const [managers, setManagers] = useState<FleetManager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchManagers = async () => {
    try {
      setIsLoading(true);
      const data = await adminManagementService.listManagers();
      setManagers(data);
    } catch (error: any) {
      toast.error("Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchManagers(); }, []);

  const handleToggleStatus = async (manager: FleetManager) => {
    try {
      await adminManagementService.toggleManagerStatus(manager.userId);
      toast.success(`Statut de ${manager.companyName} mis à jour`);
      fetchManagers(); 
    } catch (error: any) {
      toast.error("Action échouée");
    }
  };

  // --- LOGIQUE DE FILTRAGE ET PAGINATION ---
  const filteredManagers = managers.filter(m => 
    m.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredManagers.length / pageSize);
  const paginatedManagers = filteredManagers.slice(
    (currentPage - 1) * pageSize, 
    currentPage * pageSize
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER & STATS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Gestion des Managers</h1>
          <p className="text-text-secondary">Supervisez les entreprises et leurs flottes actives.</p>
        </div>
        <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center gap-4">
          <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-tertiary uppercase">Total Entreprises</p>
            <p className="text-xl font-black text-text-primary">{managers.length}</p>
          </div>
        </div>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
        <input 
          type="text"
          placeholder="Rechercher une entreprise, un nom ou email..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-default bg-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* TABLEAU */}
      <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={10} columns={5} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-background-secondary/50 border-b border-border-default">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Entreprise / Manager</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Contact</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary text-center">Flottes</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Statut</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {paginatedManagers.map((m) => (
                    <tr key={m.userId} className="hover:bg-background-secondary/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-border-default overflow-hidden">
                            {m.photoUrl ? <img src={m.photoUrl} className="size-full object-cover" /> : <Users size={20} />}
                          </div>
                          <div>
                            <p className="font-bold text-text-primary">{m.companyName}</p>
                            <p className="text-xs text-text-tertiary">{m.firstName} {m.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="text-sm text-text-secondary flex items-center gap-2"><Mail size={12} /> {m.email}</p>
                          <p className="text-xs text-text-tertiary flex items-center gap-2"><Phone size={12} /> {m.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-black text-primary bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">
                          {m.fleetCount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {/* CORRECTION LOGIQUE STATUT (Case Insensitive) */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          m.status?.toUpperCase() === 'ACTIVE' 
                            ? 'bg-success/10 text-success border-success/20' 
                            : 'bg-error/10 text-error border-error/20'
                        }`}>
                          {m.status?.toUpperCase() === 'ACTIVE' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                          {m.status?.toUpperCase() === 'ACTIVE' ? 'Actif' : 'Suspendu'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link 
                            href={`/${locale}/admin/management/managers/${m.userId}`}
                            className="p-2 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                          >
                            <Eye size={18} />
                          </Link>
                          <button 
                            onClick={() => handleToggleStatus(m)}
                            className={`p-2 rounded-lg transition-colors ${
                              m.status?.toUpperCase() === 'ACTIVE' ? 'text-error hover:bg-error/10' : 'text-success hover:bg-success/10'
                            }`}
                          >
                            <RefreshCw size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- BARRE DE PAGINATION --- */}
            <div className="p-4 border-t border-border-default bg-background-secondary/30 flex items-center justify-between">
              <p className="text-xs text-text-tertiary font-medium">
                Affichage de {paginatedManagers.length} sur {filteredManagers.length} entreprises
              </p>
              <div className="flex items-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-2 rounded-lg border border-border-default hover:bg-white disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-bold px-4">Page {currentPage} / {totalPages || 1}</span>
                <button 
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-2 rounded-lg border border-border-default hover:bg-white disabled:opacity-30 transition-all"
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