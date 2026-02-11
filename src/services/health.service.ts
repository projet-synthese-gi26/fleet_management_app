import { apiClient } from "@/lib/api-client";

export interface PublicStats {
  activeManagers: number;
  totalFleets: number;
  managedVehicles: number;
  totalDrivers: number;
  serviceStatus: string;
}

export interface SystemHealth {
  status: "UP" | "DOWN" | "WARNING";
  timestamp: string;
  local_db: string;
  local_redis: string;
  auth_service: string;
  vehicle_service: string;
  payment_service: string;
  geofence_engine: string;
}

export const healthService = {
  /**
   * Diagnostic profond pour l'administration
   */
  check: async (): Promise<SystemHealth> => {
    const { data } = await apiClient.get<SystemHealth>("/health/diagnostic");
    return data;
  },

  /**
   * Statistiques publiques pour la Landing Page
   * Route: GET /api/v1/health/public-stats
   */
  getPublicStats: async (): Promise<PublicStats> => {
    const { data } = await apiClient.get<PublicStats>("/health/public-stats");
    return data;
  }
};