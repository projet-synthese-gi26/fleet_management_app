"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useVehicleReferences } from "@/hooks/useVehicleReferences";
import { vehicleService } from "@/services/vehicle.service"; // Assurez-vous du nom du service
import { CreateVehicleDto } from "@/types/vehicle.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

export function CreateVehicleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { locale } = useI18n();
    const router = useRouter();
    const { types, fuels, transmissions, isLoading: refsLoading } = useVehicleReferences();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState<CreateVehicleDto>({
        vehicleTypeId: "",
        brand: "",
        model: "",
        licensePlate: "",
        manufacturerName: "",
        sizeName: "Standard",
        typeName: "Professionnel",
        fuelType: "Essence",
        transmissionType: "Manuelle",
        color: "Blanc",
        manufacturingYear: new Date().getFullYear(),
        status: "AVAILABLE",
        tankCapacity: 50,
        totalSeatNumber: 5,
        averageFuelConsumption: 7.0,
        vehicleSerialNumber: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newVehicle = await vehicleService.create(form);
            toast.success("Véhicule créé ! Passons aux photos.");
            onClose();
            // Redirection vers les détails pour l'étape 2 (Photos)
            router.push(`/${locale}/dashboard/vehicles/${newVehicle.id}`);
        } catch (error: any) {
            toast.error(error.title || "Erreur", { description: error.detail });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un véhicule">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Identification */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-secondary">Type *</label>
                        <select 
                            className="w-full p-2 rounded-lg border border-border-default bg-background"
                            value={form.vehicleTypeId}
                            onChange={e => setForm({...form, vehicleTypeId: e.target.value})}
                            required
                        >
                            <option value="">Sélectionner...</option>
                            {types.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-secondary">Immatriculation *</label>
                        <input 
                            className="w-full p-2 rounded-lg border border-border-default bg-background"
                            placeholder="LT-000-XX"
                            value={form.licensePlate}
                            onChange={e => setForm({...form, licensePlate: e.target.value.toUpperCase()})}
                            required
                        />
                    </div>

                    {/* Technique */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-secondary">Marque</label>
                        <input 
                            className="w-full p-2 rounded-lg border border-border-default bg-background"
                            value={form.brand}
                            onChange={e => setForm({...form, brand: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-secondary">Modèle</label>
                        <input 
                            className="w-full p-2 rounded-lg border border-border-default bg-background"
                            value={form.model}
                            onChange={e => setForm({...form, model: e.target.value})}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-secondary">Carburant</label>
                        <select 
                            className="w-full p-2 rounded-lg border border-border-default bg-background"
                            value={form.fuelType}
                            onChange={e => setForm({...form, fuelType: e.target.value})}
                        >
                            {fuels.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-text-secondary">Année</label>
                        <input 
                            type="number"
                            className="w-full p-2 rounded-lg border border-border-default bg-background"
                            value={form.manufacturingYear}
                            onChange={e => setForm({...form, manufacturingYear: parseInt(e.target.value)})}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-border-default pt-4">
                    <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
                    <Button type="submit" isLoading={isSubmitting} disabled={refsLoading}>
                        Suivant : Photos
                    </Button>
                </div>
            </form>
        </Modal>
    );
}