"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { geofenceService } from "@/services/geofence.service";
import { GeofenceZone } from "@/types/geofence.types";
import { toast } from "sonner";
import { MapPin, Shield, CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fleetId: string;
  onSuccess: () => void;
}

export function AssignZoneToFleetModal({ isOpen, onClose, fleetId, onSuccess }: Props) {
  const [zones, setZones] = useState<GeofenceZone[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchZones = async () => {
        setIsLoading(true);
        try {
          const myZones = await geofenceService.getMyZones();
          // On filtre pour ne proposer que les zones qui ne sont pas déjà sur cette flotte
          setZones(myZones.filter(z => z.fleetId !== fleetId));
        } finally {
          setIsLoading(false);
        }
      };
      fetchZones();
    }
  }, [isOpen, fleetId]);

  const handleAssign = async () => {
    if (!selectedZoneId) return;
    setIsSubmitting(true);
    try {
      // Appel : PATCH /api/v1/geofence/{zoneId}/assign-fleet/{fleetId}
      await geofenceService.assignToFleet(selectedZoneId, fleetId);
      toast.success("Zone assignée !", { 
        description: "Tous les véhicules de la flotte sont désormais surveillés." 
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Erreur de liaison");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assigner une zone de surveillance">
      <div className="space-y-6">
        <p className="text-xs text-text-secondary font-medium">
          Choisissez une zone existante pour y appliquer les règles de Geofencing de cette flotte.
        </p>

        {isLoading ? (
          <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {zones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                  selectedZoneId === zone.id 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border-default hover:bg-background-secondary"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedZoneId === zone.id ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:text-primary"
                  }`}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{zone.title || "Zone sans nom"}</p>
                    <p className="text-[10px] font-black uppercase text-text-tertiary tracking-widest">{zone.type}</p>
                  </div>
                </div>
                {selectedZoneId === zone.id && <CheckCircle2 size={20} className="text-primary" />}
              </div>
            ))}

            {zones.length === 0 && !isLoading && (
              <div className="text-center py-10 opacity-50">
                <Shield size={32} className="mx-auto mb-2" />
                <p className="text-sm">Aucune zone disponible à assigner.</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button onClick={handleAssign} isLoading={isSubmitting} disabled={!selectedZoneId} className="gap-2">
            <Shield size={18} /> Activer la surveillance
          </Button>
        </div>
      </div>
    </Modal>
  );
}