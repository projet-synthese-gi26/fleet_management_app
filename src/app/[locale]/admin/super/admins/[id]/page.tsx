"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { superAdminService } from "@/services/super-admin.service";
import { AdminUser } from "@/types/super-admin.types";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { 
  ArrowLeft, Mail, Phone, ShieldCheck, 
  ShieldAlert, User, Power, Clock, 
  Fingerprint, Shield, AlertCircle, UserCog
} from "lucide-react";

export default function AdminDetailsPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuth(); // Pour empêcher l'auto-blocage ici aussi
  
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  const fetchDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await superAdminService.getAdminById(id as string);
      setAdmin(data);
    } catch (error: any) {
      toast.error("Erreur", { description: "Impossible de charger le profil administrateur." });
      router.push(`/${locale}/admin/super/admins`);
    } finally {
      setIsLoading(false);
    }
  }, [id, locale, router]);

  useEffect(() => { if (id) fetchDetails(); }, [id, fetchDetails]);

  const handleToggle = async () => {
    if (!admin) return;
    
    // Sécurité supplémentaire UI
    if (admin.id === currentUser?.id) {
      toast.error("Action impossible", { description: "Vous ne pouvez pas suspendre votre propre compte." });
      return;
    }

    setIsToggling(true);
    try {
      await superAdminService.toggleStatus(admin.id);
      toast.success("Statut mis à jour");
      await fetchDetails(); 
    } catch (error: any) {
      toast.error("Échec de l'opération");
    } finally {
      setIsToggling(false);
    }
  };

  if (isLoading) return <PageLoader />;
  if (!admin) return null;

  const isSelf = admin.id === currentUser?.id;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Profil Administrateur</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Accès Niveau Système</p>
          </div>
        </div>

        {!isSelf && (
          <Button 
            variant={admin.isActive ? "danger" : "primary"}
            onClick={handleToggle}
            isLoading={isToggling}
            className="gap-2 h-11 px-8 shadow-lg"
          >
            <Power size={18} />
            {admin.isActive ? "Suspendre l'administrateur" : "Réactiver l'administrateur"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLONNE GAUCHE : IDENTITÉ --- */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 inset-x-0 h-2 ${admin.isActive ? 'bg-primary' : 'bg-red-500'}`} />
            
            <div className="size-28 rounded-[2rem] bg-primary/5 flex items-center justify-center text-primary border-4 border-white shadow-xl overflow-hidden mb-6">
              {admin.photoUrl ? (
                <img src={admin.photoUrl} className="size-full object-cover" alt="" />
              ) : (
                <UserCog size={48} />
              )}
            </div>

            <h2 className="text-2xl font-black text-slate-800">{admin.firstName} {admin.lastName}</h2>
            <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-tighter">
              @{admin.username}
            </p>
            
            <div className={`mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border font-black text-xs uppercase tracking-widest ${
              admin.isActive 
                ? 'bg-blue-50 text-primary border-primary/20' 
                : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {admin.isActive ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
              {admin.isActive ? 'Privilèges Actifs' : 'Accès Révoqué'}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 p-6 space-y-4 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <Mail size={18} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700 truncate">{admin.email}</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <Phone size={18} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{admin.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- COLONNE DROITE : SÉCURITÉ & AUDIT --- */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Sécurité & Système</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rôles Assignés</p>
                <div className="flex flex-wrap gap-2">
                  {admin.roles.map(role => (
                    <span key={role} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg border border-slate-200">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernière Connexion</p>
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <Clock size={16} className="text-slate-400" />
                  {admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleString() : 'Jamais connecté'}
                </div>
              </div>
            </div>
          </div>

          {/* INFO BOX */}
          <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 flex items-start gap-5">
            <div className="p-3 rounded-2xl bg-primary text-white">
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">Note de Super Administration</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Cet utilisateur possède des droits d'administration sur les ressources et les managers. 
                Toute suspension de ce compte entraînera l'arrêt immédiat de ses capacités de modération sur la plateforme.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}