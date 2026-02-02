"use client";
import React, { useState, useEffect, useCallback } from "react";
import { driverService } from "@/services/driver.service";
import { fleetService } from "@/services/fleet.service";
import { Driver } from "@/types/driver.types";
import { Fleet } from "@/types/fleet.types";
import { DriverTable } from "@/components/dashboard/drivers/DriverTable";
import { Button } from "@/components/ui/Button";
import { UserPlus, UserCheck, RefreshCw, AlertCircle } from "lucide-react";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { AssignVehicleModal } from "@/components/dashboard/drivers/AssignVehicleModal";
import { RegisterDriverModal } from "@/components/dashboard/drivers/RegisterDriverModal";
import { toast } from "sonner";

export default function ManagerDriversPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [selectedFleetId, setSelectedFleetId] = useState<string>("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // 1. Charger les flottes du manager au montage
  useEffect(() => {
    fleetService.getAllFleets().then((data) => {
      setFleets(data);
      if (data.length > 0) setSelectedFleetId(data[0].id);
    });
  }, []);

  // 2. Charger les chauffeurs quand la flotte change
  const fetchDrivers = useCallback(async () => {
    if (!selectedFleetId) return;
    setIsLoading(true);
    try {
      const data = await driverService.getDriversByFleet(selectedFleetId);
      setDrivers(data);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFleetId]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const handleUnassign = async (d: Driver) => {
    try {
      await driverService.unassignVehicle(d.userId);
      toast.success("Véhicule libéré");
      fetchDrivers();
    } catch (e) {
      toast.error("Erreur");
    }
  };

  const handleRemove = async (d: Driver) => {
    if (!confirm("Retirer ce chauffeur de votre flotte ?")) return;
    try {
      await driverService.removeFromFleet(selectedFleetId, d.userId);
      toast.success("Chauffeur détaché de la flotte");
      fetchDrivers();
    } catch (e) {
      toast.error("Action impossible");
    }
  };

  const openAssignModal = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsAssignModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Mes Chauffeurs
          </h1>
          <p className="text-sm text-text-secondary">
            Gérez les effectifs et les assignations de véhicules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <UserCheck size={18} /> Recruter
          </Button>
          <Button
            className="gap-2"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            <UserPlus size={18} /> Nouveau Chauffeur
          </Button>
        </div>
      </div>

      {/* Selecteur de Flotte (Si le manager en a plusieurs) */}
      <div className="bg-surface p-4 rounded-xl border border-border-default shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold uppercase text-text-tertiary">
            Flotte :
          </label>
          <select
            className="bg-background border border-border-default rounded-lg px-3 py-1.5 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
            value={selectedFleetId}
            onChange={(e) => setSelectedFleetId(e.target.value)}
          >
            {fleets.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={fetchDrivers}
          className="p-2 text-text-secondary hover:bg-background-secondary rounded-lg"
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border-default shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          <TableSkeleton rows={5} columns={5} />
        ) : drivers.length > 0 ? (
          <DriverTable
            drivers={drivers}
            onUnassignVehicle={handleUnassign}
            onRemoveFromFleet={handleRemove}
            onAssignVehicle={(d) => openAssignModal(d)}
          />
        ) : (
          <div className="p-20 text-center flex flex-col items-center gap-2">
            <AlertCircle size={40} className="text-text-disabled" />
            <p className="text-text-secondary font-medium">
              Aucun chauffeur dans cette flotte.
            </p>
            <p className="text-xs text-text-tertiary">
              Inscrivez ou recrutez des chauffeurs pour commencer.
            </p>
          </div>
        )}
      </div>

      <RegisterDriverModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        fleetId={selectedFleetId}
        onSuccess={fetchDrivers}
      />

      <AssignVehicleModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        driver={selectedDriver}
        onSuccess={fetchDrivers}
      />
    </div>
  );
}
