"use client";

import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { toast } from "sonner";
import { Upload, Trash2, FileText, CheckCircle, Image as ImageIcon, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  vehicle: Vehicle;
  onUpdate: () => void;
  readOnly?: boolean;
}

export default function VehicleMediaManager({ vehicle, onUpdate, readOnly }: Props) {
  const [uploadingType, setUploadingType] = useState<string | null>(null);

  // Gère l'upload pour les docs administratifs
  const handleAdminUpload = async (type: 'vin' | 'registration', file: File) => {
    setUploadingType(type);
    try {
      await vehicleService.uploadMedia(vehicle.id, type, file);
      toast.success(`${type === 'vin' ? 'Photo VIN' : 'Carte Grise'} mise à jour`);
      onUpdate();
    } catch (e: any) {
      toast.error("Erreur d'upload", { description: e.status === 413 ? "Fichier trop lourd (>2Mo)" : e.detail });
    } finally {
      setUploadingType(null);
    }
  };

  // Gère l'ajout à la galerie
  const handleGalleryAdd = async (file: File) => {
    setUploadingType('gallery');
    try {
      await vehicleService.addToGallery(vehicle.id, file);
      toast.success("Image ajoutée à la galerie");
      onUpdate();
    } catch (e: any) {
      toast.error("Erreur galerie", { description: e.detail });
    } finally {
      setUploadingType(null);
    }
  };

  const AdminMediaCard = ({ title, url, type }: { title: string, url?: string, type: 'vin' | 'registration' }) => (
    <div className="bg-surface p-5 rounded-2xl border border-border-default space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">{title}</h4>
        {url && <CheckCircle size={16} className="text-success" />}
      </div>
      
      <div className="aspect-video relative rounded-xl bg-background-secondary border-2 border-dashed border-border-default flex flex-col items-center justify-center overflow-hidden group">
        {url ? (
          <>
            <img src={url} className="object-cover size-full" alt={title} />
            {!readOnly && (
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm">
                <Upload className="text-white mb-2" />
                <span className="text-white text-xs font-bold">Remplacer</span>
                <input type="file" className="hidden" accept="image/*" 
                       onChange={(e) => e.target.files?.[0] && handleAdminUpload(type, e.target.files[0])} />
              </label>
            )}
          </>
        ) : (
          <label className={`flex flex-col items-center gap-2 p-4 text-center ${readOnly ? "" : "cursor-pointer hover:bg-background-tertiary transition-colors w-full h-full justify-center"}`}>
            {uploadingType === type ? <Loader2 className="animate-spin text-primary" /> : <Upload className="text-text-tertiary" />}
            <span className="text-xs text-text-tertiary font-medium">
                {readOnly ? "Aucun document" : "Cliquez pour uploader"}
            </span>
            {!readOnly && <input type="file" className="hidden" accept="image/*" 
                                onChange={(e) => e.target.files?.[0] && handleAdminUpload(type, e.target.files[0])} />}
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Documents Officiels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminMediaCard title="Photo du Châssis (VIN)" url={vehicle.serialNumberPhotoUrl} type="vin" />
        <AdminMediaCard title="Carte Grise / Immatriculation" url={vehicle.registrationPhotoUrl} type="registration" />
      </div>

      {/* 2. Galerie d'illustration */}
      <div className="bg-surface p-6 rounded-2xl border border-border-default space-y-6">
        <div className="flex justify-between items-center border-b border-border-default pb-4">
          <div className="flex items-center gap-3">
            <ImageIcon className="text-primary" size={20} />
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary">Galerie d'illustration</h4>
          </div>
          {!readOnly && (
            <label className="relative flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors">
               {uploadingType === 'gallery' ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
               AJOUTER UNE PHOTO
               <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleGalleryAdd(e.target.files[0])} />
            </label>
          )}
        </div>
        
        {vehicle.illustrationImages?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {vehicle.illustrationImages.map((imgUrl, idx) => (
              <div key={idx} className="aspect-square relative rounded-xl overflow-hidden group border border-border-default shadow-sm hover:shadow-md transition-all">
                <img src={imgUrl} className="object-cover size-full" alt="Illustration" />
                {!readOnly && (
                  <button 
                    onClick={async () => {
                        if(confirm("Supprimer cette image ?")) {
                            await vehicleService.deleteGalleryImage(vehicle.id, idx.toString()); // Note: Assure-toi que le backend attend l'index ou un ID réel
                            onUpdate();
                            toast.success("Image supprimée");
                        }
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-[-10px] group-hover:translate-y-0"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-text-disabled border-2 border-dashed border-border-default rounded-xl">
            <ImageIcon size={40} className="mb-2 opacity-20" />
            <p className="text-sm font-medium">Aucune photo d'illustration</p>
          </div>
        )}
      </div>
    </div>
  );
}