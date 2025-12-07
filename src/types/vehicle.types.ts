import {
    UUID,
    DateString,
    DateTimeString,
    VehicleType,
    EngineStatus,
    MaintenanceStatus,
    Coordinates,
} from './base.types';

/**
 * Interface pour le conducteur assigné (vue simplifiée)
 */
export interface AssignedDriver {
    userId: UUID;
    name: string;
    phone?: string;
}

/**
 * Interface pour les paramètres financiers d'un véhicule
 */
export interface FinancialParameters {
    insuranceNumber?: string;
    insuranceExpiryDate?: DateString;
    registrationDate?: DateString;
    purchaseDate?: DateString;
    depreciationRate?: number; // Pourcentage
    costPerKm?: number; // Coût par kilomètre
}

/**
 * Interface pour les paramètres de maintenance
 */
export interface MaintenanceParameters {
    lastMaintenanceDate?: DateString;
    nextMaintenanceDue?: DateString;
    engineStatus?: EngineStatus;
    batteryHealth?: number; // Pourcentage (0-100)
    maintenanceStatus?: MaintenanceStatus;
}

/**
 * Interface pour les paramètres opérationnels
 */
export interface OperationalParameters {
    status: boolean; // true = en service, false = hors service
    currentSpeed?: number; // km/h
    fuelLevel?: string; // ex: "65%" ou "12/16"
    mileage?: number; // Kilométrage total
    odometerReading?: number; // Lecture de l'odomètre
    bearing?: number; // Direction en degrés (0-360)
    timestamp?: DateTimeString; // Dernière mise à jour
    currentLocation?: Coordinates;
    currentTripId?: UUID;
}

/**
 * Interface complète pour un véhicule
 */
export interface Vehicle {
    id: UUID;
    fleetId: UUID;
    licensePlate: string;
    brand?: string;
    model?: string;
    manufacturingYear?: number;
    type?: VehicleType;
    color?: string;
    imageUrl?: string;
    assignedDriver?: AssignedDriver;
    financialParameters?: FinancialParameters;
    maintenanceParameters?: MaintenanceParameters;
    operationalParameters?: OperationalParameters;
}

/**
 * Interface pour créer un véhicule
 */
export interface CreateVehicleDto {
    fleetId: UUID;
    licensePlate: string;
    brand?: string;
    model?: string;
    manufacturingYear?: number;
    type?: VehicleType;
    color?: string;
    imageUrl?: string;
}

/**
 * Interface pour mettre à jour un véhicule
 */
export interface UpdateVehicleDto {
    licensePlate?: string;
    brand?: string;
    model?: string;
    manufacturingYear?: number;
    type?: VehicleType;
    color?: string;
    imageUrl?: string;
}

/**
 * Interface pour mettre à jour les paramètres financiers
 */
export interface UpdateFinancialParametersDto extends Partial<FinancialParameters> {}

/**
 * Interface pour mettre à jour les paramètres de maintenance
 */
export interface UpdateMaintenanceParametersDto extends Partial<MaintenanceParameters> {}

/**
 * Interface pour les filtres de recherche de véhicules
 */
export interface VehicleFilters {
    fleetId?: UUID;
    type?: VehicleType;
    status?: boolean;
    search?: string; // Recherche par plaque, marque, modèle
    assignedDriverId?: UUID;
    maintenanceStatus?: MaintenanceStatus;
}

/**
 * Interface pour la vue carte d'un véhicule (version simplifiée)
 */
export interface VehicleMapView {
    id: UUID;
    licensePlate: string;
    type: VehicleType;
    color?: string;
    currentLocation?: Coordinates;
    currentSpeed?: number;
    bearing?: number;
    status: boolean;
    driverName?: string;
}
