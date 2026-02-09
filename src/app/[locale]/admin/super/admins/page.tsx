"use client";

import React, { useEffect, useState } from "react";
import { superAdminService } from "@/services/super-admin.service";
import { AdminUser } from "@/types/super-admin.types";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { toast } from "sonner";
import { UserPlus, ShieldCheck, ShieldAlert, RefreshCw, MoreVertical } from "lucide-react";
import { CreateAdminModal } from "@/components/admin/super/CreateAdminModal";

export default function SuperAdminPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Chargement initial des données
  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const data = await superAdminService.listAdmins();
      setAdmins(data);
    } catch (error: any) {
      toast.error("Erreur de chargement", { description: error.detail });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAdmins(); }, []);

  // Action : Activer/Désactiver
  const handleToggle = async (admin: AdminUser) => {
    const action = admin.isActive ? "désactiver" : "activer";
    if (!confirm(`Voulez-vous vraiment ${action} le compte de ${admin.firstName} ?`)) return;

    try {
      await superAdminService.toggleStatus(admin.id);
      toast.success(`Compte ${admin.isActive ? 'désactivé' : 'activé'} avec succès`);
      fetchAdmins(); // Rafraîchir la liste
    } catch (error: any) {
      toast.error("Action impossible", { description: error.detail });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header de page */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">
            Gestion des Administrateurs
          </h1>
          <p className="text-text-secondary">Contrôlez les accès au niveau global du système.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-primary">
          <UserPlus size={18} /> Créer un Administrateur
        </Button>
      </div>

      {/* Tableau des Admins */}
      <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={5} columns={5} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-background-secondary/50 border-b border-border-default">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Utilisateur</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Contact</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Statut</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-background-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                          {admin.photoUrl ? (
                            <img src={admin.photoUrl} alt="" className="size-full object-cover" />
                          ) : (
                            <span className="font-bold text-primary">{admin.firstName[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">{admin.firstName} {admin.lastName}</p>
                          <p className="text-xs text-text-tertiary">@{admin.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-text-secondary">{admin.email}</p>
                      <p className="text-xs text-text-tertiary">{admin.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        admin.isActive 
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-error/10 text-error border-error/20'
                      }`}>
                        {admin.isActive ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                        {admin.isActive ? 'Actif' : 'Bloqué'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleToggle(admin)}
                        className={`p-2 rounded-lg transition-colors ${
                          admin.isActive ? 'text-error hover:bg-error/10' : 'text-success hover:bg-success/10'
                        }`}
                        title={admin.isActive ? "Désactiver" : "Activer"}
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

      {/* Modale de création */}
      <CreateAdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchAdmins} 
      />
    </div>
  );
}