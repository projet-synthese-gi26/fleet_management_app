import { apiClient } from "@/lib/api-client";
import { VehicleTypeRef } from "@/types/vehicle.types";

export const referenceService = {
  // Récupère tout d'un coup (Optimisé pour le formulaire)
  getAllResources: async () => {
    const { data } = await apiClient.get("/vehicles/resources/all");
    return data; 
    /* 
       Format attendu : 
       { brands: [...], fuelTypes: [...], manufacturers: [...], sizes: [...], etc. } 
    */
  },

  getLookup: async (resource: string) => {
    const { data } = await apiClient.get(`/vehicles/lookup/${resource}`);
    return data;
  }
};