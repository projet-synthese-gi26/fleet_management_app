"use client";
import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle, MaintenanceParameters } from "@/types/vehicle.types";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Wrench, AlertTriangle, CheckCircle, Battery } from "lucide-react";

export default function VehicleMaintenanceInfo({ vehicle, onUpdate, readOnly }: any) {
  const [form, setForm] = useState(vehicle.maintenanceParameters);
  // ... logique identique à Financial ...

  const handleSave = async () => {
    try {
      await vehicleService.updateMaintenance(vehicle.id, form);
      toast.success("Données de maintenance mises à jour");
      onUpdate();
    } catch (e) {
      toast.error("Erreur de sauvegarde");
    }
  };

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card Engine Status */}
          <div className="bg-surface p-4 rounded-xl border border-border-default">
             <label className="text-[10px] font-bold text-text-tertiary uppercase">État Moteur</label>
             <select 
               disabled={readOnly}
               className="w-full mt-1 font-bold text-primary bg-transparent"
               value={form?.engineStatus}
               onChange={e => setForm({...form, engineStatus: e.target.value})}
             >
                <option value="OK">Opérationnel</option>
                <option value="NEEDS_SERVICE">Révision requise</option>
                <option value="OUT_OF_SERVICE">Hors-service</option>
             </select>
          </div>
          {/* Santé Batterie */}
          <div className="bg-surface p-4 rounded-xl border border-border-default">
             <label className="text-[10px] font-bold text-text-tertiary uppercase">Santé Batterie</label>
             <div className="flex items-center gap-4">
                <input 
                  type="range" disabled={readOnly} className="flex-1"
                  value={form?.batteryHealth} onChange={e => setForm({...form, batteryHealth: parseInt(e.target.value)})}
                />
                <span className="font-bold">{form?.batteryHealth}%</span>
             </div>
          </div>
       </div>
       {!readOnly && <Button onClick={handleSave}>Mettre à jour le carnet</Button>}
    </div>
  );
}