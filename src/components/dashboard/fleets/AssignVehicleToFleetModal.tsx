"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { vehicleService } from "@/services/vehicle.service";
import { fleetService } from "@/services/fleet.service";
import { Truck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function AssignVehicleToFleetModal({ isOpen, onClose, fleetId, onSuccess }: any) {
  const [availableVehicles, setAvailableVehicles] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Charger les véhicules qui n'ont pas encore de flotte
      vehicleService.getAll().then(list => {
        setAvailableVehicles(list.filter((v: any) => !v.fleetId));
      });
    }
  }, [isOpen]);

  const handleAssign = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      await fleetService.assignVehicle(fleetId, selectedId);
      toast.success("Véhicule assigné");
      onSuccess();
      onClose();
    } catch (e) {
      toast.error("Erreur d'assignation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assigner un véhicule libre">
      <div className="space-y-4">
        <p className="text-xs text-text-tertiary uppercase font-bold">Sélectionnez un véhicule dans votre inventaire global :</p>
        <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {availableVehicles.map(v => (
            <div 
              key={v.id} 
              onClick={() => setSelectedId(v.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${selectedId === v.id ? 'border-primary bg-primary/5' : 'border-border-default hover:bg-background-secondary'}`}
            >
              <div className="flex items-center gap-3">
                <Truck size={18} className="text-text-tertiary" />
                <span className="text-sm font-bold text-text-primary uppercase">{v.licensePlate}</span>
              </div>
              {selectedId === v.id && <CheckCircle2 size={18} className="text-primary" />}
            </div>
          ))}
          {availableVehicles.length === 0 && <p className="text-sm italic text-center py-4">Aucun véhicule libre disponible.</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleAssign} isLoading={isLoading} disabled={!selectedId}>Confirmer l'ajout</Button>
        </div>
      </div>
    </Modal>
  );
}