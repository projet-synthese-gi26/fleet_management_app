import { UUID } from "./base.types";

/**
 * Représente un gestionnaire de flotte (Client B2B) vu par l'administrateur
 */
export interface FleetManager {
  userId: UUID;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;      // Nom de l'entreprise (Souveraineté fleet.fleet_managers)
  status: 'ACTIVE' | 'INACTIVE'; // Statut du compte
  fleetCount: number;       // Nombre réel de flottes gérées (calculé par le backend)
  photoUrl?: string;
}