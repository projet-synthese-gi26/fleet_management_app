"use client";

import React, { useEffect, useState } from "react";
import { adminManagementService } from "@/services/admin-management.service";
import { FleetManager } from "@/types/fleet-manager.types";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { 
  Building2, Mail, Phone, ShieldCheck, 
  ShieldAlert, Search, RefreshCw, Users 
} from "lucide-react";

export default function AdminManagersPage() {
  const [managers, setManagers] = useState<FleetManager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchManagers = async () => {
    try {
      setIsLoading(true);
      const data = await adminManagementService.listManagers();
      setManagers(data);
    } catch (error: any) {
      toast.error("Erreur", { description: "Impossible de charger les gestionnaires." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchManagers(); }, []);

  const handleToggleStatus = async (manager: FleetManager) => {
    try {
      await adminManagementService.toggleManagerStatus(manager.userId);
      toast.success(`Le statut de ${manager.companyName} a été mis à jour.`);
      fetchManagers(); // Rafraîchissement
    } catch (error: any) {
      toast.error("Action échouée", { description: error.detail });
    }
  };

  // Filtrage local pour la recherche
  const filteredManagers = managers.filter(m => 
    m.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* En-tête et Stats Rapides */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Gestion des Managers</h1>
          <p className="text-text-secondary">Supervisez les entreprises et leurs flottes actives.</p>
        </div>
        <div className="flex gap-4">
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
      </div>

      {/* Barre de recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
        <input 
          type="text"
          placeholder="Rechercher une entreprise ou un nom..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-default bg-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tableau des Managers */}
      <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={6} columns={5} />
        ) : (
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
                {filteredManagers.map((m) => (
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
                      <div className="space-y-1">
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
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        m.status === 'ACTIVE' 
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-error/10 text-error border-error/20'
                      }`}>
                        {m.status === 'ACTIVE' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                        {m.status === 'ACTIVE' ? 'Actif' : 'Suspendu'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleToggleStatus(m)}
                        className={`p-2 rounded-lg transition-colors ${
                          m.status === 'ACTIVE' ? 'text-error hover:bg-error/10' : 'text-success hover:bg-success/10'
                        }`}
                        title={m.status === 'ACTIVE' ? "Suspendre l'entreprise" : "Réactiver l'entreprise"}
                      >
                        <RefreshCw size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}