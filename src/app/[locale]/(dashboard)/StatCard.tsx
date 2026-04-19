"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Network,
  Truck,
  Users,
  Navigation,
  AlertCircle,
  CheckCircle2,
  LucideIcon
} from "lucide-react";

// Interface des propriétés du composant
interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: string; // Nom de l'icône (ex: "hub", "truck")
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "primary" | "success" | "warning" | "error" | "info";
}

// Mapping des chaînes de caractères vers les icônes Lucide
const iconMap: Record<string, LucideIcon> = {
  hub: Network,
  local_shipping: Truck,
  groups: Users,
  alt_route: Navigation,
  warning: AlertCircle,
  check_circle: CheckCircle2,
};

export function StatCard({
  title,
  value,
  subValue,
  icon,
  trend,
  trendValue,
  color = "primary",
}: StatCardProps) {
  
  // Configuration des styles par couleur
  const colorConfigs = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    info: "bg-info/10 text-info border-info/20",
  };

  // Sélection de l'icône
  const IconComponent = iconMap[icon] || Network;

  // Configuration de la tendance (Trend)
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColorClass = trend === "up" ? "text-success" : trend === "down" ? "text-error" : "text-text-tertiary";

  return (
    <div className="group relative bg-surface rounded-2xl border border-border-default p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* Effet de dégradé au survol */}
      <div className={`absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 ${colorConfigs[color]}`} />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          {/* Textes */}
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">
              {title}
            </p>
            <h3 className="text-2xl font-black text-text-primary tracking-tight">
              {value}
            </h3>
            {subValue && (
              <p className="text-[11px] text-text-secondary font-medium flex items-center gap-1">
                {subValue}
              </p>
            )}
          </div>

          {/* Icône stylisée */}
          <div className={`p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110 ${colorConfigs[color]}`}>
            <IconComponent size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* Indicateur de tendance (si présent) */}
        {trend && trendValue && (
          <div className="flex items-center gap-2 pt-2 border-t border-border-default/50">
            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-lg bg-background-secondary ${trendColorClass}`}>
              <TrendIcon size={12} strokeWidth={3} />
              {trendValue}
            </div>
            <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-tighter">
              vs mois dernier
            </span>
          </div>
        )}
      </div>

      {/* Barre décorative latérale */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300 group-hover:h-12 ${
        color === 'primary' ? 'bg-primary' : 
        color === 'success' ? 'bg-success' : 
        color === 'warning' ? 'bg-warning' : 
        color === 'error' ? 'bg-error' : 'bg-info'
      }`} />
    </div>
  );
}