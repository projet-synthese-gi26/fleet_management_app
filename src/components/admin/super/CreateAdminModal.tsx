"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { superAdminService } from "@/services/super-admin.service";
import { toast } from "sonner";
import { User, Mail, Phone, Lock, Camera, Upload } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Pour rafraîchir la liste après création
}

export function CreateAdminModal({ isOpen, onClose, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  // État du formulaire
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await superAdminService.createAdmin(form, file || undefined);
      toast.success("Administrateur créé avec succès !");
      onSuccess(); // Rafraîchir le tableau
      onClose();   // Fermer la modale
      // Reset du formulaire
      setForm({ username: "", password: "", email: "", phone: "", firstName: "", lastName: "" });
      setFile(null);
    } catch (error: any) {
      toast.error(error.title || "Erreur de création", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouvel Administrateur">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Section Photo */}
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="size-20 rounded-full bg-background-secondary border-2 border-dashed border-border-default flex items-center justify-center overflow-hidden relative group">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="Preview" className="size-full object-cover" />
            ) : (
              <Camera className="text-text-tertiary" size={24} />
            )}
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <Upload className="text-white" size={18} />
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <p className="text-[10px] font-bold text-text-tertiary uppercase">Photo de profil (Optionnelle)</p>
        </div>

        {/* Grille de champs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase">Prénom</label>
            <input required className="w-full p-2.5 rounded-lg border bg-background text-sm" 
                   value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase">Nom</label>
            <input required className="w-full p-2.5 rounded-lg border bg-background text-sm" 
                   value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-text-secondary uppercase">Nom d'utilisateur</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
            <input required className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm" 
                   placeholder="ex: admin_douala" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
              <input required type="email" className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm" 
                     value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-secondary uppercase">Téléphone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
              <input required className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm" 
                     value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-text-secondary uppercase">Mot de passe temporaire</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
            <input required type="password" title="Au moins 8 caractères" className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm" 
                   value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border-default">
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button type="submit" isLoading={isSubmitting}>Créer le compte</Button>
        </div>
      </form>
    </Modal>
  );
}