"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Circle,
  Polygon,
  useMap,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Zone, CreateZoneDto, Vertex } from "@/types/geofence.types";

// Configuration des icônes Leaflet (fix Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface GeofenceMapProps {
  existingZones: Zone[];
  onZoneCreated: (
    zoneData: Omit<CreateZoneDto, "fleetId" | "name" | "description">,
  ) => void;
  onZoneDeleted: (zoneId: string) => void;
}

const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13);
  }, [center, map]);
  return null;
};

export default function GeofenceMap({
  existingZones,
  onZoneCreated,
  onZoneDeleted,
}: GeofenceMapProps) {
  const featureGroupRef = useRef<L.FeatureGroup>(null);
  const defaultCenter: [number, number] = [4.0511, 9.7679]; // Douala par défaut

  useEffect(() => {
    return () => {
      // Nettoyage Leaflet au démontage (fix Next.js)
      const container = L.DomUtil.get("geofence-map-container");
      if (container !== null) {
        (container as any)._leaflet_id = null;
      }
    };
  }, []);

  const _onCreated = (e: any) => {
    const type = e.layerType;
    const layer = e.layer;

    let zoneData: any = {};

    if (type === "polygon") {
      const latlngs = layer.getLatLngs()[0];
      const vertices: Vertex[] = latlngs.map((ll: any, index: number) => ({
        latitude: ll.lat,
        longitude: ll.lng,
        order: index + 1,
      }));
      zoneData = { type: "POLYGON", vertices };
    } else if (type === "circle") {
      const center = layer.getLatLng();
      const radius = layer.getRadius();
      const vertices: Vertex[] = [
        {
          latitude: center.lat,
          longitude: center.lng,
          order: 1,
        },
      ];
      zoneData = { type: "CIRCLE", vertices, radius };
    }

    onZoneCreated(zoneData);

    // On retire le layer dessiné temporairement car il sera rechargé via existingZones après sauvegarde API
    if (featureGroupRef.current) {
      featureGroupRef.current.removeLayer(layer);
    }
  };

  const _onDeleted = (e: any) => {
    // Logique de suppression si on utilisait les outils de suppression natifs de Leaflet Draw
    // Ici nous allons gérer la suppression via l'interface UI (liste à côté) pour simplifier lier l'ID
  };

  return (
    <MapContainer
      id="geofence-map-container"
      center={defaultCenter}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapController center={defaultCenter} />

      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={_onCreated}
          onDeleted={_onDeleted}
          draw={{
            rectangle: false,
            polyline: false,
            circlemarker: false,
            marker: false,
            polygon: {
              allowIntersection: false,
              drawError: {
                color: "#e1e100",
                message: "Intersection non autorisée",
              },
              shapeOptions: { color: "#136dec" },
            },
            circle: {
              shapeOptions: { color: "#10b981" },
            },
          }}
          edit={{ edit: false, remove: false }} // On gère l'édition/suppression via l'UI externe pour lier aux IDs API
        />
      </FeatureGroup>

      {/* Affichage des zones existantes */}
      {existingZones.map((zone) => {
        if (zone.type === "POLYGON") {
          const positions = zone.vertices
            .sort((a, b) => a.order - b.order)
            .map((v) => [v.latitude, v.longitude] as [number, number]);
          return (
            <Polygon
              key={zone.id}
              positions={positions}
              pathOptions={{ color: "#136dec", fillOpacity: 0.2 }}
            ></Polygon>
          );
        } else if (
          zone.type === "CIRCLE" &&
          zone.vertices.length > 0 &&
          zone.radius
        ) {
          const center = zone.vertices[0];
          return (
            <Circle
              key={zone.id}
              center={[center.latitude, center.longitude]}
              radius={zone.radius}
              pathOptions={{ color: "#10b981", fillOpacity: 0.2 }}
            />
          );
        }
        return null;
      })}
    </MapContainer>
  );
}
