"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminManagementService } from "@/services/admin-management.service";
import { FleetManager } from "@/types/fleet-manager.types";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { 
  ArrowLeft, Building2, Mail, Phone, 
  ShieldCheck, ShieldAlert, Calendar, User,
  RefreshCw, Info
} from "lucide-react";

export default function ManagerDetailsPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  const [manager, setManager] = useState<FleetManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  const fetchDetails = async () => {
    try {
      setIsLoading(true);
      const data = await adminManagementService.getManagerDetails(id as string);
      setManager(data);
    } catch (error: any) {
      toast.error("Erreur", { description: "Impossible de charger les détails du manager." });
      router.push(`/${locale}/admin/management/managers`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { if (id) fetchDetails(); }, [id]);

  const handleToggle = async () => {
    if (!manager) return;
    setIsToggling(true);
    try {
      await adminManagementService.toggleManagerStatus(manager.userId);
      toast.success("Statut mis à jour avec succès");
      await fetchDetails(); // Recharger les données
    } catch (error: any) {
      toast.error("Action échouée");
    } finally {
      setIsToggling(false);
    }
  };

  if (isLoading) return <PageLoader />;
  if (!manager) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header avec retour */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-surface rounded-full border border-border-default transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-text-primary tracking-tight">Profil de l'entreprise</h1>
            <p className="text-sm text-text-secondary">Consultation des informations administratives</p>
          </div>
        </div>

        <Button 
          variant={manager.status === 'ACTIVE' ? "danger" : "primary"}
          onClick={handleToggle}
          isLoading={isToggling}
          className="gap-2 h-11 px-6"
        >
          <RefreshCw size={18} />
          {manager.status === 'ACTIVE' ? "Désactiver le compte" : "Réactiver le compte"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne Gauche : Identité */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface rounded-3xl border border-border-default p-8 flex flex-col items-center text-center shadow-sm">
            <div className="size-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 overflow-hidden mb-4">
              {manager.photoUrl ? (
                <img src={manager.photoUrl} className="size-full object-cover" alt="" />
              ) : (
                <User size={40} />
              )}
            </div>
            <h2 className="text-xl font-bold text-text-primary">{manager.firstName} {manager.lastName}</h2>
            <p className="text-sm text-text-tertiary font-medium uppercase tracking-widest mt-1">Fleet Manager</p>
            
            <div className={`mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
              manager.status === 'ACTIVE' 
                ? 'bg-success/10 text-success border-success/20' 
                : 'bg-error/10 text-error border-error/20'
            }`}>
              {manager.status === 'ACTIVE' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
              {manager.status === 'ACTIVE' ? 'Compte Actif' : 'Compte Suspendu'}
            </div>
          </div>

          <div className="bg-surface rounded-3xl border border-border-default p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-text-tertiary uppercase tracking-widest flex items-center gap-2">
              <Info size={14} /> Contact Direct
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail size={16} className="text-text-tertiary" />
                <span className="truncate">{manager.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <Phone size={16} className="text-text-tertiary" />
                <span>{manager.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Infos Entreprise & Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-3xl border border-border-default p-8 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary mb-8 flex items-center gap-2">
              <Building2 size={20} className="text-primary" /> Détails de l'organisation
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">Nom de l'entreprise</p>
                <p className="text-lg font-bold text-text-primary">{manager.companyName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">Flottes gérées</p>
                <p className="text-lg font-bold text-primary">{manager.fleetCount} flottes actives</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">ID Utilisateur</p>
                <code className="text-xs bg-background-secondary px-2 py-1 rounded border border-border-default text-text-secondary">
                  {manager.userId}
                </code>
              </div>
            </div>

            <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
              <ShieldCheck className="text-primary shrink-0" size={24} />
              <div>
                <p className="text-sm font-bold text-text-primary">Droits d'administration</p>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  En tant qu'administrateur, vous pouvez suspendre l'accès de ce manager à la plateforme. 
                  Toutes ses flottes et véhicules seront alors inaccessibles jusqu'à la réactivation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}