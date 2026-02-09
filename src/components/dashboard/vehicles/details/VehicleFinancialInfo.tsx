"use client";
import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function VehicleFinancialInfo({
  vehicle,
  onUpdate,
  readOnly,
}: any) {
  const [form, setForm] = useState(vehicle.financialParameters);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await vehicleService.updateFinancial(vehicle.id, form);
      toast.success("Données financières mises à jour");
      onUpdate();
    } catch (e) {
      toast.error("Erreur de sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-surface p-6 rounded-xl border border-border-default space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase">
            N° Police Assurance
          </label>
          <input
            disabled={readOnly}
            className="w-full p-2 rounded-lg border bg-background"
            value={form?.insuranceNumber || ""}
            onChange={(e) =>
              setForm({ ...form, insuranceNumber: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase">
            Coût au KM (FCFA)
          </label>
          <input
            type="number"
            disabled={readOnly}
            className="w-full p-2 rounded-lg border bg-background font-mono"
            value={form?.costPerKm || 0}
            onChange={(e) =>
              setForm({ ...form, costPerKm: parseFloat(e.target.value) })
            }
          />
        </div>
      </div>

      {!readOnly && (
        <div className="flex justify-end">
          <Button onClick={handleSave} isLoading={isSaving}>
            Enregistrer les modifications
          </Button>
        </div>
      )}
    </div>
  );
}
