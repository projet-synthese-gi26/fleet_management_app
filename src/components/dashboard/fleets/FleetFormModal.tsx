"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Phone, Building2 } from "lucide-react";
import { CreateFleetDto, Fleet } from "@/types/fleet.types";

interface FleetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFleetDto) => Promise<void>;
  initialData?: Fleet | null;
  isSubmitting: boolean;
}

export function FleetFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: FleetFormModalProps) {
  const [formData, setFormData] = useState<CreateFleetDto>({
    name: "",
    phoneNumber: "",
  });

  // Réinitialiser le formulaire quand la modale s'ouvre ou que initialData change
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        phoneNumber: initialData.phoneNumber || "",
      });
    } else {
      setFormData({ name: "", phoneNumber: "" });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Modifier la flotte" : "Nouvelle flotte"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">
            Nom de la flotte *
          </label>
          <div className="relative">
            <Building2
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
              size={18}
            />
            <input
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Ex: Logistique Littoral"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">
            Téléphone Dispatch (Optionnel)
          </label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
              size={18}
            />
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-default bg-background text-text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Ex: +237 6..."
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {initialData ? "Enregistrer les modifications" : "Créer la flotte"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
