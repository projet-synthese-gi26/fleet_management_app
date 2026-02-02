// Driver-related types for the fleet management application
// src/types/driver.types.ts
import { UUID } from './base.types';

export interface DriverUserProfile {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

export interface AssignedVehicle {
    vehicleId: UUID;
    licensePlate: string;
    brand?: string;
    model?: string;
    type?: string;
    imageUrl?: string;
}

export type DriverStatus = 'ACTIVE' | 'INACTIVE';

export interface Driver {
  userId: UUID;
  fleetId: UUID;
  licenceNumber: string;
  status: DriverStatus;
  assignedVehicleId: UUID | null;
  photoUrl: string | null;
  
  // Champs optionnels (souvent fusionnés par le backend ou à enrichir manuellement)
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  vehiclePlate?: string; // Pour l'affichage dans les listes
}

export interface RegisterDriverDto {
  username: string;
  password?: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  licenceNumber: string;
}

export interface RecruitDriverDto {
  identifier: string;
}

export interface CreateDriverDto {
    userId: UUID;
    licenceNumber: string;
    status?: boolean;
}

export interface UpdateDriverDto {
    licenceNumber?: string;
    status?: boolean;
}

export interface AssignVehicleDto {
    vehicleId: UUID;
}

export interface DriverFilters {
    status?: boolean;
    search?: string;
    hasVehicle?: boolean;
    fleetId?: UUID;
}

export interface DriverStatistics {
    driverId: UUID;
    totalTrips: number;
    totalDistance: number;
    totalDrivingTime: number;
    averageSpeed: number;
    geofenceViolations: number;
    lastTripDate?: string;
    safetyScore?: number;
}

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