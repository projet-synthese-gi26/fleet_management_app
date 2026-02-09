"use client";

import React from "react";
import { 
  User, 
  CreditCard, 
  Truck, 
  Link2, 
  Unlink, 
  MoreVertical, 
  Mail, 
  Phone 
} from "lucide-react";
import { Driver } from "@/types/driver.types";

interface DriverTableProps {
  drivers: Driver[];
  // On aligne les noms des props sur ce que tu as utilisé dans ta page
  onAssign: (d: Driver) => void; 
  onUnassign: (d: Driver) => void;
  isAdminView?: boolean;
}

export function DriverTable({ drivers, onAssign, onUnassign, isAdminView }: DriverTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-background-secondary/50 border-b border-border-default text-text-secondary font-bold uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-6 py-4">Chauffeur</th>
            <th className="px-6 py-4">Contact & Permis</th>
            <th className="px-6 py-4">Véhicule Assigné</th>
            <th className="px-6 py-4">Statut</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default bg-surface">
          {drivers.map((driver) => (
            <tr key={driver.userId} className="hover:bg-background-secondary/30 transition-colors group">
              {/* Colonne 1 : Identité */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0">
                    {driver.photoUrl ? (
                      <img src={driver.photoUrl} alt="" className="size-full object-cover" />
                    ) : (
                      <User size={20} className="text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">
                      {driver.firstName} {driver.lastName}
                    </p>
                    <p className="text-[10px] font-mono text-text-tertiary uppercase">
                      ID: {driver.userId.substring(0, 8)}
                    </p>
                  </div>
                </div>
              </td>

              {/* Colonne 2 : Contact & Permis */}
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary flex items-center gap-2">
                    <CreditCard size={12} className="text-text-tertiary" /> {driver.licenceNumber}
                  </p>
                  <p className="text-[11px] text-text-tertiary flex items-center gap-2">
                    <Mail size={12} /> {driver.email || "N/A"}
                  </p>
                </div>
              </td>

              {/* Colonne 3 : Véhicule */}
              <td className="px-6 py-4">
                {driver.assignedVehicleId ? (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-primary font-bold text-xs uppercase">
                    <Truck size={14} />
                    {driver.vehiclePlate || "Assigné"}
                  </div>
                ) : (
                  <span className="text-text-disabled italic text-xs">Aucun véhicule</span>
                )}
              </td>

              {/* Colonne 4 : Statut */}
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                  driver.status === 'ACTIVE' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {driver.status}
                </span>
              </td>

              {/* Colonne 5 : Actions */}
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  {driver.assignedVehicleId ? (
                    <button 
                      onClick={() => onUnassign(driver)}
                      className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors" 
                      title="Libérer le chauffeur"
                    >
                      <Unlink size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => onAssign(driver)}
                      className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors" 
                      title="Assigner un véhicule"
                    >
                      <Link2 size={18} />
                    </button>
                  )}
                  <button className="p-2 hover:bg-background-secondary text-text-tertiary rounded-lg">
                    <MoreVertical size={18} />
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