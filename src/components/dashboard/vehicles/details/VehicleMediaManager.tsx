"use client";
import React from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { toast } from "sonner";
import { Upload, Trash2, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function VehicleMediaManager({ vehicle, onUpdate, readOnly }: { vehicle: Vehicle, onUpdate: () => void, readOnly: boolean | undefined }) {
  
  const handleUpload = async (type: 'vin' | 'registration' | 'gallery', file: File) => {
    const tid = toast.loading(`Upload de ${type}...`);
    try {
      await vehicleService.uploadMedia(vehicle.id, type, file);
      toast.dismiss(tid);
      toast.success("Fichier mis à jour");
      onUpdate();
    } catch (e: any) {
      toast.dismiss(tid);
      toast.error(e.status === 413 ? "Fichier trop lourd" : "Erreur upload");
    }
  };

  const PhotoCard = ({ title, url, type }: { title: string, url?: string, type: 'vin' | 'registration' }) => (
    <div className="bg-surface p-4 rounded-xl border border-border-default space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold uppercase text-text-secondary">{title}</h4>
        {url && <CheckCircle className="text-success" size={16} />}
      </div>
      
      <div className="aspect-video relative rounded-lg bg-background border-2 border-dashed border-border-default flex items-center justify-center overflow-hidden group">
        {url ? (
          <>
            <img src={url} className="object-cover size-full" alt={title} />
            {!readOnly && (
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                <Upload className="text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(type, e.target.files[0])} />
              </label>
            )}
          </>
        ) : (
          <label className={`flex flex-col items-center gap-2 ${readOnly ? "" : "cursor-pointer"}`}>
            <Upload className="text-text-tertiary" />
            <span className="text-xs text-text-tertiary">Cliquez pour uploader</span>
            {!readOnly && <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(type, e.target.files[0])} />}
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Photos Administratives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhotoCard title="Photo du Châssis (VIN)" url={vehicle.serialNumberPhotoUrl} type="vin" />
        <PhotoCard title="Carte Grise" url={vehicle.registrationPhotoUrl} type="registration" />
      </div>

      {/* Galerie d'illustration */}
      <div className="bg-surface p-6 rounded-xl border border-border-default space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold uppercase text-text-secondary">Galerie Photos</h4>
          {!readOnly && (
            <Button variant="outline" className="h-8 text-xs relative">
               <Upload size={14} className="mr-2" /> Ajouter
               <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && handleUpload('gallery', e.target.files[0])} />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {vehicle.illustrationImages.map((img, idx) => (
            <div key={idx} className="aspect-square relative rounded-lg overflow-hidden group border border-border-default">
              <img src={img} className="object-cover size-full" alt="Illustration" />
              {!readOnly && (
                <button 
                  onClick={async () => {
                    await vehicleService.deleteGalleryImage(vehicle.id, idx.toString()); // Adaptation ID image
                    onUpdate();
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}