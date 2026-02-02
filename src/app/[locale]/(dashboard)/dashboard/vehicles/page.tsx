"use client";
import React, { useState, useEffect } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { VehicleTable } from "@/components/dashboard/vehicles/VehicleTable";
import { CreateVehicleModal } from "@/components/dashboard/vehicles/CreateVehicleModal";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { Plus, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

export default function ManagerVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { locale } = useI18n();
  const router = useRouter();

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const data = await vehicleService.getAll();
      setVehicles(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleDelete = async (v: Vehicle) => {
    if (!confirm(`Supprimer le véhicule ${v.licensePlate} ?`)) return;
    try {
      await vehicleService.delete(v.id);
      toast.success("Véhicule supprimé");
      setVehicles(prev => prev.filter(item => item.id !== v.id));
    } catch (e: any) {
      toast.error("Action impossible", { description: e.detail });
    }
  };

  const filtered = vehicles.filter(v => v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ma Flotte</h1>
          <p className="text-sm text-text-secondary">Gérez l'ensemble de vos actifs roulants</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={18} /> Ajouter un véhicule
        </Button>
      </div>

      {/* Barre d'outils */}
      <div className="flex items-center gap-3 bg-surface p-3 rounded-xl border border-border-default shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
          <input 
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border border-border-default bg-background outline-none"
            placeholder="Rechercher par immatriculation..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={fetchVehicles} className="p-2 hover:bg-background-secondary rounded-lg">
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border-default shadow-sm overflow-hidden">
        {isLoading ? <TableSkeleton rows={5} columns={5} /> : (
          <VehicleTable 
            vehicles={filtered} 
            isAdminView={false}
            onView={(v) => router.push(`/${locale}/dashboard/vehicles/${v.id}`)}
            onEdit={(v) => router.push(`/${locale}/dashboard/vehicles/${v.id}?edit=true`)}
            onDelete={handleDelete}
          />
        )}
      </div>

      <CreateVehicleModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}