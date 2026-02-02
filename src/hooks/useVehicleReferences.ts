import { useState, useEffect } from "react";
import { referenceService } from "@/services/reference.service";
import { VehicleTypeRef } from "@/types/vehicle.types";

export function useVehicleReferences() {
  const [types, setTypes] = useState<VehicleTypeRef[]>([]);
  const [fuels, setFuels] = useState<any[]>([]);
  const [transmissions, setTransmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, f, tr] = await Promise.all([
          referenceService.getVehicleTypes(),
          referenceService.getLookup("fuel-types"),
          referenceService.getLookup("transmission-types"),
        ]);
        setTypes(t);
        setFuels(f);
        setTransmissions(tr);
      } catch (e) {
        console.error("Erreur chargement références", e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { types, fuels, transmissions, isLoading };
}
