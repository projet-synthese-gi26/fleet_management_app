"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { fleetService } from "@/services/fleet.service";
import { vehicleService } from "@/services/vehicle.service";
import { geofenceService } from "@/services/geofence.service";
import { PageLoader } from "@/components/ui/Spinner";
import { 
  ArrowLeft, Truck, Shield, ChevronRight, MapPin, 
  Calendar, Info, Plus, Users, Unlink 
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

// On importera les modales que nous allons créer juste après
import { AssignVehicleToFleetModal } from "@/components/dashboard/fleets/AssignVehicleToFleetModal";

import { RecruitDriverModal } from "@/components/dashboard/fleets/RecruitDriverModal";
import { AssignZoneToFleetModal } from "@/components/dashboard/fleets/AssignZoneToFleetModal";

export default function FleetDetailPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // États des modales
  const [activeModal, setActiveModal] = useState<"vehicle" | "driver" | "zone" | null>(null);

  const loadAllData = useCallback(async () => {
    try {
      const [fleet, vehicles, zones] = await Promise.all([
        fleetService.getAllFleets().then(list => list.find(f => f.id === id)),
        vehicleService.getByFleet(id as string),
        geofenceService.getZonesByFleet(id as string)
      ]);
      setData({ fleet, vehicles, zones });
    } catch (error) {
      toast.error("Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { if (id) loadAllData(); }, [id, loadAllData]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface rounded-full border border-border-default">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-text-primary">{data.fleet.name}</h1>
            <p className="text-sm text-text-tertiary">Configuration et ressources de la flotte</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SECTION VÉHICULES */}
        <div className="bg-surface rounded-2xl border border-border-default overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border-default flex justify-between items-center bg-background-secondary/30">
            <h3 className="font-bold text-text-primary flex items-center gap-2">
              <Truck size={20} className="text-primary" /> Véhicules ({data.vehicles.length})
            </h3>
            <button onClick={() => setActiveModal("vehicle")} className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all">
                <Plus size={16} />
            </button>
          </div>
          <div className="divide-y divide-border-default max-h-[400px] overflow-y-auto">
            {data.vehicles.map((vhc: any) => (
              <div key={vhc.id} className="p-4 flex items-center justify-between hover:bg-background-secondary group">
                <Link href={`/${locale}/dashboard/vehicles/${vhc.id}`} className="flex items-center gap-3 flex-1">
                  <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary uppercase">{vhc.licensePlate}</p>
                    <p className="text-[10px] text-text-tertiary font-bold">{vhc.brand} {vhc.model}</p>
                  </div>
                </Link>
                <button 
                    onClick={async () => {
                        if(confirm("Détacher ce véhicule ?")) {
                            await fleetService.detachVehicle(id as string, vhc.id);
                            loadAllData();
                        }
                    }}
                    className="p-2 text-text-tertiary hover:text-error opacity-0 group-hover:opacity-100 transition-all"
                >
                    <Unlink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION GEOFENCING */}
        <div className="bg-surface rounded-2xl border border-border-default overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border-default flex justify-between items-center bg-background-secondary/30">
            <h3 className="font-bold text-text-primary flex items-center gap-2">
              <Shield size={20} className="text-success" /> Geofencing ({data.zones.length})
            </h3>
            <button onClick={() => setActiveModal("zone")} className="p-1.5 bg-success text-white rounded-lg hover:bg-success-dark transition-all">
                <Plus size={16} />
            </button>
          </div>
          <div className="divide-y divide-border-default">
            {data.zones.map((zone: any) => (
              <div key={zone.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="size-10 rounded-lg bg-success/5 flex items-center justify-center text-success/60">
                      <MapPin size={20} />
                   </div>
                   <p className="text-sm font-bold text-text-primary">{zone.title || zone.name}</p>
                </div>
                <Link href={`/${locale}/dashboard/geofencing`} className="text-primary"><ChevronRight size={18} /></Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALES D'ACTION */}
      <AssignVehicleToFleetModal 
        isOpen={activeModal === "vehicle"} 
        onClose={() => setActiveModal(null)} 
        fleetId={id as string}
        onSuccess={loadAllData}
      />
      
      <AssignZoneToFleetModal 
        isOpen={activeModal === "zone"} 
        onClose={() => setActiveModal(null)} 
        fleetId={id as string}
        onSuccess={loadAllData}
      />

    </div>
  );
}