"use client";
import React, { useState, useEffect, useCallback } from "react";
import { fleetService } from "@/services/fleet.service";
import { Fleet, CreateFleetDto } from "@/types/fleet.types";
import { FleetsTable } from "@/components/dashboard/fleets/FleetsTable";
import { FleetFormModal } from "@/components/dashboard/fleets/FleetFormModal";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Button } from "@/components/ui/Button";
import { Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function ManagerFleetsPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMyFleets = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fleetService.getAllFleets();
      setFleets(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyFleets();
  }, [fetchMyFleets]);

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
      fetchMyFleets();
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
      setFleets((prev) => prev.filter((f) => f.id !== fleet.id));
    } catch (error: any) {
      toast.error("Erreur", { description: error.detail });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Mes Flottes</h1>
          <p className="text-sm text-text-secondary">
            Gérez vos flottes de véhicules personnelles
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedFleet(null);
            setIsModalOpen(true);
          }}
          className="gap-2"
        >
          <Plus size={18} /> Créer une flotte
        </Button>
      </div>

      <div className="bg-surface rounded-xl border border-border-default shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          <TableSkeleton rows={4} columns={5} />
        ) : fleets.length > 0 ? (
          <FleetsTable
            fleets={fleets}
            isAdminView={false}
            onEdit={(f) => {
              setSelectedFleet(f);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ) : (
          <div className="p-20 text-center flex flex-col items-center">
            <p className="text-text-tertiary mb-4">
              Vous n'avez pas encore de flotte.
            </p>
            <Button variant="outline" onClick={fetchMyFleets}>
              <RefreshCw size={14} className="mr-2" />
              Actualiser
            </Button>
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
