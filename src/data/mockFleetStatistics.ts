import { FleetStats } from '../types/fleet.types';
import { UUID } from '../types/base.types';

export const MOCK_FLEET_STATISTICS: Record<UUID, FleetStats> = {
  "f1e1d1c1-a1b1-4c1d-a1b1-d1c1a1b1d1c1": { // Alpha Fleet
    fleetId: "f1e1d1c1-a1b1-4c1d-a1b1-d1c1a1b1d1c1",
    totalVehicles: 15,
    activeVehicles: 12,
    inactiveVehicles: 3,
    totalDrivers: 10,
    activeDrivers: 9,
    ongoingTrips: 5,
    totalTripsToday: 25,
    totalMileageToday: 1250,
    totalKmTraveled: 12500, // Ajouté - kilométrage total
    maintenanceAlerts: 2,
    geofenceViolations: 1,
    vehicleStatusDistribution: { // Ajouté
      AVAILABLE: 8,
      ON_TRIP: 5,
      MAINTENANCE: 2,
    },
  },
  "f2e2d2c2-a2b2-4c2d-a2b2-d2c2a2b2d2c2": { // Beta Logistics
    fleetId: "f2e2d2c2-a2b2-4c2d-a2b2-d2c2a2b2d2c2",
    totalVehicles: 25,
    activeVehicles: 20,
    inactiveVehicles: 5,
    totalDrivers: 20,
    activeDrivers: 18,
    ongoingTrips: 10,
    totalTripsToday: 40,
    totalMileageToday: 2500,
    totalKmTraveled: 25000, // Ajouté
    maintenanceAlerts: 4,
    geofenceViolations: 3,
    vehicleStatusDistribution: { // Ajouté
      AVAILABLE: 12,
      ON_TRIP: 10,
      MAINTENANCE: 3,
    },
  },
  "f3e3d3c3-a3b3-4c3d-a3b3-d3c3a3b3d3c3": { // Gamma North
    fleetId: "f3e3d3c3-a3b3-4c3d-a3b3-d3c3a3b3d3c3",
    totalVehicles: 8,
    activeVehicles: 8,
    inactiveVehicles: 0,
    totalDrivers: 5,
    activeDrivers: 5,
    ongoingTrips: 2,
    totalTripsToday: 10,
    totalMileageToday: 500,
    totalKmTraveled: 5000, // Ajouté
    maintenanceAlerts: 0,
    geofenceViolations: 0,
    vehicleStatusDistribution: { // Ajouté
      AVAILABLE: 6,
      ON_TRIP: 2,
      MAINTENANCE: 0,
    },
  },
  "f4e4d4c4-a4b4-4c4d-a4b4-d4c4a4b4d4c4": { // Delta Express
    fleetId: "f4e4d4c4-a4b4-4c4d-a4b4-d4c4a4b4d4c4",
    totalVehicles: 32,
    activeVehicles: 30,
    inactiveVehicles: 2,
    totalDrivers: 30,
    activeDrivers: 25,
    ongoingTrips: 15,
    totalTripsToday: 60,
    totalMileageToday: 4000,
    totalKmTraveled: 40000, // Ajouté
    maintenanceAlerts: 8,
    geofenceViolations: 5,
    vehicleStatusDistribution: { // Ajouté
      AVAILABLE: 15,
      ON_TRIP: 15,
      MAINTENANCE: 2,
    },
  },
};