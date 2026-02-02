import { UUID, DateString, DateTimeString, VehicleType } from './base.types';

export type VehicleStatus = 'AVAILABLE' | 'ON_TRIP' | 'MAINTENANCE';
export type EngineStatus = 'OK' | 'NEEDS_SERVICE' | 'OUT_OF_SERVICE';
export type MaintenanceStatus = 'UP_TO_DATE' | 'PENDING' | 'OVERDUE';

export interface VehicleTypeRef {
    id: UUID;
    code: string;
    label: string;
    description?: string;
}

export interface FinancialParameters {
    insuranceNumber?: string;
    insuranceExpiryDate?: DateString;
    registrationDate?: DateString;
    purchaseDate?: DateString;
    depreciationRate?: number;
    costPerKm?: number;
}

export interface MaintenanceParameters {
    lastMaintenanceDate?: DateString;
    nextMaintenanceDue?: DateString;
    engineStatus: EngineStatus;
    batteryHealth: number;
    maintenanceStatus: MaintenanceStatus;
}

export interface OperationalParameters {
    currentMileage: number;
    fuelLevel: number;
    latitude: number;
    longitude: number;
    lastUpdate: DateTimeString;
}

export interface Vehicle {
    id: UUID;
    fleetId: UUID | null;
    managerId: UUID;
    currentDriverId: UUID | null;
    vehicleTypeId: UUID;
    
    // Identification
    licensePlate: string;
    vehicleSerialNumber: string;
    brand: string;
    model: string;
    manufacturingYear: number;
    transmissionType: string;
    fuelType: string;
    color: string;
    
    // Technique
    tankCapacity: number;
    totalSeatNumber: number;
    averageFuelConsumption: number;
    
    status: VehicleStatus;
    
    // Médias
    photoUrl?: string;
    serialNumberPhotoUrl?: string;
    registrationPhotoUrl?: string;
    illustrationImages: string[];

    // Sous-objets
    financialParameters?: FinancialParameters;
    maintenanceParameters?: MaintenanceParameters;
    operationalParameters?: OperationalParameters;
}

// DTOs
export interface CreateVehicleDto {
    vehicleTypeId: UUID;
    brand: string;
    model: string;
    licensePlate: string;
    manufacturerName: string;
    sizeName: string;
    typeName: string;
    fuelType: string;
    transmissionType: string;
    color: string;
    manufacturingYear: number;
    status: VehicleStatus;
    tankCapacity: number;
    totalSeatNumber: number;
    averageFuelConsumption: number;
    vehicleSerialNumber?: string;
}

export type UpdateVehicleDto = Partial<CreateVehicleDto>;

export interface UpdateFinancialParametersDto extends Partial<FinancialParameters> {}

export interface UpdateMaintenanceParametersDto extends Partial<MaintenanceParameters> {}


export interface VehicleTypeReference {
    id: UUID;
    code: string;
    label: string;
    description?: string;
}

export interface VehicleFilters {
    fleetId?: UUID;
    type?: VehicleType;
    status?: boolean;
    search?: string;
    assignedDriverId?: UUID;
    maintenanceStatus?: MaintenanceStatus;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}   

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