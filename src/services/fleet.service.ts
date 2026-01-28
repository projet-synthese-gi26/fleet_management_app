import { apiClient } from "@/lib/api-client";
import { Fleet, CreateFleetDto, UpdateFleetDto } from "@/types/fleet.types";
import { UUID } from "@/types/base.types";

export const fleetService = {
  // GET /fleets
  getAllFleets: async (): Promise<Fleet[]> => {
    const { data } = await apiClient.get<Fleet[]>("/fleets");
    return data;
  },

  // GET /fleets/{id}
  getFleetById: async (id: UUID): Promise<Fleet> => {
    const { data } = await apiClient.get<Fleet>(`/fleets/${id}`);
    return data;
  },

  // POST /fleets
  createFleet: async (payload: CreateFleetDto): Promise<Fleet> => {
    const { data } = await apiClient.post<Fleet>("/fleets", payload);
    return data;
  },

  // PUT /fleets/{id}
  updateFleet: async (id: UUID, payload: UpdateFleetDto): Promise<Fleet> => {
    const { data } = await apiClient.put<Fleet>(`/fleets/${id}`, payload);
    return data;
  },

  // DELETE /fleets/{id}
  deleteFleet: async (id: UUID): Promise<void> => {
    await apiClient.delete(`/fleets/${id}`);
  },
};
