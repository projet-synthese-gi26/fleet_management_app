import { apiClient } from "@/lib/api-client";
import { Zone, CreateZoneDto, GeofenceEvent } from "@/types/geofence.types";
import { UUID } from "@/types/base.types";

export const geofenceService = {
  // GET /geofence/fleets/{fleetId}/zones
  getZonesByFleet: async (fleetId: UUID): Promise<Zone[]> => {
    const { data } = await apiClient.get<Zone[]>(
      `/geofence/fleets/${fleetId}/zones`,
    );
    return data;
  },

  // POST /geofence/zones
  createZone: async (payload: CreateZoneDto): Promise<Zone> => {
    const { data } = await apiClient.post<Zone>("/geofence/zones", payload);
    return data;
  },

  // DELETE /geofence/zones/{id}
  deleteZone: async (id: UUID): Promise<void> => {
    await apiClient.delete(`/geofence/zones/${id}`);
  },

  // GET /geofence/events
  getEvents: async (params?: {
    vehicleId?: string;
    zoneId?: string;
    date?: string;
  }): Promise<GeofenceEvent[]> => {
    const { data } = await apiClient.get<GeofenceEvent[]>("/geofence/events", {
      params,
    });
    return data;
  },
};
