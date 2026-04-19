"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { geofenceService } from "@/services/geofence.service";
import { fleetService } from "@/services/fleet.service";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Plus, MapPin } from "lucide-react";
import { CreateZoneModal } from "@/components/admin/geofencing/CreateZoneModal";

const GeofenceMap = dynamic(() => import("@/components/map/GeofenceMap"), { ssr: false });

export default function GeofencingPage() {
  const { user } = useAuth();
  const [zones, setZones] = useState<any[]>([]);
  const [fleets, setFleets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // État pour la création
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempGeometry, setTempGeometry] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [zonesData, fleetsData] = await Promise.all([
          geofenceService.getMyZones(),
          fleetService.getAllFleets()
        ]);
        setZones(zonesData);
        setFleets(fleetsData);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const handleZoneCreated = (geometry: any) => {
    setTempGeometry(geometry);
    setIsModalOpen(true);
  };

  const handleSaveComplete = async (newZone: any) => {
    setZones([...zones, newZone]);
    setIsModalOpen(false);
    setTempGeometry(null);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
      {/* Sidebar de gauche (Gestion des zones) */}
      <div className="w-80 flex flex-col bg-surface border-r border-border-default z-10 shadow-xl">
        <div className="p-5 border-b border-border-default bg-primary/5">
          <h2 className="text-lg font-bold flex items-center gap-2 text-primary">
            <Shield size={20} /> Geofencing
          </h2>
          <p className="text-[10px] text-text-tertiary uppercase font-bold mt-1 tracking-widest">
            Moteur de surveillance spatial
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {zones.map((zone) => (
            <div key={zone.id} className="p-3 rounded-xl border border-border-default hover:border-primary transition-all group bg-white shadow-sm">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-text-primary">{zone.title}</h4>
                    <span className={`size-2 rounded-full ${zone.isActive ? 'bg-success' : 'bg-slate-300'}`} />
                </div>
                <p className="text-[10px] text-text-secondary mt-1">{zone.type} • {zone.isActive ? 'Actif' : 'Désactivé'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Carte (Prend le reste de l'espace) */}
      <div className="flex-1 relative">
        <GeofenceMap 
            zones={zones} 
            onZoneCreated={handleZoneCreated}  
        />
      </div>

      {/* Modale de Configuration Fine (Spec 1 & 3.B) */}
      {tempGeometry && (
        <CreateZoneModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          geometry={tempGeometry}
          fleets={fleets}
          managerId={user?.id || ""}
          onSuccess={() => handleSaveComplete}
        />
      )}
    </div>
  );
}