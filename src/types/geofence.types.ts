import { UUID, DateString } from './base.types';

export type ZoneType = 'POLYGON' | 'CIRCLE';

export interface Vertex {
    latitude: number;
    longitude: number;
    order: number;
}

export interface Zone {
    id: UUID;
    fleetId: UUID;
    name: string;
    description?: string;
    type: ZoneType;
    vertices: Vertex[];
    radius?: number; // Uniquement pour le type CIRCLE (en mètres)
    createdAt?: DateString;
}

export interface CreateZoneDto {
    fleetId: UUID;
    name: string;
    description?: string;
    type: ZoneType;
    vertices: Vertex[];
    radius?: number;
}

export interface GeofenceEvent {
    id: UUID;
    vehicleId: UUID;
    zoneId: UUID;
    type: 'ENTRY' | 'EXIT';
    timestamp: DateString;
    // Champs enrichis si l'API le permet ou via mapping front
    vehiclePlate?: string;
    zoneName?: string;
}