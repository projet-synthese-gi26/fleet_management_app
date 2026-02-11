"use client";
import React from "react";
import { Info, MapPin, Clock } from "lucide-react";
import { Trip } from "@/types/trip.types";
import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

interface TripsTableProps { 
  trips: Trip[]; 
  onViewDetails: (trip: Trip) => void; 
}

export function TripsTable({ trips, onViewDetails }: TripsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Date</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Véhicule & Chauffeur</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {trips.map((trip) => (
            <tr key={trip.id} className="hover:bg-slate-50/80 transition-colors group">
              <td className="px-6 py-4">
                <p className="font-mono text-[10px] text-slate-400">#{trip.id.substring(0,8)}</p>
                <p className="text-sm font-bold text-slate-700">{new Date(trip.startDate).toLocaleDateString()}</p>
                <p className="text-[10px] text-slate-400">{trip.startTime}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-black text-primary uppercase">{trip.vehiclePlate || "VÉHICULE"}</p>
                <p className="text-xs text-slate-500 italic">ID Chauffeur: {trip.driverId.substring(0,8)}</p>
              </td>
              <td className="px-6 py-4">
                <StatusBadge 
                  status={trip.status} 
                  color={trip.status === 'COMPLETED' ? 'green' : trip.status === 'ONGOING' ? 'blue' : 'gray'} 
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1"><MapPin size={10}/> Distance</p>
                    <p className="text-sm font-bold text-slate-700">{trip.distanceKm?.toFixed(1) || "0.0"} km</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1"><Clock size={10}/> Durée</p>
                    <p className="text-sm font-bold text-slate-700">{trip.durationMinutes || "0"} min</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => onViewDetails(trip)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                  <Info size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}