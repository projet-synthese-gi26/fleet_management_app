"use client";

import React, { useState, useEffect } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { VehicleTable } from "@/components/dashboard/vehicles/VehicleTable";
import { CreateVehicleModal } from "@/components/dashboard/vehicles/CreateVehicleModal";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { Plus, RefreshCw, Search, Truck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { locale } = useI18n();
  const router = useRouter();

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const data = await vehicleService.getAll();
      setVehicles(data);
    } catch (error) {
      toast.error("Erreur de chargement du parc");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const filtered = vehicles.filter(v => 
    v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Mon Parc Automobile</h1>
          <p className="text-text-secondary">Gérez l'inventaire technique et administratif de vos véhicules.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2 shadow-primary">
          <Plus size={18} /> Ajouter un véhicule
        </Button>
      </div>

      {/* Barre d'outils */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-surface p-4 rounded-2xl border border-border-default shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input 
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-border-default bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Rechercher par plaque, marque ou modèle..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={fetchVehicles} className="h-11 w-11 p-0 shrink-0">
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </Button>
      </div>

      {/* Liste ou État vide */}
      <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          <TableSkeleton rows={6} columns={5} />
        ) : filtered.length > 0 ? (
          <VehicleTable 
            vehicles={filtered} 
            onView={(v) => router.push(`/${locale}/dashboard/vehicles/${v.id}`)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
            <div className="size-20 rounded-full bg-background-secondary flex items-center justify-center mb-4">
              <Truck size={40} className="text-text-disabled" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Aucun véhicule trouvé</h3>
            <p className="text-text-secondary max-w-xs mt-2">Commencez par ajouter votre premier véhicule pour le suivre en temps réel.</p>
          </div>
        )}
      </div>

      <CreateVehicleModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSuccess={fetchVehicles}
      />
    </div>
  );
}