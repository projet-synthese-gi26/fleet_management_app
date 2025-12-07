import {
    UUID,
    DateString,
    TimeString,
    VehicleType,
    Coordinates,
    DateFilter,
} from './base.types';

/**
 * Interface pour un point de route
 */
export interface RoutePoint extends Coordinates {
    routeId: UUID;
}

/**
 * Interface pour une route
 */
export interface Route {
    routeId: UUID;
    startPoint: Coordinates;
    endPoint: Coordinates;
    distance?: number; // Distance en km
    estimatedDuration?: number; // Durée estimée en minutes
}

/**
 * Énumération pour le statut d'un trajet
 */
export enum TripStatus {
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    PAUSED = 'PAUSED',
}

/**
 * Interface principale pour un trajet
 */
export interface Trip {
    id: UUID;
    vehicleId: UUID;
    driverId: UUID;
    startDate: DateString;
    startTime: TimeString;
    endDate?: DateString;
    endTime?: TimeString;
    type?: VehicleType; // Type de véhicule (historique)
    color?: string; // Couleur du véhicule (historique)
    routes?: Route[];

    // Informations calculées (optionnelles)
    duration?: number; // Durée en minutes
    distance?: number; // Distance parcourue en km
    averageSpeed?: number; // Vitesse moyenne en km/h
    status?: TripStatus;
}

/**
 * Interface pour créer un trajet
 */
export interface CreateTripDto {
    vehicleId: UUID;
    driverId: UUID;
    startDate: DateString;
    startTime: TimeString;
    routes?: {
        startPoint: Coordinates;
        endPoint: Coordinates;
    }[];
}

/**
 * Interface pour terminer un trajet
 */
export interface EndTripDto {
    endDate: DateString;
    endTime: TimeString;
}

/**
 * Interface pour les filtres de recherche de trajets
 */
export interface TripFilters extends DateFilter {
    vehicleId?: UUID;
    driverId?: UUID;
    fleetId?: UUID;
    status?: TripStatus;
    minDistance?: number;
    maxDistance?: number;
}

/**
 * Interface pour les statistiques de trajets
 */
export interface TripStatistics {
    totalTrips: number;
    ongoingTrips: number;
    completedTrips: number;
    totalDistance: number; // en km
    totalDuration: number; // en minutes
    averageDistance: number; // en km
    averageDuration: number; // en minutes
    averageSpeed: number; // en km/h
}

/**
 * Interface pour un trajet détaillé avec informations supplémentaires
 */
export interface DetailedTrip extends Trip {
    vehicleInfo: {
        licensePlate: string;
        brand?: string;
        model?: string;
        imageUrl?: string;
    };
    driverInfo: {
        name: string;
        phone?: string;
        avatar?: string;
    };
    fleetInfo?: {
        id: UUID;
        name: string;
    };
    startLocation?: Coordinates;
    endLocation?: Coordinates;
    geofenceEvents?: {
        zoneName: string;
        eventType: 'ENTRY' | 'EXIT';
        timestamp: string;
    }[];
}

/**
 * Interface pour l'historique des trajets (vue liste)
 */
export interface TripListItem {
    id: UUID;
    vehicleLicensePlate: string;
    driverName: string;
    startDate: DateString;
    startTime: TimeString;
    endDate?: DateString;
    endTime?: TimeString;
    distance?: number;
    duration?: number;
    status: TripStatus;
}
