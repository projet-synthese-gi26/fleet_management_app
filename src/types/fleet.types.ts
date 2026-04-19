import { UUID, DateString } from "./base.types";

/**
 * Représente une flotte de véhicules
 */
export interface Fleet {
  id: UUID;
  name: string;
  manager?: {
    userId: UUID;
    name: string;
    email: string
  }
  creationDate: DateString;
  managerUserId: UUID;
  vehicleCount: number; // Calculé par le backend
  phoneNumber?: string; // Contact dispatch
  zoneCount?: number;
  managerName?: string;
  managerEmail?: string;
}

/**
 * Payload pour créer ou modifier une flotte
 */
export interface FleetRequest {
  name: string;
  phoneNumber?: string;
}
export interface FleetStats {
  fleetId: UUID;
  totalDrivers: number;
  totalKmTraveled: number;
  vehicleStatusDistribution: {
    AVAILABLE: number;
    ON_TRIP: number;
    MAINTENANCE: number;
  };
}
/**
 * Statistiques détaillées d'une flotte spécifique
 */
export interface FleetStats {
  fleetId: UUID;
  totalDrivers: number;
  totalKmTraveled: number;
  totalVehicles: number;
  activeVehicles: number;
  inactiveVehicles: number;
  activeDrivers: number;
  maintenanceAlerts: number;
  totalMileageToday: number;
  totalTripsToday: number;
  ongoingTrips: number;
  geofenceViolations: number;
  vehicleStatusDistribution: {
    AVAILABLE: number;
    ON_TRIP: number;
    MAINTENANCE: number;
  };
}
export interface CreateFleetDto {
  name: string;
  phoneNumber?: string;
}
/**
 * Indicateurs clés pour le tableau de bord du Manager
 */
export interface ManagerKpis {
  totalFleets: number;
  totalVehicles: number;
  totalDrivers: number;
  activeTrips: number;
}