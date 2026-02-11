"use client";
import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Wrench, Battery, Activity } from "lucide-react";

export default function VehicleMaintenanceInfo({ vehicle, onUpdate, readOnly }: any) {
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(vehicle.maintenanceParameters || {
    engineStatus: "OK",
    batteryHealth: 100,
    maintenanceStatus: "UP_TO_DATE"
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await vehicleService.updateMaintenance(vehicle.id, form);
      toast.success("Carnet de santé mis à jour");
      onUpdate();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <label className="text-[10px] font-black text-slate-400 uppercase mb-4 block">État du Moteur</label>
          <select disabled={readOnly} className="w-full p-2 bg-transparent font-bold text-lg outline-none"
                  value={form.engineStatus} onChange={e => setForm({...form, engineStatus: e.target.value})}>
            <option value="OK">Parfait (OK)</option>
            <option value="NEEDS_SERVICE">Révision requise</option>
            <option value="OUT_OF_SERVICE">Hors-service</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <label className="text-[10px] font-black text-slate-400 uppercase mb-4 block">Santé Batterie</label>
          <div className="flex items-center gap-4">
            <Battery className={form.batteryHealth > 20 ? "text-emerald-500" : "text-red-500"} />
            <input type="range" disabled={readOnly} className="flex-1 accent-primary" 
                   value={form.batteryHealth} onChange={e => setForm({...form, batteryHealth: parseInt(e.target.value)})} />
            <span className="font-black text-xl">{form.batteryHealth}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <label className="text-[10px] font-black text-slate-400 uppercase mb-4 block">Statut Maintenance</label>
          <select disabled={readOnly} className="w-full p-2 bg-transparent font-bold text-lg outline-none"
                  value={form.maintenanceStatus} onChange={e => setForm({...form, maintenanceStatus: e.target.value})}>
            <option value="UP_TO_DATE">À jour</option>
            <option value="PENDING">En attente</option>
            <option value="OVERDUE">Retard critique</option>
          </select>
        </div>
      </div>
      {!readOnly && <div className="flex justify-end"><Button type="submit" isLoading={isSaving}>Mettre à jour le carnet</Button></div>}
    </form>
  );
}