"use client";
import React from "react";
import { Building2, Edit, Trash2, Truck, Eye, Shield } from "lucide-react";
import { Fleet } from "@/types/fleet.types";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

interface FleetsTableProps {
  fleets: Fleet[];
  isAdminView?: boolean;
  onEdit: (fleet: Fleet) => void;
  onDelete: (fleet: Fleet) => void;
}

export function FleetsTable({ fleets, isAdminView, onEdit, onDelete }: FleetsTableProps) {
  const router = useRouter();
  const { locale } = useI18n();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom de la flotte</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Véhicules</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Zones Geofence</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fleets.map((fleet) => (
              <tr key={fleet.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                      <Building2 size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{fleet.name}</span>
                  </div>
                </td>
                
                <td className="px-5 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
                    <Truck size={14} /> {fleet.vehicleCount}
                  </div>
                </td>

                <td className="px-5 py-4 text-center">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs ${fleet.zoneCount && fleet.zoneCount > 0 ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-400'}`}>
                    <Shield size={14} /> {fleet.zoneCount || 0}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {fleet.phoneNumber || <span className="italic opacity-50">Non renseigné</span>}
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => router.push(`/${locale}/dashboard/fleets/${fleet.id}`)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                      title="Détails"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => onEdit(fleet)} 
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(fleet)} 
                      className="p-2 text-slate-400 hover:text-error hover:bg-error/5 rounded-lg transition-all"
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
    </div>
  );
}

