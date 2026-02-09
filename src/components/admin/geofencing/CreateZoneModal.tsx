"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { geofenceService } from "@/services/geofence.service";
import { Fleet } from "@/types/fleet.types";
import { toast } from "sonner";
import { Clock, Layers, ShieldCheck } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  geometry: any; // Données spatiales temporaires
  fleets: Fleet[];
  onSuccess: () => void;
}

export function CreateZoneModal({ isOpen, onClose, geometry, fleets, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    isTemporalEnabled: false,
    startTime: "08:00:00",
    endTime: "18:00:00",
    targetFleetId: ""
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Création de la zone
      const payload = { ...form, ...geometry };
      const newZone = await geofenceService.createZone(payload);

      // 2. Assignation immédiate à la flotte si sélectionnée
      if (form.targetFleetId) {
        await geofenceService.assignToFleet(newZone.id, form.targetFleetId);
        toast.success("Zone créée et surveillance activée !");
      } else {
        toast.success("Zone créée avec succès.");
      }

      onSuccess();
    } catch (error: any) {
      toast.error("Erreur", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurer la Zone">
      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-text-tertiary">Nom de la zone *</label>
            <input required autoFocus className="w-full p-2.5 rounded-xl border bg-background"
                   placeholder="Ex: Entrepôt Nord" value={form.title}
                   onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-text-tertiary">Description</label>
            <textarea className="w-full p-2.5 rounded-xl border bg-background h-20 resize-none"
                      value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
        </div>

        {/* Paramètres Temporels */}
        <div className="p-4 rounded-2xl bg-background-secondary border border-border-default space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
              <Clock size={16} className="text-primary" /> Surveillance Horaire
            </div>
            <input type="checkbox" className="size-5 accent-primary" 
                   checked={form.isTemporalEnabled} onChange={e => setForm({...form, isTemporalEnabled: e.target.checked})} />
          </div>
          {form.isTemporalEnabled && (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <input type="time" step="1" className="p-2 rounded-lg border bg-white text-sm" 
                     value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} />
              <input type="time" step="1" className="p-2 rounded-lg border bg-white text-sm" 
                     value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} />
            </div>
          )}
        </div>

        {/* Assignation Flotte */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-text-tertiary flex items-center gap-2">
            <Layers size={14} /> Assigner à une flotte
          </label>
          <select className="w-full p-2.5 rounded-xl border bg-background text-sm"
                  value={form.targetFleetId} onChange={e => setForm({...form, targetFleetId: e.target.value})}>
            <option value="">Ne pas assigner</option>
            {fleets.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button type="submit" isLoading={isSubmitting} className="px-8 shadow-primary">
            <ShieldCheck size={18} className="mr-2" /> Enregistrer la zone
          </Button>
        </div>
      </form>
    </Modal>
  );
}