import { apiClient } from "@/lib/api-client";
import { Fleet, CreateFleetDto, UpdateFleetDto } from "@/types/fleet.types";
import { UUID } from "@/types/base.types";

export const fleetService = {
  // 📋 2.2. Lister les flottes
  getAllFleets: async (): Promise<Fleet[]> => {
    const { data } = await apiClient.get<Fleet[]>("/fleets");
    return data;
  },

  // 🔍 2.3. Détails d'une flotte
  getFleetById: async (id: UUID): Promise<Fleet> => {
    const { data } = await apiClient.get<Fleet>(`/fleets/${id}`);
    return data;
  },

  // 📝 2.1. Créer une flotte
  createFleet: async (payload: CreateFleetDto): Promise<Fleet> => {
    const { data } = await apiClient.post<Fleet>("/fleets", payload);
    return data; // Le backend renvoie 201 Created
  },

  // ✏️ 2.4. Modifier une flotte
  updateFleet: async (id: UUID, payload: UpdateFleetDto): Promise<Fleet> => {
    const { data } = await apiClient.put<Fleet>(`/fleets/${id}`, payload);
    return data;
  },

  // 🗑️ 2.5. Supprimer une flotte
  deleteFleet: async (id: UUID): Promise<void> => {
    await apiClient.delete(`/fleets/${id}`); // Renvoie 204 No Content
  },
};
