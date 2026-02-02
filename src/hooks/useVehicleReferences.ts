import { useState, useEffect } from 'react';
import { referenceService } from '@/services/reference.service';
import { VehicleTypeRef } from '@/types/vehicle.types';

export function useVehicleReferences() {
    const [refs, setRefs] = useState({
        types: [] as VehicleTypeRef[],
        makes: [] as any[],
        manufacturers: [] as any[],
        sizes: [] as any[],
        fuels: [] as any[],
        transmissions: [] as any[],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [types, makes, manufacturers, sizes, fuels, transmissions] = await Promise.all([
                    referenceService.getVehicleTypes(),
                    referenceService.getLookup('vehicle-makes'),
                    referenceService.getLookup('manufacturers'),
                    referenceService.getLookup('vehicle-sizes'),
                    referenceService.getLookup('fuel-types'),
                    referenceService.getLookup('transmission-types'),
                ]);
                setRefs({ types, makes, manufacturers, sizes, fuels, transmissions });
            } catch (e) {
                console.error("Erreur chargement références", e);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    return { ...refs, isLoading };
}