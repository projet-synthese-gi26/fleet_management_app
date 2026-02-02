"use client";
import React, { useState, useEffect } from "react";
import { driverService } from "@/services/driver.service";
import { Driver } from "@/types/driver.types";
import { DriverTable } from "@/components/dashboard/drivers/DriverTable";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { StatCard } from "../../(dashboard)/StatCard";

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Note: Pour l'admin, le backend sans fleetId renvoie tout (à vérifier selon votre API)
    driverService.getDriversByFleet("") 
      .then(setDrivers)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Répertoire des Chauffeurs</h1>
        <p className="text-text-secondary">Vue d'ensemble de tous les chauffeurs inscrits sur la plateforme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Chauffeurs" value={drivers.length} icon="groups" color="primary" />
        <StatCard title="En Service" value={drivers.filter(d => d.assignedVehicleId).length} icon="local_shipping" color="success" />
        <StatCard title="Disponibles" value={drivers.filter(d => !d.assignedVehicleId).length} icon="person_add" color="info" />
      </div>

      <div className="bg-surface rounded-xl border border-border-default shadow-sm overflow-hidden">
        {isLoading ? <TableSkeleton rows={10} columns={5} /> : (
          <DriverTable drivers={drivers} isAdminView={true} />
        )}
      </div>
    </div>
  );
}