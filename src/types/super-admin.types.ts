import { UUID } from "./base.types";
import { Role } from "./auth-api.types";

export interface AdminUser {
  id: UUID;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  roles: Role[];
  isActive: boolean;      // <-- AJOUTÉ
  lastLoginAt: string | null; // <-- AJOUTÉ
  service: string;
}

export interface CreateAdminRequest {
  username: string;
  password?: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}