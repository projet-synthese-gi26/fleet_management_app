"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Vehicle } from "@/types/vehicle.types";
import { vehicleService } from "@/services/vehicle.service";
import { useAuth } from "@/contexts/AuthContext";
import { PageLoader } from "@/components/ui/Spinner";
import { ArrowLeft, Info, ShieldCheck, Wrench, Image as ImageIcon } from "lucide-react";

// Import des sous-composants
import VehicleGeneralInfo from "@/components/dashboard/vehicles/details/VehicleGeneralInfo";
import VehicleFinancialInfo from "@/components/dashboard/vehicles/details/VehicleFinancialInfo";
import VehicleMaintenanceInfo from "@/components/dashboard/vehicles/details/VehicleMaintenanceInfo";
import VehicleMediaManager from "@/components/dashboard/vehicles/details/VehicleMediaManager";
import VehicleLiveStatus from "@/components/dashboard/vehicles/details/VehicleLiveStatus";

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  // Sécurité : Seul le Manager peut éditer. L'Admin ne fait que du contrôle.
  const isManager = user?.roles.includes('FLEET_MANAGER');
  const readOnly = !isManager; 

  const fetchVehicle = async () => {
    try {
      setIsLoading(true);
      const data = await vehicleService.getById(id as string);
      setVehicle(data);
    } catch (error: any) {
      toast.error("Impossible de charger le véhicule", { description: error.detail });
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchVehicle();
  }, [id]);

  if (isLoading) return <PageLoader />;
  if (!vehicle) return <div className="p-8 text-center text-text-secondary">Véhicule introuvable.</div>;

  const tabs = [
    { id: "general", label: "Général", icon: Info },
    { id: "financial", label: "Financier", icon: ShieldCheck },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "media", label: "Photos & Documents", icon: ImageIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header Contextuel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-border-default shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="p-2 hover:bg-background-secondary rounded-full transition-colors border border-border-default"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 text-text-primary">
              {vehicle.licensePlate}
              <span className="text-sm font-normal text-text-secondary">
                ({vehicle.brand} {vehicle.model})
              </span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
               <span className={`size-2 rounded-full ${readOnly ? 'bg-amber-500' : 'bg-success'}`}></span>
               <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
                 {readOnly ? "Mode Consultation (Admin)" : "Mode Gestion (Manager)"}
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par Onglets (Tabs) */}
      <div className="flex border-b border-border-default gap-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-4 border-b-2 transition-all whitespace-nowrap text-sm font-bold uppercase tracking-wider ${
              activeTab === tab.id 
                ? "border-primary text-primary" 
                : "border-transparent text-text-tertiary hover:text-text-primary"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu Dynamique de l'onglet actif */}
      <div className="animate-fade-in py-2">
        {activeTab === "general" && (
          <div className="space-y-8">
            {/* On affiche le live status en premier si on n'est pas en lecture seule ou pour l'admin aussi */}
            <VehicleLiveStatus vehicleId={vehicle.id} />
            
            <VehicleGeneralInfo 
              vehicle={vehicle} 
              onUpdate={() => fetchVehicle} 
            />
          </div>
        )}
        
        {activeTab === "financial" && (
          <VehicleFinancialInfo 
            vehicle={vehicle} 
            onUpdate={fetchVehicle} 
            readOnly={readOnly} 
          />
        )}
        
        {activeTab === "maintenance" && (
          <VehicleMaintenanceInfo 
            vehicle={vehicle} 
            onUpdate={fetchVehicle} 
            readOnly={readOnly} 
          />
        )}

        {activeTab === "media" && (
          <VehicleMediaManager 
            vehicle={vehicle} 
            onUpdate={fetchVehicle} 
            readOnly={readOnly} 
          />
        )}
      </div>
    </div>
  );
}