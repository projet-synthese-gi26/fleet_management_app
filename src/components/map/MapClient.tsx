"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { MOCK_VEHICLES } from "@/data/mockVehicles";
import { VehicleMarker } from "./VehicleMarker";
import MapController from "./MapController";

interface MapClientProps {
  selectedVehicleId: string | null;
}

export default function MapClient({ selectedVehicleId }: MapClientProps) {
  // Coordonnées par défaut (Cameroun)
  const defaultCenter: [number, number] = [4.0511, 9.7679];

  // Trouver le véhicule sélectionné
  const selectedVehicle = MOCK_VEHICLES.find((v) => v.id === selectedVehicleId);
  const selectedLocation = selectedVehicle ? selectedVehicle.location : null;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      zoomControl={false}
      style={{
        height: "100%",
        width: "100%",
        zIndex: 0,
      }}
    >
      {/* Fond de carte */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {/* Gestion des mouvements de caméra */}
      <MapController
        selectedLocation={selectedLocation}
        vehicles={MOCK_VEHICLES}
      />

      {/* Regroupement des marqueurs (clustering) */}
      <MarkerClusterGroup
        chunkedLoading
        spiderfyOnMaxZoom
        showCoverageOnHover={false}
      >
        {MOCK_VEHICLES.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id}
            vehicle={vehicle}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>

  );
}
