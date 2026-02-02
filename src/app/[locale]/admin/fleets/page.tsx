"use client";
import React, { useState, useEffect, useCallback } from "react";
import { fleetService } from "@/services/fleet.service";
import { Fleet, CreateFleetDto } from "@/types/fleet.types";
import { FleetsTable } from "@/components/dashboard/fleets/FleetsTable";
import { FleetFormModal } from "@/components/dashboard/fleets/FleetFormModal";
import { StatCard } from "../../(dashboard)/StatCard";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Plus, RefreshCw, Search } from "lucide-react";

export default function AdminFleetsPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // États Modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFleets = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fleetService.getAllFleets();
      setFleets(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchFleets(); }, [fetchFleets]);

  const handleCreateOrUpdate = async (data: CreateFleetDto) => {
    setIsSubmitting(true);
    try {
      if (selectedFleet) {
        await fleetService.updateFleet(selectedFleet.id, data);
        toast.success("Flotte mise à jour");
      } else {
        await fleetService.createFleet(data);
        toast.success("Flotte créée");
      }
      setIsModalOpen(false);
      fetchFleets();
    } catch (error: any) {
      toast.error(error.title || "Erreur", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (fleet: Fleet) => {
    if (!confirm(`Supprimer la flotte "${fleet.name}" ?`)) return;
    try {
      await fleetService.deleteFleet(fleet.id);
      toast.success("Flotte supprimée");
      setFleets(prev => prev.filter(f => f.id !== fleet.id));
    } catch (error: any) {
      toast.error("Action impossible", { description: error.detail });
    }
  };

  const filteredFleets = fleets.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Stats
  const totalVehicles = fleets.reduce((acc, f) => acc + f.vehicleCount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Supervision des Flottes</h1>
          <p className="text-text-secondary">Toutes les flottes du système (Admin)</p>
        </div>
        <Button onClick={() => { setSelectedFleet(null); setIsModalOpen(true); }} className="gap-2">
          <Plus size={20} /> Nouvelle Flotte
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Flottes" value={fleets.length} icon="hub" color="primary" />
        <StatCard title="Total Véhicules" value={totalVehicles} icon="local_shipping" color="success" />
        <StatCard title="Moyenne Taille" value={fleets.length ? (totalVehicles / fleets.length).toFixed(1) : 0} icon="analytics" color="info" />
      </div>

      <div className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-border-default shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input 
            type="text" placeholder="Rechercher une flotte..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-default bg-background text-text-primary outline-none"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={fetchFleets} className="p-2 text-text-secondary hover:bg-background-secondary rounded-lg">
          <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border-default shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={6} columns={6} />
        ) : (
          <FleetsTable 
            fleets={filteredFleets} 
            isAdminView={true} 
            onEdit={(f) => { setSelectedFleet(f); setIsModalOpen(true); }} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      <FleetFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateOrUpdate} 
        initialData={selectedFleet} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}