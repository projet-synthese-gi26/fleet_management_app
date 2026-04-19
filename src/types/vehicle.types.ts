import { UUID, DateString } from "./base.types";

export type VehicleStatus = "AVAILABLE" | "ON_TRIP" | "MAINTENANCE";

export interface ResourceItem {
  id: UUID;
  code: string;
  label: string;
  description?: string;
}

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

export interface Vehicle {
  id: UUID;
  fleetId: UUID | null;
  managerId: UUID;
  currentDriverId: UUID | null;
  vehicleTypeId: UUID;
  licensePlate: string;
  vehicleSerialNumber: string;
  brand: string;
  model: string;
  manufacturingYear: number;
  transmissionType: string;
  fuelType: string;
  color: string;
  tankCapacity: number;
  totalSeatNumber: number;
  averageFuelConsumption: number;
  status: VehicleStatus;
  photoUrl?: string;
  serialNumberPhotoUrl?: string;
  registrationPhotoUrl?: string;
  illustrationImages: string[];
  // Paramètres agrégés
  financialParameters?: any; 
  maintenanceParameters?: any;
  operationalParameters?: any;
  geofenceRemoteId?: string;
}

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