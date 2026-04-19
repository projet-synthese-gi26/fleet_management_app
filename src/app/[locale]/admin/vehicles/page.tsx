"use client";
import React, { useState, useEffect } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { VehicleTable } from "@/components/dashboard/vehicles/VehicleTable";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { StatCard } from "../../(dashboard)/StatCard";
import { Search, Filter, RefreshCw } from "lucide-react";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await vehicleService.getAll();
      setVehicles(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'AVAILABLE').length,
    maintenance: vehicles.filter(v => v.status === 'MAINTENANCE').length
  };

  const filtered = vehicles.filter(v => 
    v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Supervision Globale des Véhicules</h1>
        <p className="text-text-secondary">Visualisez l'état de l'ensemble de la flotte nationale</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Véhicules" value={stats.total} icon="local_shipping" color="primary" />
        <StatCard title="En Service" value={stats.available} icon="check_circle" color="success" />
        <StatCard title="En Maintenance" value={stats.maintenance} icon="build" color="warning" />
      </div>

      <div className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-border-default shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input 
            type="text" placeholder="Filtrer par plaque ou marque..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-default bg-background text-text-primary outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={fetchData} className="p-2.5 rounded-lg border border-border-default hover:bg-slate-50">
          <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border-default shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? <TableSkeleton rows={8} columns={5} /> : (
          <VehicleTable 
            vehicles={filtered}  
            onView={(v) => console.log("Voir", v)} 
          />
        )}
      </div>
    </div>
  );
}