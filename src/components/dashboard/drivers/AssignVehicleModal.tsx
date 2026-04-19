"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { vehicleService } from "@/services/vehicle.service";
import { driverService } from "@/services/driver.service";
import { Vehicle } from "@/types/vehicle.types";
import { Driver } from "@/types/driver.types";
import { Truck, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AssignVehicleModal({ isOpen, onClose, driver, onSuccess }: any) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      vehicleService.getAll()
        .then(data => setVehicles(data.filter(v => v.status === 'AVAILABLE')))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  const handleAssign = async () => {
    if (!driver || !selectedId) return;
    setIsSubmitting(true);
    try {
      await driverService.assignVehicle(driver.userId, selectedId);
      toast.success("Véhicule assigné");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erreur d'assignation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assigner un véhicule à ${driver?.firstName}`}>
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-10 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {vehicles.map(v => (
              <div key={v.id} onClick={() => setSelectedId(v.id)} 
                   className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${selectedId === v.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-bold text-slate-700 uppercase">{v.licensePlate}</p>
                    <p className="text-[10px] text-slate-400">{v.brand} {v.model}</p>
                  </div>
                </div>
                {selectedId === v.id && <CheckCircle2 size={18} className="text-primary" />}
              </div>
            ))}
            {vehicles.length === 0 && <p className="text-center text-slate-400 text-sm py-4">Aucun véhicule disponible.</p>}
          </div>
        )}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleAssign} isLoading={isSubmitting} disabled={!selectedId}>Confirmer</Button>
        </div>
      </div>
    </Modal>
  );
}