import { 
  UUID, 
  DateString, 
  TimeString, 
  Coordinates, 
  VehicleType 
} from "./base.types";

/**
 * ========================================================================
 * 1. ÉTATS ET ÉNUMÉRATIONS
 * ========================================================================
 */

export type TripStatus = 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

/**
 * ========================================================================
 * 2. MODÈLES DE GÉOMÉTRIE (POUR LA CARTE)
 * ========================================================================
 */

/**
 * Représente un point précis sur le tracé d'un trajet
 */
export interface RoutePoint extends Coordinates {
  timestamp: string;
  speed?: number;
}

/**
 * Définit une portion de trajet ou un itinéraire théorique
 */
export interface Route {
  id: UUID;
  startPoint: Coordinates;
  endPoint: Coordinates;
  distance?: number;         // Distance estimée en km
  estimatedDuration?: number; // Durée estimée en minutes
}

/**
 * ========================================================================
 * 3. MODÈLE TRAJET PRINCIPAL (TRIP)
 * ========================================================================
 */

/**
 * Modèle de base d'un trajet tel que stocké en base
 */
export interface Trip {
  id: UUID;
  vehicleId: UUID;
  driverId: UUID;
  status: TripStatus;
  
  // Temporel
  startDate: DateString;
  startTime: TimeString;
  endDate: DateString | null;
  endTime: TimeString | null;
  
  // Métriques de fin de course (calculées par le backend)
  distanceKm: number;
  durationMinutes: number;

  // Champs optionnels enrichis pour l'affichage rapide
  vehiclePlate?: string;
  driverName?: string;
}

/**
 * Modèle ultra-complet pour la page "Détails du Trajet"
 * Inclut les infos des jointures (VÃ©hicule, Chauffeur, Alertes)
 */
export interface DetailedTrip extends Trip {
  vehicleInfo: {
    licensePlate: string;
    brand: string;
    model: string;
    photoUrl?: string;
  };
  driverInfo: {
    firstName: string;
    lastName: string;
    phone?: string;
    photoUrl?: string;
  };
  // Tracé GPS réel récupéré depuis Redis/Postgres
  path: RoutePoint[];
  
  // Événements de Geofencing survenus pendant ce trajet
  geofenceEvents: {
    zoneName: string;
    eventType: "ENTRY" | "EXIT";
    timestamp: string;
    speedAtEvent?: number;
  }[];
}

/**
 * ========================================================================
 * 4. TÉLÉMÉTRIE ET REQUÊTES (DTOS)
 * ========================================================================
 */

/**
 * Données envoyées toutes les 10s par le mobile du chauffeur
 */
export interface TelemetryRequest {
  lat: number;
  lng: number;
  speed: number; // Vitesse instantanée
}

/**
 * Payload pour démarrer une course
 */
export interface StartTripRequest {
  vehicleId?: UUID; // Requis si le chauffeur n'a pas de véhicule fixe
}

/**
 * Format pour l'affichage dans les tableaux de l'historique
 */
export interface TripListItem {
  id: UUID;
  vehiclePlate: string;
  driverName: string;
  date: DateString;
  duration: string;
  distance: string;
  status: TripStatus;
}