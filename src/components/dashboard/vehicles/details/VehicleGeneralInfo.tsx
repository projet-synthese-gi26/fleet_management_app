"use client";
import React, { useState, useEffect } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { driverService } from "@/services/driver.service";
import { Vehicle } from "@/types/vehicle.types";
import { Driver } from "@/types/driver.types";
import { Button } from "@/components/ui/Button";
import { useResources } from "@/hooks/useRessources";
import { toast } from "sonner";
import { Save, Hash, PaintBucket, Tag, Truck, Loader2, UserCheck, UserMinus, User } from "lucide-react";

export default function VehicleGeneralInfo({ vehicle, onUpdate }: { vehicle: Vehicle, onUpdate: () => void }) {
  const { catalog, isLoading: refsLoading } = useResources();
  const [isSaving, setIsSaving] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  
  const [form, setForm] = useState({
    licensePlate: vehicle.licensePlate,
    brand: vehicle.brand,
    model: vehicle.model,
    color: vehicle.color,
    status: vehicle.status
  });

  useEffect(() => {
    driverService.getDrivers().then(setDrivers).catch(() => console.error("Erreur drivers"));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await vehicleService.patchOperationalData(vehicle.id, form);
      toast.success("Informations mises à jour");
      onUpdate();
    } catch (error) {
      toast.error("Erreur de sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAssignDriver = async (driverId: string) => {
    try {
      await driverService.assignVehicle(driverId, vehicle.id);
      toast.success("Chauffeur assigné");
      onUpdate();
    } catch (e) {
      toast.error("Échec de l'assignation");
    }
  };

  const handleUnassignDriver = async () => {
    if (!vehicle.currentDriverId) return;
    try {
      await driverService.unassignVehicle(vehicle.currentDriverId);
      toast.success("Véhicule libéré");
      onUpdate();
    } catch (e) {
      toast.error("Erreur lors de la libération");
    }
  };

  if (refsLoading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Hash size={14} /> Immatriculation</label>
            <input className="w-full p-3 rounded-2xl border bg-slate-50 font-black uppercase outline-none focus:ring-2 focus:ring-primary/20" 
                   value={form.licensePlate} onChange={e => setForm({...form, licensePlate: e.target.value.toUpperCase()})} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Tag size={14} /> Marque</label>
            <select className="w-full p-3 rounded-2xl border bg-slate-50 font-bold outline-none"
                    value={form.brand} onChange={e => setForm({...form, brand: e.target.value})}>
              {catalog?.brands.map(b => <option key={b.id} value={b.label}>{b.label}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Truck size={14} /> Modèle</label>
            <select className="w-full p-3 rounded-2xl border bg-slate-50 font-bold outline-none"
                    value={form.model} onChange={e => setForm({...form, model: e.target.value})}>
              {catalog?.models.map(m => <option key={m.id} value={m.label}>{m.label}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><PaintBucket size={14} /> Couleur</label>
            <select className="w-full p-3 rounded-2xl border bg-slate-50 font-bold outline-none"
                    value={form.color} onChange={e => setForm({...form, color: e.target.value})}>
              {catalog?.colors.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" isLoading={isSaving} className="px-10 shadow-primary">Enregistrer les modifications</Button>
        </div>
      </form>

      {/* SECTION ASSIGNATION CHAUFFEUR */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h4 className="text-sm font-black text-slate-800 uppercase mb-6 flex items-center gap-2">
          <UserCheck size={20} className="text-primary" /> Chauffeur Assigné
        </h4>
        
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          {vehicle.currentDriverId ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-700">Véhicule en service</p>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">ID Chauffeur: {vehicle.currentDriverId}</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleUnassignDriver} className="h-10 text-red-500 border-red-100 hover:bg-red-50">
                <UserMinus size={18} className="mr-2" /> Libérer le véhicule
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <select 
                className="flex-1 w-full p-3 rounded-xl border bg-white text-sm font-bold outline-none shadow-sm"
                onChange={(e) => handleAssignDriver(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Choisir un chauffeur libre...</option>
                {drivers.filter(d => !d.assignedVehicleId).map(d => (
                  <option key={d.userId} value={d.userId}>{d.firstName} {d.lastName} ({d.licenceNumber})</option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 font-bold uppercase text-center sm:text-left">
                L'assignation verrouille le véhicule pour ce chauffeur.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}