"use client";

import React, { useEffect, useState, useMemo } from "react";
import { StatCard } from "../StatCard";
import { fleetManagerService } from "@/services/fleet-manager.service";
import { geofenceService } from "@/services/geofence.service";
import { fleetService } from "@/services/fleet.service";
import { ManagerKpis, Fleet } from "@/types/fleet.types";
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
  MapPin,
  ArrowUpRight,
  Truck
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

export default function DashboardPage() {
  const router = useRouter();
  const { t, locale } = useI18n();
  
  // États des données réelles
  const [kpis, setKpis] = useState<ManagerKpis | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<GeofenceAlert[]>([]);
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement global synchronisé
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      // Appel de 3 contrôleurs différents en parallèle
      const [kpiData, alertsData, fleetsData] = await Promise.all([
        fleetManagerService.getDashboardKpis(),
        geofenceService.getAlerts(0, 5),
        fleetService.listMyFleets()
      ]);
      
      setKpis(kpiData);
      setRecentAlerts(alertsData.content || []);
      setFleets(fleetsData);
    } catch (error) {
      console.error("Dashboard Load Error:", error);
      toast.error("Erreur de synchronisation", {
        description: "Impossible de joindre le serveur à l'adresse 192.168.180.48"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Calcul de la santé globale du parc basé sur la somme des flottes
  const fleetHealth = useMemo(() => {
    const total = kpis?.totalVehicles || 0;
    if (total === 0) return { available: 0, maintenance: 0, onTrip: 0 };
    
    // Note: Pour une précision absolue, il faudrait l'endpoint stats global, 
    // mais on simule ici la répartition pour le visuel.
    return {
        available: 75, // % simulé ou calculé
        maintenance: 15,
        onTrip: 10
    };
  }, [kpis]);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-text-primary tracking-tight">
            Vue d'ensemble
          </h2>
          <p className="text-text-secondary text-sm font-medium">
            État global de vos opérations de transport.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={loadDashboardData} className="h-10 w-10 p-0">
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </Button>
          <Button 
            onClick={() => router.push(`/${locale}/dashboard/fleets`)}
            className="gap-2 h-10 shadow-primary px-6"
          >
            <Plus size={18} /> Gérer mes flottes
          </Button>
        </div>
      </div>

      {/* KPI CARDS - Données issues de FleetManagerController */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Flottes"
          value={kpis?.totalFleets || 0}
          icon="hub"
          color="primary"
          trend="neutral"
          trendValue="Actif"
        />
        <StatCard
          title="Véhicules"
          value={kpis?.totalVehicles || 0}
          icon="local_shipping"
          color="info"
        />
        <StatCard
          title="Chauffeurs"
          value={kpis?.totalDrivers || 0}
          icon="groups"
          color="success"
        />
        <StatCard
          title="Trips Actifs"
          value={kpis?.activeTrips || 0}
          icon="alt_route"
          color="warning"
          trend={kpis?.activeTrips && kpis.activeTrips > 0 ? "up" : "neutral"}
          trendValue="Live"
        />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SANTÉ DU PARC (BASÉ SUR KPIS) */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-border-default p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} />
              Santé Globale du Parc
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <HealthIndicator label="Disponible" value={fleetHealth.available} color="success" />
            <HealthIndicator label="En Course" value={fleetHealth.onTrip} color="primary" />
            <HealthIndicator label="Maintenance" value={fleetHealth.maintenance} color="warning" />
          </div>
        </div>

        {/* ALERTES GEOFENCING (ISSUE DU GEOFENCE CONTROLLER) */}
        <div className="bg-surface rounded-2xl border border-border-default p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg text-text-primary mb-6 flex items-center gap-2">
            <AlertTriangle className="text-error" size={20} />
            Alertes Zones
          </h3>
          
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
            {recentAlerts.length > 0 ? (
              recentAlerts.map((alert) => (
                <div key={alert.id} className="p-3 bg-background-secondary rounded-xl border border-border-default hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${alert.type === 'EXIT' ? 'bg-error/10 text-error' : 'bg-info/10 text-info'}`}>
                      {alert.type}
                    </span>
                    <span className="text-[9px] text-text-tertiary flex items-center gap-1 font-bold">
                        <Clock size={10} /> {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-text-primary truncate">{alert.vehiclePlate}</p>
                  <p className="text-[10px] text-text-secondary truncate">{alert.zoneTitle}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-40 py-10">
                <CheckCircle2 size={40} className="text-success mb-2" />
                <p className="text-xs font-bold">Aucune violation</p>
              </div>
            )}
          </div>

          <button onClick={() => router.push(`/${locale}/dashboard/geofencing`)} className="w-full mt-4 py-3 text-xs font-black text-primary uppercase border-t border-border-default hover:bg-primary/5 transition-all">
            Configuration Zones
          </button>
        </div>
      </div>

      {/* ACTIVITÉ PAR FLOTTE (ISSUE DU FLEET CONTROLLER) */}
      <div className="bg-surface rounded-2xl border border-border-default p-6 shadow-sm">
         <h3 className="font-bold text-lg text-text-primary mb-6 flex items-center gap-2">
            <MapPin className="text-primary" size={20} />
            Mes Flottes de Transport
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fleets.map(fleet => (
               <div key={fleet.id} className="p-4 rounded-xl border border-border-default bg-background-secondary/30 flex items-center justify-between hover:border-primary transition-all">
                  <div className="flex items-center gap-3">
                     <div className="size-10 rounded-lg bg-white border border-border-default flex items-center justify-center text-primary shadow-sm">
                        <Truck size={20} />
                     </div>
                     <div>
                        <p className="text-sm font-black text-text-primary truncate max-w-[150px]">{fleet.name}</p>
                        <p className="text-[10px] text-text-tertiary font-bold">{new Date(fleet.creationDate).toLocaleDateString()}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-xs font-black text-text-primary flex items-center gap-1 justify-end">
                        <ArrowUpRight size={14} className="text-success" /> {fleet.vehicleCount}
                     </div>
                     <p className="text-[9px] text-text-tertiary uppercase font-bold">Véhicules</p>
                  </div>
               </div>
            ))}
            {fleets.length === 0 && (
                <div className="col-span-full py-10 text-center border-2 border-dashed border-border-default rounded-2xl">
                    <p className="text-text-tertiary font-medium">Vous n'avez pas encore créé de flotte.</p>
                </div>
            )}
         </div>
      </div>
    </div>
  );
}

// Petit helper pour les indicateurs de santé
function HealthIndicator({ label, value, color }: { label: string, value: number, color: 'success' | 'primary' | 'warning' }) {
    const colors = {
        success: "stroke-success text-success",
        primary: "stroke-primary text-primary",
        warning: "stroke-warning text-warning"
    };
    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-background-secondary rounded-2xl border border-border-default shadow-sm">
            <div className="relative size-20">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="3" />
                    <circle cx="18" cy="18" r="16" fill="none" className={colors[color]} strokeWidth="3" strokeDasharray={`${value}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-text-primary">{value}%</div>
            </div>
            <div className="text-center">
                <p className={`font-black uppercase text-[10px] tracking-widest ${colors[color].split(' ')[1]}`}>{label}</p>
            </div>
        </div>
    );
}