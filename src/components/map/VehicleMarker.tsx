"use client";

import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { VehicleType } from "@/types/base.types";

// Nettoyage des icônes par défaut (fix Next.js/Leaflet)
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
  vehicle: any; // Idéalement, utilisez votre interface Vehicle
  onClick?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "moving":
      return "#10b981"; // Emerald-500
    case "stopped":
      return "#ef4444"; // Red-500
    case "idle":
      return "#f59e0b"; // Amber-500
    default:
      return "#64748b"; // Slate-500
  }
};

const getVehicleIconPath = (type: VehicleType) => {
  // SVG Paths simples pour les types de véhicules
  switch (type) {
    case VehicleType.TRUCK:
      return "M1 3h14v10h-14v-10zm16 2h4v6h-4v-6z"; // Simplifié, idéalement utiliser une icône SVG complète
    default:
      // Flèche de direction (Navigation arrow)
      return "M12 2L4.5 20.29C4.24 20.91 4.86 21.5 5.5 21.2L12 18.5L18.5 21.2C19.14 21.5 19.76 20.91 19.5 20.29L12 2Z";
  }
};

export function VehicleMarker({ vehicle, onClick }: VehicleMarkerProps) {
  const color = getStatusColor(vehicle.status);

  // Création de l'icône personnalisée avec Tailwind et rotation CSS
  const customIcon = L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div class="relative flex items-center justify-center w-12 h-12 transition-transform duration-500 ease-linear">
        <!-- Cercle de fond avec ombre -->
        <div style="background-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);" class="w-8 h-8 rounded-full flex items-center justify-center">
           <!-- Icône qui tourne selon le bearing -->
           <div style="transform: rotate(${vehicle.bearing || 0}deg); color: ${color};">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="${getVehicleIconPath(vehicle.type)}" />
              </svg>
           </div>
        </div>
        <!-- Badge de statut (point coloré) -->
        <span style="background-color: ${color};" class="absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white"></span>
        
        <!-- Label Plaque (visible seulement si zoom élevé, géré via CSS si besoin) -->
        <div class="absolute -bottom-4 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm whitespace-nowrap border border-gray-200">
            ${vehicle.licensePlate}
        </div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
  });

  return (
    <Marker
      position={[vehicle.location.lat, vehicle.location.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => onClick && onClick(),
      }}
    >
      <Popup className="custom-popup rounded-xl overflow-hidden p-0 border-none">
        <div className="min-w-[220px]">
          {/* Header Popup */}
          <div className="bg-slate-900 text-white p-3 flex justify-between items-center">
            <span className="font-bold">{vehicle.licensePlate}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full bg-white/20 uppercase`}
            >
              {vehicle.status}
            </span>
          </div>

          {/* Body Popup */}
          <div className="p-3 bg-white text-sm space-y-2">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="material-symbols-outlined text-base">
                person
              </span>
              <span className="font-medium text-slate-900">
                {vehicle.driverName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <p className="text-xs text-slate-500">Vitesse</p>
                <p className="font-bold text-slate-800">{vehicle.speed} km/h</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <p className="text-xs text-slate-500">Carburant</p>
                <p className="font-bold text-slate-800">{vehicle.fuelLevel}%</p>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              Mis à jour il y a 2 min
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
