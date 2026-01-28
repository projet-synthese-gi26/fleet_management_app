"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  Edit,
  Trash2,
  Calendar,
  Gauge,
  Fuel,
  User,
  MapPin,
  FileText,
  Wrench,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VehicleModalProps {
  vehicle: any;
  onClose: () => void;
}

export function VehicleModal({ vehicle, onClose }: VehicleModalProps) {
  if (!vehicle) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Colonne Image (Gauche) */}
          <div className="w-full md:w-2/5 relative min-h-[200px] md:min-h-full bg-gray-100">
            <Image
              src={vehicle.image}
              alt={vehicle.model}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <h2 className="text-3xl font-bold">{vehicle.licensePlate}</h2>
              <p className="text-white/80 text-lg">
                {vehicle.brand} {vehicle.model}
              </p>
            </div>
          </div>

          {/* Colonne Infos (Droite) */}
          <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Détails du Véhicule
                </h3>
                <p className="text-gray-500 text-sm">
                  ID: {vehicle.id.toUpperCase()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>

            {/* Grille d'infos */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Opérationnel
                </h4>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Conducteur</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.driver}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Gauge size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Kilométrage</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.mileage.toLocaleString()} km
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                    <Fuel size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Niveau Carburant</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.fuel}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Technique
                </h4>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Année</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Assurance</p>
                    <p className="font-semibold text-gray-900 text-green-600">
                      Valide (Oct 2026)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dernière position</p>
                    <p className="font-semibold text-gray-900">
                      Yaoundé, Bastos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-auto pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
                <Edit size={18} />
                Modifier
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition-colors">
                <Wrench size={18} />
                Maintenance
              </button>
              <button className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 border border-red-100 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-semibold transition-colors">
                <Trash2 size={18} />
                Retirer de la flotte
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
