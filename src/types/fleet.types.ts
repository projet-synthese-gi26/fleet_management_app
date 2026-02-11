import { UUID, DateString } from "./base.types";

/**
 * Représente une flotte de véhicules
 */
export interface Fleet {
  id: UUID;
  name: string;
  creationDate: DateString;
  managerUserId: UUID;
  vehicleCount: number; // Calculé par le backend
  phoneNumber?: string; // Contact dispatch
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