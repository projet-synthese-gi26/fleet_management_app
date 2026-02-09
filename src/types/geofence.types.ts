// src/types/geofence.types.ts

import { UUID } from "./base.types";

export type ZoneType = "CIRCLE" | "POLYGON";

export interface GeoJsonPoint {
  type: "Point";
  coordinates: [number, number]; // [Longitude, Latitude]
}

export interface GeoJsonPolygon {
  type: "Polygon";
  coordinates: number[][][]; // [[[lng, lat], [lng, lat], ...]]
}

export interface GeofenceZone {
  id: UUID;
  title: string;
  description?: string;
  type: ZoneType;
  isActive: boolean;
  // Temporel
  isTemporalEnabled: boolean;
  startTime?: string; // "HH:mm:ss"
  endTime?: string;
  // Géométrie
  radius?: number; // Pour CIRCLE
  center?: GeoJsonPoint; // Pour CIRCLE
  polygon?: GeoJsonPolygon; // Pour POLYGON
  // Métier
  maxSpeed?: number;
  maxDwellTime?: number;
}

export interface CreateGeofenceDto {
  fleetManagerId: string;
  type: ZoneType;
  title: string;
  description: string;
  isTemporalEnabled: boolean;
  startTime?: string;
  endTime?: string;
  radius?: number;
  center?: { coordinates: [number, number] };
  polygon?: { type: "Polygon"; coordinates: number[][][] };
}

export interface GeofenceAlert {
  id: string;
  vehicleId: string;
  zoneId: string;
  type: "ENTRY" | "EXIT";
  timestamp: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  // Champs optionnels souvent ajoutés par le backend pour l'UI
  vehiclePlate?: string;
  zoneTitle?: string;
}

export interface GeofenceAlertResponse {
  content: GeofenceAlert[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
