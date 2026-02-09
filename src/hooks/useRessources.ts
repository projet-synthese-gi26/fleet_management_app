import { useState, useEffect } from 'react';
import { referenceService } from '@/services/reference.service';
import { ResourceCatalog } from '@/types/vehicle.types';
import { toast } from 'sonner';

/**
 * Hook personnalisé pour centraliser la récupération des référentiels du parc.
 * Il permet d'éviter de répéter la logique de chargement dans chaque formulaire.
 */
export function useResources() {
  // État stockant l'intégralité du catalogue (Marques, Modèles, Couleurs, etc.)
  const [catalog, setCatalog] = useState<ResourceCatalog | null>(null);
  
  // État de chargement pour afficher des spinners ou désactiver les boutons
  const [isLoading, setIsLoading] = useState(true);
  
  // État d'erreur pour la gestion UI
  const [error, setError] = useState<string | null>(null);

  /**
   * Fonction de chargement des données depuis le backend
   */
  const fetchAllResources = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Appel à l'endpoint optimisé /vehicles/resources/all
      const data = await referenceService.getAllResources();
      setCatalog(data);
      
    } catch (err: any) {
      const errorMessage = "Échec de la récupération des référentiels.";
      setError(errorMessage);
      
      // Notification utilisateur avec le détail du backend si disponible
      toast.error(errorMessage, {
        description: err.detail || "Vérifiez la connexion avec le serveur de ressources."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Chargement automatique au montage du composant qui utilise le hook
  useEffect(() => {
    fetchAllResources();
  }, []);

  return {
    catalog,      // L'objet complet contenant les 9 listes
    isLoading,    // true pendant l'appel API
    error,        // Message d'erreur si l'appel échoue
    refresh: fetchAllResources, // Permet de recharger manuellement les listes
    
    // Helpers pour accéder rapidement aux listes sans se soucier du null
    brands: catalog?.brands || [],
    models: catalog?.models || [],
    colors: catalog?.colors || [],
    vehicleTypes: catalog?.vehicleTypes || [],
    fuelTypes: catalog?.fuelTypes || [],
    transmissionTypes: catalog?.transmissionTypes || [],
    sizes: catalog?.sizes || [],
    usages: catalog?.usages || [],
    manufacturers: catalog?.manufacturers || []
  };
}