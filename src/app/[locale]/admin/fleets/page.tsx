"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Calendar,
  Truck,
  MoreVertical,
  X,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { fleetService } from "@/services/fleet.service";
import { Fleet } from "@/types/fleet.types";
import { toast } from "sonner";

export default function FleetsPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // États pour le formulaire de création/édition
  const [editingFleet, setEditingFleet] = useState<Fleet | null>(null);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");

  const fetchFleets = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fleetService.getAllFleets();
      setFleets(data);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des flottes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFleets();
  }, [fetchFleets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFleet) {
        await fleetService.updateFleet(editingFleet.id, {
          name: formName,
          phoneNumber: formPhone,
        });
        toast.success("Flotte mise à jour");
      } else {
        await fleetService.createFleet({
          name: formName,
          phoneNumber: formPhone,
        });
        toast.success("Flotte créée");
      }
      setIsCreateModalOpen(false);
      fetchFleets(); // Recharger la liste
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: string) => {
    // Note: Pour une meilleure UX, remplacez window.confirm par une modale personnalisée plus tard
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette flotte ?")) return;

    try {
      await fleetService.deleteFleet(id);
      toast.success("Flotte supprimée");
      setFleets((prev) => prev.filter((f) => f.id !== id));
    } catch (error: any) {
      if (error.status === 409) {
        // Affichage d'une alerte bloquante ou toast long
        toast.error("Suppression impossible", {
            description: "Impossible de supprimer cette flotte car elle contient des véhicules actifs. Veuillez les déplacer ou les supprimer d'abord.",
            duration: 8000, // Durée plus longue pour lire
        });
      } else {
        toast.error("Erreur", { description: error.detail });
      }
    }
  };

  const openCreateModal = () => {
    setEditingFleet(null);
    setFormName("");
    setFormPhone("");
    setIsCreateModalOpen(true);
  };

  const openEditModal = (fleet: Fleet) => {
    setEditingFleet(fleet);
    setFormName(fleet.name);
    setFormPhone(""); // L'API ne renvoie pas forcément le tel dans le listing, à voir
    setIsCreateModalOpen(true);
  };

  const filteredFleets = fleets.filter((fleet) =>
    fleet.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-6 lg:p-8 bg-background"
    >
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Flottes</h1>
            <p className="text-text-secondary mt-2">
              Création et gestion des flottes de véhicules
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-text-invert rounded-lg hover:bg-primary-hover transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Nouvelle flotte
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6 flex gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-border-default bg-background text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <button
          onClick={fetchFleets}
          className="p-3 bg-surface border border-border-default rounded-lg hover:bg-surface-hover text-text-secondary"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Liste des flottes */}
      {isLoading ? (
        <div className="text-center py-10">Chargement des flottes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFleets.map((fleet) => (
            <div
              key={fleet.id}
              className="bg-surface rounded-xl shadow-sm border border-border-default p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Header carte */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary-light">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-text-primary">
                      {fleet.name}
                    </h3>
                    <p className="text-xs text-text-secondary font-mono truncate max-w-[150px]">
                      ID: {fleet.id.substring(0, 8)}...
                    </p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-background-secondary transition-colors">
                  <MoreVertical className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              {/* Infos flotte */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-text-tertiary" />
                  <div>
                    <p className="text-text-secondary">Manager ID</p>
                    <p className="font-medium text-text-primary truncate max-w-[200px]">
                      {fleet.managerUserId || "Non assigné"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-text-tertiary" />
                  <div>
                    <p className="text-text-secondary">Créée le</p>
                    <p className="font-medium text-text-primary">
                      {new Date(fleet.creationDate).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-4 h-4 text-text-tertiary" />
                  <div>
                    <p className="text-text-secondary">Véhicules</p>
                    <p className="font-medium text-xl text-text-primary">
                      {fleet.vehicleCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border-hover">
                <Link
                  href={`/admin/fleets/${fleet.id}`}
                  className="flex-1 text-center py-2 px-4 bg-primary-light text-primary rounded-lg hover:bg-primary transition-colors font-medium text-sm"
                >
                  Détails
                </Link>
                <button
                  onClick={() => openEditModal(fleet)}
                  className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
                >
                  <Edit className="w-4 h-4 text-text-secondary" />
                </button>
                <button
                  onClick={() => handleDelete(fleet.id)}
                  className="p-2 rounded-lg hover:bg-error-light transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-error" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Création / Édition */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary">
                {editingFleet ? "Modifier la flotte" : "Nouvelle flotte"}
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Nom de la flotte
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ex: Flotte Paris Centre"
                  className="w-full px-4 py-3 rounded-lg border border-border-default bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Téléphone (Optionnel)
                </label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+237..."
                  className="w-full px-4 py-3 rounded-lg border border-border-default bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-3 px-5 border border-border-default rounded-lg hover:bg-background-secondary transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 bg-primary text-text-invert rounded-lg hover:bg-primary-hover transition-colors font-medium"
                >
                  {editingFleet ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
