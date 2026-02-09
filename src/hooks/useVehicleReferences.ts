// src/hooks/useVehicleReferences.ts
import { useState, useEffect } from 'react';
import { referenceService } from '@/services/reference.service';

export function useVehicleReferences() {
  const [resources, setResources] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referenceService.getAllResources()
      .then(setResources)
      .finally(() => setIsLoading(false));
  }, []);

  return { resources, isLoading };
}