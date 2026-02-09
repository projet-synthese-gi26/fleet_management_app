import { apiClient } from "@/lib/api-client";
import { 
  Vehicle, 
  CreateVehicleDto, 
  VehiclePatchRequest, 
  OperationalParameters 
} from "@/types/vehicle.types";
import { UUID } from "@/types/base.types";

export const vehicleService = {
  /**
   * 09a. Lister les véhicules du manager
   */
  getAll: async (): Promise<Vehicle[]> => {
    const { data } = await apiClient.get<Vehicle[]>("/vehicles");
    return data;
  },

  /**
   * Récupérer le "Master Object" (Détails complets + Paramètres agrégés)
   */
  getById: async (id: UUID): Promise<Vehicle> => {
    const { data } = await apiClient.get<Vehicle>(`/vehicles/${id}`);
    return data;
  },

  /**
   * Créer un véhicule (Utilise les UUIDs des référentiels)
   */
  create: async (payload: CreateVehicleDto): Promise<Vehicle> => {
    const { data } = await apiClient.post<Vehicle>("/vehicles", payload);
    return data;
  },

  /**
   * 09b. Gestion des Médias (Multipart/form-data)
   * Type: 'vin' (Châssis) ou 'registration' (Carte Grise)
   */
  uploadAdminDoc: async (vehicleId: UUID, type: 'vin' | 'registration', file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    await apiClient.put(`/vehicles/${vehicleId}/media/${type}`, formData);
  },

  /**
   * Ajouter une photo à la galerie d'illustration (Relation 1-N)
   */
  addGalleryImage: async (vehicleId: UUID, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    await apiClient.post(`/vehicles/${vehicleId}/media/gallery`, formData);
  },

  /**
   * 09c. Récupérer la télémétrie en temps réel
   */
  getLiveStatus: async (vehicleId: UUID): Promise<OperationalParameters> => {
    const { data } = await apiClient.get<OperationalParameters>(`/vehicles/${vehicleId}/operational`);
    return data;
  },

  /**
   * Supprimer définitivement un véhicule
   */
  delete: async (id: UUID): Promise<void> => {
    await apiClient.delete(`/vehicles/${id}`);
  }
};