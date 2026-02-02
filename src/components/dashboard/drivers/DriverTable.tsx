"use client";
import React from "react";
import { User, CreditCard, Truck, Link2, Unlink, LogOut, MoreVertical } from "lucide-react";
import { Driver } from "@/types/driver.types";
import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

interface DriverTableProps {
  drivers: Driver[];
  isAdminView?: boolean;
  onAssignVehicle?: (d: Driver) => void;
  onUnassignVehicle?: (d: Driver) => void;
  onRemoveFromFleet?: (d: Driver) => void;
}

export function DriverTable({ 
  drivers, 
  isAdminView, 
  onAssignVehicle, 
  onUnassignVehicle, 
  onRemoveFromFleet 
}: DriverTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-background-secondary border-b border-border-default text-text-secondary font-bold uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-6 py-4">Chauffeur</th>
            <th className="px-6 py-4">Permis</th>
            <th className="px-6 py-4">Statut</th>
            <th className="px-6 py-4">Véhicule Actuel</th>
            {!isAdminView && <th className="px-6 py-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default bg-surface">
          {drivers.map((driver) => (
            <tr key={driver.userId} className="hover:bg-background-secondary/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {driver.photoUrl ? (
                    <img src={driver.photoUrl} className="size-10 rounded-full object-cover border border-border-default" />
                  ) : (
                    <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-border-default">
                      <User size={20} />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-text-primary">
                      {driver.firstName ? `${driver.firstName} ${driver.lastName}` : `ID: ${driver.userId.substring(0,8)}`}
                    </p>
                    <p className="text-[10px] font-mono text-text-tertiary uppercase">{driver.userId.substring(0,13)}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-text-secondary">
                  <CreditCard size={14} />
                  <span className="font-medium">{driver.licenceNumber}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={driver.status} color={driver.status === 'ACTIVE' ? 'green' : 'gray'} />
              </td>
              <td className="px-6 py-4">
                {driver.assignedVehicleId ? (
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Truck size={16} />
                    <span className="text-xs uppercase">{driver.vehiclePlate || "Assigné"}</span>
                  </div>
                ) : (
                  <span className="text-text-disabled italic text-xs">Aucun véhicule</span>
                )}
              </td>
              {!isAdminView && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {driver.assignedVehicleId ? (
                      <button 
                        onClick={() => onUnassignVehicle?.(driver)}
                        className="p-2 hover:bg-warning/10 text-warning rounded-lg" 
                        title="Libérer le chauffeur"
                      >
                        <Unlink size={18} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => onAssignVehicle?.(driver)}
                        className="p-2 hover:bg-primary/10 text-primary rounded-lg" 
                        title="Assigner un véhicule"
                      >
                        <Link2 size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => onRemoveFromFleet?.(driver)}
                      className="p-2 hover:bg-error/10 text-error rounded-lg" 
                      title="Retirer de la flotte"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}