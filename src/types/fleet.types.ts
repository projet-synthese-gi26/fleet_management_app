import { UUID, DateString } from './base.types';

/**
 * Interface pour le gestionnaire de flotte
 */
export interface FleetManager {
    userId: UUID;
    name: string;
    email?: string;
    phone?: string;
}

/**
 * Interface principale pour une flotte
 */
export interface Fleet {
    id: UUID;
    name: string;
    creationDate: DateString;
    manager: FleetManager;
    vehicleCount: number;
}

/**
 * Interface pour créer une nouvelle flotte
 */
export interface CreateFleetDto {
    name: string;
    managerUserId: UUID;
}

/**
 * Interface pour mettre à jour une flotte
 */
export interface UpdateFleetDto {
    name?: string;
    managerUserId?: UUID;
}

/**
 * Interface pour les statistiques d'une flotte
 */
export interface FleetStatistics {
    fleetId: UUID;
    totalVehicles: number;
    activeVehicles: number;
    inactiveVehicles: number;
    totalDrivers: number;
    activeDrivers: number;
    ongoingTrips: number;
    totalTripsToday: number;
    totalMileageToday: number;
    maintenanceAlerts: number;
    geofenceViolations: number;
}

/**
 * Interface pour les filtres de recherche de flottes
 */
export interface FleetFilters {
    search?: string;
    managerId?: UUID;
    fromDate?: DateString;
    toDate?: DateString;
}