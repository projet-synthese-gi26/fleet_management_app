"use client";
import React, { useState, useEffect, useCallback } from "react";
import { driverService } from "@/services/driver.service";
import { fleetService } from "@/services/fleet.service";
import { Driver } from "@/types/driver.types";
import { Fleet } from "@/types/fleet.types";
import { DriverTable } from "@/components/dashboard/drivers/DriverTable";
import { RegisterDriverModal } from "@/components/dashboard/drivers/RegisterDriverModal";
import { AssignVehicleModal } from "@/components/dashboard/drivers/AssignVehicleModal";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { UserPlus, Search, UserCheck } from "lucide-react";
import { toast } from "sonner";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [d, f] = await Promise.all([driverService.getDrivers(), fleetService.listMyFleets()]);
      setDrivers(d);
      setFleets(f);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleRecruit = async () => {
    const iden = prompt("Email ou Username du chauffeur :");
    if (!iden || fleets.length === 0) return;
    try {
      await driverService.recruitExisting(fleets[0].id, iden);
      toast.success("Chauffeur recruté");
      loadData();
    } catch (e) { toast.error("Chauffeur introuvable"); }
  };

  const handleUnassign = async (d: Driver) => {
    if (!confirm("Libérer ce chauffeur ?")) return;
    await driverService.unassignVehicle(d.userId);
    loadData();
  };

  const handleRemove = async (d: Driver) => {
    if (!d.fleetId || !confirm("Retirer de la flotte ?")) return;
    await driverService.removeFromFleet(d.fleetId, d.userId);
    loadData();
  };

  const filtered = drivers.filter(d => `${d.firstName} ${d.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Gestion des Chauffeurs</h1>
          <p className="text-slate-500 text-sm">Pilotez vos effectifs et leurs assignations.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRecruit} className="gap-2 h-11 rounded-xl"><UserCheck size={18} /> Recruter</Button>
          <Button onClick={() => setIsRegisterOpen(true)} className="gap-2 h-11 rounded-xl shadow-primary"><UserPlus size={18} /> Nouveau</Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 bg-white shadow-sm outline-none focus:ring-2 focus:ring-primary/20" 
               placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? <TableSkeleton rows={8} columns={5} /> : (
          <DriverTable 
            drivers={filtered} 
            onAssign={(d) => { setSelectedDriver(d); setIsAssignOpen(true); }}
            onUnassign={handleUnassign}
            onRemove={handleRemove}
          />
        )}
      </div>

      {fleets.length > 0 && (
        <RegisterDriverModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} fleetId={fleets[0].id} onSuccess={loadData} />
      )}
      <AssignVehicleModal isOpen={isAssignOpen} onClose={() => setIsAssignOpen(false)} driver={selectedDriver} onSuccess={loadData} />
    </div>
  );
}