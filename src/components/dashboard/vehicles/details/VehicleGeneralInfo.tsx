"use client";
import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { Vehicle } from "@/types/vehicle.types";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Truck, Hash, PaintBucket, Calendar, Building, Settings } from "lucide-react";

interface VehicleGeneralInfoProps {
  vehicle: Vehicle;
  onUpdate: () => void;
  readOnly?: boolean;
}

export default function VehicleGeneralInfo({
  vehicle,
  onUpdate,
  readOnly = false,
}: VehicleGeneralInfoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    licensePlate: vehicle.licensePlate,
    color: vehicle.color,
    model: vehicle.model,
    brand: vehicle.brand,
    manufacturingYear: vehicle.manufacturingYear,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await vehicleService.update(vehicle.id, form);
      toast.success("Informations mises à jour avec succès");
      onUpdate();
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 
                        flex items-center justify-center">
            <Settings className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Informations Générales</h3>
            <p className="text-sm text-gray-500">Détails d'identification du véhicule</p>
          </div>
        </div>
        {!readOnly && (
          <div className="text-sm font-medium text-gray-500">
            {vehicle.licensePlate}
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Immatriculation */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Hash className="w-4 h-4" />
              Immatriculation
            </label>
            <input
              disabled={readOnly}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                       text-gray-900 font-semibold uppercase tracking-wider
                       outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                       transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-600"
              value={form.licensePlate}
              onChange={(e) =>
                setForm({ ...form, licensePlate: e.target.value.toUpperCase() })
              }
              placeholder="AA-123-BB"
            />
          </div>

          {/* Couleur */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <PaintBucket className="w-4 h-4" />
              Couleur
            </label>
            <input
              disabled={readOnly}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                       text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 
                       focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              placeholder="Noir"
            />
          </div>

          {/* Marque */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4" />
              Marque
            </label>
            <input
              disabled={readOnly}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                       text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 
                       focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              placeholder="Toyota"
            />
          </div>

          {/* Modèle */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Modèle</label>
            <input
              disabled={readOnly}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                       text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 
                       focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              placeholder="Hilux"
            />
          </div>

          {/* Année de fabrication */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              Année de fabrication
            </label>
            <input
              disabled={readOnly}
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                       text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 
                       focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50"
              value={form.manufacturingYear}
              onChange={(e) => setForm({ ...form, manufacturingYear: parseInt(e.target.value) })}
              placeholder="2023"
            />
          </div>

          {/* Véhicule Type (Exemple d'autre champ) */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Truck className="w-4 h-4" />
              Type de véhicule
            </label>
            <select
              disabled={readOnly}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                       text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 
                       focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50"
            >
              <option value="LIGHT">Véhicule Léger</option>
              <option value="HEAVY">Poids Lourd</option>
              <option value="SPECIAL">Véhicule Spécial</option>
            </select>
          </div>
        </div>

        {!readOnly && (
          <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 
                       text-white font-semibold hover:from-blue-700 hover:to-blue-800 
                       shadow-lg shadow-blue-500/25 transition-all duration-200"
            >
              Enregistrer les modifications
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}