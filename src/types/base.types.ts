/**
 * Types de base réutilisables dans toute l'application
 */

// Identifiant unique (String au format standard UUID)
export type UUID = string;

// Formats de chaînes de caractères pour le temps (ISO 8601)
export type DateString = string;     // ex: "2026-02-09"
export type TimeString = string;     // ex: "14:30:00"
export type DateTimeString = string; // ex: "2026-02-09T14:30:00Z"

/**
 * Structure géographique simple
 */
export interface Coordinates {
    latitude: number;
    longitude: number;
}

/**
 * Types de véhicules supportés par le système
 */
export enum VehicleType {
    CAR = 'CAR',
    TRUCK = 'TRUCK',
    VAN = 'VAN',
    BIKE = 'BIKE',
}

/**
 * États techniques du moteur
 */
export enum EngineStatus {
    OK = 'OK',
    NEEDS_SERVICE = 'NEEDS_SERVICE',
    CRITICAL = 'CRITICAL',
    OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

/**
 * États administratifs de la maintenance
 */
export enum MaintenanceStatus {
    UP_TO_DATE = 'UP_TO_DATE',
    PENDING = 'PENDING',
    OVERDUE = 'OVERDUE',
}

/**
 * Structure générique pour les réponses paginées du backend Spring Boot
 */
export interface PaginatedResponse<T> {
    content: T[];           // Les données réelles
    totalElements: number;  // Nombre total d'éléments en base
    totalPages: number;     // Nombre total de pages
    size: number;           // Taille de la page actuelle
    number: number;         // Index de la page actuelle
    last: boolean;          // Est-ce la dernière page ?
}

/**
 * Type utilitaire pour les badges et indicateurs de statut
 */
export interface StatusInfo {
    label: string;
    color: 'success' | 'warning' | 'error' | 'info' | 'primary';
}