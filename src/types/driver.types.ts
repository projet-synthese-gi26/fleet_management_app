import { UUID } from './base.types';

/**
 * ========================================================================
 * 1. MODÈLES DE BASE (ALIGNE SUR LE BACKEND)
 * ========================================================================
 */

export type DriverStatus = 'ACTIVE' | 'INACTIVE';

/**
 * Modèle principal d'un Chauffeur (Agrégé par le backend)
 * Ce type est utilisé pour l'affichage dans les tableaux et les profils.
 */
export interface Driver {
  userId: UUID;
  fleetId: UUID | null;      // ID de la flotte (null si indépendant)
  licenceNumber: string;     // Numéro de permis
  status: DriverStatus;      // État du compte
  assignedVehicleId: UUID | null; // ID du véhicule actuellement lié
  photoUrl: string | null;   // URL de la photo de profil (Souveraineté fleet.users)
  
  // Champs enrichis par le backend lors de la récupération du profil
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  vehiclePlate?: string;     // Plaque du véhicule assigné (pour l'UI)
}

/**
 * ========================================================================
 * 2. DTOS POUR LES REQUÊTES (ENVOI AU BACKEND)
 * ========================================================================
 */

/**
 * Payload pour POST /fleets/{id}/drivers/register
 * Création simultanée du compte Auth et du profil Driver
 */
export interface DriverRegistrationRequest {
  username: string;
  password?: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  licenceNumber: string;
}

/**
 * Payload pour POST /fleets/{id}/drivers (Recrutement)
 */
export interface RecruitDriverRequest {
  identifier: string; // Email ou Username du chauffeur déjà existant
}

/**
 * Payload pour l'assignation de véhicule
 */
export interface AssignVehicleDto {
    vehicleId: UUID;
}

/**
 * ========================================================================
 * 3. TYPES POUR L'INTERFACE (UI & ANALYTICS)
 * Ces types servent pour les tableaux de bord et le suivi temps réel
 * ========================================================================
 */

/**
 * Statistiques de performance d'un chauffeur
 */
export interface DriverStatistics {
    driverId: UUID;
    totalTrips: number;
    totalDistance: number;
    totalDrivingTime: number;
    averageSpeed: number;
    geofenceViolations: number; // Nombre de fois où il est sorti des zones
    lastTripDate?: string;
    safetyScore?: number;       // Score de conduite (0-100)
}

/**
 * État d'activité instantané (pour la carte et le monitoring)
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

/**
 * Filtres pour la recherche de chauffeurs dans l'interface
 */
export interface DriverFilters {
    status?: DriverStatus;
    search?: string;
    hasVehicle?: boolean;
    fleetId?: UUID;
}