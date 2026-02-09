import { UUID } from "./base.types";
import { Role } from "./auth-api.types";

/**
 * Représente un compte Administrateur géré par le SuperAdmin
 */
export interface AdminUser {
  id: UUID;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  roles: Role[];
  isActive: boolean; // État du compte (Toggle)
  service: string;   // Devrait être "FLEET_MANAGEMENT"
}

/**
 * Données requises pour créer un administrateur (JSON part du Multipart)
 */
export interface CreateAdminRequest {
  username: string;
  password?: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}