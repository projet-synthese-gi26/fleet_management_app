"use client";
import React from "react";
import { User, CreditCard, Truck, Link2, Unlink, Mail, Phone, Trash2, MoreVertical } from "lucide-react";
import { Driver } from "@/types/driver.types";
import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

interface Props {
  drivers: Driver[];
  onAssign: (d: Driver) => void; 
  onUnassign: (d: Driver) => void;
  onRemove: (d: Driver) => void;
}

export function DriverTable({ drivers, onAssign, onUnassign, onRemove }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-background-secondary/50 border-b border-border-default text-text-tertiary font-bold uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-6 py-4">Chauffeur</th>
            <th className="px-6 py-4">Contact & Permis</th>
            <th className="px-6 py-4">Véhicule Actuel</th>
            <th className="px-6 py-4">Statut</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default bg-surface">
          {drivers.map((driver) => (
            <tr key={driver.userId} className="hover:bg-background-secondary/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0 shadow-sm">
                    {driver.photoUrl ? (
                      <img src={driver.photoUrl} alt="" className="size-full object-cover" />
                    ) : (
                      <User size={20} className="text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{driver.firstName} {driver.lastName}</p>
                    <p className="text-[10px] font-mono text-text-tertiary uppercase">ID: {driver.userId.substring(0, 8)}</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary flex items-center gap-2">
                    <CreditCard size={12} className="text-text-tertiary" /> {driver.licenceNumber}
                  </p>
                  <p className="text-[11px] text-text-tertiary flex items-center gap-2">
                    <Mail size={12} /> {driver.email}
                  </p>
                </div>
              </td>

              <td className="px-6 py-4">
                {driver.assignedVehicleId ? (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-primary font-bold text-[10px] uppercase">
                    <Truck size={14} />
                    {driver.vehiclePlate || "Assigné"}
                  </div>
                ) : (
                  <span className="text-text-disabled italic text-xs">Aucun véhicule</span>
                )}
              </td>

              <td className="px-6 py-4">
                <StatusBadge 
                    status={driver.status} 
                    color={driver.status === 'ACTIVE' ? 'green' : 'gray'} 
                />
              </td>

              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-1">
                  {driver.assignedVehicleId ? (
                    <button 
                      onClick={() => onUnassign(driver)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all" 
                      title="Libérer le véhicule"
                    >
                      <Unlink size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => onAssign(driver)}
                      className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all" 
                      title="Assigner un véhicule"
                    >
                      <Link2 size={18} />
                    </button>
                  )}
                  
                  <button 
                    onClick={() => onRemove(driver)}
                    className="p-2 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-all"
                    title="Retirer de la flotte"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}