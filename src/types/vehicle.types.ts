import { UUID, DateString, DateTimeString, VehicleType } from "./base.types";

export type VehicleStatus = "AVAILABLE" | "ON_TRIP" | "MAINTENANCE";
export type EngineStatus = "OK" | "NEEDS_SERVICE" | "OUT_OF_SERVICE";
export type MaintenanceStatus = "UP_TO_DATE" | "PENDING" | "OVERDUE";

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

export interface CreateVehicleDto {
  vehicleTypeId: string; // UUID
  manufacturerId: string; // UUID
  brandId: string; // UUID
  modelId: string; // UUID
  sizeId: string; // UUID
  usageTypeId: string; // UUID
  fuelTypeId: string; // UUID
  transmissionTypeId: string; // UUID
  colorId: string; // UUID
  licensePlate: string; // ex: "LT-123-AA"
  vehicleSerialNumber: string;
  manufacturingYear: number;
  tankCapacity: number;
  totalSeatNumber: number;
  averageFuelConsumption: number;
}

// La réponse "Master" (Détails complets)
export interface Vehicle {
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  color?: string;
  manufacturingYear?: number;
  // Données fusionnées
  financialParameters: FinancialParameters;
  maintenanceParameters: MaintenanceParameters;
  operationalParameters: OperationalParameters;
  // Médias
  photoUrl?: string;
  serialNumberPhotoUrl?: string;
  registrationPhotoUrl?: string;
  illustrationImages: string[];
}

export interface OperationalParameters {
  fuelLevel: string; // ex: "75%"
  currentSpeed: number; // km/h
  odometerReading: number;
  latitude?: number;
  longitude?: number;
  lastUpdate?: string;
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
