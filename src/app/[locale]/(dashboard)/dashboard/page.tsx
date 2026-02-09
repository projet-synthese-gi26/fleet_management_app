"use client";

import React, { useEffect, useState } from "react";
import { StatCard } from "../StatCard";
import { fleetManagerService } from "@/services/fleet-manager.service";
import { geofenceService } from "@/services/geofence.service";
import { ManagerKpis } from "@/types/fleet.types";
import { GeofenceAlert } from "@/types/geofence.types";
import { DashboardSkeleton } from "@/components/ui/skeletons/DashboardSkeleton";
import { Button } from "@/components/ui/Button";
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
  MapPin
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

export default function DashboardPage() {
  const router = useRouter();
  const { locale } = useI18n();
  
  // États pour les données du backend
  const [kpis, setKpis] = useState<ManagerKpis | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<GeofenceAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement des données
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      // Appel parallèle des KPIs et des Alertes
      const [kpiData, alertsData] = await Promise.all([
        fleetManagerService.getDashboardKpis(),
        geofenceService.getAlerts(0, 5) // On récupère les 5 dernières alertes
      ]);
      
      setKpis(kpiData);
      setRecentAlerts(alertsData.content || []);
    } catch (error) {
      console.error("Dashboard Load Error:", error);
      toast.error("Erreur de synchronisation avec le serveur");
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
      
      {/* --- SECTION 1 : EN-TÊTE & ACTIONS RAPIDES --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text-primary tracking-tight">
            Tableau de bord
          </h2>
          <p className="text-text-secondary text-sm">
            Supervision de vos flottes en temps réel.
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={loadDashboardData}
            className="h-10 w-10 p-0"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </Button>
          <Button 
            onClick={() => router.push(`/${locale}/dashboard/vehicles`)}
            className="gap-2 h-10 shadow-primary"
          >
            <Plus size={18} /> Ajouter un véhicule
          </Button>
        </div>
      </div>

      {/* --- SECTION 2 : CARTES DE STATISTIQUES (KPIs RÉELS) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Flottes Actives"
          value={kpis?.totalFleets || 0}
          icon="hub"
          color="primary"
          trend="up"
          trendValue="Live"
        />
        <StatCard
          title="Véhicules"
          value={kpis?.totalVehicles || 0}
          subValue="Total du parc"
          icon="local_shipping"
          color="info"
        />
        <StatCard
          title="Chauffeurs"
          value={kpis?.totalDrivers || 0}
          subValue="Inscrits & Actifs"
          icon="groups"
          color="success"
        />
        <StatCard
          title="En Course"
          value={kpis?.activeTrips || 0}
          subValue="Trajets en cours"
          icon="alt_route"
          color="warning"
          trend={kpis?.activeTrips && kpis.activeTrips > 0 ? "up" : "neutral"}
        />
      </div>

      {/* --- SECTION 3 : GRILLE PRINCIPALE (ÉTAT DU PARC & ALERTES) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Colonne Gauche : État de santé du parc (Simulé via KPIs) */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-border-default p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} />
              Condition du Parc
            </h3>
            <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              Rapport complet <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* État : Bon */}
            <div className="flex flex-col items-center gap-4 p-6 bg-background-secondary rounded-2xl border border-border-default transition-transform hover:scale-[1.02]">
              <div className="relative size-24">
                <svg className="size-full" viewBox="0 0 36 36">
                  <path className="text-success/10" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-success" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-text-primary">85%</div>
              </div>
              <div className="text-center">
                <p className="font-bold text-success uppercase text-xs tracking-widest">Opérationnel</p>
                <p className="text-sm text-text-secondary mt-1 font-medium">VÃ©hicules sains</p>
              </div>
            </div>

            {/* État : Maintenance */}
            <div className="flex flex-col items-center gap-4 p-6 bg-background-secondary rounded-2xl border border-border-default transition-transform hover:scale-[1.02]">
              <div className="relative size-24">
                <svg className="size-full" viewBox="0 0 36 36">
                  <path className="text-warning/10" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-warning" strokeDasharray="10, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-text-primary">10%</div>
              </div>
              <div className="text-center">
                <p className="font-bold text-warning uppercase text-xs tracking-widest">Maintenance</p>
                <p className="text-sm text-text-secondary mt-1 font-medium">Révisions prévues</p>
              </div>
            </div>

            {/* État : Critique */}
            <div className="flex flex-col items-center gap-4 p-6 bg-background-secondary rounded-2xl border border-border-default transition-transform hover:scale-[1.02]">
              <div className="relative size-24">
                <svg className="size-full" viewBox="0 0 36 36">
                  <path className="text-error/10" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-error" strokeDasharray="5, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-text-primary">5%</div>
              </div>
              <div className="text-center">
                <p className="font-bold text-error uppercase text-xs tracking-widest">Critique</p>
                <p className="text-sm text-text-secondary mt-1 font-medium">Arrêt immédiat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Alertes Récentes (Geofencing Live) */}
        <div className="bg-surface rounded-2xl border border-border-default p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg text-text-primary mb-6 flex items-center gap-2">
            <AlertTriangle className="text-error" size={20} />
            Alertes Récentes
          </h3>
          
          <div className="space-y-4 flex-1">
            {recentAlerts.length > 0 ? (
              recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex gap-4 items-start p-4 hover:bg-background-secondary rounded-xl transition-all cursor-pointer border border-transparent hover:border-border-default group"
                >
                  <div className={`mt-1 size-2.5 rounded-full shrink-0 ${
                    alert.type === 'EXIT' ? 'bg-error animate-pulse' : 'bg-info'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary truncate">
                      {alert.type === 'EXIT' ? 'Sortie de zone' : 'Entrée en zone'}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5 truncate">
                      {alert.vehiclePlate || "VÃ©hicule inconnu"} • {alert.zoneTitle || "Zone active"}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
                      <Clock size={10} />
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-text-disabled group-hover:text-primary transition-colors self-center" />
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <CheckCircle2 size={40} className="text-success/20 mb-3" />
                <p className="text-sm text-text-tertiary font-medium">Aucune alerte détectée</p>
              </div>
            )}
          </div>

          <button 
            onClick={() => router.push(`/${locale}/dashboard/alerts`)}
            className="w-full mt-6 py-3 text-sm text-primary font-bold hover:bg-primary/5 rounded-xl border border-primary/10 transition-all"
          >
            Voir tout l'historique
          </button>
        </div>
      </div>
    </div>
  );
}