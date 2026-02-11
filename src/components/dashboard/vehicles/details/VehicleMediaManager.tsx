"use client";
import React, { useState, useRef } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { toast } from "sonner";
import { Upload, Trash2, Image as ImageIcon, Loader2, FileCheck, Plus } from "lucide-react";

export default function VehicleMediaManager({ vehicle, onUpdate, readOnly }: any) {
  const [loading, setLoading] = useState<string | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (type: 'vin' | 'registration' | 'gallery', file: File) => {
    setLoading(type);
    try {
      if (type === 'gallery') {
        await vehicleService.addGalleryImage(vehicle.id, file);
        toast.success("Image ajoutée à la galerie");
      } else {
        await vehicleService.uploadAdminDoc(vehicle.id, type, file);
        toast.success("Document administratif mis à jour");
      }
      onUpdate();
    } catch (e: any) {
      toast.error("Erreur d'upload", { description: e.detail || "Vérifiez la taille du fichier" });
    } finally {
      setLoading(null);
      // Reset de l'input pour permettre de re-sélectionner le même fichier si besoin
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  const DocCard = ({ title, url, type }: any) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{title}</h4>
        {url && <FileCheck size={16} className="text-emerald-500" />}
      </div>
      <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group">
        {url ? <img src={url} className="size-full object-cover" alt={title} /> : <Upload className="text-slate-300" />}
        {!readOnly && (
          <label className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all text-white backdrop-blur-sm">
            {loading === type ? <Loader2 className="animate-spin" /> : <Upload size={24} />}
            <span className="text-[10px] font-black mt-2 tracking-widest">REMPLACER</span>
            <input type="file" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleUpload(type, e.target.files[0])} />
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Documents Administratifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocCard title="Photo du Châssis (VIN)" url={vehicle.serialNumberPhotoUrl} type="vin" />
        <DocCard title="Carte Grise / Immatriculation" url={vehicle.registrationPhotoUrl} type="registration" />
      </div>
      
      {/* 2. Galerie d'illustration */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h4 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2">
              <ImageIcon size={20} className="text-primary" /> Galerie d'illustration
            </h4>
            <p className="text-xs text-slate-400 mt-1">Photos du véhicule sous différents angles</p>
          </div>
          {!readOnly && (
            <label className="cursor-pointer bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
              {loading === 'gallery' ? <Loader2 size={14} className="animate-spin" /> : <Plus size={16} />}
              Ajouter une photo
              <input 
                ref={galleryInputRef}
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={e => e.target.files?.[0] && handleUpload('gallery', e.target.files[0])} 
              />
            </label>
          )}
        </div>

        {vehicle.illustrationImages && vehicle.illustrationImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {vehicle.illustrationImages.map((img: string, i: number) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 relative group shadow-sm hover:shadow-md transition-all">
                <img src={img} className="size-full object-cover" alt={`Illustration ${i}`} />
                {!readOnly && (
                  <button 
                    onClick={() => {
                      if(confirm("Supprimer cette image de la galerie ?")) {
                        // Note: On passe l'index si le backend n'a pas d'ID unique par image dans ce flux
                        vehicleService.deleteGalleryImage(vehicle.id, i.toString()).then(onUpdate);
                      }
                    }}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-[2rem]">
            <ImageIcon size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-bold uppercase tracking-widest">Aucune photo dans la galerie</p>
          </div>
        )}
      </div>
    </div>
  );
}