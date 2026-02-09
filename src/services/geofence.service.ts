import { apiClient } from "@/lib/api-client";
import { GeofenceZone, CreateGeofenceDto, GeofenceAlertResponse } from "@/types/geofence.types";
import { UUID } from "@/types/base.types";

export const geofenceService = {
  // GET /geofence/fleets/{fleetId}/zones
  getZonesByFleet: async (fleetId: UUID): Promise<GeofenceZone[]> => {
    const { data } = await apiClient.get<GeofenceZone[]>(
      `/geofence/fleets/${fleetId}/zones`,
    );
    return data;
  },

  // POST /geofence/zones
  createZone: async (payload: CreateGeofenceDto): Promise<GeofenceZone> => {
    const { data } = await apiClient.post<GeofenceZone>("/geofence/zones", payload);
    return data;
  },

  // DELETE /geofence/zones/{id}
  deleteZone: async (id: UUID): Promise<void> => {
    await apiClient.delete(`/geofence/zones/${id}`);
  },

  

  getMyZones: async (): Promise<GeofenceZone[]> => {
        const { data } = await apiClient.get('/geofence/my-zones');
        return data;
    },

    // Spec 3.A : Modification partielle
    updateZone: async (type: string, id: string, payload: any) => {
        const lowerType = type.toLowerCase();
        const { data } = await apiClient.put(`/geofence/${lowerType}/${id}`, payload);
        return data;
    },

    /**
     * 🔗 3.B. Assigner une zone à une flotte
     * Active la surveillance pour tous les véhicules de la flotte donnée.
     * Route: PATCH /geofence/{id}/assign-fleet/{fleetId}
     */
    assignToFleet: async (zoneId: string, fleetId: string): Promise<void> => {
        await apiClient.patch(`/geofence/${zoneId}/assign-fleet/${fleetId}`);
    },

    /**
     * 🚨 4.B. Historique des alertes (Violations)
     * Route: GET /geofence/alerts
     */
    getAlerts: async (page = 0, size = 20):   Promise<GeofenceAlertResponse> => {
        const { data } = await apiClient.get<GeofenceAlertResponse>('/geofence/alerts', {
            params: { page, size }
        });
        return data;
    },

    /**
     * 📍 4.A. Vérifier manuellement un point
     * Route: GET /geofence/check
     */
    checkPosition: async (zoneId: string, lat: number, lng: number): Promise<string> => {
        const { data } = await apiClient.get('/geofence/check', {
            params: { zoneId, lat, lng }
        });
        return data; // Retourne "Inside" ou "Outside"
    }
};
