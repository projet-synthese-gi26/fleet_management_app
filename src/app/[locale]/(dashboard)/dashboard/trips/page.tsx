"use client";
import React, { useState, useEffect, useCallback } from "react";
import { tripService } from "@/services/trip.service";
import { Trip } from "@/types/trip.types";
import { TripsTable } from "@/components/dashboard/trips/TripsTable";
import { StatCard } from "../../StatCard";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { Search, RefreshCw, Filter, Calendar, Navigation } from "lucide-react";
import { toast } from "sonner";

export default function ManagerTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    try {
      // Pour le manager, le backend renvoie ses flottes
      // const data = await tripService.getTrips();
      setTrips([]);
    } catch (error) {
      toast.error("Erreur lors de la récupération des trajets");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  // Statistiques rapides
  const stats = {
    totalKm: trips.reduce((acc, t) => acc + t.distanceKm, 0).toFixed(1),
    activeTrips: trips.filter((t) => t.status === "ONGOING").length,
    completedToday: trips.filter((t) => t.status === "COMPLETED").length, // Idéalement filtrer par date
  };

  const filteredTrips = trips.filter(
    (t) =>
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.vehiclePlate?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Historique des Trajets
          </h1>
          <p className="text-sm text-text-secondary">
            Suivez l'activité et les distances parcourues
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface border border-border-default px-4 py-2 rounded-lg text-sm font-medium">
            <Calendar size={16} /> Ce mois
          </button>
          <button
            onClick={fetchTrips}
            className="p-2 border border-border-default rounded-lg hover:bg-background-secondary"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Cartes de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Distance Totale"
          value={`${stats.totalKm} km`}
          icon="route"
          color="primary"
        />
        <StatCard
          title="Courses en cours"
          value={stats.activeTrips}
          icon="navigation"
          color="success"
        />
        <StatCard
          title="Trajets Terminés"
          value={stats.completedToday}
          icon="check_circle"
          color="info"
        />
      </div>

      {/* Barre de Recherche */}
      <div className="bg-surface p-3 rounded-xl border border-border-default shadow-sm flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
            size={16}
          />
          <input
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border-default bg-background outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Rechercher par ID ou plaque..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-border-default rounded-lg text-xs font-bold text-text-secondary hover:bg-background-secondary">
          <Filter size={14} /> FILTRER
        </button>
      </div>

      {/* Liste */}
      <div className="bg-surface rounded-xl border border-border-default shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          <TableSkeleton rows={6} columns={5} />
        ) : filteredTrips.length > 0 ? (
          <TripsTable
            trips={filteredTrips}
            onViewDetails={(t) => console.log(t)}
          />
        ) : (
          <div className="p-20 text-center text-text-tertiary">
            <Navigation size={48} className="mx-auto mb-4 opacity-20" />
            <p>Aucun trajet enregistré pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
