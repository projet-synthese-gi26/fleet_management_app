/**
 * Types de base utilisés dans toute l'application
 */

// Type pour les identifiants UUID
export type UUID = string;

// Type pour les dates
export type DateString = string; // Format: YYYY-MM-DD
export type TimeString = string; // Format: HH:mm:ss
export type DateTimeString = string; // Format ISO 8601

// Énumération pour les types de véhicules
export enum VehicleType {
    CAR = 'CAR',
    TRUCK = 'TRUCK',
    VAN = 'VAN',
    BIKE = 'BIKE',
}

// Énumération pour le statut du moteur
export enum EngineStatus {
    OK = 'OK',
    NEEDS_SERVICE = 'NEEDS_SERVICE',
    CRITICAL = 'CRITICAL',
    DAMAGED = 'DAMAGED',
}

// Énumération pour le statut de maintenance
export enum MaintenanceStatus {
    UP_TO_DATE = 'UP_TO_DATE',
    PENDING = 'PENDING',
    OVERDUE = 'OVERDUE',
    IN_PROGRESS = 'IN_PROGRESS',
}

// Énumération pour les types d'événements de géofencing
export enum GeofenceEventType {
    ENTRY = 'ENTRY',
    EXIT = 'EXIT',
}

// Type pour les coordonnées GPS
export interface Coordinates {
    latitude: number;
    longitude: number;
}

// Type pour les points avec ordre (utilisé dans les zones)
export interface OrderedCoordinates extends Coordinates {
    order: number;
}

// Type générique pour les réponses paginées
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Type pour les erreurs API
export interface ApiError {
    timestamp: DateTimeString;
    status: number;
    error: string;
    message: string;
    path: string;
}

// Type pour les réponses de succès simples
export interface SuccessResponse {
    message: string;
}

// Type pour les filtres de date
export interface DateFilter {
    startDate?: DateString;
    endDate?: DateString;
}

// Type pour les statuts booléens avec labels
export interface StatusInfo {
    active: boolean;
    label: string;
    color: 'success' | 'warning' | 'error' | 'info';
}