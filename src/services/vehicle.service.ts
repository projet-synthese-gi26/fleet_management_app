import { apiClient } from "@/lib/api-client";
import { 
    Vehicle, CreateVehicleDto, UpdateVehicleDto, 
    FinancialParameters, MaintenanceParameters 
} from "@/types/vehicle.types";

export const vehicleService = {
    // 3.2 Lister
    getAll: async (params?: { fleetId?: string, status?: string }): Promise<Vehicle[]> => {
    const { data } = await apiClient.get<Vehicle[]>('/vehicles', { params });
    return data;
    },

    // 3.3 Détails
    getById: async (id: string): Promise<Vehicle> => {
        const { data } = await apiClient.get<Vehicle>(`/vehicles/${id}`);
        return data;
    },

    // 3.1 Créer
    create: async (payload: CreateVehicleDto): Promise<Vehicle> => {
        const { data } = await apiClient.post<Vehicle>('/vehicles', payload);
        return data;
    },

    // 3.4 Patch
    update: async (id: string, payload: UpdateVehicleDto): Promise<Vehicle> => {
        const { data } = await apiClient.patch<Vehicle>(`/vehicles/${id}`, payload);
        return data;
    },

    // 3.5 Supprimer
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/vehicles/${id}`);
    },

    // 4.1 Paramètres Financiers
    updateFinancial: async (id: string, payload: FinancialParameters): Promise<Vehicle> => {
        const { data } = await apiClient.put(`/vehicles/${id}/financial-parameters`, payload);
        return data;
    },

    // 4.2 Paramètres Maintenance
    updateMaintenance: async (id: string, payload: MaintenanceParameters): Promise<Vehicle> => {
        const { data } = await apiClient.put(`/vehicles/${id}/maintenance-parameters`, payload);
        return data;
    },

    // 5. Médias (Multipart)
    uploadMedia: async (id: string, type: 'vin' | 'registration' | 'gallery', file: File): Promise<void> => {
        const formData = new FormData();
        formData.append('file', file);
        
        const endpoint = type === 'gallery' 
            ? `/vehicles/${id}/media/gallery` 
            : `/vehicles/${id}/media/${type}`;
            
        await apiClient[type === 'gallery' ? 'post' : 'put'](endpoint, formData);
    },

    deleteGalleryImage: async (vehicleId: string, imageId: string): Promise<void> => {
        await apiClient.delete(`/vehicles/${vehicleId}/media/gallery/${imageId}`);
    }

    
};