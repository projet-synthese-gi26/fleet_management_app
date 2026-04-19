import { apiClient } from "@/lib/api-client";
import { AdminUser, CreateAdminRequest } from "@/types/super-admin.types";
import { User } from "@/types/auth-api.types";

/**
 * Service pour les actions exclusives au Super Administrateur
 */
export const superAdminService = {
  /**
   * Liste tous les administrateurs (FLEET_ADMIN)
   */
  listAdmins: async (): Promise<AdminUser[]> => {
    const { data } = await apiClient.get<AdminUser[]>("/admin/super/admins");
    return data;
  },

  /**
   * Crée un nouvel administrateur
   * @param adminData Objet contenant les infos (username, password, etc.)
   * @param file Fichier image optionnel
   */
  createAdmin: async (adminData: CreateAdminRequest, file?: File): Promise<any> => {
    const formData = new FormData();
    
    // Le backend Spring Boot attend une partie nommée "user" en JSON (Blob)
    const userBlob = new Blob([JSON.stringify(adminData)], { type: "application/json" });
    formData.append("user", userBlob);

    // Et une partie nommée "file" pour l'image
    if (file) {
      formData.append("file", file);
    }

    const { data } = await apiClient.post("/admin/super/admins", formData);
    return data;
  },

  /**
   * Active ou bloque un compte admin (Toggle local fleet.users)
   */
  toggleStatus: async (adminId: string): Promise<void> => {
    await apiClient.patch(`/admin/super/admins/${adminId}/toggle`);
  },

  /**
   * Récupère les détails d'un admin
   */
  getAdminById: async (adminId: string): Promise<AdminUser> => {
    const { data } = await apiClient.get<AdminUser>(`/admin/super/admins/${adminId}`);
    return data;
  }
};