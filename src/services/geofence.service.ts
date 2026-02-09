import { apiClient } from "@/lib/api-client";
import { GeofenceZone, CreateGeofenceDto, GeofenceAlertResponse } from "@/types/geofence.types";
import { UUID } from "@/types/base.types";

export const geofenceService = {
  // Récupérer mes zones (Manager)
  getMyZones: async (): Promise<GeofenceZone[]> => {
    const { data } = await apiClient.get<GeofenceZone[]>("/geofence/my-zones");
    return data;
  },

  // Créer une zone
  createZone: async (payload: CreateGeofenceDto): Promise<GeofenceZone> => {
    const { data } = await apiClient.post<GeofenceZone>("/geofence/zones", payload);
    return data;
  },

  // Assigner une zone à une flotte (Active la surveillance live)
  assignToFleet: async (zoneId: string, fleetId: string): Promise<void> => {
    await apiClient.patch(`/geofence/${zoneId}/assign-fleet/${fleetId}`);
  },

  // Supprimer une zone (Nécessite l'ID et le Type pour le moteur distant)
  deleteZone: async (id: string, type: string): Promise<void> => {
    const shortType = type.toLowerCase();
    await apiClient.delete(`/geofence/${shortType}/${id}`);
  },

  // Historique des alertes
  getAlerts: async (page = 0, size = 10): Promise<GeofenceAlertResponse> => {
    const { data } = await apiClient.get<GeofenceAlertResponse>("/geofence/alerts", {
      params: { page, size }
    });
    return data;
  }
};