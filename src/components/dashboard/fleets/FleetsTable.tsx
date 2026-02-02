"use client";
import React from "react";
import { Building2, Edit, Trash2, Truck, Phone, User } from "lucide-react";
import { Fleet } from "@/types/fleet.types";

interface FleetsTableProps {
  fleets: Fleet[];
  isAdminView?: boolean;
  onEdit: (fleet: Fleet) => void;
  onDelete: (fleet: Fleet) => void;
}

export function FleetsTable({ fleets, isAdminView, onEdit, onDelete }: FleetsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-background-secondary border-b border-border-default text-text-secondary font-bold uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-6 py-4">Nom de la flotte</th>
            {isAdminView && <th className="px-6 py-4">Manager / Propriétaire</th>}
            <th className="px-6 py-4">Véhicules</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4">Création</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default bg-surface">
          {fleets.map((fleet) => (
            <tr key={fleet.id} className="hover:bg-background-secondary/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Building2 size={18} />
                  </div>
                  <span className="font-bold text-text-primary">{fleet.name}</span>
                </div>
              </td>
              
              {isAdminView && (
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-text-primary font-medium flex items-center gap-1">
                      <User size={12} className="text-text-tertiary" /> {fleet.managerName || 'Manager Inconnu'}
                    </span>
                    <span className="text-[10px] text-text-tertiary">{fleet.managerEmail}</span>
                  </div>
                </td>
              )}

              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Truck size={16} />
                  <span className="font-medium">{fleet.vehicleCount}</span>
                </div>
              </td>
              
              <td className="px-6 py-4 text-text-secondary">
                {fleet.phoneNumber || <span className="text-text-disabled italic">N/A</span>}
              </td>
              
              <td className="px-6 py-4 text-text-tertiary">
                {new Date(fleet.creationDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(fleet)} className="p-2 hover:text-primary transition-colors"><Edit size={16} /></button>
                  <button onClick={() => onDelete(fleet)} className="p-2 hover:text-error transition-colors"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}