"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fleetService } from "@/services/fleet.service";
import { geofenceService } from "@/services/geofence.service";
import { Fleet } from "@/types/fleet.types";
import { Zone, CreateZoneDto } from "@/types/geofence.types";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";
import { MapPin, Trash2, Shield, Plus } from "lucide-react";

// Import dynamique de la carte (pour éviter SSR error window is not defined)
const GeofenceMap = dynamic(() => import("@/components/map/GeofenceMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">
      Chargement de la carte...
    </div>
  ),
});

export default function GeofencingPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [selectedFleetId, setSelectedFleetId] = useState<string>("");
  const [zones, setZones] = useState<Zone[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // État pour la création
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempZoneData, setTempZoneData] =
    useState<Partial<CreateZoneDto> | null>(null);
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneDesc, setNewZoneDesc] = useState("");

  // 1. Charger les flottes au montage
  useEffect(() => {
    const loadFleets = async () => {
      try {
        const data = await fleetService.getAllFleets();
        setFleets(data);
        if (data.length > 0) setSelectedFleetId(data[0].id);
      } catch (err) {
        toast.error("Erreur chargement flottes");
      }
    };
    loadFleets();
  }, []);

  // 2. Charger les zones quand la flotte change
  useEffect(() => {
    if (!selectedFleetId) return;
    const loadZones = async () => {
      setIsLoading(true);
      try {
        const data = await geofenceService.getZonesByFleet(selectedFleetId);
        setZones(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadZones();
  }, [selectedFleetId]);

  // Handler: Quand on dessine sur la carte
  const handleZoneCreated = (zoneGeometry: any) => {
    if (!selectedFleetId) {
      toast.error("Veuillez sélectionner une flotte d'abord.");
      return;
    }
    setTempZoneData(zoneGeometry);
    setNewZoneName("");
    setNewZoneDesc("");
    setIsModalOpen(true);
  };

  // Handler: Sauvegarder la zone
  const handleSaveZone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempZoneData || !selectedFleetId) return;

    try {
      const payload: CreateZoneDto = {
        fleetId: selectedFleetId,
        name: newZoneName,
        description: newZoneDesc,
        type: tempZoneData.type!,
        vertices: tempZoneData.vertices!,
        radius: tempZoneData.radius,
      };

      const newZone = await geofenceService.createZone(payload);
      setZones([...zones, newZone]);
      toast.success("Zone créée avec succès");
      setIsModalOpen(false);
      setTempZoneData(null);
    } catch (err) {
      toast.error("Erreur lors de la création de la zone");
    }
  };

  // Handler: Supprimer une zone
  const handleDeleteZone = async (id: string) => {
    if (!confirm("Supprimer cette zone ?")) return;
    try {
      await geofenceService.deleteZone(id);
      setZones(zones.filter((z) => z.id !== id));
      toast.success("Zone supprimée");
    } catch (err) {
      toast.error("Erreur suppression");
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
      {/* Sidebar de gauche : Liste et Contrôles */}
      <div className="w-80 flex flex-col bg-surface border-r border-border-default z-10 shadow-xl">
        <div className="p-4 border-b border-border-default">
          <h2 className="text-xl font-bold flex items-center gap-2 text-text-primary mb-4">
            <Shield className="w-6 h-6 text-primary" />
            Geofencing
          </h2>

          <label className="text-xs font-semibold text-text-secondary uppercase mb-1 block">
            Sélectionner une flotte
          </label>
          <select
            value={selectedFleetId}
            onChange={(e) => setSelectedFleetId(e.target.value)}
            className="w-full p-2 rounded-lg border border-border-default bg-background text-text-primary"
          >
            {fleets.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-text-secondary">
              Zones ({zones.length})
            </span>
          </div>

          {isLoading ? (
            <p className="text-sm text-text-tertiary">Chargement...</p>
          ) : (
            <div className="space-y-3">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-3 rounded-lg border border-border-default bg-background hover:border-primary transition-colors flex justify-between items-start group"
                >
                  <div>
                    <h4 className="font-medium text-sm text-text-primary">
                      {zone.name}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {zone.type}{" "}
                      {zone.type === "CIRCLE" && zone.radius
                        ? `- ${Math.round(zone.radius)}m`
                        : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteZone(zone.id)}
                    className="text-text-tertiary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {zones.length === 0 && (
                <div className="text-center p-4 border border-dashed border-border-default rounded-lg">
                  <MapPin className="w-8 h-8 text-text-tertiary mx-auto mb-2" />
                  <p className="text-xs text-text-secondary">
                    Utilisez les outils sur la carte pour dessiner une zone.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Carte (Prend le reste de l'espace) */}
      <div className="flex-1 relative">
        <GeofenceMap
          existingZones={zones}
          onZoneCreated={handleZoneCreated}
          onZoneDeleted={() => {}} // Géré via la sidebar
        />
      </div>

      {/* Modal Création */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouvelle Zone de Sécurité"
      >
        <form onSubmit={handleSaveZone} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Nom de la zone
            </label>
            <input
              type="text"
              required
              value={newZoneName}
              onChange={(e) => setNewZoneName(e.target.value)}
              className="w-full p-2 border border-border-default rounded-md bg-background text-text-primary"
              placeholder="Ex: Entrepôt Principal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Description
            </label>
            <textarea
              value={newZoneDesc}
              onChange={(e) => setNewZoneDesc(e.target.value)}
              className="w-full p-2 border border-border-default rounded-md bg-background text-text-primary"
              placeholder="Détails optionnels..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-md"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-primary text-white rounded-md"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
