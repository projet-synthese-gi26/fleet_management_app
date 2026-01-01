import { VehicleType, EngineStatus } from "@/types/base.types";

export const MOCK_VEHICLES = [
  {
    id: "v1",
    licensePlate: "CE 123 AB",
    type: VehicleType.CAR,
    driverName: "Aissatou Bello",
    status: "moving", // moving, stopped, offline
    speed: 45,
    location: { lat: 3.848, lng: 11.5021 }, // Marché Central
    bearing: 45,
    fuelLevel: 78,
  },
  {
    id: "v2",
    licensePlate: "LT 999 XX",
    type: VehicleType.TRUCK,
    driverName: "Jean Dupont",
    status: "stopped",
    speed: 0,
    location: { lat: 3.8667, lng: 11.5167 }, // Bastos
    bearing: 0,
    fuelLevel: 45,
  },
  {
    id: "v3",
    licensePlate: "OU 456 ZZ",
    type: VehicleType.VAN,
    driverName: "Moussa Ibrahim",
    status: "idle", // Moteur allumé mais à l'arrêt
    speed: 0,
    location: { lat: 3.8222, lng: 11.51 }, // Quartier Sud
    bearing: 180,
    fuelLevel: 92,
  },
  {
    id: "v4",
    licensePlate: "NO 111 AA",
    type: VehicleType.BIKE,
    driverName: "Samuel Eto",
    status: "offline",
    speed: 0,
    location: { lat: 3.88, lng: 11.53 }, // Étoudi
    bearing: 0,
    fuelLevel: 0,
  },
];
