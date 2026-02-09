import { apiClient } from "@/lib/api-client";
import { GeofenceZone, CreateGeofenceDto } from "@/types/geofence.types";

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