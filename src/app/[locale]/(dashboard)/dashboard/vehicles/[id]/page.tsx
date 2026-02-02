"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  ArrowLeft, Truck, ShieldCheck, Wrench, 
  Image as ImageIcon, FileText, Info 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Spinner";

// Import des sous-sections (créées ci-dessous)
import VehicleGeneralInfo from "@/components/dashboard/vehicles/details/VehicleGeneralInfo";
import VehicleFinancialInfo from "@/components/dashboard/vehicles/details/VehicleFinancialInfo";
import VehicleMaintenanceInfo from "@/components/dashboard/vehicles/details/VehicleMaintenanceInfo";
import VehicleMediaManager from "@/components/dashboard/vehicles/details/VehicleMediaManager";

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  const isAdmin = user?.roles.includes("ADMIN");

  const fetchVehicle = async () => {
    try {
      const data = await vehicleService.getById(id as string);
      setVehicle(data);
    } catch (error) {
      toast.error("Impossible de charger le véhicule");
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchVehicle(); }, [id]);

  if (isLoading) return <PageLoader />;
  if (!vehicle) return null;

  const tabs = [
    { id: "general", label: "Général", icon: Info },
    { id: "financial", label: "Financier", icon: ShieldCheck },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "media", label: "Médias & Photos", icon: ImageIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header Contextuel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface rounded-full transition-colors border border-border-default">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {vehicle.licensePlate} <span className="text-sm font-normal text-text-secondary">({vehicle.brand} {vehicle.model})</span>
            </h1>
            <p className="text-sm text-text-secondary">Détails techniques et suivi du véhicule</p>
          </div>
        </div>
        {!isAdmin && (
           <Button variant="outline" className="text-error border-error/20 hover:bg-error/5">
             Mettre hors service
           </Button>
        )}
      </div>

      {/* Navigation par Onglets */}
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

      {/* Contenu de l'onglet actif */}
      <div className="animate-fade-in">
        {activeTab === "general" && <VehicleGeneralInfo vehicle={vehicle} onUpdate={fetchVehicle} readOnly={isAdmin} />}
        {activeTab === "financial" && <VehicleFinancialInfo vehicle={vehicle} onUpdate={fetchVehicle} readOnly={isAdmin} />}
        {activeTab === "maintenance" && <VehicleMaintenanceInfo vehicle={vehicle} onUpdate={fetchVehicle} readOnly={isAdmin} />}
        {activeTab === "media" && <VehicleMediaManager vehicle={vehicle} onUpdate={fetchVehicle} readOnly={isAdmin} />}
      </div>
    </div>
  );
}