"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { vehicleService } from "@/services/vehicle.service";
import { driverService } from "@/services/driver.service";
import { Vehicle } from "@/types/vehicle.types";
import { Driver } from "@/types/driver.types";
import { Truck, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/Spinner";

interface AssignVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
  onSuccess: () => void;
}

export function AssignVehicleModal({
  isOpen,
  onClose,
  driver,
  onSuccess,
}: AssignVehicleModalProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && driver) {
      loadVehicles();
    }
  }, [isOpen, driver]);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      // On récupère tous les véhicules de la même flotte
      const data = await vehicleService.getAll({ fleetId: driver?.fleetId });
      setVehicles(data);
    } catch (e) {
      toast.error("Erreur lors du chargement des véhicules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!driver || !selectedVehicleId) return;

    setIsSubmitting(true);
    try {
      await driverService.assignVehicle(driver.userId, selectedVehicleId);
      toast.success(`Véhicule assigné à ${driver.firstName || "chauffeur"}`);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erreur d'assignation", { description: error.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assigner un véhicule à ${driver?.firstName || "ce chauffeur"}`}
    >
      <div className="space-y-4">
        {/* Avertissement Smart Swap */}
        <div className="bg-info/10 border border-info/20 p-3 rounded-lg flex gap-3 items-start">
          <AlertCircle className="text-info shrink-0" size={18} />
          <p className="text-xs text-info-dark leading-relaxed">
            Note : Si le véhicule ou le chauffeur est déjà engagé, le système
            effectuera une permutation automatique des ressources.
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
            size={16}
          />
          <input
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border-default bg-background outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Chercher une plaque ou un modèle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Liste des véhicules */}
        <div className="max-h-[300px] overflow-y-auto border border-border-default rounded-xl divide-y divide-border-default">
          {isLoading ? (
            <div className="p-8">
              <Spinner />
            </div>
          ) : filteredVehicles.length > 0 ? (
            filteredVehicles.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVehicleId(v.id)}
                className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                  selectedVehicleId === v.id
                    ? "bg-primary/5"
                    : "hover:bg-background-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${v.status === "AVAILABLE" ? "bg-success/10 text-success" : "bg-slate-100 text-slate-400"}`}
                  >
                    <Truck size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-text-primary uppercase">
                      {v.licensePlate}
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      {v.brand} {v.model} • {v.status}
                    </p>
                  </div>
                </div>
                {selectedVehicleId === v.id && (
                  <CheckCircle2 className="text-primary" size={20} />
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-text-tertiary text-sm italic">
              Aucun véhicule disponible
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border-default">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedVehicleId}
            isLoading={isSubmitting}
          >
            Confirmer l'assignation
          </Button>
        </div>
      </div>
    </Modal>
  );
}
