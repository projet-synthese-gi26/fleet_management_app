import { apiClient } from "@/lib/api-client";
import { VehicleTypeRef } from "@/types/vehicle.types";

export const referenceService = {
    // 2.1. Types de véhicules
    getVehicleTypes: async (): Promise<VehicleTypeRef[]> => {
        const { data } = await apiClient.get('/references/vehicle-types');
        return data;
    },

    // 2.2. Lookups (Proxy externe)
    // Resources: fuel-types, manufacturers, transmission-types, vehicle-makes, vehicle-sizes
    getLookup: async (resource: string): Promise<any[]> => {
        const { data } = await apiClient.get(`/vehicles/lookup/${resource}`);
        return data;
    }
};