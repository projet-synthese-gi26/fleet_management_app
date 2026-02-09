import { apiClient } from "@/lib/api-client";
import { GeofenceZone, CreateGeofenceDto } from "@/types/geofence.types";

/**
 * Interface représentant l'état de santé des différents services du backend
 */
export interface SystemHealth {
  status: "UP" | "DOWN" | "WARNING";
  timestamp: string;
  local_db: string;      // État de la base de données PostgreSQL
  local_redis: string;   // État du cache Redis
  auth_service: string;  // État du service d'authentification distant
  vehicle_service: string; // État du service véhicule distant
  payment_service: string; // État du service de paiement distant
  geofence_engine: string; // État du moteur de geofencing
}

/**
 * Service pour surveiller la connectivité entre le Frontend et le Backend
 */
export const healthService = {
  /**
   * Effectue un diagnostic profond de tous les services liés au backend
   * Route: GET /api/v1/health/diagnostic
   */
  check: async (): Promise<SystemHealth> => {
    const { data } = await apiClient.get<SystemHealth>("/health/diagnostic");
    return data;
  },

  /**
   * Récupère les statistiques publiques pour la page d'accueil (Landing Page)
   * Route: GET /api/v1/health/public-stats
   */
  getPublicStats: async () => {
    const { data } = await apiClient.get("/health/public-stats");
    return data;
  }
};

export const geofenceService = {
    // 2.A Lister mes zones (Manager)
    getMyZones: async (): Promise<GeofenceZone[]> => {
        const { data } = await apiClient.get('/geofence/my-zones');
        return data;
    },

    // 1. Créer une zone
    createZone: async (payload: CreateGeofenceDto): Promise<GeofenceZone> => {
        const { data } = await apiClient.post('/geofence/zones', payload);
        return data;
    },

    // 3.B Assigner à une flotte
    assignToFleet: async (zoneId: string, fleetId: string): Promise<void> => {
        await apiClient.patch(`/geofence/${zoneId}/assign-fleet/${fleetId}`);
    },

    // 3.C Supprimer
    deleteZone: async (id: string, type: string): Promise<void> => {
        const lowerType = type.toLowerCase(); // circle ou polygon
        await apiClient.delete(`/geofence/${lowerType}/${id}`);
    }
};
