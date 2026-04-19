import { UUID } from "./base.types";

export type ZoneType = "CIRCLE" | "POLYGON";

/**
 * Format GeoJSON pour les points (Cercle)
 */
export interface GeoJsonPoint {
  type: "Point";
  coordinates: [number, number]; // [Longitude, Latitude]
}

/**
 * Format GeoJSON pour les polygones
 */
export interface GeoJsonPolygon {
  type: "Polygon";
  coordinates: number[][][]; // [[[lng, lat], [lng, lat], ...]]
}

/**
 * Modèle complet d'une zone (Master Object)
 */
export interface GeofenceZone {
  id: UUID;
  title: string;
  description?: string;
  type: ZoneType;
  isActive: boolean;
  isTemporalEnabled: boolean;
  startTime?: string; // "HH:mm:ss"
  endTime?: string;
  radius?: number; // Pour CIRCLE
  center?: GeoJsonPoint; // Pour CIRCLE
  polygon?: GeoJsonPolygon; // Pour POLYGON
  fleetId?: UUID;
  managerId: UUID;
}

/**
 * DTO pour la création d'une zone
 */
export interface CreateGeofenceDto {
  title: string;
  description: string;
  type: ZoneType;
  isTemporalEnabled: boolean;
  startTime?: string;
  endTime?: string;
  radius?: number;
  center?: { coordinates: [number, number] };
  polygon?: { type: "Polygon"; coordinates: number[][][] };
  targetFleetId?: string; // Pour l'assignation immédiate
}

/**
 * Modèle d'alerte de violation
 */
export interface GeofenceAlert {
  id: string;
  vehicleId: string;
  vehiclePlate?: string;
  zoneId: string;
  zoneTitle?: string;
  type: "ENTRY" | "EXIT";
  timestamp: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
}

export interface GeofenceAlertResponse {
  content: GeofenceAlert[];
  totalElements: number;
}