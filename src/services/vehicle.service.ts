import { apiClient } from "@/lib/api-client";
import { Vehicle, CreateVehicleDto, ResourceCatalog } from "@/types/vehicle.types";
import { UUID } from "@/types/base.types";

export const vehicleService = {
  // --- 09a. GESTION DU PARC ---
  getAll: async (): Promise<Vehicle[]> => {
    const { data } = await apiClient.get<Vehicle[]>("/vehicles");
    return data;
  },

  getById: async (id: UUID): Promise<Vehicle> => {
    const { data } = await apiClient.get<Vehicle>(`/vehicles/${id}`);
    return data;
  },

  create: async (payload: CreateVehicleDto): Promise<Vehicle> => {
    const { data } = await apiClient.post<Vehicle>("/vehicles", payload);
    return data;
  },

  delete: async (id: UUID): Promise<void> => {
    await apiClient.delete(`/vehicles/${id}`);
  },

  updateFinancial: async (id: UUID, params: any): Promise<void> => {
    await apiClient.put(`/vehicles/${id}/financial-parameters`, params);
  },

  updateMaintenance: async (id: UUID, params: any): Promise<void> => {
    await apiClient.put(`/vehicles/${id}/maintenance-parameters`, params);
  },

  // --- 09b. MÉDIAS & DOCUMENTS (Noms synchronisés avec l'UI) ---
  uploadAdminDoc: async (id: UUID, type: 'vin' | 'registration', file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    await apiClient.put(`/vehicles/${id}/media/${type}`, formData);
  },

  addGalleryImage: async (id: UUID, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    await apiClient.post(`/vehicles/${id}/media/gallery`, formData);
  },

  deleteGalleryImage: async (vehicleId: UUID, imageId: string): Promise<void> => {
    await apiClient.delete(`/vehicles/${vehicleId}/media/gallery/${imageId}`);
  },

  // --- 09c. OPÉRATIONNEL (DRIVER) ---
  getOperationalData: async (id: UUID): Promise<any> => {
    const { data } = await apiClient.get(`/vehicles/${id}/operational`);
    return data;
  },

  patchOperationalData: async (id: UUID, updates: any): Promise<void> => {
    await apiClient.patch(`/vehicles/${id}/operational`, updates);
  },

  // --- 09d. RÉFÉRENTIELS ---
  getResourceCatalog: async (): Promise<ResourceCatalog> => {
    const { data } = await apiClient.get<ResourceCatalog>("/vehicles/resources/all");
    return data;
  }
};