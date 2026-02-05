// "use client";
// import React from "react";
// import { Building2, Edit, Trash2, Truck, Phone, User } from "lucide-react";
// import { Fleet } from "@/types/fleet.types";

// interface FleetsTableProps {
//   fleets: Fleet[];
//   isAdminView?: boolean;
//   onEdit: (fleet: Fleet) => void;
//   onDelete: (fleet: Fleet) => void;
// }

// export function FleetsTable({ fleets, isAdminView, onEdit, onDelete }: FleetsTableProps) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-left text-sm">
//         <thead className="bg-background-secondary border-b border-border-default text-text-secondary font-bold uppercase text-[10px] tracking-widest">
//           <tr>
//             <th className="px-6 py-4">Nom de la flotte</th>
//             {isAdminView && <th className="px-6 py-4">Manager / Propriétaire</th>}
//             <th className="px-6 py-4">Véhicules</th>
//             <th className="px-6 py-4">Contact</th>
//             <th className="px-6 py-4">Création</th>
//             <th className="px-6 py-4 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-border-default bg-surface">
//           {fleets.map((fleet) => (
//             <tr key={fleet.id} className="hover:bg-background-secondary/50 transition-colors group">
//               <td className="px-6 py-4">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-primary/10 text-primary">
//                     <Building2 size={18} />
//                   </div>
//                   <span className="font-bold text-text-primary">{fleet.name}</span>
//                 </div>
//               </td>
              
//               {isAdminView && (
//                 <td className="px-6 py-4">
//                   <div className="flex flex-col">
//                     <span className="text-text-primary font-medium flex items-center gap-1">
//                       <User size={12} className="text-text-tertiary" /> {fleet.managerName || 'Manager Inconnu'}
//                     </span>
//                     <span className="text-[10px] text-text-tertiary">{fleet.managerEmail}</span>
//                   </div>
//                 </td>
//               )}

//               <td className="px-6 py-4">
//                 <div className="flex items-center gap-2 text-text-secondary">
//                   <Truck size={16} />
//                   <span className="font-medium">{fleet.vehicleCount}</span>
//                 </div>
//               </td>
              
//               <td className="px-6 py-4 text-text-secondary">
//                 {fleet.phoneNumber || <span className="text-text-disabled italic">N/A</span>}
//               </td>
              
//               <td className="px-6 py-4 text-text-tertiary">
//                 {new Date(fleet.creationDate).toLocaleDateString()}
//               </td>

//               <td className="px-6 py-4 text-right">
//                 <div className="flex justify-end gap-2">
//                   <button onClick={() => onEdit(fleet)} className="p-2 hover:text-primary transition-colors"><Edit size={16} /></button>
//                   <button onClick={() => onDelete(fleet)} className="p-2 hover:text-error transition-colors"><Trash2 size={16} /></button>
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
import { Building2, Edit, Trash2, Truck, User } from "lucide-react";
import { Fleet } from "@/types/fleet.types";

interface FleetsTableProps {
  fleets: Fleet[];
  isAdminView?: boolean;
  onEdit: (fleet: Fleet) => void;
  onDelete: (fleet: Fleet) => void;
}

export function FleetsTable({ fleets, isAdminView, onEdit, onDelete }: FleetsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nom</th>
              {isAdminView && <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manager</th>}
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Véhicules</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Créé le</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleets.map((fleet, i) => (
              <tr key={fleet.id} className={`transition-colors duration-150 hover:bg-slate-50 ${i !== 0 ? 'border-t border-slate-100' : ''}`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Building2 size={16} className="text-slate-600" />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">{fleet.name}</span>
                  </div>
                </td>
                {isAdminView && (
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <User size={13} className="text-slate-400" />
                      <span className="text-[13px] font-medium text-slate-600">{fleet.managerName || '—'}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{fleet.managerEmail}</p>
                  </td>
                )}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Truck size={14} />
                    <span className="text-[13px] font-semibold">{fleet.vehicleCount}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500">
                  {fleet.phoneNumber || <span className="italic text-slate-400">—</span>}
                </td>
                <td className="px-5 py-3.5 text-[12px] text-slate-400">
                  {new Date(fleet.creationDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onEdit(fleet)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => onDelete(fleet)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 size={16} />
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