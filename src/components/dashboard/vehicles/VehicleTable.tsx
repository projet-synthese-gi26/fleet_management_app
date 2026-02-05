// "use client";
// import React from "react";
// import { Truck, MoreVertical, Fuel, Gauge, User, Eye, Edit, Trash2 } from "lucide-react";
// import { Vehicle } from "@/types/vehicle.types";
// import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

// interface VehicleTableProps {
//   vehicles: Vehicle[];
//   isAdminView?: boolean;
//   onView: (v: Vehicle) => void;
//   onEdit?: (v: Vehicle) => void;
//   onDelete?: (v: Vehicle) => void;
// }

// export function VehicleTable({ vehicles, isAdminView, onView, onEdit, onDelete }: VehicleTableProps) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-left text-sm">
//         <thead className="bg-background-secondary border-b border-border-default text-text-secondary font-bold uppercase text-[10px] tracking-widest">
//           <tr>
//             <th className="px-6 py-4">Véhicule</th>
//             <th className="px-6 py-4">Statut</th>
//             <th className="px-6 py-4">Technique</th>
//             {isAdminView && <th className="px-6 py-4">Propriétaire</th>}
//             {!isAdminView && <th className="px-6 py-4 text-right">Actions</th>}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-border-default">
//           {vehicles.map((v) => (
//             <tr key={v.id} className="hover:bg-background-secondary/50 transition-colors">
//               <td className="px-6 py-4">
//                 <div className="flex items-center gap-3">
//                   <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-border-default">
//                     {v.photoUrl ? <img src={v.photoUrl} className="object-cover size-full" /> : <Truck size={20} className="text-text-tertiary" />}
//                   </div>
//                   <div>
//                     <p className="font-bold text-text-primary uppercase">{v.licensePlate}</p>
//                     <p className="text-xs text-text-secondary">{v.brand} {v.model} ({v.manufacturingYear})</p>
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 <StatusBadge 
//                   status={v.status} 
//                   color={v.status === 'AVAILABLE' ? 'green' : v.status === 'ON_TRIP' ? 'blue' : 'orange'} 
//                 />
//               </td>
//               <td className="px-6 py-4">
//                 <div className="flex gap-4 text-text-secondary">
//                   <div className="flex items-center gap-1" title="Capacité Réservoir">
//                     <Fuel size={14} /> <span className="text-xs font-medium">{v.tankCapacity}L</span>
//                   </div>
//                   <div className="flex items-center gap-1" title="Consommation Moyenne">
//                     <Gauge size={14} /> <span className="text-xs font-medium">{v.averageFuelConsumption}L/100</span>
//                   </div>
//                 </div>
//               </td>
//               {isAdminView && (
//                 <td className="px-6 py-4">
//                    <div className="flex items-center gap-2">
//                       <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">M</div>
//                       <span className="text-xs font-medium text-text-secondary">Manager ID: {v.managerId.substring(0,8)}...</span>
//                    </div>
//                 </td>
//               )}
//               <td className="px-6 py-4 text-right">
//                 <div className="flex justify-end gap-2">
//                   <button onClick={() => onView(v)} className="p-2 hover:bg-slate-100 rounded-lg text-text-secondary" title="Détails">
//                     <Eye size={18} />
//                   </button>
//                   {!isAdminView && (
//                     <>
//                       <button onClick={() => onEdit?.(v)} className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg text-text-secondary">
//                         <Edit size={18} />
//                       </button>
//                       <button onClick={() => onDelete?.(v)} className="p-2 hover:bg-error/10 hover:text-error rounded-lg text-text-secondary">
//                         <Trash2 size={18} />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }











"use client";
import React from "react";
import { Truck, Fuel, Gauge, Eye, Edit, Trash2 } from "lucide-react";
import { Vehicle } from "@/types/vehicle.types";
import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

interface VehicleTableProps {
  vehicles: Vehicle[];
  isAdminView?: boolean;
  onView: (v: Vehicle) => void;
  onEdit?: (v: Vehicle) => void;
  onDelete?: (v: Vehicle) => void;
}

export function VehicleTable({ vehicles, isAdminView, onView, onEdit, onDelete }: VehicleTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Véhicule</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Statut</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technique</th>
              {isAdminView && <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Propriétaire</th>}
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, i) => (
              <tr key={v.id} className={`transition-colors duration-150 hover:bg-slate-50 ${i !== 0 ? 'border-t border-slate-100' : ''}`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                      {v.photoUrl ? <img src={v.photoUrl} className="object-cover size-full" alt="" /> : <Truck size={18} className="text-slate-400" />}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800 uppercase tracking-wide">{v.licensePlate}</p>
                      <p className="text-[11px] text-slate-400">{v.brand} {v.model} · {v.manufacturingYear}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={v.status} color={v.status === 'AVAILABLE' ? 'green' : v.status === 'ON_TRIP' ? 'blue' : 'orange'} />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Fuel size={13} /> <span className="text-[12px] font-medium">{v.tankCapacity}L</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge size={13} /> <span className="text-[12px] font-medium">{v.averageFuelConsumption}L/100</span>
                    </div>
                  </div>
                </td>
                {isAdminView && (
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold">M</div>
                      <span className="text-[11px] text-slate-400 font-mono">Manager {v.managerId.substring(0,8)}…</span>
                    </div>
                  </td>
                )}
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onView(v)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="Détails">
                      <Eye size={16} />
                    </button>
                    {!isAdminView && (
                      <>
                        <button onClick={() => onEdit?.(v)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => onDelete?.(v)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
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