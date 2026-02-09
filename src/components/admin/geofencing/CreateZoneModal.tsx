"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { geofenceService } from "@/services/geofence.service";
import { toast } from "sonner";
import { Clock, Layers, ShieldCheck, AlertCircle } from "lucide-react";

export default function CreateZoneModal({ isOpen, onClose, geometry, fleets, managerId, onSuccess }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    isTemporalEnabled: false,
    startTime: "08:00:00",
    endTime: "18:00:00",
    targetFleetId: "" // Pour Spec 3.B
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Préparation du payload (Spec 1 : Inversion Lng/Lat)
      const payload = {
        ...form,
        fleetManagerId: managerId,
        type: geometry.type,
        radius: geometry.radius,
        center: geometry.center,
        polygon: geometry.polygon,
        isConditionalEnabled: false
      };

      // 2. Création de la zone
      const createdZone = await geofenceService.createZone(payload);

      // 3. Assigner à la flotte si sélectionnée (Spec 3.B)
      if (form.targetFleetId) {
        await geofenceService.assignToFleet(createdZone.id, form.targetFleetId);
        toast.success("Zone créée et assignée à la flotte !");
      } else {
        toast.success("Zone créée avec succès");
      }

      onSuccess(createdZone);
    } catch (error: any) {
      toast.error("Erreur Geofence", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurer la Zone de Sécurité">
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Identifiants de base */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-text-secondary">Nom de la zone *</label>
            <input 
                required autoFocus
                className="w-full p-2.5 rounded-lg border bg-background"
                placeholder="Ex: Entrepôt Principal Douala"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-text-secondary">Description</label>
            <textarea 
                className="w-full p-2.5 rounded-lg border bg-background h-20 resize-none"
                placeholder="Objectif de cette surveillance..."
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
            />
          </div>
        </div>

        {/* Spec 1 : Configuration Temporelle */}
        <div className="p-4 rounded-xl border border-border-default bg-slate-50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Surveillance Temporelle</span>
            </div>
            <input 
                type="checkbox" className="size-5 accent-primary"
                checked={form.isTemporalEnabled}
                onChange={e => setForm({...form, isTemporalEnabled: e.target.checked})}
            />
          </div>
          
          {form.isTemporalEnabled && (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-text-tertiary">Heure Début</label>
                    <input type="time" step="1" className="w-full p-2 rounded-lg border bg-white" 
                           value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-text-tertiary">Heure Fin</label>
                    <input type="time" step="1" className="w-full p-2 rounded-lg border bg-white"
                           value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} />
                </div>
            </div>
          )}
        </div>

        {/* Spec 3.B : Assignation Immédiate */}
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-text-secondary flex items-center gap-2">
                <Layers size={14} /> Assigner à une flotte
            </label>
            <select 
                className="w-full p-2.5 rounded-lg border bg-background"
                value={form.targetFleetId}
                onChange={e => setForm({...form, targetFleetId: e.target.value})}
            >
                <option value="">Ne pas assigner pour le moment</option>
                {fleets.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
            <p className="text-[10px] text-text-tertiary italic">
                L'assignation active la surveillance pour tous les véhicules de la flotte choisie.
            </p>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button type="submit" isLoading={isSubmitting} className="px-8">
            <ShieldCheck size={18} className="mr-2" /> Créer la zone
          </Button>
        </div>
      </form>
    </Modal>
  );
}