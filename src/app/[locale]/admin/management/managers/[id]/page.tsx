"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminManagementService } from "@/services/admin-management.service";
import { FleetManager } from "@/types/fleet-manager.types";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { 
  ArrowLeft, Building2, Mail, Phone, 
  ShieldCheck, ShieldAlert, User,
  Power, Clock, Fingerprint, Globe,
  AlertCircle
} from "lucide-react";

export default function ManagerDetailsPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  const [manager, setManager] = useState<FleetManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  // Chargement des données
  const fetchDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await adminManagementService.getManagerDetails(id as string);
      setManager(data);
    } catch (error: any) {
      toast.error("Erreur", { description: "Impossible de charger ce profil." });
      router.push(`/${locale}/admin/management/managers`);
    } finally {
      setIsLoading(false);
    }
  }, [id, locale, router]);

  useEffect(() => { if (id) fetchDetails(); }, [id, fetchDetails]);

  // Logique de Toggle (Activation / Désactivation)
  const handleToggle = async () => {
    if (!manager) return;
    setIsToggling(true);
    const action = manager.isActive ? "suspension" : "réactivation";
    
    try {
      // Utilisation de l'ID du manager pour le PATCH
      await adminManagementService.toggleManagerStatus(manager.id);
      toast.success(`Opération réussie`, { description: `La ${action} du compte a été effectuée.` });
      
      // Rafraîchissement complet pour garantir la synchronisation avec le backend
      await fetchDetails(); 
    } catch (error: any) {
      toast.error("Échec de l'opération", { description: error.detail || "Vérifiez vos droits d'accès." });
    } finally {
      setIsToggling(false);
    }
  };

  if (isLoading) return <PageLoader />;
  if (!manager) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* --- BARRE D'ACTIONS SUPÉRIEURE --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Détails du Gestionnaire</h1>
          </div>
        </div>

        <Button 
          variant={manager.isActive ? "danger" : "primary"}
          onClick={handleToggle}
          isLoading={isToggling}
          className="gap-2 h-11 px-8 shadow-lg"
        >
          <Power size={18} />
          {manager.isActive ? "Suspendre l'accès" : "Réactiver le compte"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLONNE GAUCHE : PROFIL & STATUT --- */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
            {/* Décoration de fond */}
            <div className={`absolute top-0 inset-x-0 h-2 ${manager.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
            
            <div className="size-28 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 border-4 border-white shadow-xl overflow-hidden mb-6">
              {manager.photoUrl ? (
                <img src={manager.photoUrl} className="size-full object-cover" alt="" />
              ) : (
                <User size={48} />
              )}
            </div>

            <h2 className="text-2xl font-black text-slate-800">{manager.firstName} {manager.lastName}</h2>
            <p className="text-sm text-primary font-bold bg-primary/5 px-4 py-1 rounded-full mt-2">
              @{manager.username}
            </p>
            
            <div className={`mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border font-black text-xs uppercase tracking-widest ${
              manager.isActive 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {manager.isActive ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
              {manager.isActive ? 'Compte Opérationnel' : 'Accès Verrouillé'}
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-6 space-y-5 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Coordonnées</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="size-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                  <p className="text-sm font-bold text-slate-700 truncate">{manager.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="size-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Téléphone</p>
                  <p className="text-sm font-bold text-slate-700">{manager.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- COLONNE DROITE : INFOS MÉTIER --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* COMPANY INFO */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Informations Entreprise</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Raison Sociale</p>
                <p className="text-xl font-bold text-slate-700">{manager.companyName}</p>
              </div>
  
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernière Activité</p>
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <Clock size={16} className="text-slate-400" />
                  {manager.lastLoginAt ? new Date(manager.lastLoginAt).toLocaleString() : 'Aucune connexion'}
                </div>
              </div>
          
            </div>
          </div>

          {/* SECURITY NOTICE */}
          <div className={`p-6 rounded-[2rem] border flex items-start gap-5 transition-colors ${
            manager.isActive ? 'bg-blue-50/50 border-blue-100' : 'bg-amber-50/50 border-amber-100'
          }`}>
            <div className={`p-3 rounded-2xl ${manager.isActive ? 'bg-blue-500 text-white' : 'bg-amber-500 text-white'}`}>
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className={`font-bold text-sm ${manager.isActive ? 'text-blue-800' : 'text-amber-800'}`}>
                Note d'administration
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${manager.isActive ? 'text-blue-600' : 'text-amber-600'}`}>
                {manager.isActive 
                  ? "Ce compte est actuellement actif. Le manager peut gérer ses flottes, ses véhicules et ses chauffeurs sans restriction."
                  : "Ce compte est suspendu. L'utilisateur ne peut plus se connecter et toutes les opérations de ses flottes sont gelées jusqu'à réactivation."
                }
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}