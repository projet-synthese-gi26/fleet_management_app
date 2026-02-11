"use client";
import React, { useState, useEffect, useCallback } from "react";
import { tripService } from "@/services/trip.service";
import { Trip } from "@/types/trip.types";
import { TripsTable } from "@/components/dashboard/trips/TripsTable";
import { StatCard } from "../../StatCard";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Search, RefreshCw, Calendar, Navigation } from "lucide-react";
import { toast } from "sonner";

export default function ManagerTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    try {
      // Appel au backend réel
      const data = await tripService.getManagerTrips();
      setTrips(data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des trajets");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  // Statistiques calculées sur les données réelles
  const stats = {
    totalKm: trips.reduce((acc, t) => acc + (t.distanceKm || 0), 0).toFixed(1),
    activeTrips: trips.filter((t) => t.status === "ONGOING").length,
    completed: trips.filter((t) => t.status === "COMPLETED").length,
  };

  const filteredTrips = trips.filter(
    (t) =>
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.vehiclePlate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Historique des Trajets</h1>
          <p className="text-sm text-text-secondary">Suivi global de l'activité de vos flottes.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchTrips} className="p-2.5 border border-border-default rounded-xl hover:bg-background-secondary transition-all">
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Distance Totale" value={`${stats.totalKm} km`} icon="alt_route" color="primary" />
        <StatCard title="En cours" value={stats.activeTrips} icon="navigation" color="success" />
        <StatCard title="Terminés" value={stats.completed} icon="check_circle" color="info" />
      </div>

      <div className="bg-surface p-3 rounded-2xl border border-border-default shadow-sm flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border-default bg-background outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Rechercher par ID ou plaque..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          <TableSkeleton rows={6} columns={5} />
        ) : filteredTrips.length > 0 ? (
          <TripsTable trips={filteredTrips} onViewDetails={(t) => window.location.href=`/dashboard/trips/${t.id}`} />
        ) : (
          <div className="p-20 text-center text-text-tertiary">
            <Navigation size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-bold">Aucun trajet enregistré</p>
          </div>
        )}
      </div>
    </div>
  );
}