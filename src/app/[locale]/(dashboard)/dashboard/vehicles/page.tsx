"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Battery,
  AlertTriangle,
  CheckCircle2,
  Fuel,
} from "lucide-react";
import { VehicleModal } from "@/components/dashboard/vehicles/VehicleModal";

// Données Mock enrichies avec des images (placeholders)
const MOCK_VEHICLES_DATA = [
  {
    id: "v1",
    licensePlate: "CE 123 AB",
    brand: "Toyota",
    model: "Yaris",
    type: "Sedan",
    year: 2022,
    status: "active",
    driver: "Aissatou Bello",
    fuel: 75,
    mileage: 45200,
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: "v2",
    licensePlate: "LT 999 XX",
    brand: "Mercedes",
    model: "Actros",
    type: "Truck",
    year: 2020,
    status: "maintenance",
    driver: "Jean Dupont",
    fuel: 40,
    mileage: 120500,
    image:
      "https://images.unsplash.com/photo-1586191848554-8d3781a90358?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "v3",
    licensePlate: "OU 456 ZZ",
    brand: "Toyota",
    model: "Hilux",
    type: "Pickup",
    year: 2023,
    status: "active",
    driver: "Moussa Ibrahim",
    fuel: 90,
    mileage: 15300,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function VehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
          <CheckCircle2 size={12} /> Actif
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 flex items-center gap-1">
        <AlertTriangle size={12} /> Maintenance
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Véhicules</h1>
          <p className="text-gray-500 text-sm">
            Gérez votre flotte et suivez l'état des véhicules.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus size={18} />
          <span>Ajouter un véhicule</span>
        </button>
      </div>

      {/* Filtres et Recherche */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Rechercher (Immatriculation, Marque, Conducteur)..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
            <Filter size={16} />
            Filtres
          </button>
        </div>
      </div>

      {/* Tableau des véhicules */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Véhicule
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Statut
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Conducteur
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Carburant
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_VEHICLES_DATA.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={vehicle.image}
                          alt={vehicle.model}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {vehicle.licensePlate}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {vehicle.brand} {vehicle.model} ({vehicle.year})
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{vehicle.type}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(vehicle.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {vehicle.driver.charAt(0)}
                      </div>
                      <span className="text-gray-700">{vehicle.driver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Fuel
                        size={16}
                        className={
                          vehicle.fuel < 20 ? "text-red-500" : "text-blue-500"
                        }
                      />
                      <span className="font-medium">{vehicle.fuel}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Détails */}
      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
}
