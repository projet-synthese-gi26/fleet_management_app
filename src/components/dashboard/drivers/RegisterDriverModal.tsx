"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { driverService } from "@/services/driver.service";
import { RegisterDriverDto } from "@/types/driver.types";
import { toast } from "sonner";
import { User, Mail, Phone, CreditCard, Lock, UserPlus } from "lucide-react";

interface RegisterDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  fleetId: string;
  onSuccess: () => void;
}

export function RegisterDriverModal({
  isOpen,
  onClose,
  fleetId,
  onSuccess,
}: RegisterDriverModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<RegisterDriverDto>({
    username: "",
    password: "Password123!", // Mot de passe temporaire par défaut
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    licenceNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fleetId) {
      toast.error("Veuillez sélectionner une flotte d'abord.");
      return;
    }

    setIsSubmitting(true);
    try {
      await driverService.registerInFleet(fleetId, form);
      toast.success("Chauffeur inscrit avec succès !");
      onSuccess();
      onClose();
      // Reset form
      setForm({
        username: "",
        password: "Password123!",
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        licenceNumber: "",
      });
    } catch (error: any) {
      toast.error(error.title || "Erreur", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Inscrire un nouveau chauffeur"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase">
              Prénom
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border-default bg-background"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase">
              Nom
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border-default bg-background"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-text-secondary uppercase">
            Nom d'utilisateur (Login)
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
              size={16}
            />
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-default bg-background"
              placeholder="ex: m.diop2024"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 rounded-lg border border-border-default bg-background"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase">
              Téléphone
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border-default bg-background"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-text-secondary uppercase">
            Numéro de Permis
          </label>
          <div className="relative">
            <CreditCard
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
              size={16}
            />
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-default bg-background"
              placeholder="ex: PERMIS-12345"
              value={form.licenceNumber}
              onChange={(e) =>
                setForm({ ...form, licenceNumber: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border-default">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isSubmitting} className="gap-2">
            <UserPlus size={18} /> Créer le compte chauffeur
          </Button>
        </div>
      </form>
    </Modal>
  );
}
