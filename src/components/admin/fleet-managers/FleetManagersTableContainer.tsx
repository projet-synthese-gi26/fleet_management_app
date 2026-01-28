"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useI18n } from "@/hooks/useI18n";
import Modal from "@/components/ui/Modal";
import StatusBadge from "./StatusBadge";
import PageHeader from "@/components/admin/fleet-managers/PageHeader";
import FilterBar from "@/components/admin/fleet-managers/FilterBar";
import { adminService } from "@/services/admin.service";
import { FleetManager, FleetStatistics } from "@/types/fleet.types";
import { toast } from "sonner";

// Composant Avatar simplifié
const Avatar = ({ name, src }: { name: string; src?: string }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
    );
  }
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "??";
  return (
    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
      {initials}
    </div>
  );
};

const ActionsMenu = ({
  manager,
  onClose,
}: {
  manager: FleetManager;
  onClose: () => void;
}) => {
  // 1. Ajout du type générique <HTMLDivElement>
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 2. Ajout de "as Node" pour rassurer TypeScript que la cible est bien un élément du DOM
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const statusActionKey =
    manager.status === "ACTIVE" ? "actionDeactivate" : "actionActivate";

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#182635] rounded-lg shadow-xl z-20 border border-gray-200 dark:border-gray-700"
    >
      <div className="p-1">
        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary/10 rounded-md">
          {t(statusActionKey, "fleetManagersPage")}
        </button>
        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary/10 rounded-md">
          {t("actionModify", "fleetManagersPage")}
        </button>
        <button className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-500/10 rounded-md">
          {t("actionDelete", "fleetManagersPage")}
        </button>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="bg-gray-100 dark:bg-background-dark p-3 rounded-lg">
    <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
    <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
);

const FleetStatisticsCard = ({ stats }: { stats: FleetStatistics }) => {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <StatCard
        title={t("statTotalVehicles", "fleetManagersPage")}
        value={stats.totalVehicles}
      />
      <StatCard
        title={t("statActiveVehicles", "fleetManagersPage")}
        value={stats.activeVehicles}
      />
      <StatCard
        title={t("statTotalDrivers", "fleetManagersPage")}
        value={stats.totalDrivers}
      />
      <StatCard
        title={t("statOngoingTrips", "fleetManagersPage")}
        value={stats.ongoingTrips}
      />
      <StatCard
        title={t("statMileageToday", "fleetManagersPage")}
        value={`${stats.totalMileageToday} km`}
      />
      <StatCard
        title={t("statMaintAlerts", "fleetManagersPage")}
        value={stats.maintenanceAlerts}
      />
      <StatCard
        title={t("statGeofenceViol", "fleetManagersPage")}
        value={stats.geofenceViolations}
      />
    </div>
  );
};

// --- Main Component ---

export default function FleetManagersTableContainer() {
  const { t } = useI18n();
  const [managers, setManagers] = useState<FleetManager[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // États des modales
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddManagerModalOpen, setAddManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<FleetManager | null>(
    null,
  );

  // Chargement des données
  const fetchManagers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getAllManagers();
      setManagers(data);
    } catch (error) {
      console.error("Failed to fetch managers", error);
      toast.error("Impossible de charger la liste des gestionnaires.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchManagers();
  }, [fetchManagers]);

  // Handlers
  const handleRowClick = (manager: FleetManager) => {
    setSelectedManager(manager);
    setIsDetailsModalOpen(true);
  };

  const handleAddManager = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Intégrer l'appel API de création (actuellement via /auth/register)
    // Pour l'instant, on peut rediriger vers la page signup ou afficher un message
    toast.info("La création se fait via la page d'inscription pour le moment.");
    setAddManagerModalOpen(false);
  };

  return (
    <>
      <PageHeader onAddManagerClick={() => setAddManagerModalOpen(true)} />
      <FilterBar />

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#182635]">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-background-dark">
                <tr>
                  <th className="px-4 py-3 w-12 text-center">
                    <input
                      className="form-checkbox h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-primary"
                      type="checkbox"
                    />
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t("headerManager", "fleetManagersPage")}
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t("headerEmail", "fleetManagersPage")}
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                    Entreprise
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t("headerStatus", "fleetManagersPage")}
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t("headerFleetsManaged", "fleetManagersPage")}
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 text-right">
                    {t("headerActions", "fleetManagersPage")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {managers.map((manager) => (
                  <tr
                    key={manager.userId}
                    onClick={() => handleRowClick(manager)}
                    className="hover:bg-gray-50 dark:hover:bg-background-dark/50 cursor-pointer transition-colors"
                  >
                    <td
                      className="px-4 py-2 w-12 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        className="form-checkbox h-5 w-5 rounded border-gray-300 dark:border-gray-600"
                        type="checkbox"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={`${manager.firstName} ${manager.lastName}`}
                          src={manager.avatarUrl}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {manager.firstName} {manager.lastName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                      {manager.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                      {manager.companyName || "-"}
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge
                        status={manager.status || "ACTIVE"}
                        color={manager.status === "ACTIVE" ? "green" : "gray"}
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                      {manager.fleetCount}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100">
                        <span className="material-symbols-outlined">
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
                {managers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      Aucun gestionnaire trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modale Détails (Simplifiée pour l'instant) */}
      {selectedManager && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Détails de ${selectedManager.firstName}`}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">ID</label>
                <p className="text-sm font-medium">{selectedManager.userId}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Entreprise</label>
                <p className="text-sm font-medium">
                  {selectedManager.companyName || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Flottes gérées</label>
                <p className="text-sm font-medium">
                  {selectedManager.fleetCount}
                </p>
              </div>
            </div>
            {/* Ici on pourrait charger les flottes spécifiques de ce manager via une autre requête API */}
          </div>
        </Modal>
      )}

      {/* Modale Ajout */}
      <Modal
        isOpen={isAddManagerModalOpen}
        onClose={() => setAddManagerModalOpen(false)}
        title={t("modalAddManagerTitle", "fleetManagersPage")}
      >
        {/* Le formulaire existant */}
        <form onSubmit={handleAddManager} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("formName", "fleetManagersPage")}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("formEmail", "fleetManagersPage")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setAddManagerModalOpen(false)}
              className="px-4 py-2 text-sm bg-gray-200 rounded-md mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-primary rounded-md"
            >
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
