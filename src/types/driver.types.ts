import { UUID } from './base.types';

/**
 * Interface pour le profil utilisateur du conducteur
 */
export interface DriverUserProfile {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

/**
 * Interface pour le véhicule assigné (vue simplifiée)
 */
export interface AssignedVehicle {
    vehicleId: UUID;
    licensePlate: string;
    brand?: string;
    model?: string;
    type?: string;
    imageUrl?: string;
}

/**
 * Interface principale pour un conducteur
 */
export interface Driver {
    userId: UUID;
    licenceNumber: string;
    status: boolean; // true = actif, false = inactif
    assignedVehicle?: AssignedVehicle;
    userProfile: DriverUserProfile;
}

/**
 * Interface pour créer un conducteur
 */
export interface CreateDriverDto {
    userId: UUID;
    licenceNumber: string;
    status?: boolean;
}

/**
 * Interface pour mettre à jour un conducteur
 */
export interface UpdateDriverDto {
    licenceNumber?: string;
    status?: boolean;
}

/**
 * Interface pour assigner un véhicule à un conducteur
 */
export interface AssignVehicleDto {
    vehicleId: UUID;
}

/**
 * Interface pour les filtres de recherche de conducteurs
 */
export interface DriverFilters {
    status?: boolean;
    search?: string; // Recherche par nom, licence
    hasVehicle?: boolean; // Filtrer ceux qui ont/n'ont pas de véhicule
    fleetId?: UUID;
}

/**
 * Interface pour les statistiques d'un conducteur
 */
export interface DriverStatistics {
    driverId: UUID;
    totalTrips: number;
    totalDistance: number; // en km
    totalDrivingTime: number; // en minutes
    averageSpeed: number; // km/h
    geofenceViolations: number;
    lastTripDate?: string;
    safetyScore?: number; // Score de sécurité (0-100)
}

/**
 * Interface pour l'activité récente d'un conducteur
 */
export interface DriverActivity {
    driverId: UUID;
    currentStatus: 'idle' | 'driving' | 'on-break' | 'offline';
    currentTripId?: UUID;
    lastLocation?: {
        latitude: number;
        longitude: number;
        timestamp: string;
    };
    todayTrips: number;
    todayDistance: number;
    todayDrivingTime: number;
}
