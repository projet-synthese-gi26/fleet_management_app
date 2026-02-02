"use client";
import React from "react";
import { MapPin, Clock as ClockIcon, Navigation, ArrowRight, Info } from "lucide-react";
import { Trip } from "@/types/trip.types";
import StatusBadge from "@/components/admin/fleet-managers/StatusBadge";

interface TripsTableProps {
  trips: Trip[];
  onViewDetails: (trip: Trip) => void;
}

export function TripsTable({ trips, onViewDetails }: TripsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-background-secondary border-b border-border-default text-text-secondary font-bold uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-6 py-4">ID / Date</th>
            <th className="px-6 py-4">Véhicule & Chauffeur</th>
            <th className="px-6 py-4">Statut</th>
            <th className="px-6 py-4">Performance</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default">
          {trips.map((trip) => (
            <tr key={trip.id} className="hover:bg-background-secondary/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-text-tertiary">#{trip.id.substring(0, 8)}</span>
                  <span className="font-bold text-text-primary">{new Date(trip.startDate).toLocaleDateString()}</span>
                  <span className="text-[10px] text-text-secondary">{trip.startTime}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary"></div>
                    <span className="font-bold text-text-primary uppercase">{trip.vehiclePlate || "Véhicule"}</span>
                  </div>
                  <span className="text-xs text-text-secondary italic">{trip.driverName || "ID: " + trip.driverId.substring(0, 8)}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge 
                  status={trip.status} 
                  color={trip.status === 'COMPLETED' ? 'green' : trip.status === 'ONGOING' ? 'blue' : 'gray'} 
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-text-tertiary uppercase font-bold">Distance</span>
                      <span className="font-bold text-text-primary">{trip.distanceKm.toFixed(1)} km</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] text-text-tertiary uppercase font-bold">Durée</span>
                      <span className="font-bold text-text-primary">{trip.durationMinutes} min</span>
                   </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onViewDetails(trip)}
                  className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                >
                  <Info size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}