"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/hooks/useI18n";
import { fleetManagerService } from "@/services/fleet-manager.service";
import { geofenceService } from "@/services/geofence.service";
import { ManagerKpis } from "@/types/fleet.types";
import { GeofenceAlert } from "@/types/geofence.types";
import { StatCard } from "./StatCard";
import { DashboardSkeleton } from "@/components/ui/skeletons/DashboardSkeleton";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { 
  Plus, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Truck,
  Users,
  MapPin,
  Activity,
  ArrowUpRight
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { locale } = useI18n();
  const { user } = useAuth();
  
  // --- ÉTATS DES DONNÉES ---
  const [kpis, setKpis] = useState<ManagerKpis | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<GeofenceAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Charge les données depuis le backend (KPIs + Alertes)
   */
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      // Exécution parallèle pour la performance
      const [kpiData, alertsData] = await Promise.all([
        fleetManagerService.getDashboardKpis(),
        geofenceService.getAlerts(0, 5) // 5 dernières alertes
      ]);
      
      setKpis(kpiData);
      setRecentAlerts(alertsData.content || []);
    } catch (error: any) {
      console.error("Erreur Dashboard:", error);
      toast.error("Erreur de synchronisation", { 
        description: "Impossible de récupérer les dernières données du parc." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      
      {/* --- SECTION 1 : HEADER & ACTIONS --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text-primary tracking-tight">
            Bonjour, {user?.firstName || 'Gestionnaire'} 👋
          </h2>
          <p className="text-text-secondary text-sm font-medium">
            Voici l'état actuel de vos flottes et de vos opérations.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={loadDashboardData}
            className="p-2.5 rounded-xl border border-border-default bg-surface hover:bg-background-secondary transition-all text-text-secondary"
            title="Actualiser les données"
          >
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
          <Button 
            onClick={() => router.push(`/${locale}/dashboard/vehicles`)}
            className="gap-2 h-11 shadow-primary px-6"
          >
            <Plus size={18} /> Ajouter un véhicule
          </Button>
        </div>
      </div>

      {/* --- SECTION 2 : CARTES DE STATISTIQUES (KPIs DU BACKEND) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Mes Flottes"
          value={kpis?.totalFleets || 0}
          icon="hub"
          color="primary"
          trend="up"
          trendValue="Actif"
        />
        <StatCard
          title="Véhicules"
          value={kpis?.totalVehicles || 0}
          subValue="Total du parc géré"
          icon="local_shipping"
          color="info"
        />
        <StatCard
          title="Chauffeurs"
          value={kpis?.totalDrivers || 0}
          subValue="Inscrits dans vos flottes"
          icon="groups"
          color="success"
        />
        <StatCard
          title="En Course"
          value={kpis?.activeTrips || 0}
          subValue="Trajets suivis en direct"
          icon="alt_route"
          color="warning"
          trend={kpis?.activeTrips && kpis.activeTrips > 0 ? "up" : "neutral"}
        />
      </div>

      {/* --- SECTION 3 : GRILLE PRINCIPALE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* BLOC GAUCHE : CONDITION DU PARC (VISUEL) */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-border-default p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
              <Activity className="text-primary" size={20} />
              Santé du Parc Automobile
            </h3>
            <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              Rapport de maintenance <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* État : Opérationnel */}
            <div className="flex flex-col items-center gap-4 p-6 bg-background-secondary rounded-2xl border border-border-default transition-all hover:shadow-md">
              <div className="relative size-24">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-success/10" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-success" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-text-primary">85%</div>
              </div>
              <div className="text-center">
                <p className="font-bold text-success uppercase text-[10px] tracking-widest">Disponible</p>
                <p className="text-xs text-text-secondary mt-1">VÃ©hicules prêts</p>
              </div>
            </div>

            {/* État : Maintenance */}
            <div className="flex flex-col items-center gap-4 p-6 bg-background-secondary rounded-2xl border border-border-default transition-all hover:shadow-md">
              <div className="relative size-24">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-warning/10" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-warning" strokeWidth="3" strokeDasharray="10, 100" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-text-primary">10%</div>
              </div>
              <div className="text-center">
                <p className="font-bold text-warning uppercase text-[10px] tracking-widest">Révision</p>
                <p className="text-xs text-text-secondary mt-1">Maintenance prévue</p>
              </div>
            </div>

            {/* État : Critique */}
            <div className="flex flex-col items-center gap-4 p-6 bg-background-secondary rounded-2xl border border-border-default transition-all hover:shadow-md">
              <div className="relative size-24">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-error/10" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-error" strokeWidth="3" strokeDasharray="5, 100" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-text-primary">5%</div>
              </div>
              <div className="text-center">
                <p className="font-bold text-error uppercase text-[10px] tracking-widest">Critique</p>
                <p className="text-xs text-text-secondary mt-1">Hors service</p>
              </div>
            </div>
          </div>
        </div>

        {/* BLOC DROIT : ALERTES GEOFENCING RÉELLES */}
        <div className="bg-surface rounded-2xl border border-border-default p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
              <AlertTriangle className="text-error" size={20} />
              Alertes Zones
            </h3>
            <span className="bg-error/10 text-error text-[10px] font-black px-2 py-0.5 rounded-full">LIVE</span>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
            {recentAlerts.length > 0 ? (
              recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex gap-4 items-start p-4 hover:bg-background-secondary rounded-xl transition-all border border-transparent hover:border-border-default group"
                >
                  <div className={`mt-1 size-2 rounded-full shrink-0 ${
                    alert.type === 'EXIT' ? 'bg-error animate-pulse' : 'bg-info'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <p className="text-xs font-black text-text-primary uppercase tracking-tighter">
                         {alert.vehiclePlate || "VÃ‰HICULE"}
                       </p>
                       <span className="text-[9px] font-bold text-text-tertiary flex items-center gap-1">
                         <Clock size={10} /> {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                       </span>
                    </div>
                    <p className="text-[11px] text-text-secondary mt-1 leading-tight">
                      {alert.type === 'EXIT' ? 'A quittÃ© la zone' : 'Est entrÃ© dans'} <span className="font-bold text-text-primary">{alert.zoneTitle || "Zone surveillÃ©e"}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                <CheckCircle2 size={48} className="text-success mb-3" />
                <p className="text-sm font-bold text-text-tertiary">Aucune violation de zone</p>
              </div>
            )}
          </div>

          <button 
            onClick={() => router.push(`/${locale}/dashboard/alerts`)}
            className="w-full mt-6 py-3 text-xs font-black text-primary uppercase tracking-widest hover:bg-primary/5 rounded-xl border border-primary/10 transition-all"
          >
            Historique complet
          </button>
        </div>
      </div>

      {/* --- SECTION 4 : RÉSUMÉ DES FLOTTES --- */}
      <div className="bg-surface rounded-2xl border border-border-default p-6 shadow-sm">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
              <MapPin className="text-primary" size={20} />
              Activité par Flotte
            </h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Ce bloc sera dynamisé dans la Tâche 10 avec les données de Trip active */}
            <div className="p-4 rounded-xl border border-border-default bg-background-secondary/30 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-white border border-border-default flex items-center justify-center">
                     <Truck size={16} className="text-text-secondary" />
                  </div>
                  <span className="text-sm font-bold text-text-primary">Logistique Douala</span>
               </div>
               <div className="flex items-center gap-1 text-success font-bold text-xs">
                  <ArrowUpRight size={14} /> 12 vhc
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}