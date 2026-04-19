"use client";

import React, { useEffect, useState, useCallback } from "react";
import { healthService, SystemHealth } from "@/services/health.service";
import { PageLoader } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { 
  Activity, Database, Zap, Shield, 
  Truck, Wallet, Map, RefreshCw, 
  AlertCircle, CheckCircle2, Server,AlertTriangle
} from "lucide-react";

export default function DiagnosticPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const runDiagnostic = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data = await healthService.check();
      setHealth(data);
      if (data.status === "UP") {
        toast.success("Système opérationnel");
      } else {
        toast.warning("Certains services sont indisponibles");
      }
    } catch (error) {
      toast.error("Échec du diagnostic", { description: "Le serveur backend ne répond pas." });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => { runDiagnostic(); }, [runDiagnostic]);

  if (isLoading) return <PageLoader />;

  const ServiceCard = ({ name, status, icon: Icon, description }: any) => {
    const isUp = status?.startsWith("UP");
    return (
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-2xl ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            <Icon size={24} />
          </div>
          <div className="flex items-center gap-2">
            <span className={`size-2.5 rounded-full ${isUp ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${isUp ? 'text-emerald-600' : 'text-red-600'}`}>
              {isUp ? 'Connecté' : 'Hors-ligne'}
            </span>
          </div>
        </div>
        <h3 className="font-bold text-slate-800">{name}</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
        {status && !isUp && (
          <p className="mt-3 text-[10px] font-mono bg-red-50 text-red-700 p-2 rounded-lg border border-red-100">
            Error: {status}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Activity className="text-primary" size={32} />
            Santé du Système
          </h1>
          <p className="text-slate-500 text-sm">Diagnostic profond des infrastructures et services tiers.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={runDiagnostic} 
          isLoading={isRefreshing}
          className="gap-2 h-11 px-6 rounded-xl border-slate-200"
        >
          <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
          Lancer un scan
        </Button>
      </div>

      {/* RÉSUMÉ GLOBAL */}
      <div className={`p-6 rounded-[2rem] border flex items-center gap-6 ${
        health?.status === 'UP' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-amber-500 text-white border-amber-600'
      }`}>
        <div className="size-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          {health?.status === 'UP' ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            {health?.status === 'UP' ? 'Système Stable' : 'Attention Requise'}
          </h2>
          <p className="text-white/80 text-sm font-medium">
            Dernière vérification : {health?.timestamp ? new Date(health.timestamp).toLocaleString() : 'Maintenant'}
          </p>
        </div>
      </div>

      {/* GRILLE DES SERVICES (Mapping exact des clés backend) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard 
          name="Base de Données" 
          status={health?.local_db} 
          icon={Database} 
          description="Stockage souverain PostgreSQL (R2DBC)."
        />
        <ServiceCard 
          name="Cache & Temps Réel" 
          status={health?.local_redis} 
          icon={Zap} 
          description="Moteur de performance Redis pour la télémétrie."
        />
        <ServiceCard 
          name="Service Identité" 
          status={health?.auth_service} 
          icon={Shield} 
          description="Authentification centralisée (Pynfi Auth)."
        />
        <ServiceCard 
          name="Service Véhicules" 
          status={health?.vehicle_service} 
          icon={Truck} 
          description="Gestion technique distante des unités."
        />
        <ServiceCard 
          name="Service Paiements" 
          status={health?.payment_service} 
          icon={Wallet} 
          description="Passerelle financière et Wallets."
        />
        <ServiceCard 
          name="Moteur Geofence" 
          status={health?.geofence_engine} 
          icon={Map} 
          description="Calcul spatial et détection de zones."
        />
      </div>

      {/* INFOS INFRASTRUCTURE */}
      <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Server className="text-primary" size={24} />
          <h3 className="text-lg font-bold">Informations Infrastructure</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 opacity-80">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Région Serveur</p>
            <p className="text-sm font-bold">Hetzner - Germany (Falkenstein)</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pipeline Messages</p>
            <p className="text-sm font-bold">Apache Kafka (KRaft Mode)</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Version API</p>
            <p className="text-sm font-bold">v1.0.0-STABLE</p>
          </div>
        </div>
      </div>

    </div>
  );
}