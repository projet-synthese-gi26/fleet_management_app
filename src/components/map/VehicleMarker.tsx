"use client";

import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { VehicleType } from "@/types/base.types";

// Nécessaire pour corriger les chemins d'icônes par défaut de Leaflet dans Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface VehicleMarkerProps {
  vehicle: any; // Utiliser le type Vehicle importé plus tard
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "moving":
      return "#10b981"; // Success/Green
    case "stopped":
      return "#ef4444"; // Error/Red
    case "idle":
      return "#f59e0b"; // Warning/Orange
    default:
      return "#64748b"; // Grey
  }
};

const getVehicleIcon = (type: VehicleType) => {
  switch (type) {
    case VehicleType.TRUCK:
      return "local_shipping";
    case VehicleType.BIKE:
      return "two_wheeler";
    case VehicleType.VAN:
      return "airport_shuttle";
    default:
      return "directions_car";
  }
};

export function VehicleMarker({ vehicle }: VehicleMarkerProps) {
  const color = getStatusColor(vehicle.status);
  const iconName = getVehicleIcon(vehicle.type);

  // Création d'une icône HTML personnalisée (DivIcon)
  // Cela nous permet d'utiliser Tailwind et les Material Symbols directement sur la carte
  const customIcon = L.divIcon({
    className: "custom-vehicle-marker",
    html: `
            <div style="
                background-color: white;
                border: 2px solid ${color};
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                position: relative;
            ">
                <span class="material-symbols-outlined" style="color: ${color}; font-size: 20px;">
                    ${iconName}
                </span>
                <div style="
                    position: absolute;
                    bottom: -4px;
                    background-color: ${color};
                    color: white;
                    font-size: 9px;
                    padding: 1px 4px;
                    border-radius: 4px;
                    font-weight: bold;
                    white-space: nowrap;
                ">
                    ${vehicle.licensePlate}
                </div>
            </div>
        `,
    iconSize: [36, 36],
    iconAnchor: [18, 18], // Centre l'icône
    popupAnchor: [0, -20], // Popup au-dessus
  });

  return (
    <Marker
      position={[vehicle.location.lat, vehicle.location.lng]}
      icon={customIcon}
    >
      <Popup className="custom-popup">
        <div className="p-1 min-w-[200px]">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">
              {vehicle.licensePlate}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full uppercase font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {vehicle.status}
            </span>
          </div>

          <div className="flex gap-3 mb-3">
            <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Driver</p>
              <p className="text-sm font-medium text-gray-800">
                {vehicle.driverName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-500">Speed</p>
              <p className="font-semibold">{vehicle.speed} km/h</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-500">Fuel</p>
              <p className="font-semibold">{vehicle.fuelLevel}%</p>
            </div>
          </div>

          <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded transition-colors">
            View History
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
