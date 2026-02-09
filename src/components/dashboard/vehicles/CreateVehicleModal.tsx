"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useResources } from "@/hooks/useRessources";
import { vehicleService } from "@/services/vehicle.service";
import { CreateVehicleDto } from "@/types/vehicle.types";
import { toast } from "sonner";
import { 
  Truck, 
  Hash, 
  Settings, 
  Info, 
  Fuel, 
  Users, 
  Gauge, 
  Calendar 
} from "lucide-react";

interface CreateVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback pour rafraîchir la liste des véhicules
}

export function CreateVehicleModal({ isOpen, onClose, onSuccess }: CreateVehicleModalProps) {
  // 1. Récupération des référentiels souverains via notre hook
  const { catalog, isLoading: refsLoading } = useResources();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. État du formulaire aligné sur le CreateVehicleDto du backend
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

  /**
   * Soumission du formulaire au backend
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification basique que tous les IDs sont sélectionnés
    const requiredIds = [
      form.vehicleTypeId, form.manufacturerId, form.brandId, 
      form.modelId, form.fuelTypeId, form.colorId
    ];
    
    if (requiredIds.some(id => !id)) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);
    try {
      await vehicleService.create(form);
      toast.success("Véhicule enregistré avec succès !");
      onSuccess(); // Rafraîchir le tableau parent
      onClose();   // Fermer la modale
    } catch (error: any) {
      toast.error("Erreur de création", { 
        description: error.detail || "Une erreur est survenue lors de l'enregistrement." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Sous-composant pour générer les listes déroulantes proprement
   */
  const ResourceSelect = ({ label, name, items, icon: Icon }: any) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase text-text-tertiary tracking-widest flex items-center gap-1.5">
        {Icon && <Icon size={12} />}
        {label} *
      </label>
      <select 
        required
        disabled={refsLoading}
        className="w-full p-2.5 rounded-xl border border-border-default bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
        value={(form as any)[name]}
        onChange={e => setForm({...form, [name]: e.target.value})}
      >
        <option value="">Choisir...</option>
        {items.map((item: any) => (
          <option key={item.id} value={item.id}>{item.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enrôler un nouveau véhicule">
      <form onSubmit={handleSubmit} className="space-y-8 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
        
        {/* SECTION 1 : IDENTIFICATION (Plaque & VIN) */}
        <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 space-y-4">
          <h4 className="text-xs font-bold text-primary uppercase flex items-center gap-2">
            <Hash size={14} /> Identification Unique
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">Plaque d'immatriculation</label>
              <input 
                required
                className="w-full p-2.5 rounded-xl border border-border-default bg-white text-sm font-black uppercase tracking-wider focus:border-primary outline-none transition-all"
                placeholder="LT-123-AA"
                value={form.licensePlate}
                onChange={e => setForm({...form, licensePlate: e.target.value.toUpperCase()})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">N° de Châssis (VIN)</label>
              <input 
                required
                className="w-full p-2.5 rounded-xl border border-border-default bg-white text-sm font-mono focus:border-primary outline-none transition-all"
                placeholder="ABC123456789..."
                value={form.vehicleSerialNumber}
                onChange={e => setForm({...form, vehicleSerialNumber: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2 : CONFIGURATION (Référentiels du Backend) */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-text-primary uppercase flex items-center gap-2 px-1">
            <Settings size={14} /> Caractéristiques Techniques
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5">
            <ResourceSelect label="Type de véhicule" name="vehicleTypeId" items={catalog?.vehicleTypes || []} />
            <ResourceSelect label="Constructeur" name="manufacturerId" items={catalog?.manufacturers || []} />
            <ResourceSelect label="Marque" name="brandId" items={catalog?.brands || []} />
            <ResourceSelect label="Modèle" name="modelId" items={catalog?.models || []} />
            <ResourceSelect label="Énergie" name="fuelTypeId" items={catalog?.fuelTypes || []} icon={Fuel} />
            <ResourceSelect label="Transmission" name="transmissionTypeId" items={catalog?.transmissionTypes || []} />
            <ResourceSelect label="Couleur" name="colorId" items={catalog?.colors || []} />
            <ResourceSelect label="Gabarit" name="sizeId" items={catalog?.sizes || []} />
            <ResourceSelect label="Usage" name="usageTypeId" items={catalog?.usages || []} />
          </div>
        </div>

        {/* SECTION 3 : PARAMÈTRES OPÉRATIONNELS */}
        <div className="pt-6 border-t border-border-default">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-tertiary uppercase flex items-center gap-1">
                <Calendar size={12} /> Année
              </label>
              <input type="number" className="w-full p-2.5 rounded-xl border bg-background text-sm font-bold" 
                     value={form.manufacturingYear} onChange={e => setForm({...form, manufacturingYear: parseInt(e.target.value)})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-tertiary uppercase flex items-center gap-1">
                <Fuel size={12} /> Réservoir (L)
              </label>
              <input type="number" step="0.1" className="w-full p-2.5 rounded-xl border bg-background text-sm font-bold" 
                     value={form.tankCapacity} onChange={e => setForm({...form, tankCapacity: parseFloat(e.target.value)})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-tertiary uppercase flex items-center gap-1">
                <Users size={12} /> Places
              </label>
              <input type="number" className="w-full p-2.5 rounded-xl border bg-background text-sm font-bold" 
                     value={form.totalSeatNumber} onChange={e => setForm({...form, totalSeatNumber: parseInt(e.target.value)})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-tertiary uppercase flex items-center gap-1">
                <Gauge size={12} /> Conso Moy.
              </label>
              <input type="number" step="0.1" className="w-full p-2.5 rounded-xl border bg-background text-sm font-bold" 
                     value={form.averageFuelConsumption} onChange={e => setForm({...form, averageFuelConsumption: parseFloat(e.target.value)})} />
            </div>
          </div>
        </div>

        {/* ACTIONS FINALES */}
        <div className="flex justify-end gap-3 pt-6 sticky bottom-0 bg-surface pb-2">
          <Button variant="outline" type="button" onClick={onClose} className="h-11 px-6">
            Annuler
          </Button>
          <Button 
            type="submit" 
            isLoading={isSubmitting} 
            disabled={refsLoading}
            className="h-11 px-10 shadow-primary"
          >
            <Truck size={18} className="mr-2" />
            Enregistrer le véhicule
          </Button>
        </div>
      </form>
    </Modal>
  );
}