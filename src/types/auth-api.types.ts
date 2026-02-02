import { UUID } from "./base.types";

export type Role = 'ADMIN' | 'FLEET_MANAGER' | 'FLEET_DRIVER' | 'DRIVER' | 'ROLE_FLEET_ADMIN'; // Ajuste selon tes roles exacts backend

export interface User {
    id: UUID;
    username: string;
    email: string;
    roles: Role[];
    permissions?: string[];
    companyName?: string | null;
    phone?: string;
    firstName?: string;
    lastName?: string;
    service: string;
    photoUrl?: string;
    licenceNumber?: string;
    vehicleId?: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface LoginRequest {
    identifier: string; // Email
    password: string;
}

// Pour l'inscription (form-data)
export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    roles: string[];
    file?: File | null; // Photo optionnelle
}