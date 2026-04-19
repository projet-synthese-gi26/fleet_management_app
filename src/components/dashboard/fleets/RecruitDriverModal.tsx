"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { fleetService } from "@/services/fleet.service";
import { toast } from "sonner";
import { UserPlus, Search, Mail, AlertCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fleetId: string;
  onSuccess: () => void;
}

export function RecruitDriverModal({ isOpen, onClose, fleetId, onSuccess }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setIsSubmitting(true);
    try {
      // Appel : POST /api/v1/fleets/{id}/drivers
      await fleetService.recruitDriver(fleetId, identifier.trim());
      toast.success("Chauffeur intégré avec succès !");
      setIdentifier("");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Recrutement impossible", { 
        description: error.detail || "L'utilisateur est introuvable ou n'est pas un chauffeur." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recruter un chauffeur">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3">
          <AlertCircle className="text-primary shrink-0" size={20} />
          <p className="text-xs text-primary font-medium leading-relaxed">
            Saisissez l'adresse email ou le nom d'utilisateur d'un chauffeur déjà inscrit sur la plateforme pour l'ajouter à votre flotte.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-text-tertiary tracking-widest px-1">
            Identifiant du chauffeur
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
            <input
              required
              autoFocus
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-default bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="email@example.com ou @username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button type="submit" isLoading={isSubmitting} className="gap-2 shadow-primary">
            <UserPlus size={18} /> Intégrer à la flotte
          </Button>
        </div>
      </form>
    </Modal>
  );
}