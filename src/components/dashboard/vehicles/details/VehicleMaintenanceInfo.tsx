"use client";
import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle, MaintenanceParameters } from "@/types/vehicle.types";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Wrench, AlertTriangle, CheckCircle, Battery } from "lucide-react";

export default function VehicleMaintenanceInfo({ 
  vehicle, 
  onUpdate, 
  readOnly 
}: { 
  vehicle: Vehicle, 
  onUpdate: () => void, 
  readOnly: boolean | undefined 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialisation avec les valeurs existantes ou des valeurs par défaut
  const [form, setForm] = useState<MaintenanceParameters>(vehicle.maintenanceParameters || {
    lastMaintenanceDate: "",
    nextMaintenanceDue: "",
    engineStatus: "OK",
    batteryHealth: 100,
    maintenanceStatus: "UP_TO_DATE"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await vehicleService.updateMaintenance(vehicle.id, form);
      toast.success("État de maintenance mis à jour");
      onUpdate();
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper pour les couleurs de statut
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'UP_TO_DATE': case 'OK': return 'text-success bg-success/10 border-success/20';
      case 'PENDING': case 'NEEDS_SERVICE': return 'text-warning bg-warning/10 border-warning/20';
      case 'OVERDUE': case 'OUT_OF_SERVICE': return 'text-error bg-error/10 border-error/20';
      default: return 'text-text-secondary bg-surface border-border-default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Résumé visuel de l'état actuel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${getStatusStyle(form.maintenanceStatus)}`}>
          <Wrench size={24} />
          <div>
            <p className="text-[10px] font-bold uppercase opacity-70">Révision</p>
            <p className="font-bold">{form.maintenanceStatus.replace('_', ' ')}</p>
          </div>
        </div>
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${getStatusStyle(form.engineStatus)}`}>
          <AlertTriangle size={24} />
          <div>
            <p className="text-[10px] font-bold uppercase opacity-70">Moteur</p>
            <p className="font-bold">{form.engineStatus.replace('_', ' ')}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-border-default bg-surface flex items-center gap-4 text-text-primary">
          <Battery size={24} className={form.batteryHealth < 20 ? "text-error" : "text-success"} />
          <div>
            <p className="text-[10px] font-bold uppercase text-text-tertiary">Batterie</p>
            <p className="font-bold">{form.batteryHealth}%</p>
          </div>
        </div>
      </div>

      {/* Formulaire d'édition */}
      <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-xl border border-border-default space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase">Dernière Maintenance</label>
            <input 
              type="date"
              disabled={readOnly}
              className="form-input w-full p-2.5 rounded-lg border bg-background text-text-primary outline-none focus:ring-2 focus:ring-primary/20"
              value={form.lastMaintenanceDate}
              onChange={e => setForm({...form, lastMaintenanceDate: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase">Prochaine Échéance</label>
            <input 
              type="date"
              disabled={readOnly}
              className="form-input w-full p-2.5 rounded-lg border bg-background text-text-primary outline-none focus:ring-2 focus:ring-primary/20"
              value={form.nextMaintenanceDue}
              onChange={e => setForm({...form, nextMaintenanceDue: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase">État du Moteur</label>
            <select 
              disabled={readOnly}
              className="form-input w-full p-2.5 rounded-lg border bg-background text-text-primary outline-none focus:ring-2 focus:ring-primary/20"
              value={form.engineStatus}
              onChange={e => setForm({...form, engineStatus: e.target.value as any})}
            >
              <option value="OK">Opérationnel (OK)</option>
              <option value="NEEDS_SERVICE">À réviser (Service Required)</option>
              <option value="OUT_OF_SERVICE">Critique (Out of Service)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase">Santé Batterie (%)</label>
            <input 
              type="number"
              min="0" max="100"
              disabled={readOnly}
              className="form-input w-full p-2.5 rounded-lg border bg-background text-text-primary outline-none focus:ring-2 focus:ring-primary/20"
              value={form.batteryHealth}
              onChange={e => setForm({...form, batteryHealth: parseInt(e.target.value)})}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-text-secondary uppercase">Statut Global de Maintenance</label>
            <select 
              disabled={readOnly}
              className="form-input w-full p-2.5 rounded-lg border bg-background text-text-primary outline-none focus:ring-2 focus:ring-primary/20 font-bold"
              value={form.maintenanceStatus}
              onChange={e => setForm({...form, maintenanceStatus: e.target.value as any})}
            >
              <option value="UP_TO_DATE" className="text-success">À JOUR</option>
              <option value="PENDING" className="text-warning">EN ATTENTE / PROCHE</option>
              <option value="OVERDUE" className="text-error">RETARD / DÉPASSÉ</option>
            </select>
          </div>
        </div>

        {!readOnly && (
          <div className="flex justify-end pt-4 border-t border-border-default">
            <Button type="submit" isLoading={isSubmitting} className="px-10">
              Mettre à jour le carnet d'entretien
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}