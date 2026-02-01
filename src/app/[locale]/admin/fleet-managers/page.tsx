"use client";

import React from "react";
import FleetManagersTableContainer from "@/components/admin/fleet-managers/FleetManagersTableContainer";
import { MOCK_FLEETS } from "@/data/mockFleets";
import {
  MOCK_USERS_ADDITIONAL_INFO,
  UserAdditionalInfo,
} from "@/data/mockUsers";
import { MOCK_FLEET_STATISTICS } from "@/data/mockFleetStatistics";
import { FleetManager, FleetStatistics } from "@/types/fleet.types";
import { UUID } from "@/types/base.types";

type ManagerWithDetails = {
  manager: FleetManager; // Simplification : FleetManager contient déjà tout ce qu'il faut
  fleetCount: number;
  fleets: {
    id: string;
    name: string;
    vehicleCount: number;
    statistics?: FleetStatistics;
  }[];
};

// Fonction de transformation des données MOCK vers le format API
const getManagerData = (): ManagerWithDetails[] => {
  const managerMap = new Map<UUID, ManagerWithDetails>();

  MOCK_FLEETS.forEach((fleet) => {
    // 1. Sécurité : si pas de manager, on ignore
    if (!fleet.manager) return;

    // 2. Récupération sécurisée de l'ID (depuis le mock qui contient souvent userId caché ou via le lien fleet)
    // TypeScript ne voit pas userId dans fleet.manager? car le type a changé, on force le cast ici pour les mocks
    const managerData = fleet.manager as any;
    const managerId = managerData.userId || fleet.managerUserId;

    if (!managerId) return;

    if (!managerMap.has(managerId)) {
      const additionalInfo = MOCK_USERS_ADDITIONAL_INFO[managerId] || {
        status: "active",
        lastActive: new Date().toISOString(),
      };

      // 3. Transformation du Nom Complet (Mock) vers Prénom/Nom (API)
      const fullName = fleet.manager.name || "Inconnu";
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      // 4. Normalisation du Statut (minuscule mock -> MAJUSCULE API)
      // Si le mock est 'active', on force 'ACTIVE', sinon 'INACTIVE'
      const normalizedStatus: "ACTIVE" | "INACTIVE" =
        additionalInfo.status === "active" ? "ACTIVE" : "INACTIVE";

      // 5. Construction de l'objet strictement typé
      const managerObject: FleetManager = {
        userId: managerId,
        firstName: firstName,
        lastName: lastName,
        email: fleet.manager.email || "",
        companyName: "N/A", // Valeur par défaut pour les mocks
        fleetCount: 0, // Sera incrémenté
        status: normalizedStatus,
        // Champs optionnels UI
        avatarUrl: additionalInfo.avatarUrl,
        lastActive: additionalInfo.lastActive,
      };

      managerMap.set(managerId, {
        manager: managerObject,
        fleetCount: 0,
        fleets: [],
      });
    }

    const current = managerMap.get(managerId)!;
    current.fleetCount += 1;
    current.fleets.push({
      id: fleet.id,
      name: fleet.name,
      vehicleCount: fleet.vehicleCount,
      statistics: MOCK_FLEET_STATISTICS[fleet.id],
    });
  });

  return Array.from(managerMap.values());
};

export default function FleetManagersPage() {
  return (
    <div className="">
      <FleetManagersTableContainer />
    </div>
  );
}
