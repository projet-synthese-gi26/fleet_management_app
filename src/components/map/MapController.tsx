import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface MapControllerProps {
  selectedLocation: { lat: number; lng: number } | null;
  vehicles?: any[]; // Pour le "FitBounds" initial
}

export default function MapController({
  selectedLocation,
  vehicles,
}: MapControllerProps) {
  const map = useMap();

  // 1. Déplacer la caméra quand un véhicule est sélectionné
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 16, {
        duration: 1.5, // Animation fluide
      });
    }
  }, [selectedLocation, map]);

  // 2. Ajuster le zoom pour voir tous les véhicules au chargement (optionnel)
  useEffect(() => {
    if (vehicles && vehicles.length > 0 && !selectedLocation) {
      const bounds = L.latLngBounds(
        vehicles.map((v) => [v.location.lat, v.location.lng]),
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [vehicles, map, selectedLocation]);

  return null;
}
