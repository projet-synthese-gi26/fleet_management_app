"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css"; // Styles du cluster
import "leaflet.markercluster/dist/MarkerCluster.Default.css"; // Styles par défaut du cluster

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
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      zoomControl={false} // On cache le zoom par défaut pour le mettre ailleurs si on veut
    >
      {/* Fond de carte sombre/clair selon préférence ou thème */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {/* Gestion des mouvements de caméra */}
      <MapController
        selectedLocation={selectedLocation}
        vehicles={MOCK_VEHICLES}
      />

      {/* Regroupement des marqueurs (Clustering) */}
      <MarkerClusterGroup
        chunkedLoading // Performance pour beaucoup de points
        spiderfyOnMaxZoom={true}
        showCoverageOnHover={false}
      >
        {MOCK_VEHICLES.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id}
            vehicle={vehicle}
            // On pourrait ajouter un handler ici si besoin
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
