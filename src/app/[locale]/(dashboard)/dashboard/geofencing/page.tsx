"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { geofenceService } from "@/services/geofence.service";
import { fleetService } from "@/services/fleet.service";
import { GeofenceZone } from "@/types/geofence.types";
import { Fleet } from "@/types/fleet.types";
import { toast } from "sonner";
import { Shield, MapPin, Trash2, Layers } from "lucide-react";
import { CreateZoneModal } from "@/components/admin/geofencing/CreateZoneModal";
import { useAuth } from "@/contexts/AuthContext"; // Importez le hook auth

const GeofenceMap = dynamic(() => import("@/components/map/GeofenceMap"), { ssr: false });

export default function GeofencingPage() {
  const { user } = useAuth(); 
  const [zones, setZones] = useState<GeofenceZone[]>([]);
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempGeometry, setTempGeometry] = useState<any>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [z, f] = await Promise.all([
        geofenceService.getMyZones(), 
        fleetService.listMyFleets()]);
      setZones(z);
      setFleets(f);
    } catch (e) {
      toast.error("Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleZoneCreated = (geometry: any) => {
    setTempGeometry(geometry);
    setIsModalOpen(true);
  };

  const handleDelete = async (zone: GeofenceZone) => {
    if (!confirm(`Supprimer la zone "${zone.title}" ?`)) return;
    try {
      await geofenceService.deleteZone(zone.id, zone.type);
      toast.success("Zone supprimée");
      loadData();
    } catch (e) { toast.error("Erreur suppression"); }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] w-full overflow-hidden rounded-2xl border border-border-default bg-surface shadow-sm">
      {/* Sidebar */}
      <div className="w-80 flex flex-col border-r border-border-default bg-background-secondary/20">
        <div className="p-5 border-b border-border-default bg-white">
          <h2 className="text-lg font-black text-text-primary flex items-center gap-2">
            <Shield size={20} className="text-primary" /> Geofencing
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {zones.map(z => (
            <div key={z.id} className="p-4 rounded-xl border border-border-default bg-white shadow-sm group hover:border-primary transition-all">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-text-primary truncate">{z.title}</h4>
                <button onClick={() => handleDelete(z)} className="text-text-tertiary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`size-2 rounded-full ${z.isActive ? 'bg-success' : 'bg-slate-300'}`} />
                <p className="text-[10px] text-text-secondary font-bold uppercase">{z.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <GeofenceMap zones={zones} onZoneCreated={handleZoneCreated} />
      </div>

      {/* Modal */}
      {tempGeometry && (
        <CreateZoneModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setTempGeometry(null); }}
          geometry={tempGeometry}
          fleets={fleets}
          managerId={user?.id || ""}
          onSuccess={() => { loadData(); setIsModalOpen(false); setTempGeometry(null); }}
        />
      )}
    </div>
  );
}