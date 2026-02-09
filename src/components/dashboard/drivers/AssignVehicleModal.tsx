"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { vehicleService } from "@/services/vehicle.service";
import { driverService } from "@/services/driver.service";
import { Vehicle } from "@/types/vehicle.types";
import { Driver } from "@/types/driver.types";
import { Truck, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
  onSuccess: () => void;
}

export function AssignVehicleModal({ isOpen, onClose, driver, onSuccess }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les véhicules de la même flotte
  useEffect(() => {
    if (isOpen && driver?.fleetId) {
      setIsLoading(true);
      vehicleService.getAll() // Le backend filtre déjà par manager
        .then(data => setVehicles(data.filter(v => v.fleetId === driver.fleetId)))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, driver]);

  const handleAssign = async () => {
    if (!driver || !selectedId) return;
    setIsSubmitting(true);
    try {
      await driverService.assignVehicle(driver.userId, selectedId);
      toast.success("Assignation réussie !");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erreur", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assigner un véhicule à ${driver?.firstName}`}>
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex gap-3 items-start">
          <AlertCircle className="text-amber-600 shrink-0" size={18} />
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Note : Si le véhicule est déjà assigné, l'ancien chauffeur sera automatiquement libéré.
          </p>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {vehicles.map(v => (
            <div 
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedId === v.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-border-default hover:bg-background-secondary'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${v.status === 'AVAILABLE' ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-400'}`}>
                  <Truck size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary uppercase">{v.licensePlate}</p>
                  <p className="text-[10px] text-text-tertiary">{v.brand} {v.model}</p>
                </div>
              </div>
              {selectedId === v.id && <CheckCircle2 size={18} className="text-primary" />}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleAssign} isLoading={isSubmitting} disabled={!selectedId}>
            Confirmer l'assignation
          </Button>
        </div>
      </div>
    </Modal>
  );
}