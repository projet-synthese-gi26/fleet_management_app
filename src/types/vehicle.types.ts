import { UUID, DateString } from "./base.types";

/**
 * ========================================================================
 * 1. RÉFÉRENTIELS SOUVERAINS (LOOKUPS)
 * Ces types correspondent aux tables gérées par l'Admin (Marques, Couleurs...)
 * ========================================================================
 */

export interface ResourceItem {
  id: UUID;
  code: string;   // Identifiant technique (ex: "TOYOTA")
  label: string;  // Libellé affiché (ex: "Toyota Motors")
  description?: string;
}

/**
 * Catalogue complet renvoyé par /api/v1/vehicles/resources/all
 */
export interface ResourceCatalog {
  vehicleTypes: ResourceItem[];
  manufacturers: ResourceItem[];
  brands: ResourceItem[];
  models: ResourceItem[];
  sizes: ResourceItem[];
  usages: ResourceItem[];
  fuelTypes: ResourceItem[];
  transmissionTypes: ResourceItem[];
  colors: ResourceItem[];
}

/**
 * ========================================================================
 * 2. PARAMÈTRES DÉTAILLÉS (RELATIONS 1-1)
 * ========================================================================
 */

export interface FinancialParameters {
  insuranceNumber?: string;
  insuranceExpiryDate?: DateString;
  registrationDate?: DateString;
  purchaseDate?: DateString;
  depreciationRate?: number; // Taux d'amortissement en %
  costPerKm?: number;        // Coût estimé au kilomètre
}

export type EngineStatus = "OK" | "NEEDS_SERVICE" | "OUT_OF_SERVICE";
export type MaintenanceStatus = "UP_TO_DATE" | "PENDING" | "OVERDUE";

export interface MaintenanceParameters {
  lastMaintenanceDate?: DateString;
  nextMaintenanceDue?: DateString;
  engineStatus: EngineStatus;
  batteryHealth: number; // Pourcentage 0-100
  maintenanceStatus: MaintenanceStatus;
}

export interface OperationalParameters {
  status: boolean;           // true = en service, false = hors service
  currentSpeed: number;      // km/h
  fuelLevel: string;         // ex: "75%"
  mileage: number;           // Kilométrage total
  odometerReading: number;   // Lecture odomètre
  bearing: number;           // Direction (0-360°)
  timestamp: string;         // Dernière mise à jour télémétrie
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * ========================================================================
 * 3. MODÈLE VÉHICULE PRINCIPAL (MASTER OBJECT)
 * ========================================================================
 */

export type VehicleStatus = "AVAILABLE" | "ON_TRIP" | "MAINTENANCE";

export interface Vehicle {
  id: UUID;
  fleetId: UUID | null;      // Null si le véhicule est indépendant
  managerId: UUID;           // Propriétaire (Fleet Manager)
  currentDriverId: UUID | null;
  vehicleTypeId: UUID;       // Lien vers le référentiel type

  // Identification
  licensePlate: string;      // Plaque d'immatriculation unique
  vehicleSerialNumber: string; // VIN / Numéro de châssis

  // Caractéristiques issues des référentiels
  brand: string;
  model: string;
  manufacturingYear: number;
  transmissionType: string;
  fuelType: string;
  color: string;
  
  // Capacités techniques
  tankCapacity: number;
  totalSeatNumber: number;
  averageFuelConsumption: number;

  // Statut opérationnel global
  status: VehicleStatus;

  // Médias et Documents (URLs)
  photoUrl?: string;
  serialNumberPhotoUrl?: string;
  registrationPhotoUrl?: string;
  illustrationImages: string[]; // Galerie photo (Relation 1-N)

  // Sous-objets agrégés par le backend
  financialParameters?: FinancialParameters;
  maintenanceParameters?: MaintenanceParameters;
  operationalParameters?: OperationalParameters;

  // Identifiant technique pour le moteur de Geofencing
  geofenceRemoteId?: string;
}

/**
 * ========================================================================
 * 4. DTOS (DATA TRANSFER OBJECTS) POUR LES REQUÊTES
 * ========================================================================
 */

/**
 * Payload pour la création (POST /api/v1/vehicles)
 * Utilise exclusivement des UUIDs pour les ressources
 */
export interface CreateVehicleDto {
  vehicleTypeId: UUID;
  manufacturerId: UUID;
  brandId: UUID;
  modelId: UUID;
  sizeId: UUID;
  usageTypeId: UUID;
  fuelTypeId: UUID;
  transmissionTypeId: UUID;
  colorId: UUID;
  licensePlate: string;
  vehicleSerialNumber: string;
  manufacturingYear: number;
  tankCapacity: number;
  totalSeatNumber: number;
  averageFuelConsumption: number;
}

/**
 * Payload pour la mise à jour partielle (PATCH /api/v1/vehicles/{id})
 */
export interface VehiclePatchRequest {
  brand?: string;
  model?: string;
  licensePlate?: string;
  vehicleSerialNumber?: string;
  color?: string;
  status?: VehicleStatus;
}