"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { vehicleService } from "@/services/vehicle.service";
import { CreateVehicleDto, ResourceCatalog } from "@/types/vehicle.types";
import { toast } from "sonner";
import { Truck, Settings, Hash, Fuel, Users, Gauge, Calendar, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateVehicleModal({ isOpen, onClose, onSuccess }: Props) {
  const [catalog, setCatalog] = useState<ResourceCatalog | null>(null);
  const [isLoadingRefs, setIsLoadingRefs] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<CreateVehicleDto>({
    vehicleTypeId: "" as any,
    manufacturerId: "" as any,
    brandId: "" as any,
    modelId: "" as any,
    sizeId: "" as any,
    usageTypeId: "" as any,
    fuelTypeId: "" as any,
    transmissionTypeId: "" as any,
    colorId: "" as any,
    licensePlate: "",
    vehicleSerialNumber: "",
    manufacturingYear: new Date().getFullYear(),
    tankCapacity: 50,
    totalSeatNumber: 5,
    averageFuelConsumption: 7.5
  });

  useEffect(() => {
    if (isOpen) {
      vehicleService.getResourceCatalog()
        .then(setCatalog)
        .catch(() => toast.error("Erreur de chargement des référentiels"))
        .finally(() => setIsLoadingRefs(false));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await vehicleService.create(form);
      toast.success("Véhicule enrôlé avec succès");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erreur", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SelectField = ({ label, name, items, icon: Icon }: any) => (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1">
        {Icon && <Icon size={12} />} {label}
      </label>
      <select 
        required
        className="w-full p-2 rounded-xl border border-border-default bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20"
        value={(form as any)[name]}
        onChange={e => setForm({...form, [name]: e.target.value})}
      >
        <option value="">Sélectionner...</option>
        {items?.map((item: any) => (
          <option key={item.id} value={item.id}>{item.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enrôler un véhicule">
      {isLoadingRefs ? (
        <div className="py-20 flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-primary" />
          <p className="text-sm text-text-tertiary">Chargement des référentiels...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Plaque d'immatriculation</label>
              <input required className="w-full p-2 rounded-xl border-primary/20 bg-white font-black uppercase" 
                     placeholder="LT-123-AA" value={form.licensePlate} onChange={e => setForm({...form, licensePlate: e.target.value.toUpperCase()})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest">N° Châssis (VIN)</label>
              <input required className="w-full p-2 rounded-xl border-primary/20 bg-white font-mono" 
                     placeholder="VIN..." value={form.vehicleSerialNumber} onChange={e => setForm({...form, vehicleSerialNumber: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SelectField label="Type" name="vehicleTypeId" items={catalog?.vehicleTypes} icon={Truck} />
            <SelectField label="Marque" name="brandId" items={catalog?.brands} />
            <SelectField label="Modèle" name="modelId" items={catalog?.models} />
            <SelectField label="Énergie" name="fuelTypeId" items={catalog?.fuelTypes} icon={Fuel} />
            <SelectField label="Transmission" name="transmissionTypeId" items={catalog?.transmissionTypes} />
            <SelectField label="Couleur" name="colorId" items={catalog?.colors} />
            <SelectField label="Constructeur" name="manufacturerId" items={catalog?.manufacturers} />
            <SelectField label="Gabarit" name="sizeId" items={catalog?.sizes} />
            <SelectField label="Usage" name="usageTypeId" items={catalog?.usages} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-text-tertiary uppercase">Année</label>
              <input type="number" className="w-full p-2 rounded-xl border bg-background" value={form.manufacturingYear} onChange={e => setForm({...form, manufacturingYear: parseInt(e.target.value)})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-text-tertiary uppercase">Réservoir (L)</label>
              <input type="number" className="w-full p-2 rounded-xl border bg-background" value={form.tankCapacity} onChange={e => setForm({...form, tankCapacity: parseInt(e.target.value)})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-text-tertiary uppercase">Places</label>
              <input type="number" className="w-full p-2 rounded-xl border bg-background" value={form.totalSeatNumber} onChange={e => setForm({...form, totalSeatNumber: parseInt(e.target.value)})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-text-tertiary uppercase">Conso (L/100)</label>
              <input type="number" step="0.1" className="w-full p-2 rounded-xl border bg-background" value={form.averageFuelConsumption} onChange={e => setForm({...form, averageFuelConsumption: parseFloat(e.target.value)})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-white pb-2">
            <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
            <Button type="submit" isLoading={isSubmitting} className="shadow-primary px-8">Enregistrer le véhicule</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}