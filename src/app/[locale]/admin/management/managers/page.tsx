"use client";

import React, { useEffect, useState } from "react";
import { adminManagementService } from "@/services/admin-management.service";
import { FleetManager } from "@/types/fleet-manager.types";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import Link from "next/link";
import { 
  Mail, Phone, ShieldCheck, 
  ShieldAlert, Search, Users, Eye,
  ChevronLeft, ChevronRight, Clock, Power, PlusCircle, X
} from "lucide-react";
import { useParams } from "next/navigation";
import { ResourceModal } from "@/components/admin/resources/ResourceModal";

const RESOURCE_CATEGORIES = [
  { id: "vehicle-types", label: "Type de véhicule" },
  { id: "manufacturers", label: "Constructeur" },
  { id: "brands", label: "Marque" },
  { id: "models", label: "Modèle" },
  { id: "fuel-types", label: "Carburant" },
  { id: "colors", label: "Couleur" },
  { id: "sizes", label: "Gabarit" },
  { id: "usages", label: "Usage" },
  { id: "transmissions", label: "Transmission" },
];

export default function AdminManagersPage() {
  const { locale } = useParams();
  const [managers, setManagers] = useState<FleetManager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Gestion des ressources
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<{id: string, label: string} | null>(null);

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
      await adminManagementService.toggleManagerStatus(manager.id);
      toast.success(`Statut mis à jour`);
      fetchManagers(); 
    } catch (error: any) {
      toast.error("Action échouée");
    }
  };

  const filteredManagers = managers.filter(m => 
    m.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredManagers.length / pageSize);
  const paginatedManagers = filteredManagers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Gestion des Managers</h1>
          <p className="text-text-secondary">Supervisez les entreprises et gérez les ressources système.</p>
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

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
        <input 
          type="text"
          placeholder="Rechercher un manager..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-default bg-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

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
                            {m.photoUrl ? <img src={m.photoUrl} className="size-full object-cover" /> : <Users size={20} />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 truncate">{m.companyName}</p>
                            <p className="text-xs text-slate-400 truncate">{m.firstName} {m.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="text-xs text-slate-600 flex items-center gap-2"><Mail size={12} className="text-slate-400" /> {m.email}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-2"><Phone size={12} className="text-slate-400" /> {m.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border w-fit ${
                            m.isActive 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                              : 'bg-red-50 text-red-600 border-red-100'
                          }`}>
                            {m.isActive ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                            {m.isActive ? 'Actif' : 'Suspendu'}
                          </span>
                          {m.lastLoginAt && (
                            <p className="text-[9px] text-slate-400 flex items-center gap-1">
                              <Clock size={10} /> {new Date(m.lastLoginAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Link 
                            href={`/${locale}/admin/management/managers/${m.id}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                          >
                            <Eye size={16} />
                          </Link>

                          <button 
                            onClick={() => setIsPickerOpen(true)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all"
                          >
                            <PlusCircle size={16} />
                          </button>

                          <button 
                            onClick={() => handleToggleStatus(m)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                              m.isActive ? 'text-red-400 hover:bg-red-50' : 'text-emerald-400 hover:bg-emerald-50'
                            }`}
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

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                {filteredManagers.length} Managers au total
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

      {/* MODALE DE SÉLECTION DE TYPE DE RESSOURCE */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800">Ajouter une ressource</h3>
              <button onClick={() => setIsPickerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {RESOURCE_CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat); setIsPickerOpen(false); }}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <span className="text-sm font-bold text-slate-600 group-hover:text-primary">{cat.label}</span>
                  <PlusCircle size={18} className="text-slate-300 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODALE DE CRÉATION RÉELLE */}
      {activeCategory && (
        <ResourceModal 
          isOpen={true} 
          onClose={() => setActiveCategory(null)} 
          category={activeCategory} 
          onSuccess={() => { toast.success("Ressource ajoutée"); setActiveCategory(null); }} 
        />
      )}
    </div>
  );
}