"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon, Circle, Popup, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { GeofenceZone } from "@/types/geofence.types";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

interface Props {
  zones: GeofenceZone[];
  onZoneCreated: (data: any) => void;
  focusedZoneId?: string;
  onZoneSelect?: (zone: GeofenceZone) => void; // ✅ AJOUT : Callback de sélection
}

function MapViewHandler({ focusedZoneId, zones }: { focusedZoneId?: string; zones: GeofenceZone[] }) {
  const map = useMap();
  useEffect(() => {
    if (!focusedZoneId) return;
    const zone = zones.find((z) => z.id === focusedZoneId);
    if (!zone) return;

    if (zone.type === "CIRCLE" && zone.center) {
      const center: [number, number] = [zone.center.coordinates[1], zone.center.coordinates[0]];
      map.flyTo(center, 15, { duration: 1.5 });
    } else if (zone.type === "POLYGON" && zone.polygon) {
      const positions = zone.polygon.coordinates[0].map((c) => [c[1], c[0]] as [number, number]);
      const bounds = L.latLngBounds(positions);
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    }
  }, [focusedZoneId, zones, map]);
  return null;
}

export default function GeofenceMap({ zones, onZoneCreated, focusedZoneId, onZoneSelect }: Props) {
  
  // ✅ AJOUT : Helper de style dynamique
 const getStyle = (isFocused: boolean, p0: string) => ({
    color: isFocused ? "#136dec" : "#94a3b8",      // Bleu si focus, Gris sinon
    fillColor: isFocused ? "#136dec" : "#94a3b8",
    fillOpacity: isFocused ? 0.5 : 0.2,            // Plus opaque si focus
    weight: isFocused ? 5 : 2,                     // Bordure épaisse si focus
    dashArray: isFocused ? "" : "5, 10",           // Pointillés si pas focus
  });


  const _onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map((ll: any) => [ll.lng, ll.lat]);
      coords.push(coords[0]);
      onZoneCreated({ type: "POLYGON", polygon: { type: "Polygon", coordinates: [coords] } });
    } else if (layerType === "circle") {
      const center = layer.getLatLng();
      onZoneCreated({ type: "CIRCLE", radius: layer.getRadius(), center: { coordinates: [center.lng, center.lat] } });
    }
    layer.remove();
  };

  return (
    <MapContainer center={[4.0511, 9.7679]} zoom={12} className="h-full w-full z-0">
      <TileLayer 
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
      />
      
      <MapViewHandler focusedZoneId={focusedZoneId} zones={zones} />

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

      {zones.map((zone) => {
        const isFocused = zone.id === focusedZoneId;

        if (zone.type === "POLYGON" && zone.polygon) {
          const positions = zone.polygon.coordinates[0].map((c) => [c[1], c[0]] as [number, number]);
          function getStyle(isFocused: boolean, arg1: string): L.PathOptions | undefined {
            throw new Error("Function not implemented.");
          }

          return (
            <Polygon 
              // 🔑 LA CLÉ EST ICI : On change la key si isFocused change
              key={`${zone.id}-${isFocused}`} 
              positions={positions} 
              pathOptions={getStyle(isFocused, "POLYGON")}
              eventHandlers={{ click: () => onZoneSelect?.(zone) }}
            >
              <Popup><span className="font-bold">{zone.title}</span></Popup>
            </Polygon>
          );
        }
        
        if (zone.type === "CIRCLE" && zone.center) {
          const center: [number, number] = [zone.center.coordinates[1], zone.center.coordinates[0]];
          return (
            <Circle 
              // 🔑 LA CLÉ EST ICI AUSSI
              key={`${zone.id}-${isFocused}`} 
              center={center} 
              radius={zone.radius} 
              pathOptions={getStyle(isFocused, "CIRCLE")}
              eventHandlers={{ click: () => onZoneSelect?.(zone) }}
            >
              <Popup><span className="font-bold">{zone.title}</span></Popup>
            </Circle>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}