import { apiClient } from "@/lib/api-client";
import {
  Vehicle,
  CreateVehicleDto,
  UpdateVehicleDto,
  FinancialParameters,
  MaintenanceParameters,
  OperationalParameters,
  VehicleTypeReference,
} from "@/types/vehicle.types";

export const vehicleService = {
  // 3.2 Lister
  getAll: async (params?: {
    fleetId?: string;
    status?: string;
  }): Promise<Vehicle[]> => {
    const { data } = await apiClient.get<Vehicle[]>("/vehicles", { params });
    return data;
  },

  getById: async (id: string): Promise<Vehicle> => {
    const { data } = await apiClient.get<Vehicle>(`/vehicles/${id}`);
    return data;
  },

  // Mise à jour Finance (Spec 1.E)
  updateFinancial: async (
    id: string,
    payload: FinancialParameters,
  ): Promise<void> => {
    await apiClient.put(`/vehicles/${id}/financial-parameters`, payload);
  },

  // Mise à jour Maintenance (Spec 1.E)
  updateMaintenance: async (
    id: string,
    payload: MaintenanceParameters,
  ): Promise<void> => {
    await apiClient.put(`/vehicles/${id}/maintenance-parameters`, payload);
  },

  // Suppression complète (Pynfi + Local + Geofence)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/vehicles/${id}`);
  },

  // 3.1 Créer
  create: async (payload: CreateVehicleDto): Promise<Vehicle> => {
    const { data } = await apiClient.post<Vehicle>("/vehicles", payload);
    return data;
  },

  // 3.4 Patch
  update: async (id: string, payload: UpdateVehicleDto): Promise<Vehicle> => {
    const { data } = await apiClient.patch<Vehicle>(`/vehicles/${id}`, payload);
    return data;
  },

  // 5. Médias (Multipart)
  uploadMedia: async (
    id: string,
    type: "vin" | "registration",
    file: File,
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    // Route : PUT /vehicles/{id}/media/vin ou /registration
    await apiClient.put(`/vehicles/${id}/media/${type}`, formData);
  },

  // Spec 2 : Galerie d'illustration
  addToGallery: async (id: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    await apiClient.post(`/vehicles/${id}/media/gallery`, formData);
  },

  deleteGalleryImage: async (
    vehicleId: string,
    imageId: string,
  ): Promise<void> => {
    await apiClient.delete(`/vehicles/${vehicleId}/media/gallery/${imageId}`);
  },

  assignToFleet: async (fleetId: string, vehicleId: string) => {
    return await apiClient.post(`/fleets/${fleetId}/vehicles/${vehicleId}`);
  },

  // Récupérer la télémétrie (Opérationnel)
  getOperationalData: async (
    vehicleId: string,
  ): Promise<OperationalParameters> => {
    const { data } = await apiClient.get<OperationalParameters>(
      `/vehicles/${vehicleId}/operational`,
    );
    return data;
  },

  // Mise à jour manuelle par le Chauffeur
  patchOperationalData: async (
    vehicleId: string,
    payload: Partial<OperationalParameters>,
  ) => {
    const { data } = await apiClient.patch(
      `/vehicles/${vehicleId}/operational`,
      payload,
    );
    return data;
  },
};
