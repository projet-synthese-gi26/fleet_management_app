"use client";
import React from "react";
import { Truck, Fuel, Gauge, Eye, Trash2, User } from "lucide-react";
import { Vehicle } from "@/types/vehicle.types";
import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

interface Props {
  vehicles: Vehicle[];
  onView: (v: Vehicle) => void;
  onDelete?: (v: Vehicle) => void;
}

export function VehicleTable({ vehicles, onView, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-6 py-4">Véhicule</th>
            <th className="px-6 py-4">Statut</th>
            <th className="px-6 py-4">Technique</th>
            <th className="px-6 py-4">Chauffeur</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {vehicles.map((v) => (
            <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
                    {v.photoUrl ? <img src={v.photoUrl} className="size-full object-cover" /> : <Truck size={20} className="text-slate-400" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 uppercase">{v.licensePlate}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{v.brand} {v.model}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge 
                  status={v.status} 
                  color={v.status === 'AVAILABLE' ? 'green' : v.status === 'ON_TRIP' ? 'blue' : 'orange'} 
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4 text-slate-500">
                  <div className="flex items-center gap-1"><Fuel size={14} /> <span className="text-xs font-bold">{v.tankCapacity}L</span></div>
                  <div className="flex items-center gap-1"><Gauge size={14} /> <span className="text-xs font-bold">{v.averageFuelConsumption}L</span></div>
                </div>
              </td>
              <td className="px-6 py-4">
                {v.currentDriverId ? (
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <User size={14} /> Assigné
                  </div>
                ) : (
                  <span className="text-slate-300 italic text-xs">Non assigné</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onView(v)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-all"><Eye size={18} /></button>
                  <button onClick={() => onDelete?.(v)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-all"><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}