"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Plus, 
  Search, 
  RefreshCw, 
  Trash2, 
  Edit3, 
  Car, 
  Tag, 
  Layers, 
  Fuel, 
  Palette,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { referenceService } from "@/services/reference.service";
import { toast } from "sonner";

// Définition des catégories de ressources gérées par le backend
const RESOURCE_CATEGORIES = [
  { id: "vehicle-types", label: "Types de véhicules", icon: Car },
  { id: "manufacturers", label: "Constructeurs", icon: Tag },
  { id: "brands", label: "Marques", icon: Layers },
  { id: "models", label: "Modèles", icon: Settings },
  { id: "fuel-types", label: "Carburants", icon: Fuel },
  { id: "colors", label: "Couleurs", icon: Palette },
  { id: "sizes", label: "Gabarits", icon: ChevronRight },
  { id: "usages", label: "Types d'usage", icon: ChevronRight },
  { id: "transmissions", label: "Transmissions", icon: ChevronRight },
];

export default function AdminResourcesPage() {
  const [activeCategory, setActiveCategory] = useState(RESOURCE_CATEGORIES[0]);
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Charge les données de la catégorie sélectionnée
   */
  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const data = await referenceService.getLookup(activeCategory.id);
      setItems(data);
    } catch (error: any) {
      toast.error("Erreur", { description: "Impossible de charger les données." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [activeCategory]);

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Ressources du Parc</h1>
          <p className="text-text-secondary">Gérez les référentiels souverains utilisés dans les formulaires.</p>
        </div>
        <Button className="gap-2 shadow-primary">
          <Plus size={18} /> Ajouter {activeCategory.label.slice(0, -1)}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* NAVIGATION GAUCHE (CATÉGORIES) */}
        <div className="lg:col-span-1 space-y-2">
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest px-4 mb-4">Catégories</p>
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeCategory.id === cat.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-surface text-text-secondary hover:bg-background-secondary border border-border-default"
              }`}
            >
              <cat.icon size={18} />
              <span className="text-sm font-bold">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* CONTENU DROIT (TABLEAU) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Barre de recherche locale */}
          <div className="flex items-center gap-4 bg-surface p-3 rounded-2xl border border-border-default shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
              <input 
                className="w-full pl-12 pr-4 py-2 rounded-xl border border-border-default bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder={`Rechercher dans ${activeCategory.label.toLowerCase()}...`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={fetchResources} className="p-2.5 rounded-xl hover:bg-background-secondary text-text-secondary transition-colors">
              <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>

          {/* Liste des éléments */}
          <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden">
            {isLoading ? (
              <TableSkeleton rows={8} columns={3} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-background-secondary/50 border-b border-border-default">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Code Technique</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Libellé (Affiché)</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-background-secondary/30 transition-colors group">
                        <td className="px-6 py-4">
                          <code className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {item.code}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-text-primary">{item.label}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                              <Edit3 size={16} />
                            </button>
                            <button className="p-2 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-text-tertiary italic">
                          Aucun élément trouvé dans cette catégorie.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}