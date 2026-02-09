"use client";

import React from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon, Circle, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { GeofenceZone } from "@/types/geofence.types";
import { mapApiToLeaflet, mapLeafletToApi } from "@/lib/geo-utils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface Props {
  existingZones: GeofenceZone[];
  onZoneCreated: (data: any) => void;
}

export default function GeofenceMap({ existingZones, onZoneCreated }: Props) {
  
  const _onCreated = (e: any) => {
    const type = e.layerType;
    const layer = e.layer;

    if (type === "polygon") {
      const latlngs = layer.getLatLngs()[0];
      // On convertit pour l'API [Lng, Lat]
      const coords = latlngs.map((ll: any) => mapLeafletToApi(ll));
      // On ferme le polygone (le premier point = le dernier)
      coords.push(coords[0]); 

      onZoneCreated({
        type: "POLYGON",
        polygon: { type: "Polygon", coordinates: [coords] }
      });
    } 
    else if (type === "circle") {
      const center = layer.getLatLng();
      onZoneCreated({
        type: "CIRCLE",
        radius: layer.getRadius(),
        center: { coordinates: mapLeafletToApi(center) }
      });
    }
    // On laisse la modale gérer la suite, on nettoie le tracé temporaire
    layer.remove();
  };

  return (
    <MapContainer center={[4.0511, 9.7679]} zoom={12} className="h-full w-full">
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_onCreated}
          draw={{
            rectangle: false, polyline: false, circlemarker: false, marker: false,
            polygon: { shapeOptions: { color: "#136dec" } },
            circle: { shapeOptions: { color: "#10b981" } }
          }}
        />
      </FeatureGroup>

      {/* Rendu des zones existantes (avec inversion Lng,Lat -> Lat,Lng) */}
      {existingZones.map((zone) => {
        if (zone.type === "POLYGON" && zone.polygon) {
          // Inversion des points pour Leaflet
          const positions = zone.polygon.coordinates[0].map(coord => 
            mapApiToLeaflet([coord[0], coord[1]])
          );
          return (
            <Polygon key={zone.id} positions={positions} pathOptions={{ color: "#136dec", fillOpacity: 0.2 }}>
              <Popup><span className="font-bold">{zone.title}</span><br/>Polygone de sécurité</Popup>
            </Polygon>
          );
        }

        if (zone.type === "CIRCLE" && zone.center) {
          const center = mapApiToLeaflet(zone.center.coordinates);
          return (
            <Circle key={zone.id} center={center} radius={zone.radius} pathOptions={{ color: "#10b981", fillOpacity: 0.2 }}>
              <Popup><span className="font-bold">{zone.title}</span><br/>Rayon: {zone.radius}m</Popup>
            </Circle>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}