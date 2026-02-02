"use client";
import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Truck, Hash, PaintBucket, Settings } from "lucide-react";

export default function VehicleGeneralInfo({
  vehicle,
  onUpdate,
  readOnly,
}: {
  vehicle: Vehicle;
  onUpdate: () => void;
  readOnly: boolean | undefined;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    licensePlate: vehicle.licensePlate,
    color: vehicle.color,
    model: vehicle.model,
    brand: vehicle.brand,
    manufacturingYear: vehicle.manufacturingYear,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await vehicleService.update(vehicle.id, form);
      toast.success("Informations mises à jour");
      onUpdate();
    } catch (error: any) {
      toast.error("Erreur lors de la modification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface p-6 rounded-xl border border-border-default space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase flex items-center gap-2">
            <Hash size={14} /> Immatriculation
          </label>
          <input
            disabled={readOnly}
            className="form-input w-full p-2.5 rounded-lg border bg-background text-text-primary uppercase font-bold"
            value={form.licensePlate}
            onChange={(e) =>
              setForm({ ...form, licensePlate: e.target.value.toUpperCase() })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase flex items-center gap-2">
            <PaintBucket size={14} /> Couleur
          </label>
          <input
            disabled={readOnly}
            className="form-input w-full p-2.5 rounded-lg border bg-background text-text-primary"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
        </div>
        {/* Ajoutez d'autres champs selon besoin... */}
      </div>

      {!readOnly && (
        <div className="flex justify-end pt-4 border-t border-border-default">
          <Button type="submit" isLoading={isSubmitting}>
            Enregistrer les modifications
          </Button>
        </div>
      )}
    </form>
  );
}
