"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MOCK_VEHICLES } from "@/data/mockVehicles";
import { VehicleMarker } from "./VehicleMarker";

// Composant utilitaire pour déplacer la carte
function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, {
        duration: 1.5,
      });
    }
  }, [center, map]);
  return null;
}

interface MapClientProps {
  selectedVehicleId: string | null;
}

export default function MapClient({ selectedVehicleId }: MapClientProps) {
  const defaultCenter: [number, number] = [3.848, 11.5021]; // Yaoundé

  // Trouver le véhicule sélectionné pour centrer la carte
  const selectedVehicle = MOCK_VEHICLES.find((v) => v.id === selectedVehicleId);
  const centerPosition: [number, number] | null = selectedVehicle
    ? [selectedVehicle.location.lat, selectedVehicle.location.lng]
    : null;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      zoomControl={false} // On va créer nos propres contrôles ou les déplacer
    >
      {/* TileLayer professionnel et clean (CartoDB Voyager) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <MapController center={centerPosition} />

      {MOCK_VEHICLES.map((vehicle) => (
        <VehicleMarker key={vehicle.id} vehicle={vehicle} />
      ))}
    </MapContainer>
  );
}
