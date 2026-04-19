"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { driverService } from "@/services/driver.service";
import { DriverRegistrationRequest } from "@/types/driver.types";
import { toast } from "sonner";
import { User, Mail, Phone, CreditCard, Camera, Upload } from "lucide-react";

export function RegisterDriverModal({ isOpen, onClose, fleetId, onSuccess }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<DriverRegistrationRequest>({
    username: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    licenceNumber: "",
    password: "Password123!"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await driverService.registerInFleet(fleetId, form, file || undefined);
      toast.success("Chauffeur inscrit avec succès");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erreur", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Inscrire un nouveau chauffeur">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex justify-center">
          <label className="relative cursor-pointer group">
            <div className="size-24 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group-hover:border-primary transition-all">
              {file ? <img src={URL.createObjectURL(file)} className="size-full object-cover" /> : <Camera className="text-slate-300" size={32} />}
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-[2rem]">
                <Upload className="text-white" size={20} />
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input required className="p-2.5 rounded-xl border bg-background text-sm" placeholder="Prénom" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
          <input required className="p-2.5 rounded-xl border bg-background text-sm" placeholder="Nom" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
        </div>

        <input required type="email" className="w-full p-2.5 rounded-xl border bg-background text-sm" placeholder="Email professionnel" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        
        <div className="grid grid-cols-2 gap-4">
          <input required className="p-2.5 rounded-xl border bg-background text-sm" placeholder="Nom d'utilisateur" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
          <input required className="p-2.5 rounded-xl border bg-background text-sm" placeholder="N° de Permis" value={form.licenceNumber} onChange={e => setForm({...form, licenceNumber: e.target.value})} />
        </div>

        <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input required className="w-full pl-10 p-2.5 rounded-xl border bg-background text-sm" placeholder="Téléphone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button type="submit" isLoading={isSubmitting}>Confirmer l'inscription</Button>
        </div>
      </form>
    </Modal>
  );
}