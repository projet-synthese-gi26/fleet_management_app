"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { fleetService } from "@/services/fleet.service";
import { geofenceService } from "@/services/geofence.service"; // Import ajouté
import { Fleet, CreateFleetDto } from "@/types/fleet.types";
import { FleetsTable } from "@/components/dashboard/fleets/FleetsTable";
import { FleetFormModal } from "@/components/dashboard/fleets/FleetFormModal";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { Plus, RefreshCw, LayoutGrid, Search } from "lucide-react";
import { toast } from "sonner";

export default function ManagerFleetsPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [zones, setZones] = useState<any[]>([]); // Pour le comptage
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Chargement parallèle flottes + zones pour synchroniser les compteurs
      const [fleetsData, zonesData] = await Promise.all([
        fleetService.getAllFleets(),
        geofenceService.getMyZones()
      ]);
      setFleets(fleetsData);
      setZones(zonesData);
    } catch (error) {
      toast.error("Erreur de récupération des données");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ÉTAPE CLÉ : Enrichissement des flottes avec le nombre de zones en local
  const enrichedFleets = useMemo(() => {
    return fleets
      .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(fleet => ({
        ...fleet,
        // On compte combien de zones pointent vers cette flotte
        zoneCount: zones.filter(z => z.fleetId === fleet.id).length
      }));
  }, [fleets, zones, searchTerm]);

  const handleCreateOrUpdate = async (data: CreateFleetDto) => {
    setIsSubmitting(true);
    try {
      if (selectedFleet) {
        await fleetService.updateFleet(selectedFleet.id, data);
        toast.success("Flotte mise à jour");
      } else {
        await fleetService.createFleet(data);
        toast.success("Nouvelle flotte créée");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.detail || "Erreur lors de l'opération");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (fleet: Fleet) => {
    if (!confirm(`Supprimer votre flotte "${fleet.name}" ?`)) return;
    try {
      await fleetService.deleteFleet(fleet.id);
      toast.success("Flotte supprimée");
      fetchData();
    } catch (error: any) {
      toast.error("Suppression impossible", { description: error.detail });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Répertoire des Flottes</h1>
          <p className="text-text-secondary text-sm font-medium">
            Gérez vos centres logistiques et surveillez vos zones d'activité.
          </p>
        </div>
        <Button onClick={() => { setSelectedFleet(null); setIsModalOpen(true); }} className="gap-2 shadow-primary px-6">
          <Plus size={18} /> Nouvelle Flotte
        </Button>
      </div>

      {/* SEARCH & REFRESH */}
      <div className="flex items-center gap-4 bg-surface p-4 rounded-2xl border border-border-default shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input 
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-border-default bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Rechercher une flotte par son nom..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={fetchData} className="h-11 w-11 p-0 shrink-0">
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </Button>
      </div>

      {/* TABLEAU */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <TableSkeleton rows={5} columns={5} />
        ) : enrichedFleets.length > 0 ? (
          <FleetsTable
            fleets={enrichedFleets}
            isAdminView={false}
            onEdit={(f) => { setSelectedFleet(f); setIsModalOpen(true); }}
            onDelete={handleDelete}
          />
        ) : (
          <div className="p-20 text-center flex flex-col items-center bg-surface rounded-2xl border-2 border-dashed border-border-default">
            <LayoutGrid size={48} className="text-text-disabled mb-4 opacity-20" />
            <p className="text-text-secondary font-bold">Aucune flotte trouvée</p>
            <p className="text-text-tertiary text-sm mb-6">Commencez par créer une flotte pour y assigner des véhicules.</p>
            <Button onClick={() => setIsModalOpen(true)}>Créer ma première flotte</Button>
          </div>
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