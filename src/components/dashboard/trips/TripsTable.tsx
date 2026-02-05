// "use client";
// import React from "react";
// import { MapPin, Clock as ClockIcon, Navigation, ArrowRight, Info } from "lucide-react";
// import { Trip } from "@/types/trip.types";
// import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

// interface TripsTableProps {
//   trips: Trip[];
//   onViewDetails: (trip: Trip) => void;
// }

// export function TripsTable({ trips, onViewDetails }: TripsTableProps) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-left text-sm">
//         <thead className="bg-background-secondary border-b border-border-default text-text-secondary font-bold uppercase text-[10px] tracking-widest">
//           <tr>
//             <th className="px-6 py-4">ID / Date</th>
//             <th className="px-6 py-4">Véhicule & Chauffeur</th>
//             <th className="px-6 py-4">Statut</th>
//             <th className="px-6 py-4">Performance</th>
//             <th className="px-6 py-4 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-border-default">
//           {trips.map((trip) => (
//             <tr key={trip.id} className="hover:bg-background-secondary/50 transition-colors group">
//               <td className="px-6 py-4">
//                 <div className="flex flex-col">
//                   <span className="font-mono text-[10px] text-text-tertiary">#{trip.id.substring(0, 8)}</span>
//                   <span className="font-bold text-text-primary">{new Date(trip.startDate).toLocaleDateString()}</span>
//                   <span className="text-[10px] text-text-secondary">{trip.startTime}</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 <div className="flex flex-col gap-1">
//                   <div className="flex items-center gap-2">
//                     <div className="size-2 rounded-full bg-primary"></div>
//                     <span className="font-bold text-text-primary uppercase">{trip.vehiclePlate || "Véhicule"}</span>
//                   </div>
//                   <span className="text-xs text-text-secondary italic">{trip.driverName || "ID: " + trip.driverId.substring(0, 8)}</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 <StatusBadge 
//                   status={trip.status} 
//                   color={trip.status === 'COMPLETED' ? 'green' : trip.status === 'ONGOING' ? 'blue' : 'gray'} 
//                 />
//               </td>
//               <td className="px-6 py-4">
//                 <div className="flex gap-4">
//                    <div className="flex flex-col">
//                       <span className="text-[10px] text-text-tertiary uppercase font-bold">Distance</span>
//                       <span className="font-bold text-text-primary">{trip.distanceKm.toFixed(1)} km</span>
//                    </div>
//                    <div className="flex flex-col">
//                       <span className="text-[10px] text-text-tertiary uppercase font-bold">Durée</span>
//                       <span className="font-bold text-text-primary">{trip.durationMinutes} min</span>
//                    </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 text-right">
//                 <button 
//                   onClick={() => onViewDetails(trip)}
//                   className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
//                 >
//                   <Info size={18} />
//                 </button>
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
import { Info } from "lucide-react";
import { Trip } from "@/types/trip.types";
import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

interface TripsTableProps { trips: Trip[]; onViewDetails: (trip: Trip) => void; }

export function TripsTable({ trips, onViewDetails }: TripsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID / Date</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Véhicule & Chauffeur</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Statut</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance</th>
              <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Détails</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, i) => (
              <tr key={trip.id} className={`transition-colors duration-150 hover:bg-slate-50 ${i !== 0 ? 'border-t border-slate-100' : ''}`}>
                <td className="px-5 py-3.5">
                  <p className="font-mono text-[10px] text-slate-400">#{trip.id.substring(0,8)}</p>
                  <p className="text-[13px] font-bold text-slate-700">{new Date(trip.startDate).toLocaleDateString()}</p>
                  <p className="text-[11px] text-slate-400">{trip.startTime}</p>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                    <span className="text-[13px] font-bold text-slate-700 uppercase">{trip.vehiclePlate || "Véhicule"}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 italic">{trip.driverName || `ID: ${trip.driverId.substring(0,8)}`}</p>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={trip.status} color={trip.status === 'COMPLETED' ? 'green' : trip.status === 'ONGOING' ? 'blue' : 'gray'} />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-5">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Distance</p>
                      <p className="text-[13px] font-bold text-slate-700">{trip.distanceKm.toFixed(1)} km</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Durée</p>
                      <p className="text-[13px] font-bold text-slate-700">{trip.durationMinutes} min</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => onViewDetails(trip)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                    <Info size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}