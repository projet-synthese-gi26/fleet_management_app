"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MapSidebar } from "@/components/map/MapSidebar";

// Import dynamique pour éviter l'erreur "window is not defined"
const MapClient = dynamic(() => import("@/components/map/MapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-background-secondary">
      <div className="flex flex-col items-center gap-3">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          hub
        </span>
        <p className="text-text-secondary font-medium">Loading Map...</p>
      </div>
    </div>
  ),
});

export default function LiveMapPage() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicleId(vehicle.id);
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden rounded-xl border border-border-default shadow-sm bg-surface">
      {/* La Sidebar est en absolute au-dessus de la carte */}
      <MapSidebar
        onVehicleSelect={handleVehicleSelect}
        selectedVehicleId={selectedVehicleId}
      />

      {/* La Carte prend tout l'espace */}
      <div className="h-full w-full">
        <MapClient selectedVehicleId={selectedVehicleId} />
      </div>
    </div>
  );
}
