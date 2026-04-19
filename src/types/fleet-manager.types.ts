import { UUID } from "./base.types";

export interface FleetManager {
  id?: UUID;
  userId?: UUID;            // Changé de userId à id pour matcher le JSON
  username?: string;    // Ajouté (présent dans le JSON)
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status?: string;
  companyName: string;
  isActive?: boolean;   // Ajouté (via notre modif backend)
  lastLoginAt: string | null; 
  lastActive: string | null;
  avatarUrl?: string;
  photoUrl?: string;
  fleetCount?: number;  // Sera à 0 tant qu'on ne modifie pas le service, mais le type est prêt
}

export interface UpdateManagerDto {
  [key: string]: any;
}