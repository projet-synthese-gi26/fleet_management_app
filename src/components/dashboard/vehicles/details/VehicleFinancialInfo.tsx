"use client";
import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { ShieldCheck, Banknote, Calendar } from "lucide-react";

export default function VehicleFinancialInfo({ vehicle, onUpdate, readOnly }: any) {
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(vehicle.financialParameters || {
    insuranceNumber: "",
    costPerKm: 0,
    depreciationRate: 0
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await vehicleService.updateFinancial(vehicle.id, form);
      toast.success("Paramètres financiers enregistrés");
      onUpdate();
    } catch (error) {
      toast.error("Erreur de mise à jour");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={14} /> N° Police Assurance
          </label>
          <input disabled={readOnly} className="w-full p-3 rounded-2xl border bg-slate-50 font-bold" 
                 value={form.insuranceNumber} onChange={e => setForm({...form, insuranceNumber: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Banknote size={14} /> Coût au Kilomètre (FCFA)
          </label>
          <input type="number" disabled={readOnly} className="w-full p-3 rounded-2xl border bg-slate-50 font-bold" 
                 value={form.costPerKm} onChange={e => setForm({...form, costPerKm: parseFloat(e.target.value)})} />
        </div>
      </div>
      {!readOnly && (
        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" isLoading={isSaving} className="px-10">Enregistrer les données</Button>
        </div>
      )}
    </form>
  );
}