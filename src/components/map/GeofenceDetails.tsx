"use client";

import React from "react";
import { 
  Shield, MapPin, Trash2, Layers, Clock, Activity, 
  Gauge, Timer, Calendar, Globe, Box, AlertTriangle,
  ChevronLeft, Power, Edit3, Navigation, Maximize2
} from "lucide-react";
import { GeofenceZone } from "@/types/geofence.types";
import { Fleet } from "@/types/fleet.types";
import { Button } from "@/components/ui/Button";

interface Props {
  zone: GeofenceZone;
  fleets: Fleet[];
  onBack: () => void;
  onDelete: (zone: GeofenceZone) => void;
  isDeleting: boolean;
}

export function GeofenceDetails({ zone, fleets, onBack, onDelete, isDeleting }: Props) {
  
  // Trouver le nom de la flotte
  const fleetName = fleets.find(f => f.id === zone.fleetId)?.name || "Non assignée";

  return (
    <div className="flex flex-col h-full animate-slide-in">
      
      {/* --- HEADER --- */}
      <div className="p-6 border-b border-border-default bg-white sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-[-4px] transition-transform mb-4"
        >
          <ChevronLeft size={20} /> Retour aux zones
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-black text-text-primary leading-tight tracking-tighter">
              {zone.title}
            </h3>
            <p className="text-[10px] font-mono text-text-tertiary mt-1 uppercase">ID: {zone.id.substring(0, 13)}...</p>
          </div>
          <div className={`p-2 rounded-xl ${zone.isActive ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-400'}`}>
            <Shield size={24} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-24">
        
        {/* --- DESCRIPTION --- */}
        <section className="space-y-2">
            <h4 className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-2">
                <Edit3 size={12} /> À propos
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                "{zone.description || "Aucune description détaillée pour cette zone."}"
            </p>
        </section>

        {/* --- ÉTAT & TYPE (QUICK STATS) --- */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-[2rem] bg-white border border-border-default shadow-sm text-center space-y-1">
            <Activity size={20} className={zone.isActive ? "text-success mx-auto" : "text-slate-300 mx-auto"} />
            <p className="text-[9px] font-black text-text-tertiary uppercase">Statut</p>
            <p className="text-sm font-bold">{zone.isActive ? 'Opérationnel' : 'Désactivé'}</p>
          </div>
          <div className="p-4 rounded-[2rem] bg-white border border-border-default shadow-sm text-center space-y-1">
            <Navigation size={20} className="text-primary mx-auto" />
            <p className="text-[9px] font-black text-text-tertiary uppercase">Type</p>
            <p className="text-sm font-bold">{zone.type}</p>
          </div>
        </div>

        {/* --- GÉOGRAPHIE & DIMENSIONS --- */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-2">
            <Globe size={12} /> Dimensions Spatiales
          </h4>
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Maximize2 size={80} />
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                        <Box size={14} />
                        <span className="text-[9px] font-bold uppercase">Superficie</span>
                    </div>
                    <p className="text-xl font-black">12.5 <span className="text-xs font-normal opacity-60">km²</span></p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-success">
                        <Activity size={14} />
                        <span className="text-[9px] font-bold uppercase">Périmètre</span>
                    </div>
                    <p className="text-xl font-black">4.8 <span className="text-xs font-normal opacity-60">km</span></p>
                </div>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin size={16} className="text-primary-light" />
                </div>
                <div>
                    <p className="text-[9px] font-bold opacity-50 uppercase">Point Central (GPS)</p>
                    <p className="text-xs font-mono tracking-tighter">4.05105 / 9.76786</p>
                </div>
            </div>
          </div>
        </section>

        {/* --- ASSIGNATION --- */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-2">
            <Layers size={12} /> Business Unit
          </h4>
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4 transition-all hover:bg-primary/10 cursor-pointer">
            <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
                <Shield size={24} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-primary uppercase">Flotte Assignée</p>
                <p className="text-sm font-bold text-text-primary truncate">{fleetName}</p>
            </div>
          </div>
        </section>

        {/* --- RÈGLES ET CONDITIONS --- */}
        <section className="space-y-3">
            <h4 className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-2">
                <Gauge size={12} /> Règles de surveillance
            </h4>
            <div className="grid grid-cols-1 gap-3">
                {/* Vitesse Max */}
                <div className="p-4 rounded-2xl border border-border-default flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Gauge size={18} />
                        </div>
                        <span className="text-xs font-bold text-text-secondary uppercase">Vitesse Max</span>
                    </div>
                    <span className="text-sm font-black">60 km/h</span>
                </div>
                {/* Temps d'arrêt */}
                <div className="p-4 rounded-2xl border border-border-default flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Timer size={18} />
                        </div>
                        <span className="text-xs font-bold text-text-secondary uppercase">Dwell Time Max</span>
                    </div>
                    <span className="text-sm font-black">15 min</span>
                </div>
            </div>
        </section>

        {/* --- PLANIFICATION --- */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-2">
            <Calendar size={12} /> Disponibilité Temporelle
          </h4>
          {zone.isTemporalEnabled ? (
            <div className="p-5 rounded-[2rem] bg-amber-50 border border-amber-100 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-amber-600">
                        <Clock size={20} />
                    </div>
                    <p className="text-sm font-black text-amber-900 uppercase tracking-tighter">Surveillance Active</p>
                </div>
                <div className="flex items-center justify-around">
                    <div className="text-center">
                        <p className="text-[10px] text-amber-600/60 font-bold uppercase mb-1">Dès</p>
                        <p className="text-lg font-black text-amber-900">{zone.startTime}</p>
                    </div>
                    <div className="h-1 w-12 bg-amber-200 rounded-full" />
                    <div className="text-center">
                        <p className="text-[10px] text-amber-600/60 font-bold uppercase mb-1">Jusqu'à</p>
                        <p className="text-lg font-black text-amber-900">{zone.endTime}</p>
                    </div>
                </div>
            </div>
          ) : (
            <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-3 text-slate-400">
                <AlertTriangle size={18} />
                <span className="text-xs font-bold uppercase">Surveillance H24 / 7J</span>
            </div>
          )}
        </section>

        {/* --- ZONE DE DANGER --- */}
        <section className="pt-8 border-t border-border-default space-y-4">
            <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full h-12 rounded-2xl gap-2 text-text-primary">
                    <Edit3 size={18} /> Modifier la configuration
                </Button>
                <Button 
                    variant="danger" 
                    className="w-full h-12 rounded-2xl gap-2 shadow-error/20"
                    onClick={() => onDelete(zone)}
                    isLoading={isDeleting}
                >
                    <Trash2 size={18} /> Supprimer définitivement
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}