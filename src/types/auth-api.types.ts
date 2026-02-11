import { UUID } from "./base.types";

/**
 * Rôles officiels définis dans le backend (Souveraineté fleet.users)
 */
export type Role = 
  | 'FLEET_SUPER_ADMIN' // Gère les Admins
  | 'FLEET_ADMIN'       // Gère les Managers et les Ressources
  | 'FLEET_MANAGER'     // Gère ses flottes, véhicules et chauffeurs
  | 'FLEET_DRIVER';      // Utilise l'app mobile et conduit

/**
 * Utilisateur complet tel que renvoyé par le profil agrégé
 */
export interface User {
    id: UUID;
    username: string;
    email: string;
    roles: Role[];
    firstName?: string;
    lastName?: string;
    phone?: string;
    photoUrl?: string;
    companyName?: string | null; // Pour les Managers
    licenceNumber?: string;      // Pour les Drivers
    vehicleId?: string;          // Pour les Drivers (véhicule assigné)
    service: string;             // Devrait être "FLEET_MANAGEMENT"
     isActive: boolean;
    lastLoginAt: string | null; 
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface LoginRequest {
    identifier: string; // Email ou Username
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    roles: Role[]; // Utilisation du type Role strict
    file?: File | null;
}