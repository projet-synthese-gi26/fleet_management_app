"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { PageLoader } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { ArrowLeft, Info, ShieldCheck, Wrench, Image as ImageIcon, Activity } from "lucide-react";

import VehicleGeneralInfo from "@/components/dashboard/vehicles/details/VehicleGeneralInfo";
import VehicleFinancialInfo from "@/components/dashboard/vehicles/details/VehicleFinancialInfo";
import VehicleMaintenanceInfo from "@/components/dashboard/vehicles/details/VehicleMaintenanceInfo";
import VehicleMediaManager from "@/components/dashboard/vehicles/details/VehicleMediaManager";
import VehicleLiveStatus from "@/components/dashboard/vehicles/details/VehicleLiveStatus";

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  const fetchVehicle = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await vehicleService.getById(id as string);
      setVehicle(data);
    } catch (error: any) {
      toast.error("Erreur", { description: "Impossible de charger le véhicule." });
      router.back();
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => { if (id) fetchVehicle(); }, [id, fetchVehicle]);

  if (isLoading) return <PageLoader />;
  if (!vehicle) return null;

  const tabs = [
    { id: "general", label: "Général", icon: Info },
    { id: "financial", label: "Financier", icon: ShieldCheck },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "media", label: "Photos & Docs", icon: ImageIcon },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{vehicle.licensePlate}</h1>
          <p className="text-xs text-slate-400 font-bold uppercase">{vehicle.brand} {vehicle.model} • {vehicle.manufacturingYear}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 p-1 bg-slate-100 w-fit rounded-2xl border border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "general" && (
          <div className="space-y-6">
            <VehicleLiveStatus vehicleId={vehicle.id} />
            <VehicleGeneralInfo vehicle={vehicle} onUpdate={fetchVehicle} />
          </div>
        )}
        {activeTab === "financial" && <VehicleFinancialInfo vehicle={vehicle} onUpdate={fetchVehicle} />}
        {activeTab === "maintenance" && <VehicleMaintenanceInfo vehicle={vehicle} onUpdate={fetchVehicle} />}
        {activeTab === "media" && <VehicleMediaManager vehicle={vehicle} onUpdate={fetchVehicle} />}
      </div>
    </div>
  );
}