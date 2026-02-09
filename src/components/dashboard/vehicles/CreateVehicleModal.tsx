"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useVehicleReferences } from "@/hooks/useVehicleReferences";
import { vehicleService } from "@/services/vehicle.service";
import { fleetService } from "@/services/fleet.service";
import { toast } from "sonner";
import { Truck, Info, Settings, LayoutGrid } from "lucide-react";

export function CreateVehicleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { resources, isLoading: refsLoading } = useVehicleReferences();
  const [fleets, setFleets] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formulaire basé sur les UUIDs (Spec 1.A)
  const [form, setForm] = useState({
    vehicleTypeId: "",
    manufacturerId: "",
    brandId: "",
    modelId: "",
    sizeId: "",
    usageTypeId: "",
    fuelTypeId: "",
    transmissionTypeId: "",
    colorId: "",
    licensePlate: "",
    vehicleSerialNumber: "",
    manufacturingYear: new Date().getFullYear(),
    tankCapacity: 50,
    totalSeatNumber: 2,
    averageFuelConsumption: 7.0,
    targetFleetId: "" // Pour l'assignation immédiate
  });

  // Charger les flottes du manager pour l'assignation
  useEffect(() => {
    if (isOpen) {
      fleetService.getAllFleets().then(setFleets);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Création du véhicule
      const newVehicle = await vehicleService.create(form);
      
      // 2. Assigner à la flotte si sélectionnée (Spec 1.B)
      if (form.targetFleetId) {
        await vehicleService.assignToFleet(form.targetFleetId, newVehicle.id);
      }

      toast.success("Véhicule créé et assigné avec succès !");
      onClose();
      window.location.reload(); // Simple pour rafraîchir la liste
    } catch (error: any) {
      toast.error(error.title || "Erreur de création", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouveau Véhicule">
      <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        
        {/* Section 1 : Organisation (Flotte) */}
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
          <label className="text-[11px] font-bold uppercase text-primary block mb-2">Flotte de destination *</label>
          <select 
            required
            className="w-full p-2.5 rounded-lg border border-border-default bg-white text-sm"
            value={form.targetFleetId}
            onChange={e => setForm({...form, targetFleetId: e.target.value})}
          >
            <option value="">Choisir une flotte...</option>
            {fleets.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>

        {/* Section 2 : Identifiants & Lookups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-text-secondary">Type *</label>
            <select required className="w-full p-2 rounded-lg border bg-background text-sm"
              value={form.vehicleTypeId} onChange={e => setForm({...form, vehicleTypeId: e.target.value})}>
              <option value="">Sélectionner...</option>
              {resources?.vehicleTypes?.map((r: any) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-text-secondary">Immatriculation *</label>
            <input required className="w-full p-2 rounded-lg border bg-background text-sm uppercase" 
              placeholder="ex: LT-123-AA" value={form.licensePlate} onChange={e => setForm({...form, licensePlate: e.target.value})}/>
          </div>
        </div>

        {/* Section 3 : Caractéristiques (Lookups regroupés) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Constructeur", key: "manufacturerId", res: "manufacturers" },
            { label: "Marque", key: "brandId", res: "brands" },
            { label: "Modèle", key: "modelId", res: "models" },
            { label: "Taille", key: "sizeId", res: "sizes" },
            { label: "Usage", key: "usageTypeId", res: "usageTypes" },
            { label: "Carburant", key: "fuelTypeId", res: "fuelTypes" },
            { label: "Transmission", key: "transmissionTypeId", res: "transmissions" },
            { label: "Couleur", key: "colorId", res: "colors" },
          ].map((field) => (
            <div key={field.key} className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">{field.label} *</label>
              <select 
                required 
                className="w-full p-2 rounded-lg border bg-background text-sm"
                value={(form as any)[field.key]}
                onChange={e => setForm({...form, [field.key]: e.target.value})}
              >
                <option value="">...</option>
                {resources?.[field.res]?.map((r: any) => (
                  <option key={r.id} value={r.id}>{r.name || r.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button type="submit" isLoading={isSubmitting} disabled={refsLoading}>Créer le véhicule</Button>
        </div>
      </form>
    </Modal>
  );
}