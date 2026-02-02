"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useVehicleReferences } from "@/hooks/useVehicleReferences";
import { vehicleService } from "@/services/vehicle.service";
import { CreateVehicleDto } from "@/types/vehicle.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { Truck, Info, Settings, Gauge } from "lucide-react";

export function CreateVehicleModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { locale } = useI18n();
  const router = useRouter();
  const {
    types,
    makes,
    manufacturers,
    sizes,
    fuels,
    transmissions,
    isLoading: refsLoading,
  } = useVehicleReferences();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<CreateVehicleDto>({
    vehicleTypeId: "", // Obligatoire (UUID)
    brand: "My Brand", // Obligatoire
    model: "", // Obligatoire
    licensePlate: "", // Obligatoire
    manufacturerName: "TOYOTA", // Obligatoire
    sizeName: "Pickup", // Obligatoire
    typeName: "Commercial", // Obligatoire
    fuelType: "Diesel", // Obligatoire
    transmissionType: "Manuelle",
    color: "Blanc",
    manufacturingYear: 2024,
    tankCapacity: 60.0,
    totalSeatNumber: 2,
    averageFuelConsumption: 8.5,
    vehicleSerialNumber: "",
    status: "AVAILABLE",
  });

  // Pré-remplissage par défaut une fois les refs chargées
  useEffect(() => {
    if (!refsLoading && types.length > 0) {
      setForm((prev) => ({
        ...prev,
        vehicleTypeId: types[0].id,
        fuelType: fuels[0]?.name || "Diesel",
        transmissionType: transmissions[0]?.name || "Manuelle",
      }));
    }
  }, [refsLoading, types, fuels, transmissions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation ultime avant envoi
    const mandatoryFields: (keyof CreateVehicleDto)[] = [
      "vehicleTypeId",
      "brand",
      "model",
      "licensePlate",
      "manufacturerName",
      "sizeName",
      "typeName",
      "fuelType",
    ];

    const missing = mandatoryFields.filter((f) => !form[f]);
    if (missing.length > 0) {
      toast.error(`Champs manquants : ${missing.join(", ")}`);
      return;
    }

    setIsSubmitting(true);
    try {
      const newVehicle = await vehicleService.create(form);
      toast.success("Véhicule créé avec succès !");
      onClose();
      router.push(`/${locale}/dashboard/vehicles/${newVehicle.id}`);
    } catch (error: any) {
      console.error("Payload envoyé:", form);
      toast.error(error.title || "Erreur 400", {
        description:
          error.detail || "Vérifiez la validité des champs obligatoires.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enregistrer un nouveau véhicule"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[75vh] overflow-y-auto px-1"
      >
        {/* Section 1: Identification de base */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
            <Info size={16} /> Identification
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Catégorie Système *
              </label>
              <select
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.vehicleTypeId}
                onChange={(e) =>
                  setForm({ ...form, vehicleTypeId: e.target.value })
                }
              >
                <option value="">Choisir un type...</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Immatriculation *
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm font-bold uppercase"
                placeholder="ex: LT-123-AA"
                value={form.licensePlate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    licensePlate: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Section 2: Marque et Modèle */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
            <Truck size={16} /> Constructeur
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Groupe Constructeur *
              </label>
              <select
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.manufacturerName}
                onChange={(e) =>
                  setForm({ ...form, manufacturerName: e.target.value })
                }
              >
                <option value="">Sélectionner...</option>
                {manufacturers.map((m) => (
                  <option key={m.id || m.name} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Marque *
              </label>
              <select
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              >
                <option value="">Choisir marque...</option>
                {makes.map((m) => (
                  <option key={m.id || m.name} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Modèle Précis *
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                placeholder="ex: Hilux Double Cabine"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Gabarit (Size) *
              </label>
              <select
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.sizeName}
                onChange={(e) => setForm({ ...form, sizeName: e.target.value })}
              >
                <option value="">Choisir taille...</option>
                {sizes.map((s) => (
                  <option key={s.id || s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Caractéristiques Techniques */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
            <Settings size={16} /> Spécifications
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Carburant *
              </label>
              <select
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.fuelType}
                onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
              >
                {fuels.map((f) => (
                  <option key={f.id || f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Boîte de vitesse
              </label>
              <select
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.transmissionType}
                onChange={(e) =>
                  setForm({ ...form, transmissionType: e.target.value })
                }
              >
                {transmissions.map((t) => (
                  <option key={t.id || t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Année
              </label>
              <input
                type="number"
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.manufacturingYear}
                onChange={(e) =>
                  setForm({
                    ...form,
                    manufacturingYear: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Couleur
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Usage (TypeName) *
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                value={form.typeName}
                onChange={(e) => setForm({ ...form, typeName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Numéro de Châssis (VIN)
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border-default bg-background text-sm"
                placeholder="Optionnel"
                value={form.vehicleSerialNumber}
                onChange={(e) =>
                  setForm({ ...form, vehicleSerialNumber: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Section 4: Capacités */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
            <Gauge size={16} /> Capacités
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Réservoir (L)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full p-2 rounded-lg border bg-background text-sm"
                value={form.tankCapacity}
                onChange={(e) =>
                  setForm({ ...form, tankCapacity: parseFloat(e.target.value) })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Places
              </label>
              <input
                type="number"
                className="w-full p-2 rounded-lg border bg-background text-sm"
                value={form.totalSeatNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    totalSeatNumber: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-text-secondary">
                Conso (L/100)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full p-2 rounded-lg border bg-background text-sm"
                value={form.averageFuelConsumption}
                onChange={(e) =>
                  setForm({
                    ...form,
                    averageFuelConsumption: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border-default pt-6">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button type="submit" isLoading={isSubmitting} disabled={refsLoading}>
            Créer le véhicule
          </Button>
        </div>
      </form>
    </Modal>
  );
}
