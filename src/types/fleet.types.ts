// Fleet-related types for the fleet management application
// src/types/fleet.types.ts

import { UUID, DateString } from './base.types';

// --- Route 04: Fleet Manager Response ---
export interface FleetManager {
    userId: UUID;
    firstName: string;
    lastName: string;
    email: string;
    companyName?: string;
    fleetCount: number;
    status: 'ACTIVE' | 'INACTIVE'; // Adapté selon la réponse API
    // Champs UI additionnels (calculés ou par défaut coté front si absents de l'API)
    avatarUrl?: string; 
    lastActive?: string;
}

export interface UpdateManagerDto {
    companyName: string;
}

// --- Route 07: Fleet Request/Response ---
export interface Fleet {
    id: UUID;
    name: string;
    creationDate: DateString;
    managerUserId: UUID;
    vehicleCount: number;
    // L'API ne renvoie pas l'objet complet du manager dans la liste des flottes, 
    // juste l'ID. On gérera l'affichage du nom coté front via un mapping si nécessaire.
    manager?: { 
        name: string;
        email?: string;
    }; 
}

export interface CreateFleetDto {
    name: string;
    phoneNumber?: string;
    // managerUserId est déduit du token pour un Manager, 
    // mais peut être requis si c'est un Admin qui crée pour un Manager (à vérifier selon ton API)
}

export interface UpdateFleetDto {
    name?: string;
    phoneNumber?: string;
}

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

export interface FleetFilters {
    search?: string;
    managerId?: UUID;
    fromDate?: DateString;
    toDate?: DateString;
}