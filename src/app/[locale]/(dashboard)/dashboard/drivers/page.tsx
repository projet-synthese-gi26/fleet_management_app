"use client";

import React, { useState, useEffect } from "react";
import { driverService } from "@/services/driver.service";
import { Driver } from "@/types/driver.types";
import { DriverTable } from "@/components/dashboard/drivers/DriverTable";
import { AssignVehicleModal } from "@/components/dashboard/drivers/AssignVehicleModal";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { UserPlus, Search, RefreshCw, UserCheck, Link2, Unlink } from "lucide-react";
import { toast } from "sonner";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // États pour les modales
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const fetchDrivers = async () => {
    try {
      setIsLoading(true);
      const data = await driverService.getDrivers();
      setDrivers(data);
    } catch (error) {
      toast.error("Erreur de chargement des chauffeurs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleUnassign = async (driver: Driver) => {
    if (!confirm(`Libérer le chauffeur ${driver.firstName} ?`)) return;
    try {
      await driverService.unassignVehicle(driver.userId);
      toast.success("Véhicule libéré");
      fetchDrivers();
    } catch (error: any) {
      toast.error("Erreur", { description: error.detail });
    }
  };

  const filtered = drivers.filter(d => 
    d.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.licenceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Gestion des Chauffeurs</h1>
          <p className="text-text-secondary">Gérez vos effectifs et les affectations de véhicules.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2"><UserCheck size={18} /> Recruter</Button>
          <Button className="gap-2 shadow-primary"><UserPlus size={18} /> Nouveau Chauffeur</Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-surface p-4 rounded-2xl border border-border-default shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input 
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-border-default bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Rechercher par nom ou n° de permis..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={fetchDrivers} className="h-11 w-11 p-0">
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </Button>
      </div>

      <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={6} columns={5} />
        ) : (
          <DriverTable 
            drivers={filtered} 
            onAssign={(d) => { setSelectedDriver(d); setIsAssignOpen(true); }}
            onUnassign={handleUnassign}
          />
        )}
      </div>

      <AssignVehicleModal 
        isOpen={isAssignOpen} 
        onClose={() => setIsAssignOpen(false)} 
        driver={selectedDriver} 
        onSuccess={fetchDrivers} 
      />
    </div>
  );
}