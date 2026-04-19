"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { referenceService } from "@/services/reference.service";
import { toast } from "sonner";
import { Tag, FileText, Hash } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  category: { id: string; label: string };
  initialData?: any; // Si présent, on est en mode édition
  onSuccess: () => void;
}

export function ResourceModal({ isOpen, onClose, category, initialData, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    code: "",
    label: "",
    description: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code,
        label: initialData.label,
        description: initialData.description || ""
      });
    } else {
      setForm({ code: "", label: "", description: "" });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Correction du nom de la catégorie pour l'URL (ex: fuel-types -> fuels selon ton AdminResourceController)
      const apiCategory = category.id === "fuel-types" ? "fuels" : category.id;

      if (initialData) {
        await referenceService.updateResource(apiCategory, initialData.id, form);
        toast.success("Ressource mise à jour");
      } else {
        await referenceService.createResource(apiCategory, form);
        toast.success("Nouvelle ressource créée");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erreur", { description: error.detail || "Action impossible" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${initialData ? 'Modifier' : 'Ajouter'} - ${category.label}`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-text-tertiary uppercase flex items-center gap-2">
            <Hash size={14} /> Code Technique (Unique)
          </label>
          <input 
            required
            disabled={!!initialData} // On ne change pas le code d'une ressource existante
            className="w-full p-2.5 rounded-xl border bg-background font-mono text-sm disabled:opacity-50"
            placeholder="Ex: TOYOTA_JP"
            value={form.code}
            onChange={e => setForm({...form, code: e.target.value.toUpperCase()})}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-text-tertiary uppercase flex items-center gap-2">
            <Tag size={14} /> Libellé Affiché
          </label>
          <input 
            required
            className="w-full p-2.5 rounded-xl border bg-background text-sm"
            placeholder="Ex: Toyota Motors"
            value={form.label}
            onChange={e => setForm({...form, label: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-text-tertiary uppercase flex items-center gap-2">
            <FileText size={14} /> Description
          </label>
          <textarea 
            className="w-full p-2.5 rounded-xl border bg-background text-sm h-24 resize-none"
            placeholder="Informations complémentaires..."
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button type="submit" isLoading={isSubmitting}>
            {initialData ? 'Enregistrer' : 'Créer la ressource'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}