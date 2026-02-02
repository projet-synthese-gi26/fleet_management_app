"use client";
import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function VehicleFinancialInfo({ vehicle, onUpdate, readOnly }: { vehicle: Vehicle, onUpdate: () => void, readOnly: boolean | undefined }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(vehicle.financialParameters || {
    insuranceNumber: "", insuranceExpiryDate: "", registrationDate: "",
    purchaseDate: "", depreciationRate: 0, costPerKm: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await vehicleService.updateFinancial(vehicle.id, form);
      toast.success("Paramètres financiers sauvegardés");
      onUpdate();
    } catch (e: any) {
      toast.error("Erreur de sauvegarde");
    } finally { setIsSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-xl border border-border-default grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-text-secondary uppercase">N° Assurance</label>
        <input disabled={readOnly} className="form-input w-full p-2 rounded-lg border bg-background" value={form.insuranceNumber} onChange={e => setForm({...form, insuranceNumber: e.target.value})} />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-text-secondary uppercase">Expiration Assurance</label>
        <input disabled={readOnly} type="date" className="form-input w-full p-2 rounded-lg border bg-background" value={form.insuranceExpiryDate} onChange={e => setForm({...form, insuranceExpiryDate: e.target.value})} />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-text-secondary uppercase">Coût au KM (FCFA)</label>
        <input disabled={readOnly} type="number" className="form-input w-full p-2 rounded-lg border bg-background" value={form.costPerKm} onChange={e => setForm({...form, costPerKm: parseFloat(e.target.value)})} />
      </div>
      
      {!readOnly && (
        <div className="md:col-span-3 flex justify-end">
          <Button type="submit" isLoading={isSubmitting}>Enregistrer les paramètres</Button>
        </div>
      )}
    </form>
  );
}