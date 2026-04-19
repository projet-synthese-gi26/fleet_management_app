"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, Plus, Search, RefreshCw, Trash2, Edit3, 
  Car, Tag, Layers, Fuel, Palette, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { referenceService } from "@/services/reference.service";
import { ResourceModal } from "@/components/admin/resources/ResourceModal";
import { toast } from "sonner";

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

  // États Modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const data = await referenceService.getLookup(activeCategory.id);
      setItems(data);
    } catch (error) {
      toast.error("Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchResources(); }, [activeCategory]);

  const handleDelete = async (item: any) => {
    if (!confirm(`Supprimer "${item.label}" ? Cette action peut échouer si la ressource est utilisée.`)) return;
    
    try {
      const apiCategory = activeCategory.id === "fuel-types" ? "fuels" : activeCategory.id;
      await referenceService.deleteResource(apiCategory, item.id);
      toast.success("Supprimé avec succès");
      fetchResources();
    } catch (error: any) {
      toast.error("Suppression impossible", { description: "Cette ressource est probablement liée à des véhicules existants." });
    }
  };

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Ressources du Parc</h1>
          <p className="text-text-secondary">Gérez les référentiels souverains du système.</p>
        </div>
        <Button onClick={() => { setSelectedItem(null); setIsModalOpen(true); }} className="gap-2 shadow-primary">
          <Plus size={18} /> Ajouter {activeCategory.label.slice(0, -1)}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeCategory.id === cat.id 
                  ? "bg-primary text-white shadow-lg" 
                  : "bg-surface text-text-secondary hover:bg-background-secondary border border-border-default"
              }`}
            >
              <cat.icon size={18} />
              <span className="text-sm font-bold">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-4 bg-surface p-3 rounded-2xl border border-border-default shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
              <input 
                className="w-full pl-12 pr-4 py-2 rounded-xl border border-border-default bg-background outline-none"
                placeholder={`Rechercher...`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={fetchResources} className="p-2.5 rounded-xl hover:bg-background-secondary">
              <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden">
            {isLoading ? <TableSkeleton rows={8} columns={3} /> : (
              <table className="w-full text-left">
                <thead className="bg-background-secondary/50 border-b border-border-default">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-tertiary">Code</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-tertiary">Libellé</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-tertiary text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-background-secondary/30 transition-colors">
                      <td className="px-6 py-4"><code className="text-xs font-mono bg-slate-100 p-1 rounded">{item.code}</code></td>
                      <td className="px-6 py-4 font-bold text-text-primary">{item.label}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} className="p-2 text-text-tertiary hover:text-primary"><Edit3 size={16} /></button>
                          <button onClick={() => handleDelete(item)} className="p-2 text-text-tertiary hover:text-error"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <ResourceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        category={activeCategory} 
        initialData={selectedItem} 
        onSuccess={fetchResources} 
      />
    </div>
  );
}