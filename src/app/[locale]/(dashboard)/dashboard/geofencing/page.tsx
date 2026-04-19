"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { geofenceService } from "@/services/geofence.service";
import { fleetService } from "@/services/fleet.service";
import { GeofenceZone } from "@/types/geofence.types";
import { Fleet } from "@/types/fleet.types";
import { toast } from "sonner";
import { 
  Shield, 
  MapPin, 
  Trash2, 
  Layers, 
  ChevronLeft, 
  Clock, 
  Activity,
  AlertTriangle,
  Settings2
} from "lucide-react";
import { CreateZoneModal } from "@/components/admin/geofencing/CreateZoneModal";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { GeofenceDetails } from "@/components/map/GeofenceDetails";

const GeofenceMap = dynamic(() => import("@/components/map/GeofenceMap"), { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center text-text-tertiary">Chargement du moteur spatial...</div>
});

export default function GeofencingPage() {
  const { user } = useAuth(); 
  const [zones, setZones] = useState<GeofenceZone[]>([]);
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // États de sélection et modale
  const [selectedZone, setSelectedZone] = useState<GeofenceZone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempGeometry, setTempGeometry] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [z, f] = await Promise.all([
        geofenceService.getMyZones(), 
        fleetService.listMyFleets()
      ]);
      setZones(z);
      setFleets(f);
    } catch (e) {
      toast.error("Erreur de chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Handlers
  const handleZoneCreated = (geometry: any) => {
    setTempGeometry(geometry);
    setIsModalOpen(true);
  };

  const handleDelete = async (zone: GeofenceZone) => {
    if (!confirm(`Supprimer la zone "${zone.title}" ? Cette action est irréversible.`)) return;
    setIsDeleting(true);
    try {
      await geofenceService.deleteZone(zone.id, zone.type);
      toast.success("Zone supprimée avec succès");
      setSelectedZone(null);
      loadData();
    } catch (e) { 
      toast.error("Erreur lors de la suppression"); 
    } finally {
      setIsDeleting(false);
    }
  };

  const selectedFleetName = useMemo(() => {
    if (!selectedZone?.fleetId) return "Aucune flotte assignée";
    return fleets.find(f => f.id === selectedZone.fleetId)?.name || "Flotte inconnue";
  }, [selectedZone, fleets]);

  return (
    <div className="flex h-[calc(100vh-120px)] w-full overflow-hidden rounded-3xl border border-border-default bg-surface shadow-2xl">
      
      {/* --- SIDEBAR DE GESTION --- */}
      
      <div className="w-85 flex flex-col border-r border-border-default bg-background-secondary/20 relative z-20">
    {!selectedZone ? (
        <>
            <div className="p-6 border-b border-border-default bg-white">
                <h2 className="text-lg font-black text-text-primary flex items-center gap-2">
                    <Shield size={20} className="text-primary" /> Geofencing
                </h2>
                <p className="text-[10px] text-text-tertiary uppercase font-bold mt-1 tracking-widest">
                    {zones.length} Zones actives
                </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
    {zones.map(z => (
        <div 
            key={z.id} 
            onClick={() => setSelectedZone(z)}
            className="p-4 rounded-2xl border border-border-default bg-white shadow-sm group hover:border-primary transition-all cursor-pointer hover:shadow-md"
        >
            <div className="flex justify-between items-start">
                {/* 1. Nom de la zone */}
                <h4 className="font-bold text-sm text-text-primary truncate pr-4">
                    {z.title}
                </h4>
                {/* 2. Point de statut (Actif/Inactif) */}
                <span className={`size-2.5 rounded-full shrink-0 ${
                    z.isActive 
                        ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
                        : 'bg-slate-300'
                }`} />
            </div>

            <div className="flex items-center gap-3 mt-3">
                {/* 3. Badge du Type (Cercle/Polygone) */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[9px] font-black text-text-secondary uppercase">
                    <Layers size={10} /> {z.type}
                </div>

                {/* 4. Indicateur si surveillance horaire activée */}
                {z.isTemporalEnabled && (
                    <div className="flex items-center gap-1 text-[9px] font-bold text-amber-600">
                        <Clock size={10} /> Temporisé
                    </div>
                )}
            </div>
        </div>
    ))}
</div>
        </>
    ) : (
        <GeofenceDetails 
            zone={selectedZone} 
            fleets={fleets}
            onBack={() => setSelectedZone(null)}
            onDelete={handleDelete}
            isDeleting={isDeleting}
        />
    )}
</div>

      {/* --- CARTE INTERACTIVE --- */}
      <div className="flex-1 relative">
        <GeofenceMap 
    zones={zones} 
    focusedZoneId={selectedZone?.id} // Pour le coloriage et le centrage
    onZoneCreated={handleZoneCreated} 
    onZoneSelect={(zone) => setSelectedZone(zone)} // ✅ Action lors du clic sur la carte
/>
        
        {/* Overlay d'état vide */}
        {zones.length === 0 && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px] pointer-events-none z-[400]">
                <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-border-default text-center max-w-sm pointer-events-auto">
                    <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                        <MapPin size={32} />
                    </div>
                    <h3 className="text-xl font-black text-text-primary mb-2">Aucune zone définie</h3>
                    <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                        Utilisez les outils de dessin en haut à droite de la carte pour définir votre premier périmètre de sécurité.
                    </p>
                </div>
            </div>
        )}
      </div>

      {/* --- MODALE DE CRÉATION --- */}
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